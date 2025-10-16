<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie','storage/*',  'broadcasting/auth',],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3000', '*','http://127.0.0.1:3000'], // Vue dev server

    'allowed_origins_patterns' => ['*'],

    'allowed_headers' => ['*'],

    'exposed_headers' => ['*'],

    'max_age' => 0,

    'supports_credentials' => true, // Use true if you're using cookies/auth
];
