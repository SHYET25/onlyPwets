<?php
include '../connection/connection.php';
// Get POST data
$userFname = $_POST['userFname'];
$userLname = $_POST['userLname'];
$userEmail = $_POST['userEmail'];
$userContact = $_POST['userContact'];
$userPass = $_POST['userPass'];

// Hash the password for security
$hashedPass = password_hash($userPass, PASSWORD_DEFAULT);

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO user (user_fname, user_lname, user_email, user_pass, user_contact) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $userFname, $userLname, $userEmail, $hashedPass, $userContact);

if ($stmt->execute()) {
    echo '<div class="alert alert-success">Account successfully created!</div>';
} else {
    echo '<div class="alert alert-danger">Error: ' . $stmt->error . '</div>';
}

// Close connections
$stmt->close();
$conn->close();
?>
