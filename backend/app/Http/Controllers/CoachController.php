<?php

namespace App\Http\Controllers;

use App\Models\coach;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controller;

class CoachController extends Controller 
{
    //

    // function __construct()
    // {
    //     $this->middleware('auth:sanctum');
    // }

    public function index()
    {
        $coach = coach::all();

        if ($coach->isEmpty()) {
            return response()->json([
                'message' => 'No coach found',
            ], 404);
        }
        return response()->json([
            'coach' => $coach,
        ])->setStatusCode(200, 'Coach found');
        
    }

    public function show($id)
    {
        $coach = coach::find($id);

        if (!$coach) {
            return response()->json([
                'message' => 'Coach not found',
            ], 404);
        }

        return response()->json([
            'coach' => $coach,
        ])->setStatusCode(200, 'Coach found');
    }

    public function store(Request $request)
    {
        $coach = coach::create([
            'id_coach' => $request->input('id_coach'),
            'full_name' => $request->input('full_name'),
            'phone_number' => $request->input('phone_number'),
            'age' => $request->input('age'),
            'gender' => $request->input('gender'),
            'email_address' => $request->input('email_address'),
        ]);

        if (!$coach) {
            return response()->json([
                'message' => 'Coach not created',
            ], 500);
        }

        return response()->json([
            'message' => 'Coach created successfully',
        ]);
    }

    public function update(Request $request, $id)
    {
        $coach = coach::find($id);

        if (!$coach) {
            return response()->json([
                'message' => 'Coach not found',
            ], 404);
        }

        $coach->update($request->only([
            'id_coach',
            'full_name',
            'phone_number',
            'age',
            'gender',
            'email_address'
        ]));

        return response()->json([
            'message' => 'Coach updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $coach = coach::find($id);

        if (!$coach) {
            return response()->json([
                'message' => 'Coach not found',
            ], 404);
        }

        $coach->delete();

        return response()->json([
            'message' => 'Coach deleted successfully',
        ]);
    }

}
