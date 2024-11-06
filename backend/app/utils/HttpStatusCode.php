<?php

namespace App\utils;

class HttpStatusCode
{
    // Informational Responses (1xx)
    public static $HTTP_CONTINUE = 100;
    public static $HTTP_SWITCHING_PROTOCOLS = 101;
    public static $HTTP_PROCESSING = 102;

    // Successful Responses (2xx)
    public static $HTTP_OK = 200;
    public static $HTTP_CREATED = 201;
    public static $HTTP_ACCEPTED = 202;
    public static $HTTP_NON_AUTHORITATIVE_INFORMATION = 203;
    public static $HTTP_NO_CONTENT = 204;
    public static $HTTP_RESET_CONTENT = 205;
    public static $HTTP_PARTIAL_CONTENT = 206;

    // Redirection (3xx)
    public static $HTTP_MULTIPLE_CHOICES = 300;
    public static $HTTP_MOVED_PERMANENTLY = 301;
    public static $HTTP_FOUND = 302;
    public static $HTTP_SEE_OTHER = 303;
    public static $HTTP_NOT_MODIFIED = 304;
    public static $HTTP_TEMPORARY_REDIRECT = 307;
    public static $HTTP_PERMANENT_REDIRECT = 308;

    // Client Errors (4xx)
    public static $HTTP_BAD_REQUEST = 400;
    public static $HTTP_UNAUTHORIZED = 401;
    public static $HTTP_PAYMENT_REQUIRED = 402;
    public static $HTTP_FORBIDDEN = 403;
    public static $HTTP_NOT_FOUND = 404;
    public static $HTTP_METHOD_NOT_ALLOWED = 405;
    public static $HTTP_NOT_ACCEPTABLE = 406;
    public static $HTTP_PROXY_AUTHENTICATION_REQUIRED = 407;
    public static $HTTP_REQUEST_TIMEOUT = 408;
    public static $HTTP_CONFLICT = 409;
    public static $HTTP_GONE = 410;
    public static $HTTP_LENGTH_REQUIRED = 411;
    public static $HTTP_PRECONDITION_FAILED = 412;
    public static $HTTP_PAYLOAD_TOO_LARGE = 413;
    public static $HTTP_URI_TOO_LONG = 414;
    public static $HTTP_UNSUPPORTED_MEDIA_TYPE = 415;
    public static $HTTP_RANGE_NOT_SATISFIABLE = 416;
    public static $HTTP_EXPECTATION_FAILED = 417;
    public static $HTTP_UNPROCESSABLE_ENTITY = 422;
    public static $HTTP_TOO_MANY_REQUESTS = 429;

    // Server Errors (5xx)
    public static $HTTP_INTERNAL_SERVER_ERROR = 500;
    public static $HTTP_NOT_IMPLEMENTED = 501;
    public static $HTTP_BAD_GATEWAY = 502;
    public static $HTTP_SERVICE_UNAVAILABLE = 503;
    public static $HTTP_GATEWAY_TIMEOUT = 504;
    public static $HTTP_VERSION_NOT_SUPPORTED = 505;
    
    /**
     * Get a human-readable message for a status code.
     * @param int $code
     * @return string
     */
    public static function getMessage(int $code): string
    {
        $messages = [
            HttpStatusCode::$HTTP_CONTINUE => 'Continue',
            HttpStatusCode::$HTTP_SWITCHING_PROTOCOLS => 'Switching Protocols',
            HttpStatusCode::$HTTP_PROCESSING => 'Processing',
            HttpStatusCode::$HTTP_OK => 'OK',
            HttpStatusCode::$HTTP_CREATED => 'Created',
            HttpStatusCode::$HTTP_ACCEPTED => 'Accepted',
            HttpStatusCode::$HTTP_NON_AUTHORITATIVE_INFORMATION => 'Non-Authoritative Information',
            HttpStatusCode::$HTTP_NO_CONTENT => 'No Content',
            HttpStatusCode::$HTTP_RESET_CONTENT => 'Reset Content',
            HttpStatusCode::$HTTP_PARTIAL_CONTENT => 'Partial Content',
            HttpStatusCode::$HTTP_MULTIPLE_CHOICES => 'Multiple Choices',
            HttpStatusCode::$HTTP_MOVED_PERMANENTLY => 'Moved Permanently',
            HttpStatusCode::$HTTP_FOUND => 'Found',
            HttpStatusCode::$HTTP_SEE_OTHER => 'See Other',
            HttpStatusCode::$HTTP_NOT_MODIFIED => 'Not Modified',
            HttpStatusCode::$HTTP_TEMPORARY_REDIRECT => 'Temporary Redirect',
            HttpStatusCode::$HTTP_PERMANENT_REDIRECT => 'Permanent Redirect',
            HttpStatusCode::$HTTP_BAD_REQUEST => 'Bad Request',
            HttpStatusCode::$HTTP_UNAUTHORIZED => 'Unauthorized',
            HttpStatusCode::$HTTP_PAYMENT_REQUIRED => 'Payment Required',
            HttpStatusCode::$HTTP_FORBIDDEN => 'Forbidden',
            HttpStatusCode::$HTTP_NOT_FOUND => 'Not Found',
            HttpStatusCode::$HTTP_METHOD_NOT_ALLOWED => 'Method Not Allowed',
            HttpStatusCode::$HTTP_NOT_ACCEPTABLE => 'Not Acceptable',
            HttpStatusCode::$HTTP_PROXY_AUTHENTICATION_REQUIRED => 'Proxy Authentication Required',
            HttpStatusCode::$HTTP_REQUEST_TIMEOUT => 'Request Timeout',
            HttpStatusCode::$HTTP_CONFLICT => 'Conflict',
            HttpStatusCode::$HTTP_GONE => 'Gone',
            HttpStatusCode::$HTTP_LENGTH_REQUIRED => 'Length Required',
            HttpStatusCode::$HTTP_PRECONDITION_FAILED => 'Precondition Failed',
            HttpStatusCode::$HTTP_PAYLOAD_TOO_LARGE => 'Payload Too Large',
            HttpStatusCode::$HTTP_URI_TOO_LONG => 'URI Too Long',
            HttpStatusCode::$HTTP_UNSUPPORTED_MEDIA_TYPE => 'Unsupported Media Type',
            HttpStatusCode::$HTTP_RANGE_NOT_SATISFIABLE => 'Range Not Satisfiable',
            HttpStatusCode::$HTTP_EXPECTATION_FAILED => 'Expectation Failed',
            HttpStatusCode::$HTTP_UNPROCESSABLE_ENTITY => 'Unprocessable Entity',
            HttpStatusCode::$HTTP_TOO_MANY_REQUESTS => 'Too Many Requests',
            HttpStatusCode::$HTTP_INTERNAL_SERVER_ERROR => 'Internal Server Error',
            HttpStatusCode::$HTTP_NOT_IMPLEMENTED => 'Not Implemented',
            HttpStatusCode::$HTTP_BAD_GATEWAY => 'Bad Gateway',
            HttpStatusCode::$HTTP_SERVICE_UNAVAILABLE => 'Service Unavailable',
            HttpStatusCode::$HTTP_GATEWAY_TIMEOUT => 'Gateway Timeout',
            HttpStatusCode::$HTTP_VERSION_NOT_SUPPORTED => 'HTTP Version Not Supported',
        ];

        return $messages[$code] ?? 'Unknown Status Code';
    }
}