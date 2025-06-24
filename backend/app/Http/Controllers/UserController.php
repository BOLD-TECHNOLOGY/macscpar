<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers(Request $request)
    {
        try {
            $users = User::select('id', 'name', 'email', 'user_id', 'role', 'status', 'created_at')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'users' => $users
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching users',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Get single user details
    public function getUserDetails($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'user' => $user
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching user details',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Update user
    public function updateUser(Request $request, $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
                'phone' => 'sometimes|nullable|string|max:20',
                'position' => 'sometimes|nullable|string|max:255',
                'department' => 'sometimes|nullable|string|max:255',
                'role' => 'sometimes|required|string|in:super_admin,igp,state_officer,regional_officer,district_officer,local_officer,ngo_officer,user',
                'status' => 'sometimes|required|string|in:active,inactive,suspended'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user->update($request->only([
                'name', 'email', 'phone', 'position', 'department', 'role', 'status'
            ]));

            return response()->json([
                'success' => true,
                'message' => 'User updated successfully',
                'user' => $user->fresh()
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Delete user
    public function deleteUser($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }

            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Get users statistics
    public function getUserStats()
    {
        try {
            $totalUsers = User::count();
            $activeUsers = User::where('status', 'active')->count();
            $inactiveUsers = User::where('status', 'inactive')->count();
            $recentUsers = User::where('created_at', '>=', now()->subDays(30))->count();

            return response()->json([
                'success' => true,
                'stats' => [
                    'total_users' => $totalUsers,
                    'active_users' => $activeUsers,
                    'inactive_users' => $inactiveUsers,
                    'recent_users' => $recentUsers
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching user statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
