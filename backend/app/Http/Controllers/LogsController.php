<?php

namespace App\Http\Controllers;

use App\Models\recognition_log;
use App\Models\users_log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LogsController extends Controller
{
    //

    public function index(Request $request)
    {

        $logs = recognition_log::all();

        if ($logs->isEmpty()) {
            return response()->json([
                'message' => 'No logs found',
            ], 404);
        }

        return response()->json( $logs )->setStatusCode(200, 'Logs found');
          
    }


        
}
