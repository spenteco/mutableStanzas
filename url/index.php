<?php

$longUrl = $_GET['longUrl'];
$shortUrl = $_GET['s'];

$db = new SQLite3('/var/www/url/links.sq3') or die('Unable to open database');

if ($longUrl > '') {

    $new_shortUrl = 'http://montaukedp.com/apps/url/?s=' . time();
    
    $query = "insert into links (short, long) values ('" . $new_shortUrl . "', '" . $longUrl. "');";
    
    $db->exec($query) or die('Unable to add link');
    
    echo $new_shortUrl;
}

if ($shortUrl > '') {
    
    $sql = "SELECT long FROM links where short = '" . 'http://montaukedp.com/apps/url/?s=' . $shortUrl . "';'";
    
    $result = $db->query($sql) or die('Query failed');
    while ($row = $result->fetchArray()) {
        header('Location: ' . $row['long']) ;
        break;
    }
}

?>
