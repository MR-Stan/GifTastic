let appObject = {

    // array of searches, buttons created based on content of this
    topics : ["hiking", "biking", "snowboarding", "running"],

    // current search
    search : "",

    // number of gifs display on screen after button click
    limit : "10", // returns 10 results

    // create intial HTML elements and run sebsequent functions
    initialize : function() {
         $("<form>").attr("id", "searchForm").appendTo("main");

            $("<p/>").text("Search for gifs: ").appendTo("#searchForm");

            $("<input/>").attr("id", "searchInput").appendTo("#searchForm");

            $("<button type='button'>").attr("id", "searchButton").text("Search").appendTo("#searchForm");

        $("<div/>").attr("id", "buttonContainer").appendTo("main");

        $("<div/>").attr("id", "gifContainer").appendTo("main");
        
        this.arrayButtons();
        this.newButton();
        this.checkGifStatus();
    },

    // create buttons based on contents of topics
    arrayButtons : function() {
        // clear buttonContainer to prevent duplicates
        $("#buttonContainer").empty();
        // create a button for each item in topics
        this.topics.forEach(function(i) {
            $("<button>").attr("data-name", i).addClass("gifButton").text(i).appendTo("#buttonContainer");
;        });
        // when a button is clicked call showGif function
        $(".gifButton").on("click", function() { 
            appObject.search = $(this).data("name");
            appObject.showGif();
        });
    },

    //when a button is clicked
    showGif : function() {
        // Giphy API key
        let key = "BImvRhJyYtNtABPNHp8mKOJB36yjcfK2&";
        appObject.queryURL = "https://api.giphy.com/v1/gifs/search?q=" + this.search + "&limit=" + this.limit + "&api_key=" + key;
        // creates AJAX call for the button
        $.ajax({
            url: appObject.queryURL,
            method: "GET"
            }).then(function(response) {
                let results = response.data;          
                for (let i = 0; i < results.length; i++) {
                    $("<p/>").addClass("ratings").text("Rating: " + results[i].rating
                        .toUpperCase())
                        .prependTo("#gifContainer");
                    $("<img>").addClass("gif")
                        .attr("src", results[i].images.fixed_height_still.url)
                        .attr("data-still", results[i].images.fixed_height_still.url)
                        .attr("data-animate", results[i].images.fixed_height.url)
                        .attr("data-state", "still")
                        .prependTo("#gifContainer");
                };
            });
        },

    newButton : function() {
        // when the search button is clicked
        $("#searchButton").on("click", function(event) {
            // prevents something...
            event.preventDefault;
            // taking in user input
            appObject.search = $("#searchInput").val().toLowerCase().trim();
            // as long as search isn't blank...
            if (appObject.search !== "") {
                // add the user's entry to topics and...
                appObject.topics.push(appObject.search);
                appObject.arrayButtons();
                $("#searchInput").val("");
            }
        });
    },

    // check if a gif is moving or still
    checkGifStatus : function() {
        $("#gifContainer").on("click", ".gif", function() {
            if ($(this).attr("data-state") === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
            else if ($(this).attr("data-state") === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
        });
    },
}

appObject.initialize();



