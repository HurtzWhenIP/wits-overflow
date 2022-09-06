<?php
require_once "db.php";

// Reading in the request
$json = $json[$payloadLabel];

// Getting required fields from the request
$requestedEmail = $json['Email'];

// Checking if user already exists
$sql = "SELECT UserID FROM User WHERE (Email = ?)";
$query = $db->prepare($sql);
$query->bind_param("s", $requestedEmail);
$query->execute();

// Formatting the output into a json array
$loginDetails = array();

if ($row = $query->get_result()->fetch_assoc()) {
    $loginDetails[] = $row;
}

echo json_encode($loginDetails);
$query->close();
$db->close();
