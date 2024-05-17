<?php 
$hostname="localhost";
$username= "root";
$password= "";
$dbname= "fitnesspalace";

$conn = new mysqli($hostname, $username, $password,$dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>