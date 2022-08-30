export const getBestSellers = async () => {
  const parsedLists = [];

  const resp = await fetch(
    "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=DWBqhRsvR2qyt8O3T6PlvsOl2lqO0hTu"
  );
  const data = await resp.json();

  data.results.lists.forEach((list) => {
    parsedLists.push({
      title: list.list_name,
      data: list.books,
    });
  });

  return parsedLists;
};

export const getBookByName = async (name) => {
  let foundBook;

  const resp = await fetch(
    "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=DWBqhRsvR2qyt8O3T6PlvsOl2lqO0hTu"
  );
  const data = await resp.json();

  data.results.lists.forEach((list) => {
    list.books.forEach((book) => {
      if (book.title === name) foundBook = book;
    });
  });

  return foundBook;
};

export const getSearchedBooks = async (input) => {
  let searchResults = [];

  const resp = await fetch(
    "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=DWBqhRsvR2qyt8O3T6PlvsOl2lqO0hTu"
  );
  if (resp.ok) {
    const data = await resp.json();
    data.results.lists.forEach((list) => {
      searchResults = [...searchResults, ...list.books];
    });

    return searchResults.filter((book) => {
      return book.title.toLowerCase().indexOf(input.toLowerCase()) > -1;
    });
  } else {
    return 429;
  }
};
