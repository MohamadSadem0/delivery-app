<?php

namespace App\Logging;

use Monolog\Formatter\LineFormatter;
use Monolog\Logger;

class CustomizeFormatter
{
    public function __invoke($logger)
    {
        foreach ($logger->getHandlers() as $handler) {
            $format = "[%datetime%] %channel%.%level_name% request_id=%context.request_id%: %message% %context% %extra%\n";
            $formatter = new LineFormatter($format, null, true, true);
            $handler->setFormatter($formatter);
        }
    }
}
