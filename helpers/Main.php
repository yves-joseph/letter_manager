<?php
/**
 * @author    Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link      https://github.com/Koroph
 * @license   MIT
 * @copyright Copyright (c) 2020.
 */

use App\Http\Services\SentenceInitial;
use Illuminate\Support\Facades\App;

if (!function_exists('dataNotNullable')) {
    function dataNotNullable(array $data): array
    {
        return array_filter($data, function ($item) {
            return !is_null($item);
        });
    }
}
if (!function_exists('none')) {

    function none(): string
    {
        return __('action.not_defined');
    }
}


if (!function_exists('currency')) {
    function currency(float $number): string
    {
        App::setLocale('fr');
        return number_format($number, 2, ',', '.');
    }
}

if (!function_exists('isDark')) {
    function isDark(): bool
    {
        return isset($_COOKIE[\App\Http\Enumerations\Theme::NAME->value]) && $_COOKIE[\App\Http\Enumerations\Theme::NAME->value] === \App\Http\Enumerations\Theme::DARK->value;
    }
}

if (!function_exists('wordInitial')) {
    function wordInitial($name): string
    {
        $si = new SentenceInitial($name);
        $color = $si->getInitialRGB();
        $_color = $si->getInitialNextRGB();
        $initial = $si->getInitial();
        if (!is_null($initial))
            return '<div class="image_profile-initial" style="background: linear-gradient(45deg,' . $color . ',' . $_color . ');">
                    <strong>' . $initial . '</strong>
                 </div>';
        else return "";
    }
}


if (!function_exists('image_path')) {
    /**
     * @param string $path
     * @param string|null $attrs (w=100&h=100&fit=12)
     * @return string
     */
    function image_path(string $path, ?string $attrs = null): string
    {
        $__path = "/images/$path";

        if (!is_null($attrs)) $__path .= "?$attrs";

        return $__path;
    }
}
if (!function_exists('tr_img')) {

    function tr_img(array $attrs): string
    {
        return "img##" . json_encode($attrs);
    }
}
if (!function_exists('tr_a')) {

    //inner
    function tr_a(array $attrs): string
    {
        return "a##" . json_encode($attrs);
    }
}

if (!function_exists('tr_b')) {

    //state url on off
    function tr_b(array $attrs): string
    {
        return "b##" . json_encode($attrs);
    }
}

if (!function_exists('tr_html')) {

    function tr_html(string $content): string
    {
        return "html##" . $content;
    }
}

if (!function_exists('load_svg')) {

    //state url on off
    function load_svg(string $raw): string
    {
        return "data:image/svg+xml;utf8,$raw";
    }
}

if (!function_exists('load_img')) {

    //state url on off
    function load_img($blob, string $type): string
    {
        return "data:image/$type;charset=utf8;base64," . base64_encode($blob);
    }
}
if (!function_exists('checkedMenu')) {

    //state url on off
    function checkedMenu(array $data): array
    {
        $___data = config('role', []);

        for ($i = 0; $i < count($___data); $i++) {

            for ($j = 0; $j < count($___data[$i]['value']['value']); $j++) {

                $___data[$i]['value']['value'][$j]['checked'] = in_array($___data[$i]['value']['value'][$j]['value'], $data);
            }

        }
        return $___data;
    }
}
