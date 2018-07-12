/*
  Title: A simple GoodReads javascript client web app
  1. Should be able to search the books with name
  2. Interface to list the books with pagination
*/
const $ = jQuery;
$(document).ready(function () {
  let searchInput = 'titan'; // $('#search_input'); // book names i.e anna
  let apiKey = '9ZVefZRKvvSiLfY7f3pQ'; // goodreads api key
  let searchType = 'all';
  var url = `https://www.goodreads.com/search/index.xml?q=${searchInput}&key=${apiKey}&search=${searchType}`;
  $.get('http://query.yahooapis.com/v1/public/yql',
    {
      // "select * from xml where url=\""+url+"\"",
      q: `select * from xml where url="${url}"`,
      format: 'xml'
    },
    function (xml) {
      // console.log(xml);
      let data = xmlToJson(xml);
      let books = data['query']['results']['GoodreadsResponse']['search']['results']['work'];
      books.forEach(function (book, index) {
        // [0]['best_book']['title']['#text']
        console.log(book['best_book']['title']['#text']);
        console.log(book['best_book']['image_url']['#text']);
      });
    }
  );

  // Changes XML to JSON
  function xmlToJson (xml) {
    var obj = {};
    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        obj['@attributes'] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) { // text
      obj = xml.nodeValue;
    }
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof (obj[nodeName]) === 'undefined') {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof (obj[nodeName].push) === 'undefined') {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  }
});
