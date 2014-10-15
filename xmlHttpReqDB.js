/*
    Project: sql-ajax-web-doc-reader
    Author: Christopher Anzalone
    File: xmlHttpReqDB.js
*/

var x = new XMLHttpRequest;
var chapter = 0;


x.onreadystatechange = function () {
    if (x.readyState == 4 && x.status == 200) {
        var infoRet = JSON.parse(x.responseText);
        document.getElementById('infoDoc').innerHTML =
               infoRet.name + " <br /> by " + infoRet.author; // places text in info area, parsed
    }
};
x.open('GET', '/"PATH TO YOUR PAGESERVER.PHP FILE-REMOVE QUOTES"?name=dracula&function=info&file=dracula', true); // prepare the request             
x.send(); //send the request

//load chapter 0 when page loads 
var chapZeroReq = new XMLHttpRequest;
chapZeroReq.onreadystatechange = function () {
    if (chapZeroReq.readyState == 4 && chapZeroReq.status == 200) {
        document.getElementById('contentArea').innerHTML = chapZeroReq.responseText;
    }
};
chapZeroReq.open('GET', '/"PATH TO YOUR PAGESERVER.PHP FILE-REMOVE QUOTES"?name=dracula&function=getchapter&file=dracula&chapter=0', true);
chapZeroReq.send(null);


var asyncRequest = new XMLHttpRequest;

function getChapter(c) {
    chapter = c;
    asyncRequest.onreadystatechange = function () {
        if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {
            document.getElementById('contentArea').innerHTML = asyncRequest.responseText;
        }
    };
    asyncRequest.open('GET', '/"PATH TO YOUR PAGESERVER.PHP FILE-REMOVE QUOTES"?name=dracula&function=getchapter&file=dracula&chapter=' + chapter, true);
    asyncRequest.send(null);

    if (c == 0)
        document.getElementById('prevButton').disabled = true;
    else
        document.getElementById('prevButton').disabled = false;

    if (c == 27)
        document.getElementById('nextButton').disabled = true;
    else
        document.getElementById('nextButton').disabled = false;

    document.getElementById('chapDisplay').innerHTML = c;
}