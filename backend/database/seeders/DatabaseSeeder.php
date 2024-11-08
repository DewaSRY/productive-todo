<?php

namespace Database\Seeders;

use App\Models\todo\Todo;
use App\Models\User;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            "email"=> "newuser@example.com"
        ]);
        User::factory(9)->create();

        $users= User::all();
        foreach($users as $user){
            Todo::factory(10)->create([
                'user_id' => $user->id,
            ]);
        }

        

    }
}
