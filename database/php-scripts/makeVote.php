<?php
require_once "db.php";

// Reading in the request
$json = $json[$payloadLabel];

// Getting required fields from the request
$userID = $json['UserID'];
$postID = $json['PostID'];
$isQuestion = $json['IsQuestion'];
$vote = $json['Vote'];

$sql = "SELECT * FROM Vote WHERE UserID = ? AND PostID = ? AND isQuestion = ?";
$query = $db->prepare($sql);
$query->bind_param("iii", $userID, $postID, $isQuestion);
$query->execute();

// If the user has voted previously
if ($result = $query->get_result()->fetch_assoc())
    if ($vote == -1)
        $sql = "DELETE FROM Vote WHERE NOT Vote = ? AND UserID = ? AND PostID = ? AND IsQuestion = ?";
    else
        $sql = "UPDATE Vote SET Vote = ? WHERE UserID = ? AND PostID = ? AND IsQuestion = ?";
else
    $sql = "INSERT INTO Vote(Vote, UserID, PostID, IsQuestion) VALUES (?, ?, ?, ?)";

$query = $db->prepare($sql);
$query->bind_param("iiii", $vote, $userID, $postID, $isQuestion);
$query->execute();

$query->close();
$db->close();