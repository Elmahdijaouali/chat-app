<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Chat  ;
use App\Models\User  ;

class Message extends Model
{
    protected $fillable = ['message' , 'file' ,"chat_id" , "sender_id" ];
    
    public function chat(){
        return $this->belongsTo(Chat::class);
    }
    public function senderMessage(){
        return $this->belongsTo(User::class);
    }
    
}
