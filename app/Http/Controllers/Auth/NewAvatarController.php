<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth ; 
use Illuminate\Support\Facades\Storage ;
use Inertia\Inertia;

class NewAvatarController extends Controller
{
    public function update(Request $request){

        if($request->hasFile('avatar')){
            $user = Auth::user() ;

            // delete last avatar :
            $deletedAvatar = Storage::delete($user->avatar);

            if($deletedAvatar){
                $newAvatar = $request->file('avatar')->store('avatars' , 'public');
                $user->avatar = $newAvatar ;
            }  

            $user->save();
            
            return Inertia::render('app' );

        }
        

    }
}
