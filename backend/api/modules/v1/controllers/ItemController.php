<?php

namespace app\api\modules\v1\controllers;

use yii\rest\ActiveController;
use app\models\ItemSearch;

class ItemController extends ActiveController
{
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