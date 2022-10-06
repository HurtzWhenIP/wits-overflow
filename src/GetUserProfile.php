<?php
namespace App;

require_once "db.php";

class GetUserProfile {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $userID = $json['UserID'];

        // Generating and executing the SQL
        $sql = "SELECT UserID, FirstName, LastName, Email FROM User WHERE (UserID = ?)";
        $query = DB::$db->prepare($sql);
        $query->bind_param("s", $userID);
        $query->execute();

        // Formatting the output into a json array
        $profile = array();

        if ($row = $query->get_result()->fetch_assoc()) {
            $profile[] = $row;
        }

        $query->close();
        DB::$db->close();
        return json_encode($profile);
    }
}

echo GetUserProfile::makeCall();