<?php

namespace App\Domain\Store\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Section extends Model {
  protected $table = 'sections';
  protected $fillable = ['slug','name','is_active'];
  public function stores(){ return $this->hasMany(\App\Domain\Store\Models\Store::class,'section_id'); }
  public function categories(){ return $this->hasMany(\App\Domain\Catalog\Models\Category::class,'section_id'); }
}
