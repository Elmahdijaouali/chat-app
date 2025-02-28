<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Messanger implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message ; 
    public $chat_id ; 
    /**
     * Create a new event instance.
     */
    public function __construct( $chat_id ,  $message )
    {
 
        $this->chat_id = $chat_id ;
        $this->message = $message ;
        
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        
        return [
            new PrivateChannel('Messages.'.$this->chat_id ),
        ];
    }

    public function broadcastWith() :array {
        if(!is_null($this->message->file)){
            $this->message->file = env('APP_URL', 'http://localhost').':'.env('APP_PORT', '8000').'/storage/'.$this->message->file ;
        }
        return [
            "chat_id" => $this->chat_id , 
             "message" => $this->message
        ];
    }
}
