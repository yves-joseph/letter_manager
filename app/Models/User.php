<?php

namespace App\Models;

use App\Http\Enumerations\Activated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;

/**
 * @mixin IdeHelperUser
 */
class User extends Authenticatable
{
    use  HasFactory,SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'phone',
        'email',
        'image_path',
        'password',
        'service_id',
        'role',
        'activated',
        'remember_token'
    ];


    protected $casts = [
        'role' => 'json',
        'activated' => Activated::class
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function setPasswordAttribute($password)
    {
        if (!$password) return;

        $this->attributes['password'] = Hash::make($password);
    }

    public function setPermissionAttribute($permission)
    {
        if (!$permission) return;
        $this->attributes['role'] = json_encode($permission);
    }

    public function setImageIdAttribute($imageId)
    {
        if (!$imageId) return;
        $this->attributes['image_id'] = (int)$imageId;
    }


    public function setImagePathAttribute($imagePath)
    {
        if (!$imagePath) return;

        $this->attributes['image_path'] = $imagePath instanceof UploadedFile ? $imagePath->store('users') : $imagePath;
    }

    public function getImagePathAttribute(): ?string
    {

        if (is_null($this->attributes['image_path'])) return null;

        return image_path($this->attributes['image_path'], "w=64&h=64&fit=12");
    }

    public function imageBySize(string $width = "64", string $height = "64"): ?string
    {

        if (is_null($this->attributes['image_path'])) return null;

        return image_path($this->attributes['image_path'], "w=$$width&h=$$height&fit=12");
    }


    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class,'service_id','id');
    }

    public function letters(): HasMany
    {
        return $this->hasMany(Letter::class, 'user_id', 'id');
    }
}
