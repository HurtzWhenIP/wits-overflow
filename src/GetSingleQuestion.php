<?php
namespace App;

require_once "db.php";

class GetSingleQuestion {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;
        // Reading in the request
        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $postID = $json['PostID'];

        $sql = "SELECT QuestionPost.*, IFNULL(vt.UpVotes, 0) as UpVotes, " . 
            "IFNULL(vt.DownVotes, 0) as DownVotes " . 
            "FROM QuestionPost " . 
            "LEFT JOIN QuestionVoteTally as vt " . 
            "ON QuestionPost.PostID = vt.QuestionID " . 
            "WHERE QuestionPost.PostID = ?";

        $query = DB::$db->prepare($sql);
        $query->bind_param("i", $postID);
        $query->execute();

        // Formatting the output into a json array
        $question = array();

        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $question[] = $row;
            }
        }

        $query->close();
        DB::$db->close();
        return json_encode($question);
    }
}

echo GetSingleQuestion::makeCall();
