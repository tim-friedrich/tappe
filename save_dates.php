<?php

    $json = $_POST['dates'];
    $user = $_POST['user'];
    var_dump(json_decode($json, true));

    $fp = fopen('dates.json', 'w');
    fwrite($fp, json_encode($json));
    fclose($fp);
  
?>