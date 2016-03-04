<?php

$HOST = "localhost";

$USER = "root";

$PASSWORD = "vfhbyjxrf123";

$DB_NAME = "game";

$mysqli = new mysqli($HOST, $USER, $PASSWORD, $DB_NAME);

if (mysqli_connect_errno()) {

	include 'error.php';

	die();

};

$mysqli->query("SET NAMES utf8 COLLATE utf8_unicode_ci");

global $mysqli; 

?>