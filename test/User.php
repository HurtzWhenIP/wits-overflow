<?php
//require_once("register.php");
class User {
    // Properties
    private $firstname;
    private $lastname
    private $email;
    private $userID;
    private $userDescription;
    private $db;

  // Methods
  function __construct() {
    header('Access-Control-Allow-Origin: *');  
    header('Access-Control-Allow-Headers: *');  

    // Mysql credentials to access the database
    $serverName = "localhost"; 
    $username = "root";
    $password = "";
    $database = "WitsOverflow";
    $payloadLabel = "data";

    // Create a connection to the database
    $db = mysqli_connect($serverName, $username, $password, $database);

    // Checking if the connection failed
    if ($db->connect_error) {
    die("Connection failure: " . $conn->connect_error);
    }

    $sql = "CREATE TABLE TestUser (
    UserID INT NOT NULL AUTO_INCREMENT,
    UserDescription VARCHAR(150),
    FirstName VARCHAR(20) NOT NULL, 
    LastName VARCHAR(20) NOT NULL, 
    Email VARCHAR(40) NOT NULL,
    HashedPassword VARCHAR(256) NOT NULL,
    PRIMARY KEY(UserID)
    );";

    $query = $db->prepare($sql);
    $query->execute();
  }
  function insertUser($fn, $ln, $uDesc, $em, $pass){
    $sql = "INSERT INTO TestUser(FirstName, LastName, UserDescription, Email, HashedPassword) VALUES (?, ?, ?, ?, ?)";
    $query = $db->prepare($sql);
    $query->bind_param("sssss",$fn, $ln, $uDesc, $em, $pass);
    $query->execute();

    set_name($fn);
    set_lastName($ln);
    set_userDescription($uDesc);
    set_email($em); 

    $sql = "DROP TestUser IF EXISTS;";
    $query = $db->prepare($sql);
    $query->execute();
  }
  function set_name($fn) {
    $name = $fn;
  }
  function set_lastName($ln) {
    $name = $ln;
  }
  function set_userDescription($uDesc)
  {
    $userDescription = $uDesc;
  }
  function set_email($em)
  {
    $email = $em;
  }

  function get_name() :string {
    return $name;
  }
  function get_lastName() :string {
    return $lastname;
  }
  function get_userDescription() :string
  {
    return $userDescription;
  }
  function get_email() :string
  {
    return $email;
  }
}
?>