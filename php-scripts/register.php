<?php
require_once "db.php";

$json = $json[$payloadLabel];

// Getting required fields from the request
$firstName = $json['FirstName'];
$lastName = $json['LastName'];
$email = $json['Email'];
$hashedPassword = $json['HashedPassword'];
$userDescription = $json['UserDescription'];

// Enter the user's information
$sql = "INSERT INTO User(FirstName, LastName, UserDescription, Email, HashedPassword) VALUES (?, ?, ?, ?, ?)";
$query = $db->prepare($sql);
$query->bind_param("sssss", $firstName, $lastName, $userDescription, $email, $hashedPassword);
$query->execute();

$sql = "SELECT * FROM User WHERE (Email = ?)";
$query = $db->prepare($sql);
$query->bind_param("s", $email);
$query->execute();

$userObject = $query->get_result()->fetch_assoc();
echo json_encode($userObject);

$query->close();
$db->close();