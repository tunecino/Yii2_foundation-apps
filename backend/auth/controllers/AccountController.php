<?php

namespace app\auth\controllers;

use Yii;

use app\auth\models\LoginForm;
use app\auth\models\SignupForm;
use app\auth\models\PasswordResetRequestForm;
use app\auth\models\ResetPasswordForm;
use app\auth\models\User;

use yii\filters\auth\HttpBearerAuth;
use yii\web\ServerErrorHttpException;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;



class AccountController extends \yii\rest\Controller
{
    private $_verbs = ['POST', 'GET', 'OPTIONS'];

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::className(),
            'only' => ['logout','test'],
        ];

        return \yii\helpers\ArrayHelper::merge([
            [
                'class' => \yii\filters\Cors::className(),
                'cors' => [
                    'Origin' => ['*'],
                    'Access-Control-Allow-Origin' => ['*'],
                    'Access-Control-Request-Method' => $this->_verbs,
                    'Access-Control-Request-Headers' => ['*'],
                ],
            ],
        ], $behaviors);
    }

    public function actionTest()
    {
        return 'access OK for '.Yii::$app->user->identity->username.' !';
        //return Yii::$app->params['user.passwordResetTokenExpire'];
    }

    public function actionOptions ()
    {
        if (Yii::$app->getRequest()->getMethod() !== 'OPTIONS') {
            Yii::$app->getResponse()->setStatusCode(405);
        }
        $options = $this->_verbs;
        Yii::$app->getResponse()->getHeaders()->set('Allow', implode(', ', $options));
    }


    public function actionLogin()
    {
        $params = Yii::$app->getRequest()->getBodyParams();
        $supportedClients = Yii::$app->params['clients'];

        if (!isset($params['client_id']) or !isset($supportedClients[$params['client_id']]))
            throw new \yii\web\ForbiddenHttpException('Request Not allowed.');

        $model = new LoginForm();
        if ($model->load($params, '') && $model->login()) {
            return [
                'user' => [ 
                    'name' => Yii::$app->user->identity->username,
                    'access_token' => Yii::$app->user->identity->authKey,
                ],
            ];
        } else {
            $model->validate();
            return $model;
        }
    }


    public function actionLogout()
    {
        $user = User::findIdentity(Yii::$app->user->id);
        $user->generateAuthKey();

        if ($user->save() === false) {
            throw new ServerErrorHttpException('Failed to logout for unknown reason.');
        }

        Yii::$app->getResponse()->setStatusCode(204);
    }


    public function actionSignup()
    {
        $params = Yii::$app->getRequest()->getBodyParams();
        $supportedClients = Yii::$app->params['clients'];

        if (!isset($params['client_id']) or !isset($supportedClients[$params['client_id']]))
            throw new \yii\web\ForbiddenHttpException('Request Not allowed.');

        $model = new SignupForm();
        if ($model->load($params, '') && $user = $model->signup()) {
            if (Yii::$app->getUser()->login($user)) {
                return [
                    'user' => [ 
                        'name' => Yii::$app->user->identity->username,
                        'access_token' => Yii::$app->user->identity->authKey,
                    ],
                ];
            }
            else throw new ServerErrorHttpException('Failed for unknown reason.');
        }
        else {
            $model->validate();
            return $model;
        }
    }


    public function actionRequestPasswordReset()
    {
        $params = Yii::$app->getRequest()->getBodyParams();
        $supportedClients = Yii::$app->params['clients'];

        if (!isset($params['client_id']) or !isset($supportedClients[$params['client_id']]))
            throw new \yii\web\ForbiddenHttpException('Request Not allowed.');

        $model = new PasswordResetRequestForm();
        if ($model->load($params, '') && $model->validate()) {
            if ($model->sendEmail()) {
                return ['success' => 'Check your email for further instructions.'];
            }
            else throw new ServerErrorHttpException('Sorry, we are unable to reset password for email provided.');
        }
        else {
            $model->validate();
            return $model;
        }
    }

    public function actionResetPassword()
    {
        $params = Yii::$app->getRequest()->getBodyParams();
        $token = isset($params['token']) ? $params['token'] : null;
        $supportedClients = Yii::$app->params['clients'];

        if (!isset($params['client_id']) or !isset($supportedClients[$params['client_id']]))
            throw new \yii\web\ForbiddenHttpException('Request Not allowed.');

        try {
            $model = new ResetPasswordForm($token);
        } catch (InvalidParamException $e) {
            throw new BadRequestHttpException($e->getMessage());
        }

        if ($model->load(Yii::$app->getRequest()->getBodyParams(), '') && $model->validate() && $model->resetPassword()) {
            return ['success' => 'New password was saved.'];
        } else {
            $model->validate();
            return $model;
        }
    }

}