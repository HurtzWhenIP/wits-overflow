<?php

namespace App;

require_once "db.php";

class SetQuestionSolved {
    public static function makeCall() {
        DB::init();

        $json = DB::$json;
        // Reading in the request
        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $userID = $json['UserID'];
        $postID = $json['PostID'];
        $isSolved = $json['Solved'];

        $sql = "UPDATE QuestionPost SET Solved = ? WHERE UserID = ? AND PostID = ?";
        $query = DB::$db->prepare($sql);
        $query->bind_param("iii", $isSolved, $userID, $postID);
        $query->execute();

        $query->close();
        DB::$db->close();
    }
}

SetQuestionSolved::makeCall();