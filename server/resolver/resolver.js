const {books, authors} = require("../data/static");
const Author = require('../models/Author');
const Book = require('../models/Book');
const resolvers = {
  // Query
  Query: {
    books: async (parent, args, { mongoDataMethods }) =>
        await mongoDataMethods.getAllBooks(),
    book: (parent, args) => books.find(book => book.id == args.id),
    authors: () => authors,
    author: (parent, args) => authors.find(author => author.id == args.id),
  },
  Book: {
    author: (parent, args) => {
      return authors.find(author => author.id == parent.authorId)
    }
  },
  Author: {
    books: (parent, args) => {
      return books.filter(book => book.authorId == parent.id)
    }
  },

  // mutation
  Mutation: {
    createAuthor: async (parent, args) => {
      const newAuthor = new Author(args);
      return await newAuthor.save();
    },
    createBook: async (parent, args) => {
      const newBook = new Book(args);
      return await newBook.save();
    }
  }
}

module.exports = resolvers;