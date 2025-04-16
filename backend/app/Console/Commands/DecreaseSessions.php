<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DecreaseSessions extends Command
{
    protected $signature = 'sessions:decrease';
    protected $description = 'Decrease user sessions based on today\'s detections every 15 minutes';

    public function handle()
    {
        $today = Carbon::today();

        // Fetch unique user_ids detected today, ignoring null/unknowns
        $userIds = DB::table('your_detection_table_name')
            ->whereDate('timestamp', $today)
            ->whereNotNull('user_id')
            ->where('user_id', '!=', 'User') // Assuming 'User' is the default string for unknowns
            ->pluck('user_id')
            ->unique();

        foreach ($userIds as $userId) {
            DB::table('users')
                ->where('id', $userId)
                ->decrement('sessions');
        }

        $this->info("Decremented sessions for " . count($userIds) . " users.");
    }
}
