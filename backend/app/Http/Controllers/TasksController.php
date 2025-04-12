<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controller;

class TasksController extends Controller 
{
    //

    // function __construct()
    // {
    //     $this->middleware('auth:sanctum');
    // }

    public function index()
    {
        $tasks = Task::all();

         return response()->json([
            'tasks' => $tasks,
        ]);
    }

    public function show($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found',
            ], 404);
        }

        return response()->json([
            'task' => $task,
        ])->setStatusCode(200, 'Task found');
    }

    public function store(Request $request)
    {
        $task = Task::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'status' => $request->input('status'), 
            'user_id' => $request->input('user_id'),
            'deadline' => $request->input('deadline'),
        ]);

        if (!$task) {
            return response()->json([
                'message' => 'Task not created',
            ], 500);
        }

        return response()->json([
            'message' => 'Task created successfully',
        ]);
    }

    public function update(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found',
            ], 404);
        }

        $task->update($request->all());

        return response()->json([
            'message' => 'Task updated successfully',
        ]);
    }

    public function destroy($id){
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found',
            ], 404);
        }

        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully',
        ]);
    }

}
