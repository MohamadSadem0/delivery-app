<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Domain\Audit\Models\AuditLog;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AuditExportController extends Controller
{
    public function export(Request $request): StreamedResponse
    {
        $q = AuditLog::query()->orderByDesc('id');
        if ($uid = $request->integer('user_id')) $q->where('user_id', $uid);

        $response = new StreamedResponse(function () use ($q) {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['id','auditable_type','auditable_id','user_id','event','ip','user_agent','created_at']);
            foreach ($q->cursor() as $log) {
                fputcsv($out, [
                    $log->id,$log->auditable_type,$log->auditable_id,$log->user_id,
                    $log->event,$log->ip,$log->user_agent,$log->created_at
                ]);
            }
            fclose($out);
        });

        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment; filename="audit_logs.csv"');

        return $response;
    }
}
