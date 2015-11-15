<?php

namespace app\api\modules\v1\controllers;

use yii;
use yii\rest\ActiveController;
use yii\helpers\ArrayHelper;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;

class NestedActiveController extends ActiveController
{
    public $modelClass;
    public $relationAttribute;
    public $relations;
    public $searchClass;

    public $reservedParams = ['sort','q','expand','fields'];
    public $validateNested = ['view'];

    public function init()
    {
        parent::init();
        if ($this->relationAttribute === null) {
            throw new InvalidConfigException('The "relationAttribute" property must be set.');
        }
        if ($this->relations === null) {
            throw new InvalidConfigException('The "relations" property must be set.');
        }
        if ($this->searchClass === null) {
            throw new InvalidConfigException('The "searchClass" property must be set.');
        }
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Expose-Headers' => [
                    // Calulated links
                    'Link',
                    // Pagination
                    'X-Pagination-Current-Page',
                    'X-Pagination-Page-Count',
                    'X-Pagination-Per-Page',
                    'X-Pagination-Total-Count'
                ],
                // Allow OPTIONS caching
                'Access-Control-Max-Age' => 3600,
            ],
        ];
        return $behaviors;
    }

    public function beforeAction($action) {
        if (!parent::beforeAction($action)) return false;
        foreach ($this->validateNested as $action) {
            if ($this->action->id === $action) {
                if ($this->indexDataProvider()->getTotalCount() === 0)
                    throw new NotFoundHttpException("Object not found");
            }
        }
        return true;
    }


    public function actionLink($id = '')
    {
        $ids = preg_split('/\s*,\s*/', $id, -1, PREG_SPLIT_NO_EMPTY);
        $verb = Yii::$app->request->method;
        $queryParams = Yii::$app->request->queryParams;
        $modelClass = new $this->modelClass;
        $linked = false;

        foreach ($queryParams as $key => $value) 
        {
            if(!is_scalar($key) or !is_scalar($value))
                throw new BadRequestHttpException('Bad Request');

            else if (in_array(strtolower($key), $this->relations)) 
            {
                $name = array_search($key, $this->relations);
                $relation = $modelClass->getRelation($name);

                if ($relation !== null) 
                {
                    $relatedModelClass = new $relation->modelClass;
                    $relatedModel = $relatedModelClass::findOne($value);

                    if (is_null($relatedModel)) throw new NotFoundHttpException("Object not found: $value");

                    if ($relation->multiple === false)
                    {
                        if (isset($relatedModel->{$this->relationAttribute}) && is_array($relatedModel->{$this->relationAttribute}))
                        {
                            // one_to_many relation
                            if ($verb === 'PATCH') {
                                $relatedModel->{$this->relationAttribute} = array_merge($relatedModel->{$this->relationAttribute}, $ids);
                                if ($relatedModel->save() === false && !$model->hasErrors())
                                    throw new \yii\web\ServerErrorHttpException('Failed to link objects for unknown reason.');
                                $linked = true;
                            }
                            else throw new \yii\web\ForbiddenHttpException('Not allowed due to objects relation nature');
                        }
                    }

                    else if ($relation->multiple === true && $relation->via !== null)
                    {
                        // many_to_many relation
                        if ($verb === 'PUT') $relatedModel->{$this->relationAttribute} = $ids;
                        else if ($verb === 'PATCH') $relatedModel->{$this->relationAttribute} = array_merge($relatedModel->{$this->relationAttribute}, $ids);
                        else if ($verb === 'DELETE') {
                            if (empty($ids)) $relatedModel->{$this->relationAttribute} = $ids;
                            else {
                                $newIds = array_values(array_diff($relatedModel->{$this->relationAttribute}, $ids));
                                $relatedModel->{$this->relationAttribute} = $newIds;
                            }
                        }

                        if ($relatedModel->save() === false && !$model->hasErrors())
                            throw new \yii\web\ServerErrorHttpException('Failed to link objects for unknown reason.');
                        $linked = true;
                    }
                }
            }
        }
        $linked === true ? Yii::$app->Response->setStatusCode(204) : Yii::$app->Response->setStatusCode(304);
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
                else if (in_array(strtolower($key), $this->relations)) {
                    $search[$key] = $value;
                }
            }
        }
        $searchModel = new $this->searchClass['class'];    
        return $searchModel->search([$this->searchClass['prefix'] => $search]);     
    }

}