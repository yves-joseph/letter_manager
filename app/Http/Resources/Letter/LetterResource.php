<?php

namespace App\Http\Resources\Letter;

use App\Http\Enumerations\Activated;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

/**
 * @property string $subject
 * @property string $sender_full_name
 * @property string $recipient_full_name
 * @property Carbon $receive_at
 * @property string $email
 * @property int $id
 */
class LetterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            $this->sender_full_name,
            $this->recipient_full_name,
            $this->subject,
            $this->receive_at->format("d/m/y à h:i"),
            [
                "show" => route('letters.show', ['letter' => $this->id]),
                "edit" => route('letters.edit', ['letter' => $this->id]),
                "delete" => route('letters.destroy', ['letter' => $this->id])
            ]
        ];
    }
}
