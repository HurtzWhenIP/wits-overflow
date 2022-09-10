<?php
require_once "db.php";

$json = $json[$payloadLabel];
$userID = $json['UserID'];

// Generating and executing the SQL
$sql = "DELETE FROM User WHERE (UserID = ?)";
$query = $db->prepare($sql);
$query->bind_param("i", $userID);
$query->execute();

$query->close();
$db->close();
