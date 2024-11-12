<?php

namespace App\Http\Controllers\todo;

use App\Models\todo\Todo;

use App\Http\Controllers\Controller;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Requests\todo\TodoFilterRequest;
use App\Http\Requests\todo\TodoRequest;
use App\Http\Resources\todo\TodoResources;

class TodoController extends Controller
{
    public function __construct()
    {
        $this->middleware([AuthMiddleware::class]);
    }

    /**
     * Get all user todo list
     * 
     * this endpoint will give all user todo list  
     * 
     * @response App\Http\Resources\todo\TodoResources
     * 
     */
    public function index(TodoFilterRequest $todoFilterRequest)
    {
        return TodoResources::collection(
            $todoFilterRequest->user()->todos()
               ->dateRangeFilter($todoFilterRequest->input("fromt"),$todoFilterRequest->input("to"))
               ->isCompleted($todoFilterRequest->input("is_completed"))
               ->paginate()
        );
    }

    /**
     * Store new Todo list 
     * 
     * this endpoint will give all user todo list  
     * 
     * @response App\Http\Resources\todo\TodoResources
     * 
     */
    public function store(TodoRequest $todoRequest)
    {
        $user= $todoRequest->user();
        $todo = $user->todos()->create($todoRequest->validated());
        return new TodoResources($todo);
    }

    /**
     * This use to show detail of user todo 
     */
    public function show(Todo $todo)
    {
         return new TodoResources($todo);
    }

    /**
     * this is use to update user todo
     */
    public function update(TodoRequest $todoRequest, Todo $todo)
    {
        $todo->update($todoRequest->validated());
         return new TodoResources($todo);
    }

}
