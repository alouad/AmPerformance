<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Program extends Model {
    protected $fillable = ['institution_id', 'name', 'type_of_formation', 'specialty', 'description'];
    public function institution() { return $this->belongsTo(Institution::class); }
}
