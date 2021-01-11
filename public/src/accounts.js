function findAccountById(accounts, id) {
  //Return early if no id provided

  if (!id) return "No id provided.";

  //loop with for/in through the object and match the id with the object id, return the object
  const accountInfo = accounts.find((account) => {
    if (account.id === id) return account;
  });

  return accountInfo
};;


//helper array to gather account name details
function gatherAccountNames(accounts) {

  //Use .map to pull account name details and put in array
  const accountNames = accounts.map((account) => {
    
    const {name : {first, last}} = account
    return {name: {first, last}}
  });
  return accountNames;
};

function sortAccountsByLastName(accounts) {
  
  //Call on the helper function, then sort the names in alphabetical order
  const accountNames = gatherAccountNames(accounts).sort((nameA, nameB) => nameA.name.last.toLowerCase()>nameB.name.last.toLowerCase() ? 1 : -1);

  return accountNames;
};



function numberOfBorrows({id}, books) {
  //Create a new array of the borrows array for each book
  const borrowsArray = books.map((book) => book.borrows);

  //Set an empty array to be filled with the borrow ids and returned
  let referenceBorrowsArray = [];

  //Using a double for loop (due to nested arrays) to pull the id values and place them in the reference array
  for (let indx = 0; indx < borrowsArray.length; indx++) {
    const bookBorrowHistory = borrowsArray[indx];
    
    for (let x = 0; x < bookBorrowHistory.length; x++) {
      const bookBorrowInstance = bookBorrowHistory[x];
      referenceBorrowsArray.push(bookBorrowInstance.id);
    };
  };
 
  //Use reduce() to count through the reference Array and add to borrowCount
  let borrowCount = 0;
  const addTheBorrows = referenceBorrowsArray.reduce((acc, num) =>{
    
    //Match the account Id #'s to count that person's # of borrows
    if (num === id) borrowCount += 1;
     });
  return borrowCount;
  };


  function getBooksPossessedByAccount({id}, books, authors) {
  
    //Filter out books to match the account id given and that it has not been returned
    let outBooks = books.filter((book) => {

      //For loop utilized to get inside borrows array
      for (let indx = 0; indx < book.borrows.length; indx++) {
        const bookBorrows = book.borrows[indx];
        if (bookBorrows.id === id && bookBorrows.returned === false) {
  
          //Alter borrows key to have a value of only the non-returned
          book.borrows = [bookBorrows];
          return book};
        };
      });
    
    //Filter method on authors to move the author info object to a newly created author key for the matching author id
    let authorsAdded = authors.filter((author) => {
      
      //for loop to iterate through outbooks
      for (let indx = 0; indx < outBooks.length; indx++) {
        const outBookInfo = outBooks[indx];

        //if statement to match author ID with the outBook's author ID
        if (author.id === outBookInfo.authorId) {
          outBookInfo.author = author;
        };
      };
    });

    //Return the finally altered outbooks
    return outBooks;
  };
  
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
