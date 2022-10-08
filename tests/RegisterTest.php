<?php
use \PhpUnit\Framework\TestCase;
use App\Register;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\Register
*/
class RegisterTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $Request = new stdClass();

        $bodyContent = new stdClass();
        $bodyContent->FirstName = "First";
        $bodyContent->LastName = "Last";
        $bodyContent->Email = "99999@students.wits.ac.za";
        $bodyContent->HashedPassword = "abcd";
        $bodyContent->UserDescription = "Tester at heart";

        $Request->data = $bodyContent;
        $json = json_encode($Request);
        
        $_SERVER["REQUEST_METHOD"] = "POST";
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
        $expectedEmail = "99999@students.wits.ac.za";
        $this->expectOutputRegex('/\"Email\":"' . $expectedEmail . '"/');
        Register::makeCall();
    }
}
