<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WriteMessage  implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $chat_id ; 
    public $user_show_write_id;
    public $is_write ;
    public function __construct($chat_id , $user_show_write_id , $is_write )
    {
        $this->chat_id = $chat_id ; 
        $this->user_show_write_id = $user_show_write_id ;
        $this->is_write = $is_write ; 
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('WriteMessage.'.$this->chat_id ),
        ];
    }
}
