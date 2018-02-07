// Initial button topics
var topics = ["XBox", "Movies", "Funny", "Dogs", "Cats", "Chickens"];
console.log(topics);

function renderTopics() {
  // Clear button list
  $("#topicBtn").empty();
  // Generate buttons dynamically
  for (var i = 0; i < topics.length; i++) {
    var btn = $("<a>");
    // add class to <a> buttons
    btn.addClass("waves-effect waves-light btn topic");
    // attribute "data-topic" to buttons
    btn.attr("data-topic", topics[i]);
    // add text to <a> btns
    btn.text(topics[i]);
    // Display topic buttons
    $("#topicBtn").append(btn);
  };
};

$("#getGiphy").on("click", function (event) {
  event.preventDefault();
  // save search input into topic variable
  var newTopic = $("#newTopic").val().trim();
  // add user input into iTopic array
  topics.push(newTopic);
  // reload topic buttons with new topic created
  renderTopics();
  // console.log(newTopic);
});
renderTopics();

// Giphy API Key: WZHhb0XPkhBWEFdTiBoAOSCWNEjMdapX
var apiKey = "api_key=WZHhb0XPkhBWEFdTiBoAOSCWNEjMdapX&limit=9";
// Add click event listen listener to all buttons
$(document).on("click", ".topic", function () {
  // Reset "#gifs-appear-here" div
  $("#gifs-appear-here").empty();
  // Grabbing and storing the data-topic property value from the button
  var topics = $(this).attr("data-topic");
  // Constructing a queryURL using the topic name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&" + apiKey;
  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After Data comes back from the request
    .done(function (response) {
      console.log(queryURL);
      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;
      $("#gifs-appear-here").empty();
      // Looping through each result item
      for (var j = 0; j < results.length; j++) {
        // Creating and storing a div tag
        var gifDiv = $("<div id='gifDiv'>");
        // Creating a paragraph tag with the result item's rating
        var rating = $("<p>").text("Rating: " + results[j].rating);
        // Creating and storing an image tag
        var topicImage = $("<img id='gifImg'>");
        // Setting the src attribute of the image to a property pulled off the result item
        topicImage.attr("src", results[j].images.fixed_height.url);
        // Append in the paragraph and image tag to the gifDiv
        gifDiv.append(rating);
        gifDiv.append(topicImage);
        // Prepend the gifDiv to the HTML page in the "gifs-appear-here" div
        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
});

// Prepend the btnDiv to the HTML page in the "topics" div
// $("#topics")
// $("#topics").append('<button class="waves-effect waves-light btn">');