<?php

namespace App\Observers;

use Illuminate\Database\Eloquent\Model;
use App\Domain\Audit\Models\AuditLog;

class AuditableObserver
{
    public function created(Model $model): void
    {
        $this->log($model, 'created', [], $model->attributesToArray());
    }

    public function updated(Model $model): void
    {
        $this->log($model, 'updated', $model->getOriginal(), $model->getChanges());
    }

    public function deleted(Model $model): void
    {
        $this->log($model, 'deleted', $model->getOriginal(), []);
    }

    protected function log(Model $model, string $event, array $old, array $new): void
    {
        $user = auth('api')->user();
        AuditLog::create([
            'auditable_type' => get_class($model),
            'auditable_id' => $model->getKey() ?? 0,
            'user_id' => $user?->id,
            'event' => $event,
            'ip' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'old_values' => $old ?: null,
            'new_values' => $new ?: null,
        ]);
    }
}
