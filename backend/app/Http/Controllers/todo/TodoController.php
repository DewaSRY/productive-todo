<?php

namespace App\Http\Controllers\todo;

use App\data\Cuartel;
use App\Models\todo\Todo;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;


use App\Http\Controllers\Controller;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Requests\todo\TodoFilterRequest;
use App\Http\Requests\todo\TodoRequest;
use App\Http\Requests\todo\HeatMapTodoRequest;
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
               ->priority($todoFilterRequest->priority)
               ->searchName($todoFilterRequest->title)
               ->latest()
               ->paginate($todoFilterRequest->limit)
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

    /**
     * This endpoint use to delete todo
     */
    public function destroy(Todo $todo){
        $todo->delete();
        return response()->noContent();
    }

    /**
     * toggle the todo complition
     */
    public function togglComplition(Todo $todo){
        $todo->is_completed= !$todo->is_completed;
        $todo->save();
        return new TodoResources($todo);
    }

    /**
     * Get todo data formatted for a heatmap interface.
     * 
     * this is the response 
     *  [
     *    {
     *      "name": "Week 1",
     *      "series": [
     *          {
     *              "name": "Sun", 
     *              "value": 3
     *          },
     *          {
     *              "name": "Mon", 
     *              "value": 5
     *          }
     *      ]
     *    }
     * ]
     * 
     * @group Todo
     * @bodyParam cuartel string required The property used to filter data by quarter. Example: "Q2"
     * @bodyParam year string required The year to filter todos by. Example: "2024"
     * 
     * @response '[ { "name": "Week 1", "series": [ { "name": "Sun", "value": 3 }, { "name": "Mon", "value": 5 } ] } ]'
     * 
     * @param HeatMapTodoRequest $request
     * @return [
     *  {
     *      name: string,
     *      series: [
     *          {
     *              name: string, 
     *              value: number
     *          }
     *      ]
     *  }
     * ]
     */
    public function getTodoCalenderHeatMap(HeatMapTodoRequest $request)
    {
        $cuartel = Cuartel::$data[$request->cuartel];
        
        $startDate = Carbon::createFromFormat('m-d-Y', $cuartel["startAt"] . '-' . $request->year);
        $endDate = Carbon::createFromFormat('m-d-Y', $cuartel["endAt"] . '-' . $request->year);
        
        $daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        $calendarData = [];
        $weekStartDate = $startDate->copy(); 
        
        while ($weekStartDate->lte($endDate)) {
            $series = [];

            foreach ($daysOfWeek as $day) {
                $dayDate = $weekStartDate->copy()->modify("next $day");
                
                if ($dayDate->lte($endDate)) {
                    $count = Todo::whereDate('created_at', $dayDate->format('Y-m-d'))->count();
                } else {
                    $count = 0; 
                }
                
                $series[] = [
                    'name' => $day,
                    'value' => $count
                ];
            }

            $calendarData[] = [
                'name' => "Week " . $weekStartDate->weekOfYear,
                'series' => $series
            ];

            $weekStartDate->addWeek();
        }

        return response()->json($calendarData);
    }
}
