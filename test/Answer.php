<?php
class Answer {
    // Properties
    private $userID;
    private $parentPostID;
    private $answerContent;
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

    $sql = "CREATE TABLE TestnswerPost (
    AnswerID INT NOT NULL AUTO_INCREMENT, 
    ParentPostID INT NOT NULL, 
    UserID INT NOT NULL,
    AnswerContent TEXT NOT NULL, 
    Edited BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY(AnswerID),
    FOREIGN KEY (UserID) REFERENCES TestUser(UserID),
    FOREIGN KEY (ParentPostID) REFERENCES TestQuestionPost(PostID)
    );";

    $query = $db->prepare($sql);
    $query->execute();
  }
  function createPost($uID, $parentPID, $content){
    $userID = $uID
    $parentPostID = $parentPID
    $answerContent = $content
    // Generating and executing the SQL
    $sql = "INSERT INTO TestAnswerPost(UserID, ParentPostID, AnswerContent) VALUES (?, ?, ?)";
    $query = $db->prepare($sql);
    $query->bind_param("iis", $userID, $parentPostID, $answerContent);
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
  function getanswerContent()
  {
    return $answerContent;
  }
}
?>