<?php

namespace app\api\modules\v1\controllers;

class TagController extends NestedActiveController
{
    public $modelClass = 'app\models\Tag';
    public $relationAttribute = 'tagIds';
    public $relations  = [
    	'images' => 'image_id',
    	'owner'  => 'owner_id'
    ];
    public $searchClass = [
        'prefix'=>'TagSearch',
        'class'=>'app\models\searches\TagSearch',
    ];

}