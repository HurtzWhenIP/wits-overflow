<?php
class Comment {
    // Properties
    private $userID;
    private $parentPostID;
    private $commentContent;
    private $isQuestion;
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

    $sql = "CREATE TABLE TestComment (
    CommentID INT NOT NULL AUTO_INCREMENT,
    PostID INT NOT NULL,
    UserID INT NOT NULL,
    CommentContent TEXT NOT NULL,
    IsQuestion BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (CommentID),
    FOREIGN KEY (UserID) REFERENCES TestUser(UserID)
    );";

    $query = $db->prepare($sql);
    $query->execute();
  }
  function createComment($uID, $parentPID, $content, $question){
    $userID = $uID;
    $parentPostID = $parentPID;
    $commentContent = $content;
    $isQuestion = $question;
    // Generating and executing the SQL
    $sql = "INSERT INTO TestComment(UserID, PostID, CommentContent, IsQuestion) VALUES (?, ?, ?, ?)";
    $query = $db->prepare($sql);
    $query->bind_param("iisi", $userID, $postID, $commentContent, $isQuestion);
    $query->execute();

    $sql = "DROP TestComment IF EXISTS;";
    $query = $db->prepare($sql);
    $query->execute();

    $query->close();
    $db->close();

  }
  function getUserID(){
    return $userID;
  }
  function getparentPostID()
  {
    return $parentPostID;
  }
  function getcommentContent()
  {
    return $commentContent;
  }
  function getIsQuestion()
  {
    return $isQuestion;
  }
}
?>