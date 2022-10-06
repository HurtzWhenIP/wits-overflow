<?php
namespace App;

require_once "db.php";

class AddAnswer {
    public static function makeCall() {
        DB::init();
        
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $userID = $json['UserID'];
        $parentPostID = $json['ParentPostID'];
        $answerContent = $json['AnswerContent'];

        // Generating and executing the SQL
        $sql = "INSERT INTO AnswerPost(UserID, ParentPostID, AnswerContent) VALUES (?, ?, ?)";
        $query = DB::$db->prepare($sql);
        $query->bind_param("iis", $userID, $parentPostID, $answerContent);
        $query->execute();

        $query->close();
        DB::$db->close();
    }
}

echo AddAnswer::makeCall();