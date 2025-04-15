<?php

namespace App\Http\Controllers;

use App\Models\trainee;
use Illuminate\Http\Request;

class TraineeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $trainee = trainee::all();

        if ($trainee->isEmpty()) {
            return response()->json([
                'message' => 'No trainee found',
            ], 404);
        }

        return response()->json([
            'trainee' => $trainee,
        ])->setStatusCode(200, 'Trainee found');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $trainee = trainee::create([
            'id_trainer' => $request->input('id_trainer'),
            'full_name' => $request->input('full_name'),
            'phone_number' => $request->input('phone_number'),
            'age' => $request->input('age'),
            'session_numbers' => $request->input('session_numbers'),
            'start_membership' => $request->input('start_membership'),
            'end_membership' => $request->input('end_membership'),
            'id_reception' => $request->input('id_reception'),
        ]);
        return response()->json([
            'message' => 'Trainee created successfully',
            'trainee' => $trainee,
        ], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //

        $trainee = trainee::find($id);
        if (!$trainee) {
            return response()->json([
                'message' => 'Trainee not found',
            ], 404);
        }
        return response()->json([
            'trainee' => $trainee,
        ])->setStatusCode(200, 'Trainee found');
    }

 
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $trainee = trainee::find($id);
        if (!$trainee) {
            return response()->json([
                'message' => 'Trainee not found',
            ], 404);
        }
        $trainee->update($request->only([
            'id_trainer',
            'full_name',
            'phone_number',
            'age',
            'session_numbers',
            'start_membership',
            'end_membership',
            'id_reception',
        ]));
        return response()->json([
            'message' => 'Trainee updated successfully',
            'trainee' => $trainee,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $trainee = trainee::find($id);
        if (!$trainee) {
            return response()->json([
                'message' => 'Trainee not found',
            ], 404);
        }
        $trainee->delete();
        return response()->json([
            'message' => 'Trainee deleted successfully',
        ], 200);
    }
}
