<?php

namespace App\Domain\Payout\Services;

use App\Domain\Payout\Models\Payout;
use Barryvdh\DomPDF\Facade\Pdf;

class VendorStatementService
{
    public function renderHtml(Payout $payout): string
    {
        $html = view('statements.vendor', ['payout'=>$payout])->render();
        return $html;
    }

    public function renderPdf(Payout $payout): \Barryvdh\DomPDF\PDF
    {
        return Pdf::loadView('statements.vendor',['payout'=>$payout]);
    }
}
