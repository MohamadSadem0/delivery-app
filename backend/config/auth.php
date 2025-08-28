<?php

// return [
//     'defaults' => [
//        'guard' => 'api',
//     'passwords' => 'users',
//     ],

//     'guards' => [
//         'web' => [
//             'driver' => 'session',
//             'provider' => 'users',
//         ],'api' => [
//         'driver'   => 'jwt',     // <- use JWT driver
//         'provider' => 'users',
//     ],
//     ],

//     'providers' => [
//         'users' => [
//             'driver' => 'eloquent',
//             'model' => env('AUTH_MODEL', default: App\Domain\User\Models\User::class),
//         ],

//     ],
    
//     'passwords' => [
//         'users' => [
//             'provider' => 'users',
//             'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
//             'expire' => 60,
//             'throttle' => 60,
//         ],
//     ],
//     'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

// ];




return [

    'defaults' => [
        'guard' => 'api',
        'passwords' => 'users',
    ],

    'guards' => [
        'web' => [
            'driver'   => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver'   => 'jwt', // tymon/jwt-auth
            'provider' => 'users',
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            // IMPORTANT: point to your actual model namespace
            'model'  => App\Domain\User\Models\User::class,
            // (If you really want to make it overridable via env:)
            // 'model'  => env('AUTH_MODEL', App\Domain\User\Models\User::class),
        ],
    ],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table'    => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire'   => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];
