<?php
namespace App;

require_once "db.php";

class DeleteUser {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        $json = $json[DB::$payloadLabel];
        $userID = $json['UserID'];

        // Generating and executing the SQL
        $sql = "DELETE FROM User WHERE (UserID = ?)";
        $query = $db->prepare($sql);
        $query->bind_param("i", $userID);
        $query->execute();

        $query->close();
        DB::$db->close();
    }
}

DeleteUser::makeCall();