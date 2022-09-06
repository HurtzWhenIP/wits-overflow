<?php
require_once "db.php";

// Reading in the request
$json = $json[$payloadLabel];

// Getting required fields from the request
$requestedEmail = $json['Email'];
$hashedPassword = $json['HashedPassword'];

// Getting the user's information
$sql = "SELECT * FROM User WHERE (Email = ? AND HashedPassword = ?)";
$query = $db->prepare($sql);
$query->bind_param("ss", $requestedEmail, $hashedPassword);
$query->execute();

// Formatting the output into a json array
$loginDetails = array();

if ($row = $query->get_result()->fetch_assoc()) {
    $loginDetails[] = $row;
}

echo json_encode($loginDetails);
$query->close();
$db->close();
