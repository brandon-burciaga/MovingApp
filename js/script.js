
// AJAX GET request for relevant New York Times articles using New York Times API.
// Displays headline as link to NYT page and fills an auto overflow CSS container.
function getNYTimes($city, $nyContainer, $nytElem) {

    // Set NY Times Article Search URL using obtained API key and submitted city as parameters
    var apikey = '67765b4f2ce9410682abdec14f35a93e';
    var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + $city + '&api-key=' + apikey;

    // AJAX GET request
    $.ajax({
        url: nytURL,
        method: 'GET',
        dataType: 'json'
    }).success(function (data) {
        $nyContainer.css("height", "60px");
        $nytElem.css("background-color", "rgba(51, 51, 51, 0.8)");
        $nytElem.css("height", "250px");
        $nytElem.css("overflow", "auto");
        $.each(data.response.docs, function (i, item) {
            $nytElem.append('<a href=\"' + item.web_url + '\">' + item.headline.main + '</a></p>');
        });
    }).error(function (err) {
        $nytElem.append("Could not load NY Times data!");
    });
}

// AJAX GET request for relevant wikipedia articles using wikipedia API.
// Displays title as link to Wikipedia page and fills an auto overflow CSS container.
function getWiki($city, $wikiElem, $wikiContainer) {

    // Set Wikipedia URL API using city and callback function as parameters
    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
        $city + '&format=json&callback=wikiCallback';

    // easy error handling for jsonp: times out after 5sec
    var timeOut = setTimeout(function () {
        $wikiElem.append("Could not load Wikipedia data!");
    }, 5000);

    // AJAX GET request
    $.ajax({
        url: wikiURL,
        method: 'GET',
        dataType: 'jsonp'
    }).success(function (response) {
        clearTimeout(timeOut);
        $wikiContainer.css("height", "60px");
        $wikiElem.css("background-color", "rgba(51, 51, 51, 0.8)");
        $wikiElem.css("height", "250px");
        $wikiElem.css("overflow", "auto");
        var titles = response[1];
        var wikiLinks = response[3];
        console.log(titles);
        console.log(wikiLinks[0]);
        for (var i = 0; i < titles.length; i++) {
            $wikiElem.append('<a href=\"' + wikiLinks[i] + '\">' + titles[i] + '</a></p>');
        }
    });
}

// Renders new greeting message and and the Google street view of the address appears as the background
function setBackground($street, $city, $address, $greeting, $nyContainer, $wikiContainer) {
    var message = "Let's check out " + $street + ", " + $city + "!";
    var apiURL = "http://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + $address + "\"";
    $greeting.html(message).css("color", "#ffffff");
    $nyContainer.css("color", "#ffffff");
    $wikiContainer.css("color", "#ffffff");
    $('.bgimage').attr("src", apiURL);
}

// Called on button submit of address and ets all variables, clears elements from old requests,
// and calls functions setBackground(), getNYTimes() and getWiki() to render requested data
function loadData() {

    // obtain variables using jQuery
    var $wikiElem = $('#wikipedia-links');
    var $wikiContainer = $('.wikipedia-container');
    var $nyContainer = $('.nytimes-container');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $street = $('#street').val();
    var $city = $('#city').val();
    var $address = $street + ', ' + $city;

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // Get and set background image
    setBackground($street, $city, $address, $greeting, $nyContainer, $wikiContainer);

    // Get and set relevant New York Times articles
    getNYTimes($city, $nyContainer, $nytElem);

    // Get and set relevant Wikipedia articles
    getWiki($city, $wikiElem, $wikiContainer);

    return false;
}

// on button submit
$('#form-container').submit(loadData);