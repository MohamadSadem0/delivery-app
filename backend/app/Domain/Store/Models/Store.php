<?php

namespace App\Domain\Store\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Domain\User\Models\User;
use App\Domain\Catalog\Models\Product;

class Store extends Model
{
    protected $table = 'stores';

protected $fillable = [
  'user_id','name','slug','description','is_active',
  'supports_delivery','supports_pickup','supports_shipping',
  'commission_rate_bps','section_id',
];

public function section() { return $this->belongsTo(\App\Domain\Store\Models\Section::class,'section_id'); }
public function owner()   { return $this->belongsTo(\App\Domain\User\Models\User::class,'user_id'); }


    protected $casts = [
        'is_active' => 'boolean',
    ];



    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
