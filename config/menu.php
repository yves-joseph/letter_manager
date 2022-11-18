<?php
return [
    [
        "icon" => "dashboard",
        "title" => "menu.home",
        "title_small" => "menu.home",
        "path" => "user_home",
        "pathOther" => [],
        "permission" => "ROLE_DASHBOARD_MENU",
        "hr" => true
    ],
    [
        "icon" => "supervised_user_circle",
        "title" => "menu.users",
        "title_small" => "menu.users",
        "path" => "users",
        "pathOther" => [
            "password_reset.index"
        ],
        "permission" => "ROLE_USERS_MENU",
        "hr" => true
    ],
    [
        "icon" => "home_repair_service",
        "title" => "menu.services",
        "title_small" => "menu.services",
        "path" => "services",
        "pathOther" => [
        ],
        "permission" => "ROLE_SERVICES_MENU",
        "hr" => true
    ],
    [
        "icon" => "mark_email_unread",
        "title" => "menu.letters",
        "title_small" => "menu.letters",
        "path" => "letters",
        "pathOther" => [
        ],
        "permission" => "ROLE_LETTERS_MENU",
        "hr" => true
    ]
];
