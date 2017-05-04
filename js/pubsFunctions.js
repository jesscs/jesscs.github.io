var conferenceDict = {"CHI":
                            "Proceedings of the ACM Conference on Human Factors in Computing Systems",
                        "CSCW":
                            "Proceedings of the ACM Conference on Computer Supported Cooperative Work",
                        "PervasiveHealth":
                            "Proceedings of the International Conference on Pervasive Computing Technologies for Healthcare"}

function sortYears(pubs){
    var sortedYears = [];
    for (year in pubs) {
        if (pubs.hasOwnProperty(year)) {
            sortedYears.push(year);
        }
    }
    sortedYears.sort();
    sortedYears.reverse();
    return sortedYears;
}

function getAuthors(pub){
    var myName = "<i>Jessica Schroeder</i>";
    var firstAuthors = "";
    var lastAuthors = "";
    if (pub["authorsBefore"].length>0) firstAuthors = pub["authorsBefore"].join(", ") + ", ";
    if (pub["authorsAfter"].length>0) lastAuthors = ", " + pub["authorsAfter"].join(", ");
    return firstAuthors +  myName + lastAuthors;
}

function getVenueAndLink(pub, year){
    var venueString;
    if(pub["venue"] in conferenceDict){
        venueString = conferenceDict[pub["venue"]] +
            " (" + pub["venue"] + " " + year + ") "
    }
    else{
        venueString = pub["venue"] + " " + year;
    }
    var linkString = "To Appear";
    if("link" in pub){
        linkString ='<a href="' + pub["link"] + '"><strong>LINK</strong></a>';
    }
    return venueString + " || " + linkString;
}
    

function addPub(contentDiv, pub){
    var pubDiv = contentDiv.append("div").attr("class","less-spacing");
    pubDiv.append("div").attr("class","title").text(pub["title"]);
    pubDiv.append("div").attr("class","authors").html(getAuthors(pub));
    pubDiv.append("div").attr("class","venue").html(getVenueAndLink(pub, year));
    if("award" in pub){
        pubDiv.append("div").attr("class","award").html(pub["award"]);
    }
    contentDiv.append("br");
}


function addAllPubs(pubs){
    var contentDiv = d3.select("#pubsContent");
    var selectDiv = d3.select("#selectPubs");
    var sortedYears = sortYears(pubs);
    for (var y=0; y<sortedYears.length; y++) {
        var year = sortedYears[y];
        contentDiv.append("h4").text(year);
        var pubsInYear = pubs[year];
        for(var i=0; i<pubsInYear.length; i++){
            var pub = pubsInYear[i];
            addPub(contentDiv, pub);
            if (pub["select"] === true) addPub(selectDiv, pub);
        }
    }
}

// Load the publications
function loadData() {
    d3.json("website/pubs/pubs.json", function(error, pubs) {
        addAllPubs(pubs);
    });
}

loadData();