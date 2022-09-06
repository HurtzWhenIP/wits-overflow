<?php
require_once "db.php";

// Generating and executing the SQL
$sql = "DELETE FROM User";
$query = $db->prepare($sql);
$query->execute();

$query->close();
$db->close();