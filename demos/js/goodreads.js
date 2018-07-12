const $ = jQuery;
goodRead('9382749004'); // not found
goodRead('0441172717'); // single author
goodRead('0552137030'); // multiple author

function goodRead (isbn) {
  var key = '9ZVefZRKvvSiLfY7f3pQ'; // replace with your key
  var url = 'https://www.goodreads.com/search/index.xml';
  $.get(url,
    {
      q: `select * from xml where url="{url}"`,
      format: 'json'
    },
    function (json) {
      if (json.query.results.error === 'Page not found') {
        console.log('no book found');
      } else {
        var book = json.query.results.GoodreadsResponse.book;
        var title = book.title;
        var isbn10 = book.isbn;
        var isbn13 = book.isbn13;
        var countryCode = book.country_code;
        var imageUrl = book.image_url;
        var smallImageUrl = book.small_image_url;
        var publisher = book.publisher;
        var description = book.description;
        var allAuthors = book.authors.author;
        var authors;
        if (book.authors.author.length === undefined) {
          // single author
          authors = [allAuthors.name];
        } else {
          // multiple authors
          var authorCount = allAuthors.length;
          authors = [];
          for (var i = 0; i < authorCount; i++) {
            authors.push(allAuthors[i].name);
          }
        }
        var bookObject = {
          'title': title,
          'isbn10': isbn10,
          'isbn13': isbn13,
          'country_code': countryCode,
          'image_url': imageUrl,
          'small_image_url': smallImageUrl,
          'publisher': publisher,
          'description': description,
          'authors': authors
        };
        console.log(bookObject);
      }
    }
  );
}
