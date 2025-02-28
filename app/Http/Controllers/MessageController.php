<?php

namespace App\Http\Controllers;

use App\Events\Messanger;
use App\Events\WriteMessage ;
use App\Models\Message;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

     
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request )
    {

        $sender_id = Auth::user()->id ; 
        $chat_id = $request->chat_id ;

        // check if have file in message send 
        if($request->hasFile('fileMessage') && !is_null($request->fileMessage ) ){

          $fileMessagePath = $request->file('fileMessage')->store("fileMessages" , 'public');

          if(strlen($request->message) > 0 ){
            $message = Message::create([
                'message' => $request->message , 
                'file' =>$fileMessagePath  , 
                'chat_id' => $chat_id , 
                "sender_id" => $sender_id 
            ]);  
          }else{
            $message = Message::create([
                'file' =>$fileMessagePath  , 
                'chat_id' => $chat_id , 
                "sender_id" => $sender_id 
            ]);  
          }

       

        }else{
            $message = Message::create([
                'message' => $request->message , 
                'chat_id' => $chat_id , 
                "sender_id" => $sender_id 
            ]);
        }
    

        if(!is_null($message->file)){
            $message->file = asset('/storage/'.$message->file);
        }
        broadcast(new Messanger($chat_id , $message ) );

        return redirect()->route('chats.show', ['id' => $chat_id] );

    }

    public function write(Request $request) {
        $chat_id = $request->chat_id ; 
        $user_write_id = $request->user()->id ;   
        $is_write=$request->is_write ; 
        $user_show_write_id = Chat::find($chat_id)->sender_id == $user_write_id ? Chat::find($chat_id)->receiver_id : Chat::find($chat_id)->sender_id  ;
  
        broadcast(new WriteMessage($chat_id , $user_show_write_id , $is_write) );

    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
