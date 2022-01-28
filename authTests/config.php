<?php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
define('DB_SERVER', 'pk1l4ihepirw9fob.cbetxkdyhwsb.us-east-1.rds.amazonaws.com');
define('DB_USERNAME', 'im5s3ovn5ni5kv3g');
define('DB_PASSWORD', 'r8zw70lo7cit34cl');
define('DB_NAME',     'mqpklhdps7eegv9f');
 
/* Attempt to connect to MySQL database */
$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($mysqli === false){
    die("ERROR: Could not connect. " . $mysqli->connect_error);
}
?>
