<?php

namespace App\Listeners;

use Illuminate\Queue\Events\JobFailed;
use Illuminate\Support\Facades\Mail;
use App\Domain\Security\Services\SuspiciousActivityService;

class JobFailedListener
{
    public function __construct(protected SuspiciousActivityService $suspicious) {}

    public function handle(JobFailed $event): void
    {
        $name = method_exists($event->job, 'resolveName') ? $event->job->resolveName() : get_class($event->job);
        $queue = $event->job->getQueue();
        $connection = $event->connectionName;
        $exception = $event->exception ? $event->exception->getMessage() : 'unknown';
        $payload = method_exists($event->job, 'payload') ? json_encode($event->job->payload()) : null;

        // Log to suspicious activities
        $this->suspicious->log(null, 'job_failed', [
            'job' => $name,
            'queue' => $queue,
            'connection' => $connection,
            'exception' => $exception,
        ]);

        // Email admins
        $to = config('finance.admin_emails', '');
        $emails = array_filter(array_map('trim', explode(',', (string) $to)));
        if (!empty($emails)) {
            $subject = "[ALERT] Job Failed: {$name} on {$queue}";
            $body = "Queue: {$queue}\nConnection: {$connection}\nJob: {$name}\nException: {$exception}\nPayload: {$payload}";
            foreach ($emails as $addr) {
                try {
                    Mail::raw($body, fn($m) => $m->to($addr)->subject($subject));
                } catch (\Throwable $e) {
                    // swallow mail errors
                }
            }
        }
    }
}
