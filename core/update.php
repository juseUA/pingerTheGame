<?php 

require 'db.php';

/**
* Class Rating
*/

error_reporting (1);

class Player
{
	private $login;
	private $wave;
	
	function __construct($login, $wave)
	{
		$this->$login = $login;
		$wave->$login = $wave;
	}

	function update()
	{
		global $mysqli;
		$mysqli->query("INSERT INTO `rating`(`name`, `wave`) VALUES('$this->$login', '$wave->$login')");

	}
}

if (isset($_POST)) {

	$login = htmlspecialchars($_POST['login']);
	$wave = htmlspecialchars($_POST['wave']);

	$newPlayer = new Player();
	$newPlayer->update();
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<form action="update.php" method="POST">
		<input type="text" name="login">
		<input type="text" name="wave">
		<input type="submit"></input>
	</form>
</body>
</html>