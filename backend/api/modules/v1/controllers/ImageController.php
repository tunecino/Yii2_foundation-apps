<?php

namespace app\api\modules\v1\controllers;

class ImageController extends NestedActiveController
{
    public $modelClass = 'app\models\Image';
    public $relationAttribute = 'imageIds';
    public $relations  = [
        'tags' => 'tag_id',
        'owner'  => 'owner_id'
    ];
    public $searchClass = [
        'prefix'=>'ImageSearch',
        'class'=>'app\models\searches\ImageSearch',
    ];

    public function checkAccess($action, $model = null, $params = [])
    {
        if ($action === 'update' or $action === 'delete') {
            if ($model->user_id !== \Yii::$app->user->identity->id)
                throw new \yii\web\ForbiddenHttpException('You can only '.$action.' images that you\'ve added.');
        }
    }

}