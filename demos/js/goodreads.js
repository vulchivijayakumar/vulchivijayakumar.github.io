/*
  Title: A simple GoodReads javascript client web app
  1. Should be able to search the books with name
  2. Interface to list the books with pagination
*/
const $ = jQuery; // $ defined to avoid jslinters to many $ errors.
$(function () {
  // variables
  let searchBtn = $('#search_btn');
  let searchInput = $('#search_input');
  let apiKey = '9ZVefZRKvvSiLfY7f3pQ';
  let searchType = 'title'; // title, author by default 'all'
  let inputTaskError = $('#input_task_error');
  let searchResults = $('#search_result');
  let count = $('#search_result_count');
  let response = $('#search_result_response');

  searchInput.on('focus', function () {
    inputTaskError.text('');
  });

  // input on change function
  searchInput.on('change', function () {
    inputTaskError.text('');
    searchResults.empty();
    count.text('0');
    response.text('0');
    // apiCall(searchInput, apiKey, searchType);
  });
  // search button click function
  searchBtn.on('click', function (e) {
    if (searchInput.val() !== '') {
      apiCall(searchInput.val(), apiKey, searchType);
      searchInput.val('');
    } else {
      inputTaskError.text('This field can not be empty');
    }
    e.preventDefault();
  });
  // apicall function
  function apiCall (input, key, type) {
    var url = `https://www.goodreads.com/search/index.xml?q=${input.replace(/ +/g, '-')}&key=${key}&search=${type}`;
    $.get('https://query.yahooapis.com/v1/public/yql',
      {
        // "select * from xml where url=\""+url+"\"",
        q: `select * from xml where url="${url}"`,
        format: 'xml'
      },
      function (xml) {
        // console.log(xml);
        let data = xmlToJson(xml);
        let books = data['query']['results']['GoodreadsResponse']['search']['results']['work'];
        if (books) {
          $('#search_result_error').text('');
          count.text(books.length);
          response.text(data['query']['results']['GoodreadsResponse']['search']['query-time-seconds']['#text']);
          console.log(books);
          console.log(data['query']);
          // response.text(books.)
          books.forEach(function (item, index) {
            let bookDiv = $('<div class="col-3"></div>');
            let bookTitle = item['best_book']['title']['#text'];
            let bookImage = item['best_book']['image_url']['#text'];
            let figureTag = $('<figure><img src="' + bookImage + '" alt="" title=""/><figcaption>' + bookTitle + '</figcaption></figure>');
            bookDiv.append(figureTag);
            searchResults.append(bookDiv);
          });
        } else {
          $('#search_result_error').text('no books found!');
        }
      }
    );
  }

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
