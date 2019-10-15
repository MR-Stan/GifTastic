
// Initial array of movies
var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=BImvRhJyYtNtABPNHp8mKOJB36yjcfK2&limit=5");
    xhr.done(function(data) { console.log("success got data", data); });

    var movie = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response);
    // Creates a div to hold the movie
    $("<div id='movieInfo'></div>").prependTo("#movies-view")
    // Retrieves the Rating Data
    var ratings = "Rated: " + response.Rated;
    // Creates an element to have the rating displayed
    $("<div id='ratings'></div>").appendTo("#movieInfo")
    // Displays the rating
    $("#ratings").append(ratings);
    // Retrieves the release year
    var released = "Release Date: " + response.Released;
    // Creates an element to hold the release year
    $("<div id='released'></div>").appendTo("#movieInfo")
    // Displays the release year
    $("#released").append(released);
    // Retrieves the plot
    var plot = "Plot: " + response.Plot;
    // Creates an element to hold the plot
    $("<div id='plot'></div>").appendTo("#movieInfo")
    // Appends the plot
    $("#plot").append(plot);
    // Creates an element to hold the image
    $("<div id='img1'></div>").appendTo("#movieInfo")
    // Appends the image
    $("#img1").append("<img src=" + response.Poster + "/>")
    // Puts the entire Movie above the previous movies.

    });

}

// Function for displaying movie data
function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of movie to our button
    a.addClass("movie");
    // Added a data-attribute
    a.attr("data-name", movies[i]);
    // Provided the initial button text
    a.text(movies[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
    }
}

// This function handles events where the add movie button is clicked
$("#add-movie").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var movie = $("#movie-input").val().trim();

    // The movie from the textbox is then added to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
