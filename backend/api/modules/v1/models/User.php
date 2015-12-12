<?php
namespace app\api\modules\v1\models;

use Yii;
use yii\base\Object;
use yii\web\IdentityInterface;

class User extends Object implements IdentityInterface
{
    public $id;

    public function getId()
    {
        return $this->id;
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        $cache = Yii::$app->cache;
        $user = $cache->get($token);
        if ($user !== null && isset($user['id'])) return new static($user);
        return null;
    }

    public static function findIdentity($id) {}
    public function getAuthKey() {}
    public function validateAuthKey($authKey) {}
    public function generateAuthKey() {}

}