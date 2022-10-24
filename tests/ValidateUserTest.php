<?php
use \PhpUnit\Framework\TestCase;
use App\ValidateUser;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\ValidateUser
*/
class ValidateUserTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $request = new stdClass();

        $bodyContent = new stdClass();
        $bodyContent->Email = '2307935@students.wits.ac.za';

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
        $this->expectOutputRegex('/\"UserID\":14/');
        ValidateUser::makeCall();
    }
}
