<?php

return [
    'denylist' => array_filter(explode(',', env('SECURITY_DENYLIST', ''))),
    'max_login_attempts' => (int) env('SECURITY_MAX_LOGIN_ATTEMPTS', 5),
];
