<?php
namespace App;

require_once "db.php";

class HideComment {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];
        $answerID = $json['CommentID'];

        $sql = "UPDATE Comment SET IsHidden = 1 WHERE CommentID = ?";

        $query = DB::$db->prepare($sql);
        $query->bind_param("i", $answerID);
        $query->execute();

        $query->close();
        DB::$db->close();
    }
}

HideComment::makeCall();