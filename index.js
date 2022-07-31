const express = require('express')
import { contextProp, tenantContextMiddleware } from 'tenant-context';

const dbUrl = (tenantId) => `mongodb://localhost:27017/${tenantId}`

// const tenantCtxLocalStorage = new AsyncLocalStorage();

// const tenantContextMiddleware = (req, res, next) => {
//   const tenantId  = req.headers['tenantid'];

//   const map = new Map();
//   map.set('tenantId', tenantId);

//   tenantCtxLocalStorage.run(map, () => next());
// }




const app = express()
app.use(tenantContextMiddleware)

const port = 3000


const bookScheme = new mongoose.Schema(
  {
    name: String
  }, 
  { timestamps: true }
)


function connectionFactory() {
  let tenantId = tenantCtxLocalStorage.getStore().get('tenantId');
  let conn = mongoose.createConnection(dbUrl(tenantId));
  let Book = conn.model("Book", bookScheme);
  return conn; 
};


app.get('/', async (req, res) => {

  let tenantId = tenantCtxLocalStorage.getStore().get('tenantId');
  let conn = await mongoose.createConnection(dbUrl(tenantId));
  let Book = conn.model("Book", bookScheme);

  console.log(conn.models['Book']);
  let books = await Book.find();

  res.json(books)
})

app.post('/books/:bookName', async (req, res) => {

  let tenantId = tenantCtxLocalStorage.getStore().get('tenantId');
  let conn = mongoose.createConnection(dbUrl(tenantId));
  let Book = conn.model("Book", bookScheme);

  let book = new Book({'name': req.params.bookName});
  let saved = await book.save();
  console.log(`saved at ${saved}`);

  res.send(`Book: ${req.params.bookName}`)
})

app.get('/books/:bookName', async (req, res) => {
  let tenantId = tenantCtxLocalStorage.getStore().get('tenantId');
  let conn = mongoose.createConnection(dbUrl(tenantId));
  let Book = conn.model("Book", bookScheme);

  let books = await Book.find({ "name": req.params.bookName})
  res.json(books)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
