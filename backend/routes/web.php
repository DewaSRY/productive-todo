<?php

use Illuminate\Support\Facades\Route;
use Dedoc\Scramble\Scramble;

Route::get('/', function () {
    return redirect("/api");
});


Scramble::registerUiRoute('api');
Scramble::registerJsonSpecificationRoute('api.json');