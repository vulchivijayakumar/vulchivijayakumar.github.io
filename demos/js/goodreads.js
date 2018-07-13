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
  let searchResults = $('#search_result');
  let totalBooks = $('#search_result_count');
  let paginationControls = $('#pagination_controls');
  let paginationPrev = $('#pagination_prev');
  let paginationNext = $('#pagination_next');
  let maxPages;
  // api variables
  let booksPage = 1;
  let apiKey = '9ZVefZRKvvSiLfY7f3pQ';
  let searchType = 'title';
  // error variables
  let inputTaskError = $('#input_task_error');
  let searchResultErrror = $('#search_result_error');
  // input focus remove error message.
  searchInput.on('focus', function () {
    inputTaskError.text('');
  });
  // showing all books by default
  apiCall('1', booksPage, apiKey, 'all');
  // input on change function
  searchInput.on('change', function () {
    booksPage = 1;
    paginationControls.removeClass('is-enable');
    inputTaskError.text('');
    searchResults.empty();
    totalBooks.text('0');
  });
  // search button click function
  searchBtn.on('click', function (e) {
    if (searchInput.val() !== '') {
      apiCall(searchInput.val().replace(/ +/g, '-'), booksPage, apiKey, searchType);
      // searchInput.val('');
    } else {
      inputTaskError.text('This field can not be empty');
    }
    e.preventDefault();
  });
  // apicall function
  function apiCall (input, page, key, type) {
    $('#current_page').text(page);
    var url = `https://www.goodreads.com/search/index.xml?q=${input}&page=${page}&key=${key}&search=${type}`;
    $.get('https://query.yahooapis.com/v1/public/yql',
      {
        q: `select * from xml where url="${url}"`,
        format: 'xml'
      },
      function (xml) {
        // clearing exising search results
        searchResults.empty();
        let data = xmlToJson(xml);
        let books = data['query']['results']['GoodreadsResponse']['search']['results']['work'];
        let allBooks = data['query']['results']['GoodreadsResponse']['search']['total-results']['#text'];
        if (books) {
          paginationControls.addClass('is-enable');
          searchResultErrror.text('');
          totalBooks.text(allBooks);
          $('#total_pages').text(Math.ceil(parseInt(totalBooks.text()) / 20));
          books.forEach(function (item, index) {
            let bookDiv = $('<div class="col-3"></div>');
            let bookTitle = item['best_book']['title']['#text'];
            let bookImage = item['best_book']['image_url']['#text'];
            let figureTag = $('<figure><img src="' + bookImage + '" alt="" title=""/><figcaption>' + bookTitle + '</figcaption></figure>');
            bookDiv.append(figureTag);
            searchResults.append(bookDiv);
          });
          paginationController();
        } else {
          paginationControls.removeClass('is-enable');
          searchResultErrror.text('No books found! Please try again.');
        }
      }
    );
  }
  function paginationController () {
    maxPages = Math.ceil(parseInt(totalBooks.text()) / 20);
    if (booksPage === 1) {
      paginationPrev.addClass('is-disable');
    }
    paginationNext.unbind('click').click(function () {
      booksPage++;
      if (booksPage === maxPages) {
        paginationPrev.removeClass('is-disable');
        $(this).addClass('is-disable');
        callApiAgain();
      } else if (booksPage < maxPages) {
        paginationPrev.removeClass('is-disable');
        callApiAgain();
      } else {
        $(this).addClass('is-disable');
      }
    });
    paginationPrev.unbind('click').click(function () {
      booksPage--;
      if (booksPage > 0) {
        paginationNext.removeClass('is-disable');
        callApiAgain();
      } else {
        $(this).addClass('is-disable');
      }
    });
    function callApiAgain () {
      if (searchInput.val() === '') {
        apiCall('1', booksPage, apiKey, 'all');
      } else {
        apiCall(searchInput.val(), booksPage, apiKey, searchType);
      }
    }
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
