<?php //Geocoding + Weather API

$city = getCity();

$currentweather = getMet('oneMinObs_', $city);
$todayweather = getMet('hourlyObsAndForecast_', $city);

// print_r($currentweather);
// print_r($todayweather);

$past = count($todayweather->actualData);
$future = 12;

for($i = 0; $i < $past + $future; ++$i) {
    if($i < $past) {
        $weatherdata[$i] = $todayweather->actualData[$i];
    } else {
        $weatherdata[$i] = $todayweather->forecastData[$i-$past];
    }
}

$nowdata['city'] = $city;
$nowdata['weather'] = $currentweather;
$nowdata['time'] = $past-1;
$nowdata['forecast'] = $weatherdata;

print_r(json_encode($nowdata, JSON_PRETTY_PRINT));

function getCity() {
    $url = 'https://maps.googleapis.com/maps/api/geocode/json';
    $url.= '?latlng='.$_GET['lat'];
    $url.= ','.$_GET['lon'];
    $url.= '&sensor=true';
    
    $comps = json_decode(getAPI($url))->results[0]->address_components;

    $city = 'Auckland';
    foreach ($comps as $component) {
        if($component->types[0] == 'locality') $city = $component->long_name;
    }
    
    return $city;
}

function getMet($string, $city) {
    $url = 'http://metservice.com/publicData/';
    $url.= $string;
    $url.= $city;
    
    $resp = getAPI($url);

    return(json_decode($resp));
}

function getAPI($url) {
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
    
    return $resp;
}