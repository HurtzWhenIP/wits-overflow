<?php
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');  

// Mysql credentials to access the database
$serverName = "localhost"; 
$username = "root";
$password = "";
$database = "WitsOverflow";
$payloadLabel = "data";
$inputFile = "php://input";

// Create a connection to the database
$db = mysqli_connect($serverName, $username, $password, $database);

// Checking if the connection failed
if ($db->connect_error) {
    die("Connection failure: " . $conn->connect_error);
}

// Reading in the current request
$json = json_decode(file_get_contents($inputFile), true);