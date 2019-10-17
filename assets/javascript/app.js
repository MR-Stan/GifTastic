let gameObject = {

    // array of searches, buttons created based on content of this, stored in localStorage
    itemArray : [],

    // current search
    currentSearch : "",

    // Giphy API key
    key : "BImvRhJyYtNtABPNHp8mKOJB36yjcfK2",

    // number of gifs display on screen after button click
    limit : 10, // returns 10 results

    // connects to giphy to obtain gifs
    //queryURL : "https://api.giphy.com/v1/gifs/search?q=${this.search}&api_key=${this.key}&limit=${this.limit}",

    queryURL : "https://api.giphy.com/v1/gifs/search?api_key=BImvRhJyYtNtABPNHp8mKOJB36yjcfK2&q=&limit=25&offset=0&rating=G&lang=en",

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
 
        this.newButton();
    },

    // // create buttons based on contents of itemArray
    arrayButtons : function() {
        // clear buttonContainer to prevent duplicates
        $("#buttonContainer").empty();
        // create a button for each item in itemArray
        this.itemArray.forEach(function(i) {
            $("<button>").attr("data-name", i).text(i).appendTo("#buttonContainer");
        });
    },

    // when a button is clicked
    liveButton : function() {
        // creates AJAX call for the specific search
        $.ajax({
            url: gameObject.queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(response);
                let results = response.data;
                console.log(results);

            });
    },

    newButton : function() {
        // when the search button is clicked
        $("#searchButton").on("click", function(event) {
            // prevents something...
            event.preventDefault;
            // taking in user input
            gameObject.currentSearch = $("#searchInput").val().trim();
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
            gameObject.liveButton();
            }
        });
    },

    // // check if a gif is moving or still
    // testGifStatus : function() {
    //     // create a class 
    //     $(document).on("click", "class goes here", function() {
    //         let gifState = $(this).attr("data-state");
    //         console.log(gifState);
    //         if (gifState === "animate") {
    //             gifStop();
    //         }
    //         else if (gifState === "still") {
    //             gifGo();
    //         }
    //     });
    // },

    // // make a moving gif stop
    // gifStop : function() {
    //     $(this).attr("data-state", "still")
    //     // css effects
    // },

    // // make a still gif move
    // gifGo : function() {
    //     $(this).attr("data-state", "animate")
    //     // css effects
    // },

}

gameObject.initialize();
//


