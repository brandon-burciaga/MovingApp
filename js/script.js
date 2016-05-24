
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

    // Once address is submitted, a new greeting message appears and
    // and the Google street view of the address appears as the background
    var message = "Let's check out " + $street + ", " + $city + "!";
    var apiURL = "http://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + $address + "\"";
    $greeting.html(message).css("color", "#ffffff");
    $nyContainer.css("color", "#ffffff");
    $wikiContainer.css("color", "#ffffff");
    $('.bgimage').attr("src", apiURL);

    // Set NY Times Article Search URL using obtained API key and submitted city
    var apikey = '67765b4f2ce9410682abdec14f35a93e';
    var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + $city + '&api-key=' + apikey;

    // AJAX GET request. Response displays NY Times article links and snippets
    // and wikipedia links and snippets
    $.ajax({
        url: nytURL,
        method: 'GET',
        dataType: 'json'
    }).success(function(data) {
        $nyContainer.css("height", "60px");
        $nytElem.css("background-color", "rgba(51, 51, 51, 0.7)");
        $nytElem.css("height", "600px");
        $nytElem.css("overflow", "auto");
        $.each(data.response.docs, function(i, item) {
            $nytElem.append('<p><b>' + item.headline.main + '</b><br>' +
                '<a href=\"' + item.web_url + '\">' + item.web_url + '</a></p>');
        });
    }).error(function(err) {
        $nytElem.append("Could not load NY Times data!");
    });


    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
            $city + '&format=json&callback=wikiCallback';

    $.ajax({
        url: wikiURL,
        method: 'GET',
        dataType: 'jsonp'
    }).success(function(response) {
        $wikiContainer.css("height", "60px");
        $wikiElem.css("background-color", "rgba(51, 51, 51, 0.7)");
        $wikiElem.css("height", "600px");
        $wikiElem.css("overflow", "auto");
        var titles = response[1];
        var wikiLinks = response[3];
        console.log(titles);
        console.log(wikiLinks[0]);
        for(var i = 0; i < titles.length; i++) {
            $wikiElem.append('<p><b>' + titles[i] + '</b><br>' +
                '<a href=\"' + wikiLinks[i] + '\">' + wikiLinks[i] + '</a></p>');
        }
    });
    return false;
}

$('#form-container').submit(loadData);