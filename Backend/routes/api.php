<?php

use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\FavoriteController;
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

Route::post("/user/activite",[ActiviteController::class, 'addActivityUser']);

Route::delete("/user/{userId}",[UserController::class, 'deleteUser']);

Route::get('/activite', [ActiviteController::class, 'getAllActivities']);
//


Route::put('/activite/{activiteId}', [ActiviteController::class, 'modifyActivity']);

Route::delete('/activite/{activiteId}', [ActiviteController::class, 'deleteActivityById']);

Route::get('/activite/search', [ActiviteController::class, 'getActivityByDayTime']);

Route::get('/activite/search', [ActiviteController::class, 'getActivityBySeason']);

Route::get('/activite/search', [ActiviteController::class, 'getActivitybyType']);

Route::get('/activite/search', [ActiviteController::class, 'getActivityByName']);


// Conversation

Route::get('/messagerie/conversation/{userB}', [ConversationController::class, 'getConversationBySender']);

Route::post('/messagerie/conversation', [ConversationController::class, 'sendMessage']);


// Likes 

Route::post('/activite/{activiteId}/likes', [LikeController::class, 'addtoActivitybyUserId']);

Route::delete('activite/{activiteId}/likes', [LikeController::class, 'deletelikeActivityByUser']);

Route::get('/activite/likes', [LikeController::class, 'getAllFromUserById']);


// Follows

Route::post('/follow', [FollowController::class, 'addFollowAUser']);

Route::delete('/follow/{followedId}', [FollowController::class, 'deleteFollow']);

Route::get('/followers', [FollowController::class, 'getfollowers']);

Route::get('/followings', [FollowController::class, 'getfollowings']);

//Favorites

Route::post('/favorite', [FavoriteController::class, 'addActivityToFavorite']);

Route::get('/favorite/{user}', [FavoriteController::class, 'getAllFavoriteActivites']);

Route::delete('/favorite/{activityId}', [FavoriteController::class, 'deleteFavoriteActivity']);


// Comments
Route::post('/activity/{activityId}/comments', [ActiviteController::class, 'addCommentToActivity']);

Route::get('/user/{userId}/activites/comments', [ActiviteController::class, 'test']);

Route::get('/activity/{activityId}/comments', [ActiviteController::class, 'getActivityWithComments']);


// Login 
Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');;



