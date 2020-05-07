var conferenceDict = 
    {"CHI":
        "Proceedings of the ACM Conference on Human Factors in Computing Systems",
    "CSCW":
        "Proceedings of the ACM Conference on Computer Supported Cooperative Work",
    "PervasiveHealth":
        "Proceedings of the International Conference "+
                            "on Pervasive Computing Technologies for Healthcare",
    "ISRII":
        "The International Society for Research on Internet Interventions",
    "DIS":
        "Proceedings of the ACM Conference on Designing Interactive Systems",
    "UbiComp": 
        "Proceedings of the ACM International Joint Conference "+
                            "on Pervasive and Ubiquitous Computing"}

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
    if (pub["authorsBefore"].length>0){
        firstAuthors = pub["authorsBefore"].join(", ") + ", ";
    }
    if (pub["authorsAfter"].length>0){
        lastAuthors = ", " + pub["authorsAfter"].join(", ");
    }
    return firstAuthors +  myName + lastAuthors;
}

function getVenue(pub, year){
    if(pub["venue"] in conferenceDict){
        venueString = conferenceDict[pub["venue"]] +
            " (" + pub["venue"] + " " + year + ")"
    }
    else{
        venueString = pub["venue"] + " " + year;
    }
    venueString += "<br/>"
    return venueString;
}

function getLinks(pub){
    var linkString = "";
    if("pdf" in pub){
        linkString +='<a href="pubs/pdfs/' +
            pub["pdf"] + '.pdf"><strong>PDF</strong></a>';
    }
    if("link" in pub){
        if(linkString.length>0){
            linkString += " || " 
        }
        linkString +='<a href="' + pub["link"] + '"><strong>LINK</strong></a>';
    }
    if("toAppear" in pub && pub["toAppear"] == true){
        if(linkString.length>0){
            linkString += " || " 
        }
        linkString += "To Appear"
    }
    return linkString
}
    

function addPub(contentDiv, pub, year){
    var pubDiv = contentDiv.append("div").attr("class","less-spacing");
    pubDiv.append("div").attr("class","pubTitle").text(pub["title"]);
    pubDiv.append("div").attr("class","authors").html(getAuthors(pub));
    pubDiv.append("div").attr("class","venue").html(getVenue(pub, year));
    if("award" in pub){
        pubDiv.append("div").attr("class","award").html(pub["award"]);
    }
    pubDiv.append("div").attr("class","venue").html(getLinks(pub));
    contentDiv.append("br");
}


function addAllPubs(pubs){
    var contentDiv = d3.select("#pubsDiv");
    var selectDiv = d3.select("#selectPubs");
    var first = true;
    for (var pubType in pubs) {
        if(first){
            contentDiv.append("h4").attr({'class':'first'}).text(pubType);
            first=false;
        }
        else{
            contentDiv.append("h4").text(pubType);
        }
        var sortedYears = sortYears(pubs[pubType]);
        for (var y=0; y<sortedYears.length; y++) {
            var year = sortedYears[y];
            contentDiv.append("h5").text(year);
            var pubsInYear = pubs[pubType][year];
            for(var i=0; i<pubsInYear.length; i++){
                var pub = pubsInYear[i];
                addPub(contentDiv, pub, year);
                if (pub["select"] === true) addPub(selectDiv, pub, year);
            }
        }
    }
}

// Load the publications
function loadData() {
    d3.json("pubs/pubs.json", function(error, pubs) {
        addAllPubs(pubs);
    });
}

loadData();