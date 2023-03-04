import Product from "../models/Products";

export const readAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
}

export const createProduct = async (req, res) => {
    const {name, category, price, imgURL} = req.body;
    const createProduct = new Product({name, category, price, imgURL});
    const productSave = await createProduct.save()
    res.status(201).json(productSave);
}

export const readProduct = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
}

export const updateProduct = async (req, res) => {
    const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true,
    });
    res.status(200).json(updateProduct); 

}

export const deleteProduct = async (req, res) => {
    const {productId} = req.params;
    const deleteProduct = await Product.findByIdAndDelete(productId);    
    res.status(200).json(deleteProduct);
}





