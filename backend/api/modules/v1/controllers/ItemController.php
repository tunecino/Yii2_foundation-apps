<?php

namespace app\api\modules\v1\controllers;

use yii\rest\ActiveController;

class ItemController extends ActiveController
{
    public $modelClass = 'app\models\Item';
    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'data',
    ];
}