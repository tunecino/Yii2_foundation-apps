<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model app\models\Owner */

$this->title = 'Create Owner';
$this->params['breadcrumbs'][] = ['label' => 'Owners', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="owner-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
