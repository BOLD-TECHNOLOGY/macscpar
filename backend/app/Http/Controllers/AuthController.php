<?php

namespace App\Http\Controllers;
use App\Models\User; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register (Request $request){
        
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $fields['password'] = Hash::make($fields['password']);
        $fields['role'] = 'user';

        $fields['user_id'] = User::generateUserId($fields['role']);

        $user = User::create($fields);

        $token = $user->createToken($request->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken,
            'dashboard_route' => $user->getDashboardRoute()
        ];
    }

    public function adminRegister(Request $request)
    {
        $currentUser = $request->user();
        
        if (!$currentUser) {
            return response([
                'message' => 'Unauthenticated. Please login first.'
            ], 401);
        }
        
        if (!method_exists($currentUser, 'getAllowedRolesToCreate')) {
            return response([
                'message' => 'User role management not properly configured.'
            ], 500);
        }
        
        $allowedRoles = $currentUser->getAllowedRolesToCreate();
        
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'role' => 'required|in:' . implode(',', $allowedRoles)
        ]);

        if (!$currentUser->canCreateRole($fields['role'])) {
            return response([
                'message' => 'You are not authorized to create this role'
            ], 403);
        }

        $fields['password'] = Hash::make($fields['password']);
        $fields['created_by'] = $currentUser->id;

        $fields['user_id'] = User::generateUserId($fields['role']);
        
        $user = User::create($fields);

        return [
            'user' => $user,
            'message' => ucfirst(str_replace('_', ' ', $fields['role'])) . ' created successfully'
        ];
    }

    public function login (Request $request){
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'errors' => [
                    'email' => ['Invalid credentials']
                ]
            ];
        }

        $token = $user->createToken($user->name);
        return [
            'user' => $user,
            'token' => $token->plainTextToken,
            'dashboard_route' => $user->getDashboardRoute()
        ];
    }

    public function logout (Request $request){
        
        $request->user()->tokens()->delete();
        return [
            'message' => 'Logged out successfully'
        ];
    }
}