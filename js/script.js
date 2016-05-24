
function loadData() {

    // obtain variables from jQuery
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nyContainer = $('.nytimes-container');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $street = $('#street').val();
    var $city = $('#city').val();
    var $address = $street + ', ' + $city;

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // Once address is submitted, fonts change to white, a new greeting message appears and
    // and the Google street view of the address appears as the background
    var message = "Want to check out " + $street + ",<br> " + $city + "?";
    $greeting.html(message).css("color", "#ffffff");
    $nyContainer.css("color", "#ffffff");
    $('.wikipedia-container').css("color", "#ffffff");

    var apiURL = "http://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + $address + "\"";
    $('.bgimage').attr("src", apiURL);
    // $body.append('<img class="bgimage" src="http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' +
    //     $address + '">');


    // Set NY Times Article Search URL using obtained API key and submitted city
    var apikey = '67765b4f2ce9410682abdec14f35a93e';
    var URL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + $city + '&api-key=' + apikey;
    $.ajax({
        url: URL,
        method: 'GET',
        dataType: 'json'
    }).success(function(data) {
        $nyContainer.css("height", "60px");
        $nytElem.css("background-color", "rgba(51, 51, 51, 0.9)");
        $nytElem.css("height", "600px");
        $nytElem.css("overflow", "auto");
        $.each(data.response.docs, function(i, item) {
            console.log(item.web_url);
            console.log(item.headline.main);
            $nytElem.append('<p>' + item.headline.main + '<br>' + item.web_url + '</p>');
        });
    }).error(function(err) {
        throw err;
    });
    return false;
}

$('#form-container').submit(loadData);