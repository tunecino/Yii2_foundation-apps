<?php

return [
    /**
     *   0 sublevels Nested Resources
     */
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => [
            'owners' => 'v1/owner',
            'images' => 'v1/image',
            'tags' => 'v1/tag',                        
        ],
    ],
    /**
     *   1 sublevels nested resources.
     */
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['tags' => 'v1/tag', 'owners' => 'v1/owner'],
        'prefix' => 'images/<image_id:\d+>',
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['images' => 'v1/image', 'owners' => 'v1/owner'],
        'prefix' => 'tags/<tag_id:\d+>',
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['images' => 'v1/image', 'tags' => 'v1/tag'],
        'prefix' => 'owners/<owner_id:\d+>',
    ],
    /**
     *   2 sublevels nested resources.
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
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['owners' => 'v1/owner'],
        'prefix' => 'images/<image_id:\d+>/tags/<tag_id:\d+>',
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['tags' => 'v1/tag'],
        'prefix' => 'images/<image_id:\d+>/owners/<owner_id:\d+>',
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['owners' => 'v1/owner'],
        'prefix' => 'tags/<tag_id:\d+>/images/<image_id:\d+>',
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['images' => 'v1/image'],
        'prefix' => 'tags/<tag_id:\d+>/owners/<owner_id:\d+>',
    ],
];