
function loadData() {

    // obtain variables from jQuery
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
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
    var message = "Want to check out " + $street + ", " + $city + "?";
    $('#greeting').html(message).css("color", "#ffffff");
    $('.nytimes-container').css("color", "#ffffff");
    $('.wikipedia-container').css("color", "#ffffff");
    $body.append('<img class="bgimage" src="http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' +
        $address + '">');


    // Set NY Times Article Search URL using obtained API key and submitted city
    var apikey = '67765b4f2ce9410682abdec14f35a93e';
    var URL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + $city + '&api-key=' + apikey;
    $.ajax({
        url: URL,
        method: 'GET'
    }).success(function(result) {
        console.log(result);
    }).fail(function(err) {
        throw err;
    });
    return false;
}

$('#form-container').submit(loadData);