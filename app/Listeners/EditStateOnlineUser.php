<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\OnlineUserEvent;
// use App\Models\User;

class EditStateOnlineUser
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(OnlineUserEvent $event): void
    {
        
           $user = $event->user ; 
           if($event->state === 'online'){
            $user->is_online = true ;    
           }else{
              $user->is_online = false ;  
           }
           $user->save(); 

    }
}
