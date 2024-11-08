<?php

namespace Tests\Feature\todo;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

use App\Http\Controllers\todo\TodoController;
use App\Models\User;
use App\Models\todo\Todo;

use Tests\TestCase;

class TodoControllerTest extends TestCase
{

    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    private User $user;
    private array $headers;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();

        User::factory()->create()->each(function ($user) {
            Todo::factory(10)->create([
                'user_id' => $user->id,
            ]);
        });

        $token = $this->user->createToken('TestApp')->plainTextToken;
        $this->headers = [
            'Authorization' => 'Bearer ' . $token,
        ];
    }

    /** @test */
    public function it_can_get_list_of_todos()
    {


        $response = $this->getJson('/api/todo');
        $response->assertStatus(200);
 
    }

    /** @test */
    public function it_can_create_a_new_todo()
    {
        
        $data = [
            'title' => 'New Todo',
            'description' => 'This is a new todo',
        ];

        $response = $this->postJson('/api/todo', $data, $this->headers);

        $response->assertStatus(201);
        $this->assertDatabaseHas('todos', $data);
    }

    /** @test */
    public function it_requires_authentication_to_create_a_todo()
    {
        $this->withExceptionHandling();

        $data = [
            'title' => 'Unauthorized Todo',
            'description' => 'This should fail',
        ];

        $response = $this->postJson('/api/todo', $data);

        $response->assertStatus(401);
    }

    /** @test */
    public function it_can_get_a_specific_todo()
    {
        $todo = Todo::first();

        $response = $this->getJson("/api/todo/{$todo->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'data' => [
                         'id' => $todo->id,
                         'title' => $todo->title,
                         'description' => $todo->description,
                         'is_completed' => $todo->is_completed,
                     ]
                 ]);
    }

    /** @test */
    public function it_returns_404_if_todo_not_found()
    {
        $response = $this->getJson('/api/todo/999');

        $response->assertStatus(404);
    }

    /** @test */
    public function it_can_update_a_todo()
    {
        $todo = Todo::first();

        $data = [
            'title' => 'Updated Todo Title',
            'description' => 'Updated description',
            'is_completed' => true,
        ];

        $response = $this->putJson("/api/todo/{$todo->id}", $data, $this->headers);

        $response->assertStatus(200)
                 ->assertJson([
                     'data' => [
                         'id' => $todo->id,
                         'title' => 'Updated Todo Title',
                         'description' => 'Updated description',
                         'is_completed' => true,
                     ]
                 ]);
        $this->assertDatabaseHas('todos', $data);
    }

    /** @test */
    public function it_requires_authentication_to_update_a_todo()
    {
        $this->withExceptionHandling();
    
        $todo = Todo::factory()->create([
            "user_id"=> $this->user->id
        ]);
    
        $data = [
            'title' => 'Attempted Unauthorized Update',
            'description' => 'This should fail',
            'is_completed' => true,
        ];
    
        $response = $this->putJson("/api/todo/{$todo->id}", $data);
        $response->assertStatus(401); // Expecting 401 Unauthorized response
    }
}
