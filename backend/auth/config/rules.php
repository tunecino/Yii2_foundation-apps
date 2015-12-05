<?php

return [
    /**
     *   authentication
     */
    [
        'class' => 'yii\rest\UrlRule', 
        'controller' => ['account' => 'auth/account'], 
        'patterns' => [
            'GET test'  => 'test',
            'POST login'  => 'login',
            'GET logout'  => 'logout',
            'POST signup' => 'signup',
            'POST req-reset-pass' => 'request-password-reset',
            'POST reset-pass' => 'reset-password',
            // OPTTIONS VERBS
            'OPTIONS login' => 'options',
            'OPTIONS logout' => 'options',
            'OPTIONS signup' => 'options',
            'OPTIONS req-reset-pass' => 'options',
            'OPTIONS reset-pass' => 'options',
        ]
    ],
];