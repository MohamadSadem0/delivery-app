<?php

namespace App\Http\Controllers\API\V1\Vendor;

use App\Http\Controllers\Controller;
use App\Domain\Payout\Models\Payout;
use App\Domain\Payout\Services\VendorStatementService;
use Illuminate\Http\Request;

class VendorStatementController extends Controller
{
    public function __construct(protected VendorStatementService $statements) {}

    public function download(Request $request, Payout $payout)
    {
        abort_unless($payout->store->user_id === auth('api')->id(), 404);

        $format = strtolower($request->query('format', 'csv'));
        if ($format === 'pdf') {
            return $this->statements->renderPdf($payout);
        }
        // default CSV
        return $this->statements->renderCsv($payout);
    }
}
