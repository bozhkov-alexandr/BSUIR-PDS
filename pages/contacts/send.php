<?php
$dblocation="localhost";
$dbuser="root";
$dbpasswd="";
$dbname="onlinezoo";

$dbcnx = mysqli_connect($dblocation,$dbuser,$dbpasswd, $dbname);
if(!$dbcnx) exit("<P>error DB</P>" );    
    $query = "INSERT INTO  contacts VALUES (NULL,'".$_POST['name']."','".$_POST['email']."','".$_POST['subject']."','".$_POST['message']."')";
    $adr = mysqli_query($dbcnx, $query);
    if (!$adr) exit("$query");
    header("Location: /pages");


