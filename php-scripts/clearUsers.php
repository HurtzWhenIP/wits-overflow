<?php
require_once "db.php";

// Deleting user from the database
$sql = "DELETE FROM User";
$query = $db->prepare($sql);
$query->execute();

$query->close();
$db->close();