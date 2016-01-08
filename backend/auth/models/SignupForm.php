<?php
namespace app\auth\models;

use Yii;
use yii\base\Model;
use yii\web\ServerErrorHttpException;
use app\auth\models\User;

/**
 * Signup form
 */
class SignupForm extends Model
{
    public $username;
    public $email;
    public $password;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['username', 'filter', 'filter' => 'trim'],
            ['username', 'required'],
            ['username', 'unique', 'targetClass' => '\app\auth\models\User', 'message' => 'This username has already been taken.'],
            ['username', 'string', 'min' => 2, 'max' => 255],

            ['email', 'filter', 'filter' => 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'string', 'max' => 255],
            ['email', 'unique', 'targetClass' => '\app\auth\models\User', 'message' => 'This email address has already been taken.'],

            ['password', 'required'],
            ['password', 'string', 'min' => 4],
        ];
    }

    /**
     * Signs user up.
     *
     * @return User|null the saved model or null if saving fails
     */
    public function signup()
    {
        if ($this->validate()) {
            $user = new User();
            $user->username = $this->username;
            $user->email = $this->email;
            $user->setPassword($this->password);

            if ($user->save()) {
                $session = new Session;
                $session->user_id = $user->getPrimaryKey();
                $session->generateAuthKey();

                if ($session->save() === true) {
                    $user->auth_key = $session->auth_key;
                }
                else throw new ServerErrorHttpException('Failed for unknown reason.');

                return $user;
            }
        }

        return null;
    }
}
