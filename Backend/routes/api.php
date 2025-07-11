<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get("/user",[UserController::class, 'getUserList']);


Route::post("/user",[UserController::class, 'addUser']);

Route::delete("/user/{userId}",[UserController::class, 'deleteUser']);