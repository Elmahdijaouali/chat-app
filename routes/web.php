<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\NewAvatarController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request;


Route::get('/', function () {
    
    if(Auth::check()){
       return to_route("chats.index");
    }

    return Inertia::render('index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/chats', [ChatController::class , 'index' ])->name('chats.index');
    Route::post('/chats', [ChatController::class , 'store' ])->name('chats.store');
    Route::get('/chats/{id}', [ChatController::class , 'show' ])->name('chats.show');
    Route::post('/messages', [MessageController::class , 'store' ])->name('messages.store');
    Route::post('/message/write' , [MessageController::class  , "write"])->name('message.write');
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/editAvatar', [NewAvatarController::class, 'update'] )->name('profile.avatar.update');
    // Route::patch('/profile/editAvatar',function(Request $request){
        
    // } )->name('profile.avatar.update');
});


require __DIR__.'/auth.php';
