<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Domain\Catalog\Services\FullTextProductSearch;
use Illuminate\Http\Request;

class SearchFullTextController extends Controller
{
    public function __construct(protected FullTextProductSearch $engine) {}

    public function __invoke(Request $request)
    {
        $q = (string) $request->get('q', '');
        $limit = (int) $request->get('limit', 20);

        $results = $this->engine->search($q, $limit);

        return response()->json([
            'query' => $q,
            'data' => $results,
        ]);
    }
}
