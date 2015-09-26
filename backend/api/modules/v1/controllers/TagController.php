<?php

namespace app\api\modules\v1\controllers;

use yii;
use yii\rest\ActiveController;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;

class TagController extends ActiveController
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

    public $modelClass = 'app\models\Tag';
    public $searchClass = [
    	'prefix'=>'TagSearch',
    	'class'=>'app\models\searches\TagSearch',
    ];
    public $reservedParams   = ['sort','q','expand','fields'];
    public $relationalParams = ['image_id', 'owner_id'];
    public $checkNestedIds   = ['view','create','update','delete'];

    public function beforeAction($action) {
		if (!parent::beforeAction($action)) return false;
		foreach ($this->checkNestedIds as $action) {
    		if ($this->action->id === $action) {
    			if ($this->indexDataProvider()->getTotalCount() === 0)
					throw new NotFoundHttpException("Object not found");
    		}
    	}
		return true;
	}

    public function actions() {

		$actions = parent::actions();
		$actions['index']['prepareDataProvider'] = [$this, 'indexDataProvider'];
		return $actions;
	}

	public function indexDataProvider() {

		$params = Yii::$app->request->queryParams;
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
				else if (in_array(strtolower($key), $this->relationalParams)) {
					$search[$key] = $value;
				}
			}
		}
		$searchModel = new $this->searchClass['class'];    
        return $searchModel->search([$this->searchClass['prefix'] => $search]);     
	}

}