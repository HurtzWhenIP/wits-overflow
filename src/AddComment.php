<?php
namespace App;

require_once "db.php";

class AddComment {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $userID = $json['UserID'];
        $postID = $json['PostID'];
        $commentContent = $json['CommentContent'];
        $isQuestion = $json['IsQuestion'];

        // Generating and executing the SQL
        $sql = "INSERT INTO Comment(UserID, PostID, CommentContent, IsQuestion) VALUES (?, ?, ?, ?)";

        $query = DB::$db->prepare($sql);
        $query->bind_param("iisi", $userID, $postID, $commentContent, $isQuestion);
        $query->execute();

        $query->close();
        DB::$db->close();
    }
}

echo AddComment::makeCall();