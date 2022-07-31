//hack to make both import & require work
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express')
import { contextProp, tenantContextMiddleware } from './tenant-context.js';
import { dbConn } from './connection-factory.js';
import { bookSchema } from './book-schema.js';

const app = express()
app.use(tenantContextMiddleware)

const port = 3000


app.get('/', async (req, res) => {
  let Book = dbConn().model("Book", bookSchema);

  let books = await Book.find();
  let books2 = await Book.find();

  res.json(books2)
})

app.post('/books/:bookName', async (req, res) => {

  let Book = dbConn().model("Book", bookSchema);

  let book = new Book({'name': req.params.bookName});
  let saved = await book.save();

  res.json(saved);
})

app.get('/books/:bookName', async (req, res) => {

  let Book = dbConn().model("Book", bookSchema);

  let books = await Book.find({ "name": req.params.bookName})
  res.json(books)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
