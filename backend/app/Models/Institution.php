<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Institution extends Model {
    protected $fillable = ['name', 'location', 'type', 'description', 'foundation_year', 'website', 'domaines'];
    public function programs() { return $this->hasMany(Program::class); }
}
