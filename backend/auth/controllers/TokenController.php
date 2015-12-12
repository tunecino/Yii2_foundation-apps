<?php

namespace app\auth\controllers;

use Yii;
use yii\web\ServerErrorHttpException;
//use yii\web\BadRequestHttpException;
use app\auth\models\Session;

class TokenController extends \yii\rest\Controller
{
    private $_verbs = ['POST', 'GET', 'OPTIONS'];

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => \yii\filters\auth\HttpBearerAuth::className(),
            'except' => ['options'],
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

    public function actionRefresh()
    {
        $params = Yii::$app->getRequest()->getBodyParams();
        $access_token = Yii::$app->security->generateRandomString();
        $expire = Yii::$app->params['accessTokenExpire'];

        $cache = Yii::$app->cache;
        if ($cache->add($access_token, ['id' => Yii::$app->user->identity->id], $expire) === false)
            throw new ServerErrorHttpException('Failed for unknown reason.');

        return [
            'token' => [
                'access_token' => $access_token,
                'expires_at' => time() + $expire,
            ]
        ];
    }

    public function actionRevoke()
    {
        $params = Yii::$app->getRequest()->getBodyParams();
        $cache = Yii::$app->cache;
        $token = isset($params['token']) ? $params['token'] : null;

        if ($token) $cache->delete($token);

        $authHeader = Yii::$app->getRequest()->getHeaders()->get('Authorization');
        $session = Session::findOne(['auth_key' => substr($authHeader,7)]);

        if (!$session or $session->delete() === false) {
            throw new ServerErrorHttpException('Failed for unknown reason.');
        }

        Yii::$app->getResponse()->setStatusCode(200);
    }

    protected function checkClientAccess()
    {
        $params = Yii::$app->getRequest()->getBodyParams();
        $supportedClients = Yii::$app->params['clients'];
        if (!isset($params['client_id']) or !isset($supportedClients[$params['client_id']]))
            throw new \yii\web\ForbiddenHttpException('Request Not allowed.');
    }

}