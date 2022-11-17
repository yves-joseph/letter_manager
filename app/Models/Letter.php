<?php

namespace App\Models;

use App\Http\Enumerations\LetterType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;

/**
 * @mixin IdeHelperLetter
 */
class Letter extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "user_id",
        "type",
        "subject",
        "sender_full_name",
        "recipient_full_name",
        "receive_at",
        "file_path",
        "detail"
    ];

    public function setFilePathAttribute($filePath)
    {
        if (!$filePath) return;

        $this->attributes['file_path'] = $filePath instanceof UploadedFile ? $filePath->store('letters') : $filePath;
    }

    public function getFilePathAttribute(): ?string
    {

        if (is_null($this->attributes['file_path'])) return null;

        return asset("storage/" . $this->attributes['file_path']);
    }

    protected $casts = [
        "type" => LetterType::class,
        "receive_at" => "datetime"
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'users_letters', 'letter_id', 'user_id');
    }
}
