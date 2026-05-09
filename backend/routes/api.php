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
    Route::put('/appointments/{id}/cancel', [AppointmentController::class, 'cancel']);

    // Admin routes
    // Appointments
    Route::get('/admin/appointments', [\App\Http\Controllers\AdminController::class, 'getAppointments']);
    Route::put('/admin/appointments/{id}/status', [\App\Http\Controllers\AdminController::class, 'updateAppointmentStatus']);
    Route::delete('/admin/appointments/{id}', [\App\Http\Controllers\AdminController::class, 'deleteAppointment']);

    // Users
    Route::get('/admin/users', [\App\Http\Controllers\AdminController::class, 'getUsers']);
    Route::delete('/admin/users/{id}', [\App\Http\Controllers\AdminController::class, 'deleteUser']);

    // Institutions
    Route::post('/admin/institutions', [\App\Http\Controllers\AdminController::class, 'storeInstitution']);
    Route::put('/admin/institutions/{id}', [\App\Http\Controllers\AdminController::class, 'updateInstitution']);
    Route::delete('/admin/institutions/{id}', [\App\Http\Controllers\AdminController::class, 'deleteInstitution']);

    // Resources
    Route::post('/admin/resources', [\App\Http\Controllers\AdminController::class, 'storeResource']);
    Route::put('/admin/resources/{id}', [\App\Http\Controllers\AdminController::class, 'updateResource']);
    Route::delete('/admin/resources/{id}', [\App\Http\Controllers\AdminController::class, 'deleteResource']);
});
