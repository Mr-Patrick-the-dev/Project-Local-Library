function totalBooksCount(books) {

  //Return the books array length
  return books.length;
};

function totalAccountsCount(accounts) {

  //Return the accounts array length
  return accounts.length;
};

function booksBorrowedCount(books) {

  //filter out the books that are still out
  const booksStillOut = books.filter((book) => {

    //Go through the borrows key and only return those that have returned = false
    for (let indx = 0; indx < book.borrows.length; indx++) {
      const borrowInfo = book.borrows[indx];

      if (borrowInfo.returned === false) return book;
    };
  });
  //return the length of the filtered array
  return booksStillOut.length;
};

function getMostCommonGenres(books) {

  //Create an array of all genres in the books array
  const genresInStore = books.map((book) => book.genre);
  
  //Create an array of objects, each representing a different genre
    //Reduce the array of all genres in the books array to do so
      //Use let to assign the variable, so we can alter it 
  let genresListed = genresInStore.reduce((acc, genre) => {
    
    if (!acc.includes(genre)) {acc.push(genre)
    };
    return acc}, [])
    //reduce it further to create an object for each genre
    .reduce((acc, genre) =>{

    acc.push({name: genre});
    
    return acc}, []);
  
  //Loop through the newly created genre list and iterate through each genre name
      //Set a counter as well to keep track of that genre's occurences
  for (let genreInfo in genresListed) {
    let specificGenre = genresListed[genreInfo];
    const genreName = specificGenre.name;
    let counter = 0;

    //Loop through the array of all genres in the books array
    for (let indx = 0; indx < genresInStore.length; indx++) {
      const bookGenre = genresInStore[indx];

      //Each time a genre is seen in the books array, add a 1 to that counter
      if (bookGenre === genreName) {
        counter = counter + 1;
      };
    };
    //Create a new key of "count" with the value of the counter for the current genre in the genre list
    specificGenre.count = counter;
  };

  //Sort the list of genres based on the highest count
  const genresListedandCounted = genresListed.sort((genreA, genreB) => genreB.count - genreA.count);
  
  //Return the sorted list, only the top 5 if there are more than 5 genres listed
  return (genresListedandCounted.length > 5) ? (genresListedandCounted.slice(0,5)) : (genresListedandCounted);
};

function getMostPopularBooks(books) {
 
  //Use map to create an array of objects of just the title and borrows length
  const booksInStore = books.map((book) => {
    const {title, borrows} = book;
    //console.log(book.borrows)
    return {name: title, count: borrows.length};
  });

  //Sort the newly created books in store, starting from high to low based on borrows count
  const sortedBooksInStore = booksInStore.sort((bookA, bookB) => bookB.count-bookA.count);
  //console.log(sortedBooksInStore)
  //Return only the top 5 books if the sorted list is greater than 5 elements long
  //console.log(sortedBooksInStore.slice(0,5))
  return (sortedBooksInStore.length > 5) ? (sortedBooksInStore.slice(0,5)) : (sortedBooksInStore);
};


function getMostPopularAuthors(books, authors) {

  //Create an array from books to return only each book's author ID and borrows array length
  const bookByAuthIdandCount = books.map((book) => {

    const {authorId, borrows} = book;
    return {authorId, count: borrows.length};
  });

  //Create an array from authors to return only each author's full name
  const allAuthors = authors.map((author) => {
    const {name: {first, last}} = author;
    return `${first} ${last}`;
  })

  //Using reduce, create an array of objects from the array of authors' full names
    //Each object must include a name and id key, consisting of the author name and Id #
      //To match, verify that the author's name in allAuthors includes the author's last name in "authors"
  const authorsPopularity = allAuthors.reduce((acc, author) => { 
      
      for (let authorInfo in authors) {
        let authorDescrip = authors[authorInfo];
        const authorIdNum = authorDescrip.id;
        const authorLastName = authorDescrip.name.last;

        if (author.includes(authorLastName)) {
          acc.push({name: author, id: authorIdNum});
        }
      };
      return acc}, []);
      
  //Using let, create a variable for an array of non-duplicate authors
    //Map the author's names into an array, then convert it to a Set
      //Once it's a set, it will become an array with Array.from()
        //Once it's an array again, map again to create an array with unique authors
          //Use .find to match the first instance of the author from authorsPopularity with the list of non-duplicate author  names
  let uniqueAuthors = Array.from(new Set(authorsPopularity.map((author) => author.name)))
    .map((name) => {
      return authorsPopularity.find((author) => author.name === name);
    });

  //Iterate through uniqueAuthors and the array of book Author ID's and borrow counts
    //count each of the author's books borrow count
      //Add this to the author's count
  for (let author in uniqueAuthors) {
    let authorInfo = uniqueAuthors[author];
    const authorIdNum = authorInfo.id;
    let counter = 0;

    for (let indx = 0; indx < bookByAuthIdandCount.length; indx++) {
      const bookInfo = bookByAuthIdandCount[indx];

      if (authorIdNum === bookInfo.authorId) {
        counter += bookInfo.count;
      };
    };
    
    //Add a key to that author in uniqueAuthors for the count total, set it to counter
    authorInfo.count = counter;
  };

  //Iterate through uniqueAuthors using map
    //Create a new array of objects, each object consisting of only the name and count of the author
  const popularAuthors = uniqueAuthors.map((author) => {
    const {name, count} = author;
    return {name, count};
  });

  //Sort the new array of authors based on their counts, highest to lowest
  const sortedPopularAuthors = popularAuthors.sort((authorA, authorB) => authorB.count - authorA.count);

  //Return the top 5 authors on the sorted list if the list is longer than 5 authors
  return (sortedPopularAuthors.length > 5) ? (sortedPopularAuthors.slice(0,5)) : (sortedPopularAuthors); 
};

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
