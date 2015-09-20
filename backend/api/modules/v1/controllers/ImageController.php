<?php

namespace app\api\modules\v1\controllers;

use app\rest\ActiveController;
use app\models\ImageSearch;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;

class ImageController extends ActiveController
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

    public $modelClass = 'app\models\Image';
    public $serializer = [
        'class' => 'app\rest\Serializer',
        'collectionEnvelope' => 'images',
    ];

    public function actions() {

		$actions = parent::actions();
		$actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

		return $actions;
	}

	public function prepareDataProvider() {

	    $searchModel = new ImageSearch();    
        return $searchModel->search(\Yii::$app->request->queryParams);
	}
}