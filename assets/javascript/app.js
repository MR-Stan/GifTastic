let gameObject = {

    // array of searches, buttons created based on content of this, stored in localStorage
    itemArray : [],

    // current search
    currentSearch : "",

    // Giphy API key
    key : "api_key=BImvRhJyYtNtABPNHp8mKOJB36yjcfK2&q=",

    // number of gifs display on screen after button click
    limit : "&limit=10", // returns 10 results

    // connect to giphy to obtain gifs
    queryURL : "https://api.giphy.com/v1/gifs/search?",

    //queryURL : "https://api.giphy.com/v1/gifs/search?api_key=BImvRhJyYtNtABPNHp8mKOJB36yjcfK2&q=" + this.currentSearch + "&limit=10&offset=0&rating=G&lang=en",

    // check localStorage and create intial HTML elements
    initialize : function() {
        // if (localStorage.getItem("arrayItem")) {
        //     itemArray = JSON.parse(localStorage.getItem("arrayItem"));
        // }

        $("<form>").attr("id", "searchForm").appendTo("main");

            $("<p/>").text("Search: ").appendTo("#searchForm");

            $("<input/>").attr("id", "searchInput").appendTo("#searchForm");

            $("<button type='button'>").attr("id", "searchButton").text("Search").appendTo("#searchForm");

        $("<div/>").attr("id", "buttonContainer").appendTo("main");

        $("<div/>").attr("id", "gifContainer").appendTo("main");
        
        this.newButton();
    },

    // // create buttons based on contents of itemArray
    arrayButtons : function() {
        // clear buttonContainer to prevent duplicates
        $("#buttonContainer").empty();
        // create a button for each item in itemArray
        this.itemArray.forEach(function(i) {
            $("<button>").attr("data-name", i).addClass("gifButton").text(i).appendTo("#buttonContainer");
        });
        $(".gifButton").on("click", function() { 
            gameObject.liveButton();
        });
    },

    //when a button is clicked
    liveButton : function() {
        // creates AJAX call for the specific search
        $.ajax({
            url: gameObject.queryURL + gameObject.key + gameObject.currentSearch + gameObject.limit,
            method: "GET"
            }).then(function(response) {
                let results = response.data;          
                for (let i = 0; i < results.length; i++) {
                    $("<p/>").text("Rating: " + results[i].rating
                        .toUpperCase())
                        .prependTo("#gifContainer");
                    $("<img>").addClass("gif")
                        .attr("src", results[i].images.fixed_height_still.url)
                        .attr("data-still", results[i].images.fixed_height_still.url)
                        .attr("data-animate", results[i].images.fixed_height.url)
                        .attr("data-state", "still")
                        .prependTo("#gifContainer");
            };
            gameObject.testGifStatus();
            });
        },

    newButton : function() {
        // when the search button is clicked
        $("#searchButton").on("click", function(event) {
            // prevents something...
            event.preventDefault;
            // taking in user input
            gameObject.currentSearch = $("#searchInput").val().toLowerCase().trim();
            // may need to update for random characters
            // as long as currentSearch isn't blank do...
            if (gameObject.currentSearch !== "") {
                // add the user's entry to itemArray and...
                gameObject.itemArray.push(gameObject.currentSearch);
                // localStorage for next time
                // localStorage.clear();
                // localStorage.setItem("arrayItem", JSON.stringify(itemArray));

            gameObject.arrayButtons();
            $("#searchInput").val("");
            }
        });
    },

    // check if a gif is moving or still
    testGifStatus : function() {
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

gameObject.initialize();
//


