<?php
/**
 * @author    Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link      https://github.com/Koroph
 * @license   MIT
 * @copyright Copyright (c) 2020.
 */

namespace App\Http\Utils;


use App\Models\Folder;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Intervention\Image\ImageManagerStatic as ImageManager;
use Symfony\Component\HttpFoundation\File\UploadedFile;

trait FileUploader
{

    public function uploader(Request $request,
                             string  $filename,
                             int     $folder_id,
                             bool    $json = false,
                             string  $type = "image"): int|Image|null
    {
        if ($request->hasFile($filename)) {

            /**
             * @var $fileUpload UploadedFile
             */
            $fileUpload = $request->$filename;

            $fileName = Str::random(36) . '.' . $fileUpload->getClientOriginalExtension();
            /**
             * @var $folder Folder
             */
            $folder = Folder::query()->where([
                ['id', '=', $folder_id]
            ])->first();

            $path = $request->$filename->storeAs('public' . DIRECTORY_SEPARATOR . 'admin' . DIRECTORY_SEPARATOR . $folder->name, $fileName);


            if ($type === "image") {
                $fileName = DIRECTORY_SEPARATOR . Str::random(36) . '.' . $fileUpload->getClientOriginalExtension();
                if ($folder->width != $folder->height) {
                    ImageManager::make(storage_path("app" . DIRECTORY_SEPARATOR . $path))
                        ->resize($folder->width, $folder->height)
                        ->save($folder->path . DIRECTORY_SEPARATOR . $fileName, 100);
                } else {
                    ImageManager::make(storage_path("app" . DIRECTORY_SEPARATOR . $path))
                        ->resize($folder->width, $folder->height, function ($constraint) {
                            $constraint->aspectRatio();
                            // $constraint->upsize();
                        })
                        ->save($folder->path . DIRECTORY_SEPARATOR . $fileName, 100);
                }
                if (file_exists(storage_path("app" . DIRECTORY_SEPARATOR . $path))) @unlink(storage_path("app" . DIRECTORY_SEPARATOR . $path));
                //$path = $_path;
            }


            /**
             * @var $image Image
             */
            $image = Image::query()->create([
                'title' => substr($fileUpload->getClientOriginalName(), 0, strrpos($fileUpload->getClientOriginalName(), '.')),
                'url' => "/storage/admin/" . $folder->name . "/" . $fileName,
                'folder_id' => $folder->id,
            ]);

            if ($json)
                return $image;
            else
                return $image->id;
        }
        return null;
    }


    protected function editorImageUpload(Request $request): ?string
    {
        $url = null;

        foreach ($request->files as $file){
            $fileName = Str::random(36) . '.' . $file->getClientOriginalExtension() /*$extension*/
            ;
            $path = $file->storeAs('public' . DIRECTORY_SEPARATOR . 'admin' . DIRECTORY_SEPARATOR . 'article-image', $fileName);
            /**
             * @var Folder $folder
             */
            $folder = Folder::query()->firstOrCreate(['name' => "article-image"], [
                'folder_type' => "image"
            ]);
            /**
             * @var Image $image
             */
            $image = Image::query()->create([
                'title' => $file->getClientOriginalName(),
                'url' => asset(str_replace('public', 'storage', $path)),
                'folder_id' => $folder->id
            ]);
            $url = $image->url;
            break;
        }
        return $url;
    }

}
