(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref]; 
        appendString += '<li><a href="' + item.url + '">';
            appendString += '<h2>' + item.title + '</h2>';
            appendString += '<p class="date"><time itemprop="datePublished">' + item.date + '</time></p>';
            appendString += '<p class="author">Author: <span itemprop="author" itemscope="" itemtype="http://schema.org/Person"><span itemprop="name">' + item.author + '</span></span></p>';
            appendString += '<div class="short-line"></div>';
            appendString += '<img src="' + item.img + '" alt="' + item.title + '" class="img-responsive">';
            appendString += '<div class="blog-post-content"><p>' + item.description + '</p></div>';
        appendString += '</a></li>';
    }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<div class="blog-content-zero"><p class="search-summary"><em>zero results</em></p></div> ';
    }
  }

  function displayCountResults(results, store) {
    var countResults = document.getElementById('count-results');


    if (results.length) { // Are there any results?
      var appendString = '';
      var count = 0;

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref]; 
          count = count + 1;
    }
      appendString += '<em>' + count + '</em> results';
      countResults.innerHTML = appendString;
    } 
  }



  function getQueryVariable(variable) {
    var q = window.location.search.substring(1);
    var vars = q.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('q');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 50 });
      this.field('author', { boost: 20 });
      this.field('categories', { boost: 10 });
      this.field('description', { boost: 30 });
      this.field('content', { boost: 50 });
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'author': window.store[key].author,
        'categories': window.store[key].categories,
        'description': window.store[key].description,
        'content': window.store[key].content
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section
      displayCountResults(results, window.store); // We'll write this in the next section
    }
  }
})();
