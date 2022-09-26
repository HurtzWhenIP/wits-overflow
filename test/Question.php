<?php
class Question {
    // Properties
    private $userID;
    private $postTitle;
    private $postContent;
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

    $sql = "CREATE TABLE TestQuestionPost (
    PostID INT NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL,
    PostTitle TEXT NOT NULL, 
    PostContent TEXT NOT NULL,
    Solved BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY(PostID),
    FOREIGN KEY (UserID) REFERENCES TestUser(UserID)
    );";

    $query = $db->prepare($sql);
    $query->execute();
  }
  function createPost($uID, $title, $content){

    $userID = $uID;
    $postTitle = $title;
    $postContent = $content;

    // Generating and executing the SQL
    $sql = "INSERT INTO TestQuestionPost(UserID, PostTitle, PostContent) VALUES (?, ?, ?)";

    $query = $db->prepare($sql);
    $query->bind_param("iss", $userID, $postTitle, $postContent);
    $query->execute();

    $query->close();
    $db->close();
    
    $sql = "DROP TestPost IF EXISTS;";
    $query = $db->prepare($sql);
    $query->execute();

  }
  function getUserID(){
    return $userID;
  }
  function getPostTitle()
  {
    return $postTitle;
  }
  function getPostContent()
  {
    return $postContent;
  }
}
?>