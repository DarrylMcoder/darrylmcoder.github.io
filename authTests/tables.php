<?PHP
    
include('./config.php');

$sql = 'CREATE TABLE sessions
(
	id varchar(32) NOT NULL,
	access int(10) unsigned,
	data text,
	PRIMARY KEY (id)
);';

$mysqli->query($sql);