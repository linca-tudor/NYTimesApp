import { bestSellers } from "./Books";

export const getBestSellers = () => {
  const parsedLists = [];

  bestSellers.results.lists.forEach((list) => {
    parsedLists.push({
      title: list.list_name,
      data: list.books,
    });
  });
  return parsedLists;
};

export const getBookByName = (name) => {
  let foundBook;

  bestSellers.results.lists.forEach((list) => {
    list.books.forEach((book) => {
      if (book.title === name) foundBook = book;
    });
  });
  return foundBook;
};

export const getSearchedBooks = input => {
  let searchResults = []

  bestSellers.results.lists.forEach(list => {
    searchResults = [...searchResults, ...list.books];
  })

  return searchResults.filter(book => {
    return book.title.toLowerCase().indexOf(input.toLowerCase()) > -1
  });
};
