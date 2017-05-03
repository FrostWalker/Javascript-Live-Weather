<?php

$api_key = '3e5954b4fbe5a56d910af5d2a01a92c5';

$url = 'https://api.flickr.com/services/rest/';
$url.= '?method=flickr.photos.search';
$url.= '&api_key='.$api_key;
$url.= '&lat='.$_GET['lat'];
$url.= '&lon='.$_GET['lon'];
$url.= '&radius=32';
$url.= '&geo_context=2';
$url.= '&per_page=500';
$url.= '&format=json';
$url.= '&nojsoncallback=1';

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_CONNECTTIMEOUT => 0,
    CURLOPT_BINARYTRANSFER => 1,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_VERBOSE => 1,
    CURLOPT_HEADER => 0,
    CURLOPT_URL => $url,
    CURLOPT_USERAGENT => $_SERVER['HTTP_USER_AGENT']
    ));

$resp = curl_exec($curl);

curl_close($curl);

$json = json_decode($resp);

// print_r(json_decode($resp));

$count = count($json->photos->photo);
$num = rand(0, $count-1);

$data = $json->photos->photo[$num];

$farm = $data->farm;
$server = $data->server;
$id = $data->id;
$secret = $data->secret;

$fileurl = "http://farm{$farm}.staticflickr.com/{$server}/{$id}_{$secret}_b.jpg";

print_r($fileurl);

exit;
