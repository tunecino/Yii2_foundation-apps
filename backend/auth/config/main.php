<?php
 
$db     = require(__DIR__ . '/../../config/db.php');
$rules  = require(__DIR__ . '/rules.php');
$params = require(__DIR__ . '/params.php');
 
$config = [
    'id' => 'auth',
    'name' => 'Yii2 F4A & AngularJs Demo App',
    // Need to get one level up:
    'basePath' => dirname(__DIR__).'/..',
    'bootstrap' => ['log'],
    'components' => [
        'request' => [
            //'baseUrl'=>'/backend/auth',
            'class' => '\yii\web\Request',
            'enableCookieValidation' => false,
            // Enable JSON Input:
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'user' => [
            'identityClass' => 'app\auth\models\User',
            'enableSession' => false,
            'loginUrl' => null,
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'viewPath' => '@app/auth/mails',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => false,
            'transport' => [
                'class' => 'Swift_SmtpTransport',
                'host' => 'mailtrap.io',
                'username' => '5169825f5c17ba9a9',
                'password' => 'eb108f73cc23ba',
                'port' => '2525',
                'encryption' => 'tls',
            ],
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                     // Create API log in the standard log dir
                     // But in file 'api.log':
                    'logFile' => '@app/runtime/logs/auth.log',
                ],
            ],
        ],
        'urlManager' => [
            //'scriptUrl'=>'/auth/index.php',
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => $rules,
        ],
        'db' => $db,
    ],

    'modules' => [
        'auth' => [
            'basePath' => '@app/auth',
            'class' => 'app\auth\Module',
        ],
    ],

    'params' => $params,
];
 
return $config;