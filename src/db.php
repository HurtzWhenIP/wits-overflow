<?php
namespace App;


class DB 
{
    public static $json;
    public static $db;
    public static $payloadLabel;

    public static function init()
    {
        self::$payloadLabel = "data";

        if (!headers_sent())
        {
            header('Access-Control-Allow-Origin: *');
            header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
            header("Allow: GET, POST, OPTIONS, PUT, DELETE");
            header('Content-Type: application/json');
        }

        $method = $_SERVER['REQUEST_METHOD'];

        if($method == "OPTIONS") {
            header('Access-Control-Allow-Origin: *');
            header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
            header("HTTP/1.1 200 OK");
            die();
        }

        // Mysql credentials to access the database
        $serverName = "localhost"; 
        $username = "root";
        $password = "";
        $database = "WitsOverflow";
        if (defined('TEST_MODE') && defined('INPUT_TEST_FILE') && TEST_MODE) {
            $inputFile = INPUT_TEST_FILE;
        }
        else 
            $inputFile = "php://input";

        // Create a connection to the database
        self::$db = mysqli_connect($serverName, $username, $password, $database);

        // Checking if the connection failed
        if (self::$db->connect_error) {
            die("Connection failure: " . self::$db->connect_error);
        }

        // Reading in the current request
        self::$json = json_decode(file_get_contents($inputFile), true);
    }
}

