<?php
use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $user common\models\User */

$params = Yii::$app->getRequest()->getBodyParams();           
$resetLink = Yii::$app->params['clients'][$params['client_id']]['reset_link'] . $user->password_reset_token ;
?>
<div class="password-reset">
    <p>Hello <?= Html::encode($user->username) ?>,</p>

    <p>Follow the link below to reset your password:</p>

    <p><?= Html::a(Html::encode($resetLink), $resetLink) ?></p>
</div>
