/**
 * @interface Book
 * @param {string} title - the title of the book
 * @param {string} author - the author of the book
 * @param {string} genre - the genre of the book
 * @param {string} ISBN - the ISBN of the book (optional)
 * @param {boolean} focused - whether the book is focused
 */
export interface Book {
  title: string;
  author: string;
  genre: string;
  ISBN?: string;
  focused: boolean;
}
