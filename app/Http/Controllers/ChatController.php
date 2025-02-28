<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Message ;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Events\Chats; 


class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
      
        $user_id =  $request->user()->id ;
         
        $users = User::where('id' ,'!=', $user_id )->get();

        $chats = Chat::where('sender_id' ,$user_id  )
                     ->orWhere('receiver_id' , $user_id )
                     ->get();

        $chats->each(function ($chat) use($user_id){
          $chat->receiver = User::find($chat->receiver_id)->id != $user_id  ? User::find($chat->receiver_id) : User::find($chat->sender_id) ; 
          $chat->last_message =Message::where('chat_id' , $chat->id )->orderBy('created_at' , 'desc')->first() ; 
          $chat->receiver['avatar'] = asset('storage/'.$chat->receiver->avatar);
        });

        $users->each(fn($user) => $user->avatar = asset('storage/'. $user->avatar)) ;
        return Inertia::render('Chat/Chats', [
           "chats" => $chats , 
           "users" => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $sender_id = Auth::user()->id ;
        $receiver_id = $request->receiver_id ;
        $user_id = Auth::user()->id; 

        $chat =Chat::where( function ($query) use($sender_id , $receiver_id){
           $query->where('sender_id' , $sender_id )->where('receiver_id' , $receiver_id) ; 
        })->orWhere( function ($query) use($sender_id , $receiver_id){
            $query->where('receiver_id' , $sender_id )->where('sender_id' , $receiver_id) ; 
         })->first();
       
       
        if(is_null($chat)){
           $chat = Chat::create([
                'sender_id' => Auth::user()->id , 
                "receiver_id" => $receiver_id
            ]);

            broadcast(new Chats( $receiver_id , $chat ));

         
        }
       
        return redirect()->route('chats.show', ['id' => $chat->id ]); 
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
       
        $chat_id = $id ; 

        $user_id =  Auth::user()->id ;

        $users = User::where('id' ,'!=', $user_id )->get();

        $chats = Chat::where('sender_id' ,$user_id  )
                     ->orWhere('receiver_id' , $user_id )
                     ->get();


         $chats->each(function ($chat) use($user_id){
                        $chat->receiver = User::find($chat->receiver_id)->id != $user_id  ? User::find($chat->receiver_id) : User::find($chat->sender_id) ; 
                        $chat->receiver['avatar'] = asset('storage/'. $chat->receiver->avatar);
                        $chat->last_message =Message::where('chat_id' , $chat->id )->orderBy('created_at' , 'desc')->first() ; 
         });
               
          
        $chat = Chat::find($chat_id);
        $receiver = User::find($chat->receiver_id)->id != $user_id  ? User::find($chat->receiver_id) : User::find($chat->sender_id) ; 
        $receiver->avatar =  asset('storage/'. $receiver->avatar);


        $messages = Message::where('chat_id' , $chat_id )->get() ; 
       
        $messages->each(function($message){
           $message->sender = User::find($message->sender_id)->first();
           if(!is_null($message->file)){
             $message->file = asset('/storage/'.$message->file);
           }
        });
       
        $users->each(fn($user) => $user->avatar = asset('storage/'. $user->avatar)) ;
        return Inertia::render('Chat/Chats', [
            "chats" => $chats , 
            "users" => $users ,
            "messages" => $messages ,
            "receiver" => $receiver ,
            "chat_id" => $chat_id
         ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chat $chat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        //
    }
}
