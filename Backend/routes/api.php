<?php

use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\LikeController;
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

Route::get('/activite', [ActiviteController::class, 'getAllActivities']);

Route::put('/activite/{activiteId}', [ActiviteController::class, 'modifyActivity']);

Route::delete('/activite/{activiteId}', [ActiviteController::class, 'deleteActivityById']);

Route::get('/activite/search', [ActiviteController::class, 'getActivityByDayTime']);

Route::get('/activite/search', [ActiviteController::class, 'getActivityBySeason']);

Route::get('/activite/search', [ActiviteController::class, 'getActivitybyType']);

Route::get('/activite/search', [ActiviteController::class, 'getActivityByName']);


Route::get('/messagerie/conversation/{userA}/{userB}', [ConversationController::class, 'conversation']);

Route::post('/messagerie/conversation', [ConversationController::class, 'sendMessage']);


Route::post('/user/{userId}/activite/{activiteId}/likes', [LikeController::class, 'AddtoActivitybyUserId']);

Route::delete('/user/{userId}/activite/{activiteId}/likes', [LikeController::class, 'DeletelikeActivityByUser']);

Route::get('/user/{userId}/activite/likes', [LikeController::class, 'getAllFromUserById']);


