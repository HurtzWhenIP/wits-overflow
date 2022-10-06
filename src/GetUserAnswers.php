<?php

namespace App;

require_once "db.php";

class GetUserAnswers {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        $json = $json[DB::$payloadLabel];
        $parentPostID = $json['ParentPostID'];

        // Generating and executing the SQL
        $sql = "SELECT User.FirstName, User.LastName, AnswerPost.*, " . 
                "IFNULL(vt.UpVotes, 0) as UpVotes, " . 
                "IFNULL(vt.DownVotes, 0) as DownVotes " . 
                "FROM User, AnswerPost " . 
                "LEFT JOIN AnswerVoteTally as vt " . 
                "ON AnswerPost.AnswerID = vt.AnswerID " . 
                "WHERE AnswerPost.ParentPostID = ? AND User.UserID = AnswerPost.UserID";

        $query = DB::$db->prepare($sql);
        $query->bind_param("s", $parentPostID);
        $query->execute();

        // Formatting the output into a json array
        $answers = array();

        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $answers[] = $row;
            }
        }

        $query->close();
        DB::$db->close();
        
        return json_encode($answers);
    }
}

echo GetUserAnswers::makeCall();