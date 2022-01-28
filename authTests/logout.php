<?php

 include("database.class.php");	//Include MySQL database class
include("mysql.sessions.php");	//Include PHP MySQL sessions
$session = new Session();  // Initialize the session
 
// Unset all of the session variables
$_SESSION = array();
 
// Destroy the session.
session_destroy();
 
// Redirect to login page
header("location: login.php");
exit;
?>