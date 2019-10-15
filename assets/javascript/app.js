let gameObject = {

    // array of searches, buttons created based on content of this, stored in localStorage
    itemArray : [],

    // 
    search : "",

    // Giphy API key
    key : "BImvRhJyYtNtABPNHp8mKOJB36yjcfK2",

    // number of gifs display on screen after button click
    resultNumber : 10, // returns 10 results

    // connects to giphy to obtain gifs
    queryURL : `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${resultNumber}`,

    // create intial HTML elements
    initialHtml : function() {

        $("<form id='searchForm'>").appendTo("main");

            $("<p/>").text("Search: ").appendTo("#searchForm");

            $("<textarea/>").attr("id", "searchInput").appendTo("#searchForm");

            $("<button>").attr("id", "searchButton").appendTo("#searchForm");

        $("<div/>").attr("id", "buttonContainer").appendTo("main");
    },

    // create buttons based on contents of itemArray
    createButtons : function() {
        $("#buttonContainer").empty();
        this.itemArray.forEach(function(i) {
            $("<button>").attr("data-name", gameObject.itemArray[i]).text(gameObject.itemArray[i]).appendTo("#buttonContainer");
        });
    },


    workingButtons : function() {
        // creates AJAX call for the specific movie button being clicked
        $.ajax({
            url: gameObject.queryURL,
            method: "GET"
            }).then(function(response) {
            let results = response.data;
            console.log(response);
            });
    },

    search : function(result) {
        this.search = result;
    },

    gifStop : function() {

    },

    gifGo : function() {

    },

}


// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {


    
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
