function findAuthorById(authors, id) {
  
  //Return early if no id provided
  if (!id) return "No id provided.";

  //for/in loop to pull author with matching id
  for (let author in authors) {
    
    //if statement to find matching author that returns the author
    if (authors[author].id === id) return authors[author]
  };
};

function findBookById(books, id) {

  //Return early if no id provided
  if (!id) return "No id provided.";

  //for/in to find the book with the matching id
  for (book in books) {
    if (books[book].id === id) return books[book];
  };
};

function partitionBooksByBorrowedStatus(books) {

  //filter the array of books, using for/in to access borrows
  const stillOutBooks = books.filter((book) => {

    if (book.borrows[0].returned === false) {
      return book;
    }
  });

  //Utilize the same filter method as above
    //Replace returned === false with true for books available
  let availableBooks = books.filter((book) => {
    
      if (book.borrows[0].returned === true) {
        return book;
      }
  });

  //Return an array of the two separate arrays created
  return [stillOutBooks, availableBooks]
};



function getBorrowersForBook(book, accounts) {

  //Remove the borrows array for the book presented
  const {borrows} = book;

  //Assign to a variable to be used
  const bookBorrowHistory = borrows;


  //Use reduce to return an array with the account info
    //Add the return status to each object in the array
  const bookBorrowsAcctInfo = bookBorrowHistory.reduce((acc, borrowAccount) => {

    for (let account in accounts) {
      let accountInfo = accounts[account];
      const accountId = accountInfo.id;

      if (accountId === borrowAccount.id) {
        accountInfo.returned = borrowAccount.returned;
        acc.push(accountInfo);
      };
    };
   return acc}, []);
  
  //Return the last 10 transactions if the array is greater than 10 elements
  return (bookBorrowsAcctInfo.length > 10) ? (bookBorrowsAcctInfo.slice(0,10)) : (bookBorrowsAcctInfo);
};


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
