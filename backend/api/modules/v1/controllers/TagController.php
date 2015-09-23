<?php

namespace app\api\modules\v1\controllers;

use app\rest\ActiveController;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\web\BadRequestHttpException;
use yii\web\ServerErrorHttpException;

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
    public $reservedParams = ['sort','q'];

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

		$searchByAttr['TagSearch'] = $search;

		$searchModel = new \app\models\TagSearch();    
        return $searchModel->search($searchByAttr);     
	}

}