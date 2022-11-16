<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use League\Glide\Server;

trait ImageTrait
{

    /**
     * @param UploadedFile $photo
     * @param string|null $directoryKey
     * @return bool|string
     */
    public function uploadedImages(UploadedFile $photo, ?string $directoryKey = 'images.default'): bool|string
    {
        return $photo->store(config($directoryKey));
    }

    /**
     * @param string $path
     * @param array $attributes
     * @return string
     */
    public function generateImageUrl(string $path, array $attributes = [
        'w' => 40,
        'h' => 40,
        'fit' => 'crop'
    ]): string
    {
        return URL::to(App::make(Server::class)->fromPath($path, $attributes));
    }
}
