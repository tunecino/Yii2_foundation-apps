<?php

namespace app\api\modules\v1\controllers;

use yii\rest\ActiveController;

class TagController extends ActiveController
{
    public $modelClass = 'app\models\Tag';
    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'data',
    ];
}