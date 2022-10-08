<?php
use \PhpUnit\Framework\TestCase;
use App\GetUsers;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\GetUsers
*/
class GetUsersTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $request = new stdClass();

        $bodyContent = new stdClass();

        $request->data = $bodyContent;
        $json = json_encode($request);
        
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
        GetUsers::makeCall();
    }
}
