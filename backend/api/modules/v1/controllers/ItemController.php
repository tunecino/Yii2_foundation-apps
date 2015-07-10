<?php

namespace app\api\modules\v1\controllers;

use yii\rest\ActiveController;
use app\models\ItemSearch;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;

class ItemController extends ActiveController
{
	public function behaviors()
	{
	    return ArrayHelper::merge([
	        [
	            'class' => Cors::className(),
	            'cors' => [
	                'Origin' => ['*'],
	                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
	                'Access-Control-Request-Headers' => ['*'],
	            ],
	        ],
	    ], parent::behaviors());
	}

    public $modelClass = 'app\models\Item';
    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'data',
    ];

    public function actions() {

		$actions = parent::actions();
		$actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

		return $actions;
	}

	public function prepareDataProvider() {

	    $searchModel = new ItemSearch();    
        return $searchModel->search(\Yii::$app->request->queryParams);
	}
}