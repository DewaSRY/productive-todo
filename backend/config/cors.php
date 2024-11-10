<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],


    'allowed_methods' => ['*'], // Allowing all HTTP methods

    'allowed_origins' => ['*'], // Allowing requests from all origins

    'allowed_origins_patterns' => [], // No specific patterns, so all are allowed

    'allowed_headers' => ['*'], // Allowing all headers

    'exposed_headers' => ['*'], // Exposing all headers

    'max_age' => 0, // No caching for preflight requests

    'supports_credentials' => true, // Not allowing credentials (cookies, etc.)

];
