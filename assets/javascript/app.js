let gameObject = {

    // array of searches, buttons created based on content of this, stored in localStorage
    itemArray : ["Test"],

    // current search
    search : "",

    // Giphy API key
    key : "BImvRhJyYtNtABPNHp8mKOJB36yjcfK2",

    // number of gifs display on screen after button click
    resultNumber : 10, // returns 10 results

    // connects to giphy to obtain gifs
    queryURL : "https://api.giphy.com/v1/gifs/search?q=${this.search}&api_key=${this.key}&limit=${this.resultNumber}",

    // check localStorage and create intial HTML elements
    initialize : function() {
        // if (localStorage.getItem("arrayItem")) {
        //     itemArray = JSON.parse(localStorage.getItem("arrayItem"));
        // }

        $("<form>").attr("id", "searchForm").appendTo("main");

            $("<p/>").text("Search: ").appendTo("#searchForm");

            $("<textarea/>").attr("id", "searchInput").appendTo("#searchForm");

            $("<button>").attr("id", "searchButton").text("Search").appendTo("#searchForm");

        $("<div/>").attr("id", "buttonContainer").appendTo("main");
    },

    // create buttons based on contents of itemArray
    arrayButtons : function() {
        // clear buttonContainer to prevent duplicates
        $("#buttonContainer").empty();
        // create a button for each item in itemArray
        this.itemArray.forEach(function(i) {
            console.log(i);
            $("<button>").attr("data-name", i).text(i).appendTo("#buttonContainer");
        });
    },

    liveButton : function() {
        // creates AJAX call for the specific search
        $.ajax({
            url: gameObject.queryURL,
            method: "GET"
            }).then(function(response) {
            let results = response.data;
            console.log(results);
            });
    },

    search : function(result) {
        this.search = result;
        this.liveButton();
    },

    newButton : function() {
        // when the search button is clicked
        $("#searchButton").on("click", function(event) {
            // prevents something...
            event.preventDefault;
            let currentSearch = $("#searchInput").val().trim();
            console.log(currentSearch);
            // may need to update for random characters
            if (currentSearch !== "") {
                gameObject.itemArray.push(currentSearch);
                console.log(gameObject.itemArray);
                //localStorage.clear();
                //localStorage.setItem("arrayItem", JSON.stringify(itemArray));
            gameObject.search(currentSearch);
            gameObject.arrayButtons();
            $("#searchInput").val("");
            }
        });
    },

    testGifStatus : function() {
        // create a class 
        $(document).on("click", "class goes here", function() {
            let gifState = $(this).attr("data-state");
            console.log(gifState);
            if (gifState === "animate") {
                gifStop();
            }
            else if (gifState === "still") {
                gifGo();
            }
        });
    },

    gifStop : function() {
        $(this).attr("data-state", "still")
        // css effects
    },

    gifGo : function() {
        $(this).attr("data-state", "animate")
        // css effects
    },

}

gameObject.initialize();
gameObject.arrayButtons();