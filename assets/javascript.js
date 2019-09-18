$("button").on("click", function(){
    $("#gif-section").empty();

    var show = $(this).attr("data-term");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    show + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var results = response.data;
        console.log(results)
        for (var i =0; i<results.length; i++){
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var showGif = $("<img>").addClass("gif");
            showGif.attr("src", results[i].images.fixed_height_still.url);
            showGif.attr("data-still", results[i].images.fixed_height_still.url);
            showGif.attr("data-animate", results[i].images.fixed_height.url);
            showGif.attr("data-state", "still")

            gifDiv.prepend(p, showGif);

            $("#gif-section").prepend(gifDiv)
        }
    })

});
$("#gif-section").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    var stillURL = $(this).attr("data-still");
    var animateURL = $(this).attr("data-animate");

    if (state === "still"){
        $(this).attr({"src": animateURL, "data-state": "animate"})
    } else {
        $(this).attr({"src": stillURL, "data-state": "still"})
    }
});
var showsAdded= []
function renderButtons() {
    $("#new-buttons").empty()
    for (var i = 0; i < showsAdded.length; i++){
      var newButton = $("<button>").text(showsAdded[i])
      $("#new-buttons").append(newButton)
    }
  }
$("#add-input").on("click", function(event) {
    event.preventDefault();

    var newShow = $("#search-input").val().trim()
    showsAdded.push(newShow)
    renderButtons()
    $("#search-input").val("")
  })