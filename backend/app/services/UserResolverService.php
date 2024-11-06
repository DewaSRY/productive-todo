<?php

namespace App\services;

use App\Models\User;
use Illuminate\Http\Request;

class UserResolverService
{
    
    public function storeUser(?User $user, Request $request): User | null
    {
        if(!$user) return null;
        $request->setUserResolver(fn()=> $user);
        return $user;
    }

    public function removeUser(Request $request) 
    {
        $request->setUserResolver(fn()=> null);
    }

}
