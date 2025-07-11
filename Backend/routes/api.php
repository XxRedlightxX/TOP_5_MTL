<?php

use App\Http\Controllers\ConversationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get("/user",[UserController::class, 'getUserList']);

Route::get('/user/search', [UserController::class, 'getUserByEmail']);


// routes/api.php
Route::get('/utilisateur/{user}/activites', [UserController::class, 'index']);

Route::post("/user",[UserController::class, 'addUser']);

Route::put('/user/{userId}', [UserController::class, 'modifyUser']);

Route::post("/user/{userId}/activite",[UserController::class, 'addActivityUser']);

Route::delete("/user/{userId}",[UserController::class, 'deleteUser']);






Route::get('/messagerie/conversation/{userA}/{userB}', [ConversationController::class, 'conversation']);


Route::post('/messagerie/conversation', [ConversationController::class, 'sendMessage']);

