import pool from '../DB/db.js'
const getProducts = async (req,res)=>{
    try{
        console.log("Inside")
        const selectQuery="select * from product.products";

        const response= await pool.query(selectQuery);
        console.log("Result"+ JSON.stringify(response))
        if(res.statusCode=200){
            return res.status(200).json(response.rows)

        }
        else{
            console.log("Couldn't retrieve data")
            return res.status(404).json({error:'Data not found'})
        }

    }
    catch(error){
        console.log("Error retriveing data "+ error?.message)
        return res.status(500).json({error:'Internal Error'})

    }


}

//get single product by id

const getProductsById=async (req,res)=>{
    try{
    const id =req.params.id;
    const selectQuery=`select * from product.products where product_id=${id}`;
    const result= await pool.query(selectQuery);
    if(res.statusCode=200){
        if(result.rowCount===1){
            return res.status(200).json(result.rows)
        }else{
            console.log("Couldn't retrieve data")
            return res.status(404).json({error:'Data not found'})
        }

    }
}
    catch(error){
        console.log("Error retriveing data "+ error?.message)
        return res.status(500).json({error:'Internal Error'})

    }
    
}

//by category

const getProductsByCategory=async(req,res)=>{
    try{
        const category =req.params.category;
        console.log("error"+category);
    const selectQuery=`select * from product.products where category = '${category}'`;
    const result= await pool.query(selectQuery);
    if(res.statusCode===200){
        if(result.rowCount>=1){
            return res.status(200).json(result.rows)
        }else{
            console.log("Couldn't retrieve data")
            return res.status(404).json({error:'Data not found'})
        }

    }

}
    catch(error){
        console.log("Error retriveing data "+ error?.message)
        return res.status(500).json({error:'Internal Error'})

    }

    }

//by price

const getProductsByPriceRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.params;
        
       
        if (isNaN(parseFloat(minPrice)) || isNaN(parseFloat(maxPrice))) {
            return res.status(400).json({ error: 'Invalid price parameters' });
        }

        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);

        
        const selectQuery = `SELECT * FROM product.products WHERE price BETWEEN ${min} and ${max}`;
        const result = await pool.query(selectQuery);

        if (result.rowCount >= 1) {
            return res.status(200).json(result.rows);
        } else {
            console.log("No products found");
            return res.status(404).json({ error: 'No products found' });
        }

    } catch (error) {
        console.log("Error retrieving data: " + error?.message);
        return res.status(500).json({ error: 'Internal Error' });
    }
};

//create a new product inserted in db


const createProduct = async (req, res) => {
    const product = req.body;
    const query = `INSERT INTO product.products 
                      (product_name, price, category, star_rating, description, producr_code, imageurl) 
                      VALUES ('${product.product_name}', '${product.price}', '${product.category}', ${product.star_rating}, '${product.description}', '${product.product_code}', '${product.image_url}')`;
  
                      console.log("product"+ product.product_name)
    try {
      const result = await pool.query(query);
  
      if (result.rowCount > 0) {
        res.json(product);
        res.status(201);
      } else {
        res.status(500);
        res.json({ error: "Product not created" });
      }
    } catch (error) {
      res.status(500);
      res.json({ error: "Server Error" });
    }
  };

  //update the product star_rating


  const updateProductStarrating = async (req, res) => {
    try {
        const product_id = req.params.id;
        const { price, star_rating } = req.body;


        const updateQuery = `UPDATE product.products  SET price = ${price}, star_rating = ${star_rating} WHERE product_id = ${product_id} `;
        // const values = [price, star_rating, product_id];
        const result = await pool.query(updateQuery);

        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.log('Error updating product:', error.message);
        res.status(500).json({ error: 'Server Error' });
    }
};
//delete
const deleteProductById=async(req,res)=>{
    try {
        const product_id = req.params.id;
        
        const deleteQuery = `DELETE FROM product.products WHERE product_id = ${product_id}`;
        const result = await pool.query(deleteQuery);

        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.log('Error deleting product:', error.message);
        res.status(500).json({ error: 'Server Error' });
    }
};



export {getProducts,getProductsById,getProductsByCategory,getProductsByPriceRange,createProduct,updateProductStarrating,deleteProductById};