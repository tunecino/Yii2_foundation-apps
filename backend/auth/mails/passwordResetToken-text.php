<?php

/* @var $this yii\web\View */
/* @var $user common\models\User */

$params = Yii::$app->getRequest()->getBodyParams();           
$resetLink = Yii::$app->params['clients'][$params['client_id']]['reset_link'] . $user->password_reset_token ;
?>
Hello <?= $user->username ?>,

Follow the link below to reset your password:

<?= $resetLink ?>
