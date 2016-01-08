<?php

namespace app\auth\models;

use Yii;

/**
 * This is the model class for table "session".
 *
 * @property integer $id
 * @property integer $user_id
 * @property string $auth_key
 * @property boolean $retained 
 * @property integer $created_at
 * @property integer $updated_at
 *
 * @property User $user
 */
class Session extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'session';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'auth_key'], 'required'],
            [['user_id'], 'integer'],
            [['auth_key'], 'unique'],
            [['retained'], 'boolean'],
            [['auth_key'], 'string', 'max' => 45]
        ];
    }

    public function behaviors()
    {
        return [
            \yii\behaviors\TimestampBehavior::className(),
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'auth_key' => 'Auth Key',
            'retained' => 'Retained',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }

    public function isValid()
    {
        $expire = $this->retained ? Yii::$app->params['retained_authKeyExpire'] : Yii::$app->params['authKeyExpire'];
        return $this->created_at + $expire >= time();
    }

    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }
}
