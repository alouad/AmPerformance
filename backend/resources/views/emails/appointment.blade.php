<!DOCTYPE html>
<html>
<body>
    <h2>Nouveau rendez-vous demandé</h2>
    <p><strong>Étudiant :</strong> {{ $user->name }} {{ $user->prenom }}</p>
    <p><strong>Email :</strong> {{ $user->email }}</p>
    <p><strong>Date souhaitée :</strong> {{ $appointment->date }}</p>
    <p><strong>Notes / Sujet :</strong> {{ $appointment->notes }}</p>
    <br/>
    <p>Merci,</p>
    <p>L'équipe AmOrientation</p>
</body>
</html>
