<?php foreach(\App\Models\Appointment::all() as $a) { $a->student_name = trim(($a->student->name ?? '') . ' ' . ($a->student->prenom ?? '')); $a->save(); } echo 'Done';
