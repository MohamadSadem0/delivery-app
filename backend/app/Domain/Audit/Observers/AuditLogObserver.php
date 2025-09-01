<?php

namespace App\Domain\Audit\Observers;

use App\Domain\Audit\Models\AuditLog;
use Illuminate\Database\Eloquent\Model;

class AuditLogObserver
{
    public function created(Model $model): void
    {
        $this->log('created',$model);
    }

    public function updated(Model $model): void
    {
        $this->log('updated',$model);
    }

    public function deleted(Model $model): void
    {
        $this->log('deleted',$model);
    }

    protected function log(string $action, Model $model): void
    {
        AuditLog::create([
            'user_id' => auth('api')->id() ?? null,
            'action' => $action,
            'auditable_type' => get_class($model),
            'auditable_id' => $model->getKey(),
            'meta' => ['changes'=>$model->getChanges()],
        ]);
    }
}
