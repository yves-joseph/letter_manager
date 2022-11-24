<?php

namespace App\Http\Resources\Letter;

use App\Http\Enumerations\LetterType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property string $subject
 * @property string $sender_full_name
 * @property string $recipient_full_name
 * @property Carbon $receive_at
 * @property string $email
 * @property string $ref
 * @property LetterType $type
 * @property int $id
 */
class LetterTrashResource extends JsonResource
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
            tr_html('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" style="fill:' . ($this->pivot->is_read ?? true ? "#dee2e6" : "#000") . '"/></svg>' . $this->sender_full_name . '</span>'),
            $this->recipient_full_name,
            !empty($this->ref) ? $this->ref : 'Non défini',
            Str::limit($this->subject, 64),
            tr_html($this->type === LetterType::Send ? "<span class='icon-folder-upload' style='color: #018601;'></span>Envoyer" : "<span class='icon-folder-download' style='color: #ffc107;'></span>Réceptionner"),
            $this->receive_at->format("d/m/Y"),
            [
                "show" => route('letters.restore', ['letter' => $this->id])
            ]
        ];
    }
}
