<?php

namespace app\api\modules\v1\controllers;

use yii\rest\ActiveController;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;

class TagController extends ActiveController
{
	public function behaviors()
	{
	    return ArrayHelper::merge([
	        [
	            'class' => Cors::className(),
	            'cors' => [
	                'Origin' => ['*'],
	                'Access-Control-Request-Method' => ['GET'],
	                'Access-Control-Request-Headers' => ['*'],
	            ],
	        ],
	    ], parent::behaviors());
	}

    public $modelClass = 'app\models\Tag';
    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'data',
    ];
}