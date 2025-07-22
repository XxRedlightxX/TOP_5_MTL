<?php

use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LikeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Service\FollowService;

Route::get("/user",[UserController::class, 'getUserList']);

Route::get('/user/search', [UserController::class, 'getUserByEmail']);


// routes/api.php
Route::get('/utilisateur/{user}/activites', [UserController::class, 'index']);

Route::post("/user",[UserController::class, 'addUser']);

Route::put('/user/{userId}', [UserController::class, 'modifyUser']);

Route::post("/user/{userId}/activite",[UserController::class, 'addActivityUser']);

Route::delete("/user/{userId}",[UserController::class, 'deleteUser']);

Route::get('/activite', [ActiviteController::class, 'getAllActivities']);
//
Route::post('/utilisateur/{userId}/activity/{activityId}/comments', [ActiviteController::class, 'addCommentToActivity']);

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

Route::post('/user/{userId}/follow/', [FollowController::class, 'follow']);

Route::get('/user/{userId}/follow/', [FollowController::class, 'followers']);

Route::get('/user/{userId}/followers', [FollowController::class, 'followers']);

Route::get('/user/{userId}/activites/comments', [ActiviteController::class, 'test']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout']);



