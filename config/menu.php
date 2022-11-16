<?php
return [
    [
        "icon" => "home",
        "title" => "menu.home",
        "title_small" => "menu.home",
        "path" => "user_home",
        "pathOther" => [],
        "permission" => "ROLE_DASHBOARD_MENU",
        "hr" => true
    ],
    [
        "icon" => "admin_panel_settings",
        "title" => "menu.users",
        "title_small" => "menu.users",
        "path" => "users",
        "pathOther" => [
            "password_reset.index"
        ],
        "permission" => "ROLE_USERS_MENU",
        "hr" => true
    ]
];
