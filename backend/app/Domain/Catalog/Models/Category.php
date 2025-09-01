<?php

namespace App\Domain\Catalog\Models;

use App\Domain\Store\Models\Section;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $table = 'categories';

    protected $fillable = [
        'section_id',
        'name',
        'slug',
        'is_active',
    ];

    protected $casts = [
        'is_active'  => 'boolean',
        'section_id' => 'integer',
    ];

    // Relationships
    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'category_id');
    }

    // Scopes
    public function scopeActive($q)
    {
        return $q->where('is_active', true);
    }

    public function scopeInSection($q, int $sectionId)
    {
        return $q->where('section_id', $sectionId);
    }

    public function scopeWithSlugInSection($q, string $slug, int $sectionId)
    {
        return $q->where('slug', $slug)->where('section_id', $sectionId);
    }
}
