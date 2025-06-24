<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'user_id',
        'phone',
        'position',
        'department',
        'status',
        'created_by',
    ];

    public static function generateUserId($role)
    {
        $roleCodes = [
            'super_admin' => 'SA',
            'igp' => 'IO',
            'state_officer' => 'SO',
            'regional_officer' => 'RO',
            'district_officer' => 'DO',
            'local_officer' => 'LO',
            'ngo_officer' => 'NG',
            'user' => 'SR'
        ];
        
        do {
            $randomNumber = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
            $userId = 'TZ-CPR-' . $randomNumber . '-' . $roleCodes[$role];
        } while (self::where('user_id', $userId)->exists());
        
        return $userId;
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Role checking methods
    public function isSuperAdmin()
    {
        return $this->role === 'super_admin';
    }

    public function isIGP()
    {
        return $this->role === 'igp';
    }

    public function isStateOfficer()
    {
        return $this->role === 'state_officer';
    }

    public function isRegionalOfficer()
    {
        return $this->role === 'regional_officer';
    }

    public function isDistrictOfficer()
    {
        return $this->role === 'district_officer';
    }

    public function isLocalOfficer()
    {
        return $this->role === 'local_officer';
    }

    public function isNgoOfficer()
    {
        return $this->role === 'ngo_officer';
    }

    public function isPublicUser()
    {
        return $this->role === 'user';
    }

    // Relationships
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function createdUsers()
    {
        return $this->hasMany(User::class, 'created_by');
    }

    // Permission system - what roles can this user create
    public function canCreateRole($role)
    {
        $permissions = [
            'super_admin' => ['igp', 'state_officer'],
            'igp' => ['state_officer', 'regional_officer'],
            'state_officer' => ['regional_officer', 'district_officer'],
            'regional_officer' => ['district_officer'],
            'district_officer' => ['local_officer', 'ngo_officer', 'user'],
        ];

        return isset($permissions[$this->role]) && in_array($role, $permissions[$this->role]);
    }

    // Get allowed roles for this user to create
    public function getAllowedRolesToCreate()
    {
        $permissions = [
            'super_admin' => ['igp', 'state_officer'],
            'igp' => ['state_officer'],
            'state_officer' => ['regional_officer'],
            'regional_officer' => ['district_officer'],
            'district_officer' => ['local_officer', 'ngo_officer', 'user'],
        ];

        return $permissions[$this->role] ?? [];
    }

    // Get dashboard route based on role
    public function getDashboardRoute()
    {
        $routes = [
            'super_admin' => '/super-admin',
            'igp' => '/igp',
            'state_officer' => '/state-officer',
            'regional_officer' => '/regional-officer',
            'district_officer' => '/district-officer',
            'local_officer' => '/local_officer',
            'ngo_officer' => '/ngo_officer',
            'user' => '/user',
        ];

        return $routes[$this->role] ?? '/user';
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
