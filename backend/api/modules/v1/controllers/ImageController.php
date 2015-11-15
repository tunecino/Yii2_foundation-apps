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

}