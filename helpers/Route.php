<?php

use Illuminate\Support\Facades\Route;

if (!function_exists("link_active")) {
    function link_active(string $name, string...$add): string
    {
        if (strrpos($name, ".") !== false)
            return Route::currentRouteName() === $name ? "active" : "";

        $link_name = ["$name.index", "$name.create", "$name.edit", "$name.show","$name.trash"];
        if (!empty($add)) $link_name = array_merge($link_name, $add);

        return in_array(Route::currentRouteName(), $link_name) ? "active" : "";
    }
}

if (!function_exists("index_link")) {
    function index_link(string $name, array $param = []): string
    {
        if (strrpos($name, ".") !== false){
            return empty($param) ? route($name) : route($name, $param);
        }
        return route("$name.index", $param);
    }
}

if (!function_exists("group_active")) {
    function group_active(string...$name): string
    {
        $link_name = [];
        foreach ($name as $item) {
            if (strrpos($item, ".") !== false) {
                $link_name[] = $item;
                continue;
            }
            array_push($link_name, "$item.index", "$item.create", "$item.edit", "$item.show");
        }
        return in_array(Route::currentRouteName(), $link_name) ? "active" : "";
    }
}
