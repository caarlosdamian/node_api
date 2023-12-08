const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/ProductModel.js');

const app = express();
app.use(express.json());
// routes

// request => user request
// response => server response

// nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

app.get('/', (req, res) => {
  res.send('Hello node test');
});

app.get('/blog', (req, res) => {
  res.send('Hello Blog, my name is carlos');
});

app.post('/product', async (req, res) => {
  try {
    const products = await Product.create(req.body);
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get('/products', async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res
        .status(404)
        .json({ message: `cannot find any product with id ${id}` });
    }
    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id, req.body);
    if (!product) {
      res
        .status(404)
        .json({ message: `cannot find any product with id ${id}` });
    }

    res.status(200).json(id);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect()
  .then(() => {
    console.log('Connected to mongodb');
    app.listen(3000, () => {
      console.log(`Node api app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
