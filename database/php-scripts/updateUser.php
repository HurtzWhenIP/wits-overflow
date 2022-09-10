<?php
require_once "db.php";

// Reading in the request
$json = $json[$payloadLabel];

// Getting required fields from the request
$userID = $json['UserID'];
$hashedPassword = $json['HashedPassword'];
$firstName = $json['FirstName'];
$lastName = $json['LastName'];
$userDescription = $json['UserDescription'];
$userID = $json['UserID'];

// Generating and executing the SQL
$sql = "UPDATE User SET HashedPassword = ?, firstName = ?, lastName = ?, UserDescription = ?" . 
" WHERE (UserID = ?)";

$query = $db->prepare($sql);
$query->bind_param("sssss", $hashedPassword, $firstName, $lastName, $userDescription, $userID);
$query->execute();

$query->close();
$db->close();
