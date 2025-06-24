<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $existingSuperAdmin = User::where('role', 'super_admin')->first();
        
        if (!$existingSuperAdmin) {
            User::create([
                'name' => 'System Administrator',
                'email' => 'admin@system.gov.tz',
                'password' => Hash::make('AdminPass123!'), 
                'role' => 'super_admin',
                'user_id' => User::generateUserId('super_admin'),
                'created_by' => null,
                'email_verified_at' => now(),
            ]);
            
            $this->command->info('Super Admin created successfully!');
        } else {
            $this->command->info('Super Admin already exists.');
        }
    }
}
