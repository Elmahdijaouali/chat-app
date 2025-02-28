<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Chat;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('Messages.{chat_id}', function ($user , $chat_id) {
    return Chat::where("id" , $chat_id)
                 ->where(function ($query) use($user ) {
                    $query->where('sender_id' , $user->id )
                           ->orWhere('receiver_id' , $user->id );
                 })->exists();
});


// should be change this not forget!!!!!!
Broadcast::channel('Chats.{user_id}', function ($user_id) {
    return  true  ;
});

Broadcast::channel('Users', function () {
    return  true  ;
});


// just for now test
Broadcast::channel('WriteMessage.{chat_id}', function ($user , $chat_id  ) {   
    $chat = Chat::findOrFail($chat_id);
    return  $user->id == $chat->sender_id || $user->id == $chat->receiver_id  ;
});