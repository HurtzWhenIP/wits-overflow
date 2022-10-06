<?php
namespace App;

require_once "db.php";

class GetPopularQuestions {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];

        $sql = "SELECT User.FirstName, User.LastName, QuestionPost.* " . 
                "FROM User, QuestionPost, Vote " . 
                "WHERE QuestionPost.UserID = User.UserID " .
                "GROUP BY QuestionPost.PostID " . 
                "ORDER BY " . 
                "CAST(SUM(Vote.Vote = 1 AND Vote.PostID = QuestionPost.PostID) as SIGNED) DESC";

        $query = DB::$db->prepare($sql);
        $query->execute();

        // Formatting the output into a json array
        $popularQuestions = array();

        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $popularQuestions[] = $row;
            }
        }

        $query->close();
        DB::$db->close();
        return json_encode($popularQuestions);
    }
}

echo GetPopularQuestions::makeCall();