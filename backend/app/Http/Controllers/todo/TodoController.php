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
        $this->middleware([AuthMiddleware::class])
            ->only(["store", "update"]);
    }

    /**
     * @OA\Get(
     *      path="/api/todos",
     *      operationId="getTodos",
     *      tags={"Todos"},
     *      summary="Get list of todos",
     *      description="Returns paginated list of todos with optional filters",
     *      @OA\Parameter(
     *          name="from",
     *          in="query",
     *          required=false,
     *          description="Start date for filtering",
     *          @OA\Schema(type="string", format="date")
     *      ),
     *      @OA\Parameter(
     *          name="to",
     *          in="query",
     *          required=false,
     *          description="End date for filtering",
     *          @OA\Schema(type="string", format="date")
     *      ),
     *      @OA\Parameter(
     *          name="is_completed",
     *          in="query",
     *          required=false,
     *          description="Filter by completion status",
     *          @OA\Schema(type="boolean")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="App\Http\Resources\todo\TodoResources")
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized"
     *      )
     * )
     */
    public function index(TodoFilterRequest $todoFilterRequest)
    {

        return TodoResources::collection(
            Todo::query()
               ->dateRangeFilter($todoFilterRequest->input("fromt"),$todoFilterRequest->input("to"))
               ->isCompleted($todoFilterRequest->input("is_completed"))
               ->paginate()
        );

    }

    /**
     * @OA\Post(
     *      path="/api/todos",
     *      operationId="createTodo",
     *      tags={"Todos"},
     *      summary="Create a new todo",
     *      description="Creates a new todo item for the authenticated user",
     *      security={{"bearerAuth": {}}},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="App\Http\Requests\todo\TodoRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Todo created successfully",
     *          @OA\JsonContent(ref="App\Http\Resources\todo\TodoResources")
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized"
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Validation error"
     *      )
     * )
     */
    public function store(TodoRequest $todoRequest)
    {
        $user= $todoRequest->user();
        $todo = $user->todos()->create($todoRequest->validated());
        return new TodoResources($todo);
    }

    /**
     * @OA\Get(
     *      path="/api/todos/{id}",
     *      operationId="getTodoById",
     *      tags={"Todos"},
     *      summary="Get a specific todo",
     *      description="Returns a specific todo item by ID",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID of the todo to retrieve",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Todo retrieved successfully",
     *          @OA\JsonContent(ref="App\Http\Resources\todo\TodoResources")
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Todo not found"
     *      )
     * )
     */
    public function show(Todo $todo)
    {
         return new TodoResources($todo);
    }
    
    /**
     * @OA\Put(
     *      path="/api/todos/{id}",
     *      operationId="updateTodo",
     *      tags={"Todos"},
     *      summary="Update a specific todo",
     *      description="Updates an existing todo item",
     *      security={{"bearerAuth": {}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID of the todo to update",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="App\Http\Requests\todo\TodoRequest")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Todo updated successfully",
     *          @OA\JsonContent(ref="App\Http\Resources\todo\TodoResources")
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Todo not found"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized"
     *      )
     * )
     */
    public function update(TodoRequest $todoRequest, Todo $todo)
    {
        $todo->update($todoRequest->validated());
         return new TodoResources($todo);
    }

}
