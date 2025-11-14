<?php

use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\Events\MessageSent;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LikeController;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Service\FollowService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast; 

// User m
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/users",[UserController::class, 'getUserList']);

Route::get('/user/search', [UserController::class, 'getUserByEmail']);

Route::post('/user/profile-picture', [UserController::class, 'updateProfilePicture']);

Route::get('/utilisateur/{user}/activites', [UserController::class, 'index']);

Route::get('/user/search', [UserController::class, 'getUserBySearchUser']);

Route::post("/user",[UserController::class, 'addUser']);

Route::delete("/user/{userId}",[UserController::class, 'deleteUser']);

Route::put('/user/{userId}', [UserController::class, 'modifyUser']);

Route::options('/user/activite', function () {
    return response()->json();
});

// Activities
Route::post("/user/activite", [ActiviteController::class, 'addActivityUser']);

Route::get('/activite/latest', [ActiviteController::class, 'getNewestActivitiesbyCreationDate']);

Route::get('/activite', [ActiviteController::class, 'getAllActivities']);

Route::get('/user/activite', [ActiviteController::class, 'getUserActivities']);

Route::get('/activite/test', [ActiviteController::class, 'getUpcomingActivities']);

Route::get('/activite/{activityId}', [ActiviteController::class, 'getAvgRatingActiviy'])->whereNumber('activityId');

Route::get('/likedActivities', [ActiviteController::class, 'getActivitiesMostLiked']);

Route::get('/categories', [ActiviteController::class, 'getActivitiesCategories']);

// Multi-filtrage fonctionnel
Route::get('/activite/filtrer', [ActiviteController::class, 'getActivityFilters']);

Route::post('/activite/{activiteId}', [ActiviteController::class, 'modifyActivity']);

Route::delete('/activite/{activiteId}', [ActiviteController::class, 'deleteActivityById']);

Route::get('/activite/filter', [ActiviteController::class, 'getActivityFilter']);

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

Route::get('/favorite', [FavoriteController::class, 'getAllFavoriteActivites']);

Route::get('/isFavorite/{activityId}', [FavoriteController::class, 'IsFavoriteActivityFromUser']);

Route::delete('/favorite/{activityId}', [FavoriteController::class, 'deleteFavoriteActivity']);


// Comments
Route::post('/activity/{activityId}/comments', [ActiviteController::class, 'addCommentToActivity']);

Route::get('/user/{userId}/activites/comments', [ActiviteController::class, 'test']);

Route::get('/activity/{activityId}/comments', [ActiviteController::class, 'getActivityWithComments']);


// Login 
Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');;



Route::get('/messages/{friend}', function (User $friend,  Request $request) {
    return  Conversation::query()
        ->where(function ($query) use ($friend, $request) {
            $user = $request->user();
            $query->where('expediteur_id', $user->id)
                ->where('destinataire_id', $friend->id);
        })
        ->orWhere(function ($query) use ($friend ,$request) {
            $user = $request->user();
            $query->where('expediteur_id', $friend->id)
                ->where('destinataire_id', $user->id);
        })
       ->with(['expediteur', 'destinataire'])
       ->orderBy('id', 'asc')
       ->get();
})->middleware('auth:sanctum');;

Route::post('/messages/{friend}', function (User $friend, Request $request) {
    $message = Conversation::create([
        'expediteur_id' => $request->user()->id,
        'destinataire_id' => $friend->id,
        'contenu' => request()->input('contenu'),
        'date' => now()
    ]);

    broadcast(new MessageSent($message));

    return  $message;
})->middleware('auth:sanctum');;



