<?php
use \PhpUnit\Framework\TestCase;
use App\Login;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\Login
*/
class LoginTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $loginRequest = new stdClass();

        $bodyContent = new stdClass();
        $bodyContent->Email = "345678@students.wits.ac.za";
        $bodyContent->HashedPassword = "abcd";

        $loginRequest->data = $bodyContent;
        $json = json_encode($loginRequest);
        
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
        $expectedUID = 20;
        $this->expectOutputRegex('/\"UserID\":' . $expectedUID . '/');
        Login::makeCall();
        fwrite(STDERR, $_SERVER["REQUEST_METHOD"]);
    }
}
