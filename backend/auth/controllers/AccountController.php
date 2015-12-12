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
        ], parent::behaviors());
    }
    

    public function beforeAction($action)
    {
        if (!parent::beforeAction($action)) return false;
        if ($this->action->id !== 'options') $this->checkClientAccess();
        return true;
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
        $model = new LoginForm();

        if ($model->load($params, '') && $model->login())
        {
            $access_token = Yii::$app->security->generateRandomString();
            $expire = Yii::$app->params['accessTokenExpire'];

            $cache = Yii::$app->cache;
            if ($cache->add($access_token, ['id' => Yii::$app->user->identity->id], $expire) === false)
                throw new ServerErrorHttpException('Failed for unknown reason.');

            return [
                'user' => [ 
                    'name' => Yii::$app->user->identity->username,
                    'refresh_token' => Yii::$app->user->identity->authKey,
                    'access_token' => $access_token,
                    'expires_at' => time() + $expire,
                ]
            ];
        } 
        else {
            $model->validate();
            return $model;
        }
    }


    public function actionSignup()
    {
        $params = Yii::$app->getRequest()->getBodyParams();
        $model = new SignupForm();

        if ($model->load($params, '') && $user = $model->signup())
        {
            if (Yii::$app->getUser()->login($user))
            {

                $access_token = Yii::$app->security->generateRandomString();
                $expire = Yii::$app->params['accessTokenExpire'];

                $cache = Yii::$app->cache;
                if ($cache->add($access_token, ['id' => Yii::$app->user->identity->id], $expire) === false)
                    throw new ServerErrorHttpException('Failed for unknown reason.');

                return [
                    'user' => [ 
                        'name' => Yii::$app->user->identity->username,
                        'refresh_token' => Yii::$app->user->identity->authKey,
                        'access_token' => $access_token,
                        'expires_at' => time() + $expire,
                    ]
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
        $model = new PasswordResetRequestForm();

        if ($model->load($params, '') && $model->validate()) {
            if ($model->sendEmail()) return ['success' => 'Check your email for further instructions.'];
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

        try {
            $model = new ResetPasswordForm($token);
        } catch (InvalidParamException $e) {
            throw new BadRequestHttpException($e->getMessage());
        }

        if ($model->load(Yii::$app->getRequest()->getBodyParams(), '') && $model->validate() && $model->resetPassword()) {
            return ['success' => 'New password was saved.'];
        } 
        else {
            $model->validate();
            return $model;
        }
    }

    protected function checkClientAccess()
    {
        $params = Yii::$app->getRequest()->getBodyParams();
        $supportedClients = Yii::$app->params['clients'];
        if (!isset($params['client_id']) or !isset($supportedClients[$params['client_id']]))
            throw new \yii\web\ForbiddenHttpException('Request Not allowed.');
    }

}