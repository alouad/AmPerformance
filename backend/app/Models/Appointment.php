<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Appointment extends Model {
    protected $fillable = ['student_id', 'counselor_id', 'date', 'status', 'notes'];
    public function student() { return $this->belongsTo(User::class, 'student_id'); }
}
