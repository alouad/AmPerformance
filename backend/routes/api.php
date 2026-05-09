<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\AppointmentController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/institutions', [InstitutionController::class, 'index']);
Route::get('/programs', [ProgramController::class, 'index']);
Route::get('/resources', [ResourceController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::get('/appointments', [AppointmentController::class, 'index']);

    // Admin routes
    Route::get('/admin/appointments', [\App\Http\Controllers\AdminController::class, 'getAppointments']);
    Route::put('/admin/appointments/{id}/status', [\App\Http\Controllers\AdminController::class, 'updateAppointmentStatus']);
    Route::post('/admin/institutions', [\App\Http\Controllers\AdminController::class, 'storeInstitution']);
    Route::post('/admin/resources', [\App\Http\Controllers\AdminController::class, 'storeResource']);
});
