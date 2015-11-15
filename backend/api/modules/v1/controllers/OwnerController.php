<?php

namespace app\api\modules\v1\controllers;

class OwnerController extends NestedActiveController
{
    public $modelClass = 'app\models\Owner';
    public $relationAttribute = 'OwnerIds';
    public $relations  = [
    	'image_id' => 'images',
    	'tag_id' => 'tags'
    ];
    public $searchClass = [
        'prefix'=>'OwnerSearch',
        'class'=>'app\models\searches\OwnerSearch',
    ];

}