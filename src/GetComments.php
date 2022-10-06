<?php
namespace App;

require_once "db.php";

class GetComments {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $postID = $json['PostID'];
        $isQuestion = $json['IsQuestion'];

        // Generating and executing the SQL
        $sql = "SELECT User.FirstName, User.LastName, Comment.* " . 
            "FROM User, Comment " . 
            "WHERE PostID = ? AND IsQuestion = ? AND User.UserID = Comment.UserID";

        $query = DB::$db->prepare($sql);
        $query->bind_param("ii", $postID, $isQuestion);
        $query->execute();

        $comments = array();

        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc())
                $comments[] = $row;
        }

        $query->close();
        DB::$db->close();
        return json_encode($comments);
    }
}

echo GetComments::makeCall();