$(document).ready(function() {

	var numResults = 5;

	$("option").on("click", function() {
		numResults = $(this).val();
		console.log(numResults);
	})

	$(document).on("click", "#runSearch", function() {
		event.preventDefault();
		console.log("search button clicked");
		var apiKey = "api-key=275f027f5dcc4b2c8d5d2a669bf320ff";

		var searchInput = "&q=" + $("#searchTerm").val();
		var startDate = $("#startYear").val(); /*"&begin_date="+$("#startYear").val()*/ ;
		var endDate = $("#endYear").val(); /*"&end_date="+$("#endYear").val()*/;
		console.log(startDate);
		console.log(endDate);
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + apiKey + searchInput;
		if (startDate !== "") {
			queryURL += "&begin_date="+startDate;
		}
		if (endDate !== "") {
			queryURL += "&end_date="+endDate;
		}
		console.log(queryURL);
		// var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=275f027f5dcc4b2c8d5d2a669bf320ff&q=president";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			var results = response.response.docs;
			console.log(results);
			for (var i = 0; i < numResults; i++) {

				var newDiv = $("<div>");
				newDiv.append("<h3><span class='label label-primary'>" + (i+1) + "</span><strong>" + results[i].headline.main + "</strong></h3>");
				newDiv.append("<h5>" + results[i].byline.original + "</h5>");
				newDiv.append("<h5>Section: " + results[i].section_name + "</h5>");
				newDiv.append("<h5>" + results[i].pub_date + "</h5>");
				newDiv.append("<a href="+results[i].web_url+">" + results[i].web_url + "</a>");

				$("#wellSection").append(newDiv);
			}
		})
	})

})