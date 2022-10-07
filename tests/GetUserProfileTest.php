<?php
use \PhpUnit\Framework\TestCase;
use App\GetUserProfile;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\GetUserProfile
*/
class GetUserProfileTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $Request = new stdClass();

        $bodyContent = new stdClass();
        $bodyContent->UserID = 20;

        $Request->data = $bodyContent;
        $json = json_encode($Request);
        
        $_SERVER["REQUEST_METHOD"] = "GET";
        $fileWriter = fopen(INPUT_TEST_FILE, "w");

        fwrite($fileWriter, $json);
        fclose($fileWriter);
    }   

    /**
    * @test
    */
    public function testValidCall() 
    {
        self::generateInput();
        $expectedEmail = "345678@students.wits.ac.za";
        $this->expectOutputRegex('/\"Email\":' . $expectedEmail . '/');
        GetUserProfile::makeCall();
        fwrite(STDERR, $_SERVER["REQUEST_METHOD"]);
    }
}
