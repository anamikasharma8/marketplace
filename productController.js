const Product = require('./productModel');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addNewProduct = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the request body

    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);

    // Check if it's a validation error
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      res.status(400).json({ message: 'Validation Error', errors: validationErrors });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const findProductsByName = async (req, res) => {
  try {
    const keyword = req.params.keyword; // Change to params to get the route parameter
    console.log('Keyword:', keyword);

    if (!keyword) {
      return res.status(400).json({ message: 'Search keyword is required' });
    }

    // Use a regular expression for case-insensitive search
    const products = await Product.find({ name: { $regex: new RegExp(keyword, 'i') } });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProductById,
  deleteProductById,
  deleteAllProducts,
  findProductsByName,
};

  

  
module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProductById,
  deleteProductById,
  deleteAllProducts,
  findProductsByName,
};