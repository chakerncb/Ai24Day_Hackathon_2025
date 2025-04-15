<?php

namespace App\Http\Controllers;

use App\Models\reception;
use Illuminate\Http\Request;

class ReceptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $reception = reception::all();
        if ($reception->isEmpty()) {
            return response()->json([
                'message' => 'No reception found',
            ], 404);
        }
        return response()->json([
            'reception' => $reception,
        ])->setStatusCode(200, 'Reception found');
    }

    public function store(Request $request)
    {
        //

        // $request->validate([
        //     'full_name' => 'required|string|max:255',
        //     'phone_number' => 'required|string|max:15',
        //     'password' => 'required|string|min:8',
        //     'age' => 'required|integer|min:1',
        //     'gender' => 'required|string|in:male,female,other',
        //     'email_address' => 'required|email|unique:receptions,email_address',
        //     'id_admin' => 'required|integer|exists:admins,id',
        // ]);

        $reception = reception::create([
            'full_name' => $request->full_name,
            'phone_number' => $request->phone_number,
            'password' => bcrypt($request->password),
            'age' => $request->age,
            'gender' => $request->gender,
            'email_address' => $request->email_address,
            'id_admin' => $request->id_admin,
        ]);

        return response()->json([
            'message' => 'Reception created successfully',
            'reception' => $reception,
        ], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $reception = reception::find($id);
        if (!$reception) {
            return response()->json([
                'message' => 'Reception not found',
            ], 404);
        }
        return response()->json([
            'reception' => $reception,
        ])->setStatusCode(200, 'Reception found');
    }

    public function update(Request $request, string $id)
    {
        //
        $reception = reception::find($id);
        if (!$reception) {
            return response()->json([
                'message' => 'Reception not found',
            ], 404);
        }
        // $request->validate([
        //     'full_name' => 'sometimes|string|max:255',
        //     'phone_number' => 'sometimes|string|max:15',
        //     'password' => 'sometimes|string|min:8',
        //     'age' => 'sometimes|integer|min:1',
        //     'gender' => 'sometimes|string|in:male,female,other',
        //     'email_address' => 'sometimes|email|unique:receptions,email_address,' . $id,
        //     'id_admin' => 'sometimes|integer|exists:admins,id',
        // ]);

        if ($request->has('password')) {
            $request->merge(['password' => bcrypt($request->password)]);
        }

        $reception->update($request->all());

        return response()->json([
            'message' => 'Reception updated successfully',
            'reception' => $reception,
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $reception = reception::find($id);
        if (!$reception) {
            return response()->json([
                'message' => 'Reception not found',
            ], 404);
        }
        $reception->delete();
        return response()->json([
            'message' => 'Reception deleted successfully',
        ], 200);
    }
}
