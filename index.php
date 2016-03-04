<?php 

require_once 'core/db.php';


if (isset($_POST['login'])) {
	$login = htmlspecialchars($_POST['login']);
	$wave = htmlspecialchars($_POST['wave']);
	$mysqli->query("INSERT INTO `rating`(`name`, `wave`) VALUES('$login', '$wave')");
}

?>

<!DOCTYPE html>
<html>
<head>
	<title>Pinger</title>
	<link rel="stylesheet" type="text/css" href="template/style/style.css">
	<script type="text/javascript" src="template/js/jquery-2.2.1.min.js"></script>
	<!-- Google Fonts -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
	<script type="text/javascript" src="template/js/engine.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
</head>
<body>

	<div class="result">
		<p>Извините, но вы проиграли. Ваш рейтинг - <b id="wavesresult"></b></p><br>
		<img src="template/img/developer.png" alt=""> 
		<div class="button about"><i class="fa fa-user-secret"></i> Vladislav Len</div>
		<a href="http://https://github.com/juseUA/"><div class="button about"><i class="fa fa-github"></i> GitHub</div></a>
		<a href="http://vk.com/len_v"><div class="button about"><i class="fa fa-vk"></i> Vk.com</div></a>
		<a href="http://twitter.com/mr_aniretake"><div class="button about"><i class="fa fa-twitter"></i> Twitter</div></a>
		<a href="http://facebook.com/vladislav.len.9"><div class="button about"><i class="fa fa-facebook"></i> Facebook</div></a>
		<div class="rate-table">
			<p><i>Таблица рекордов</i></p>

			<?php 

			require_once 'core/db.php';

			$temp = $mysqli->query("SELECT * FROM `rating` ORDER BY `wave` DESC LIMIT 14");

			while ($result = $temp->fetch_assoc()) {
				echo "<p>Логин - <b>$result[name]</b>. Количестко волн - <b>$result[wave]</b>. Дата - <b>$result[date]</b></p>";
			}

			?>
		</div>
	</div>

	<canvas id="map"></canvas>
	<canvas id="player"></canvas>
	<canvas id="enemy"></canvas>
	<canvas id="waves"></canvas>
	
	<div class="row">
		<div class="button" id="heal"><b>Heals - 10</b></div>
		<div class="button" id="mute" onclick="stopSound()"><b>Mute</b></div>
		<div class="button" id="unmute" onclick="playSound()"><b>UnMute</b></div>
		<div class="button" onclick="restart()"><b>Restart</b></div>

		<audio src="template/sound/sound.mp3"  loop id="audio">
			Your browser does not support the <code>audio</code> element.
		</audio>
		<audio src="template/sound/gameOver.wav"  id="over">
			Your browser does not support the <code>audio</code> element.
		</audio>

	</div>


</body>
</html>