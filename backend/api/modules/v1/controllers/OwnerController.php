<?php

namespace app\api\modules\v1\controllers;

use yii\rest\ActiveController;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\web\BadRequestHttpException;

class OwnerController extends ActiveController
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

    public $modelClass = 'app\models\Owner';
    public $reservedParams = ['sort','q','expand','fields'];

    public function actions() {

		$actions = parent::actions();
		$actions['index']['prepareDataProvider'] = [$this, 'indexDataProvider'];

		return $actions;
	}

	public function indexDataProvider() {

		$params = \Yii::$app->request->queryParams;

		$model = new $this->modelClass;
		$modelAttr = $model->attributes;

		$search = [];

		if (!empty($params)) {
			foreach ($params as $key => $value) {
				if(!is_scalar($key) or !is_scalar($value)) {
					throw new BadRequestHttpException('Bad Request');
				}
				if (!in_array(strtolower($key), $this->reservedParams) 
					&& ArrayHelper::keyExists($key, $modelAttr, false)) {
					$search[$key] = $value;
				}
			}
		}

		$searchByAttr['OwnerSearch'] = $search;

		$searchModel = new \app\models\searches\OwnerSearch();    
        return $searchModel->search($searchByAttr);     
	}

}