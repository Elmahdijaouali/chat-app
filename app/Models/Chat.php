<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Message ; 

class Chat extends Model
{

    protected $fillable =[ 'sender_id' , 'receiver_id'] ; 
   
  
    public function messages(){
        return $this->hasMany(Message::class) ; 
    }
    public function receiver(){
        return $this->belongsTo(User::class);
    }
}
