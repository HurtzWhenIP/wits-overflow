<?php
use \PhpUnit\Framework\TestCase;
use App\SearchUsers;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\SearchUsers
*/
class SearchUserTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $request = new stdClass();

        $bodyContent = new stdClass();
        $bodyContent->Username = "Ki"; 

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
        $userID = 4;
        $this->expectOutputRegex('/\"UserID\":' . $userID . '/');
        SearchUsers::makeCall();
    }
}
