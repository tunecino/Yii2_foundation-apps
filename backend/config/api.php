<?php
 
$db     = require(__DIR__ . '/db.php');
$params = require(__DIR__ . '/params.php');
 
$config = [
    'id' => 'basic',
    'name' => 'TimeTracker',
    // Need to get one level up:
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'components' => [
        'request' => [
            // Enable JSON Input:
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => false,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                     // Create API log in the standard log dir
                     // But in file 'api.log':
                    'logFile' => '@app/runtime/logs/api.log',
                ],
            ],
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => [
                [
                    'class' => 'yii\rest\UrlRule', 
                    'controller' => [
                        'images' => 'v1/image',
                        'tags' => 'v1/tag',                        
                    ],
                    // 'extraPatterns' => [
                    //     //'GET {id}/test' => 'test',
                    // ],
                ],
                [
                    'class' => 'yii\rest\UrlRule', 
                    'controller' => [
                        'tags' => 'v1/tag',
                    ],
                    'prefix' => 'images/<imageId:\d+>',
                ],
            ],
        ], 
        'db' => $db,
    ],
    'modules' => [
        'v1' => [
            'basePath' => '@app/api/modules/v1',
            'class' => 'app\api\modules\v1\Module',
        ],
    ],
    'params' => $params,
];
 
return $config;