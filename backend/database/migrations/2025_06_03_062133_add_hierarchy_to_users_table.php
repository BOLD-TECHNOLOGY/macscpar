<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', [
                'super_admin', 
                'igp', 
                'state_officer', 
                'regional_officer', 
                'district_officer', 
                'local_officer',
                'ngo_officer',
                'user'
            ])->default('user');

            $table->string('user_id')->unique();
            $table->string('phone')->nullable();
            $table->string('position')->nullable();
            $table->string('department')->nullable();
            $table->string('status')->default('active');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropColumn([ 'role', 'phone', 'position', 'department', 'status', 'created_by']);
        });
    }
};
