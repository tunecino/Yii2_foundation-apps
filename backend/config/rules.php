<?php

return [
    /**
     * 0 level nested resources.
     */
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => [
            'owners' => 'v1/owner',
            'images' => 'v1/image',
            'tags' => 'v1/tag',                        
        ],
        // 'extraPatterns' => [
        //     //'GET {id}/test' => 'test',
        // ],
    ],
    /**
     * 1 level nested resources.
     */
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['tags' => 'v1/tag'],
        'prefix' => 'images/<image_id:\d+>',
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['images' => 'v1/image'],
        'prefix' => 'tags/<tag_id:\d+>',
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['images' => 'v1/image'],
        'prefix' => 'owners/<owner_id:\d+>',
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['tags' => 'v1/tag'],
        'prefix' => 'owners/<owner_id:\d+>',
    ],
    /**
     * 2 levels nested resources.
     */
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['tags' => 'v1/tag'],
        'prefix' => 'owners/<owner_id:\d+>/images/<image_id:\d+>',
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['images' => 'v1/image'],
        'prefix' => 'owners/<owner_id:\d+>/tags/<tag_id:\d+>',
    ],
];