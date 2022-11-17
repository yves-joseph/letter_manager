<?php

namespace App\Models;

use App\Http\Enumerations\LetterType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class Letter extends Model
{
    use HasFactory;

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
        "type" => LetterType::class
    ];
}
