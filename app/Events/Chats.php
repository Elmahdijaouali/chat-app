<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;


class Chats  implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $user_id ; 
    public $chat ; 

    public function __construct($user_id , $chat)
    {
        $this->user_id = $user_id ; 
        $this->chat = $chat ; 
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("Chats.$this->user_id"),
        ];
    }

    public function broadcastWith(): array
    {
        $this->chat->receiver = User::find($this->chat->receiver_id)->id != $this->user_id  ? User::find($this->chat->receiver_id) : User::find($this->chat->sender_id) ;
        $this->chat->receiver->avatar= asset('storage/'. $this->chat->receiver->avatar);
        return [
           'chat' => $this->chat 
        ];
    }
}
