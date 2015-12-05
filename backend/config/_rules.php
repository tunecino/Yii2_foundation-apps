<?php

$nestedPatterns = [
    'GET,HEAD {id}' => 'view',
    'GET,HEAD' => 'index',
    '{id}' => 'options',
    '' => 'options',
];
$nestedExtraPatterns = [
    'PUT,PATCH,DELETE {id}' => 'relationships',
    'DELETE' => 'relationships',
];

return [
    /**
     *   0 sublevels Nested Resources
     */
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => [
            'owners' => 'v1/owner',
            'images' => 'v1/image',
            'tags'   => 'v1/tag',
        ],
        // 'extraPatterns' => ['GET test' => 'test']
    ],
    /**
     *   1 sublevels nested resources.
     */
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['tags' => 'v1/tag', 'owners' => 'v1/owner'],
        'prefix' => 'images/<image_id:\d+>',
        'patterns' => $nestedPatterns,
        'extraPatterns' => $nestedExtraPatterns,
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['images' => 'v1/image', 'owners' => 'v1/owner'],
        'prefix' => 'tags/<tag_id:\d+>',
        'patterns' => $nestedPatterns,
        'extraPatterns' => $nestedExtraPatterns,
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['images' => 'v1/image', 'tags' => 'v1/tag'],
        'prefix' => 'owners/<owner_id:\d+>',
        'patterns' => $nestedPatterns,
        'extraPatterns' => $nestedExtraPatterns,
    ],
    /**
     *   2 sublevels nested resources.
     */
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['tags' => 'v1/tag'],
        'prefix' => 'owners/<owner_id:\d+>/images/<image_id:\d+>',
        'patterns' => $nestedPatterns,
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['images' => 'v1/image'],
        'prefix' => 'owners/<owner_id:\d+>/tags/<tag_id:\d+>',
        'patterns' => $nestedPatterns,
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['owners' => 'v1/owner'],
        'prefix' => 'images/<image_id:\d+>/tags/<tag_id:\d+>',
        'patterns' => $nestedPatterns,
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['tags' => 'v1/tag'],
        'prefix' => 'images/<image_id:\d+>/owners/<owner_id:\d+>',
        'patterns' => $nestedPatterns,
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['owners' => 'v1/owner'],
        'prefix' => 'tags/<tag_id:\d+>/images/<image_id:\d+>',
        'patterns' => $nestedPatterns,
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['images' => 'v1/image'],
        'prefix' => 'tags/<tag_id:\d+>/owners/<owner_id:\d+>',
        'patterns' => $nestedPatterns,
    ],
    /**
     *   authentication
     */
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['auth'  => 'v1/auth'],
        'patterns' => [
            'POST login' => 'login',
            'GET logout' => 'logout',
            'OPTIONS login' => 'options',
            'OPTIONS logout' => 'options',
        ]
    ],
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['account' => 'auth/default'], 
        'patterns' => [
            'GET test'  => 'test',
            'GET logout'  => 'logout',
            'POST login'  => 'login',
            'POST signup' => 'signup',
            'POST req-reset-pass' => 'request-password-reset',
            'POST reset-pass' => 'reset-password',
        ],
    ],
];