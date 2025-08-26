<?php

namespace App\Http\Controllers\API\V1\Vendor;

use App\Http\Controllers\Controller;
use App\Domain\Payout\Models\Payout;
use App\Domain\Payout\Services\VendorStatementService;

class VendorStatementController extends Controller
{
    public function __construct(protected VendorStatementService $statements) {}

    public function download(Payout $payout)
    {
        abort_unless($payout->store->user_id === auth('api')->id(), 404);
        $pdf = $this->statements->renderPdf($payout);
        return $pdf->download("statement-{$payout->id}.pdf");
    }
}
