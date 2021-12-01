import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { db } from '../server.js';

const router = express.Router();

router.post('/', expressAsyncHandler( async (req,res) => {
  const productName = req.body.productname;
  const url = req.body.productimage;
  const brandName = req.body.brandname;
  const categoryName = req.body.categoryname;
  const quantity = parseInt(req.body.quantity);
  const rate = parseInt(req.body.rate);
  const productStatus = parseInt(req.body.rate);

  db.query(
    'INSERT INTO product (product_name, product_image, brand_id, categories_id, quantity, rate, active, status) VALUES (?, ?, ?, ?, ?, ?, ?, 1)',
    [ productName, url, brandName, categoryName, quantity, rate, productStatus, 1 ],
    (err, result) => {
      if(result) {
        res.send(result)
      } else {
        res.send({ message: 'Failed to register brand' })
      }
    }
  )
}))

router.get('/', expressAsyncHandler( async (req,res) => {
  db.query(
    'SELECT product.product_id, product.product_name, product.product_image, product.brand_id, product.categories_id, product.quantity, product.rate, product.active, product.status, brands.brand_name, categories.categories_name FROM product INNER JOIN brands ON product.brand_id = brands.brand_id INNER JOIN categories ON product.categories_id = categories.categories_id WHERE product.status = 1',
    (err, result) => {
      if(err) {
        console.log({ error: err });
      }
      if(result) {
        res.send(result)
      } else {
        res.send({ message: "Fail to bring productlist" })
      }
    }
  )
}))

router.get('/brand', expressAsyncHandler( async (req,res) => {
  db.query(
    'SELECT brand_id, brand_name, brand_active, brand_status FROM brands WHERE brand_status = 1', 
    (err, result) => {
      if(err) {
        console.log({ error: err });
      }
      if(result) {
        res.send(result)
      } else {
        res.send({ message: "Fail to bring brands" });
      }
    }
  )
}));

router.get('/brand/:id', expressAsyncHandler( async (req,res) => {
  db.query(
    'SELECT brand_id, brand_name, brand_active, brand_status FROM brands WHERE brand_id = ?', req.params.id, 
    (err, result) => {
      if(err) {
        console.log({ error: err });
      }
      if(result) {
        res.send(result)
      } else {
        res.send({ message: "Fail to bring brand" });
      }
    }
  )
}));

router.get('/brand/option', expressAsyncHandler( async (req,res) => {
  db.query(
    'SELECT brand_id, brand_name, brand_active, brand_status FROM brands WHERE brand_status = 1 AND brand_active = 1', 
    (err, result) => {
      if(err) {
        console.log({ error: err });
      }
      if(result) {
        res.send(result)
      } else {
        res.send({ message: "Fail to bring brands" });
      }
    }
  )
}));

router.get('/brand/remove/:id', expressAsyncHandler( async (req,res) => {
db.query(
  'UPDATE brands SET brand_status = 2 WHERE brand_id = ?', req.params.id,
  (err, result) => {
    if(err) {
      console.log({ error: err });
    }
    if(result) {
      res.send(result)
    } else {
      res.send({ message: "Fail to remove brands" });
    }
  }
)
}));
  
router.post('/brand', expressAsyncHandler( async (req,res) => {
  const brandname = req.body.brandname;
  const brandstatus = parseInt(req.body.brandstatus);

  db.query(
    "INSERT INTO brands (brand_name, brand_active, brand_status) VALUES (?, ?, ?)",
    [ brandname, brandstatus, 1 ],
    (err, result) => {
      if(result) {
        res.send(result)
      } else {
        res.send({ message: 'Failed to register brand' })
      }
    }
  )
}))

router.put('/brand/:id', expressAsyncHandler( async (req,res) => {
  const id = parseInt(req.params.id); 
  const brandname = req.body.name;
  const brandstatus = parseInt(req.body.status);
  console.log(req.body);
  db.query(
    "UPDATE brands SET brand_name = ?, brand_active = ? WHERE brand_id = ?",
    [brandname, brandstatus, id],
    (err, result) => {
      if(err) {
        console.log({ error: err });
      }
      if(result) {
        res.send(result)
      } else {
        res.send({ message: 'Failed to register brand' })
      }
    }
  )
}))
  
router.get('/category', expressAsyncHandler( async (req,res) => {
  db.query(
    'SELECT categories_id, categories_name, categories_active, categories_status FROM categories WHERE categories_status = 1',
      (err, result) => {
      if(err) {
        console.log({ error: err });
      }
      if(result) {
        res.send(result)
      } else {
        res.send({ message: "Fail to bring categories" });
      }
    }
  )
}))

router.get('/category/:id', expressAsyncHandler( async (req,res) => {
  db.query(
    'SELECT categories_id, categories_name, categories_active, categories_status FROM categories WHERE categories_id = ?', req.params.id, 
    (err, result) => {
      if(err) {
        console.log({ error: err });
      }
      if(result) {
        res.send(result)
      } else {
        res.send({ message: "Fail to bring categories" });
      }
    }
  )
}));

router.get('/category/option', expressAsyncHandler( async (req,res) => {
  db.query(
    'SELECT categories_id, categories_name, categories_active, categories_status FROM categories WHERE categories_status = 1 AND categories_active = 1',
      (err, result) => {
      if(err) {
        console.log({ error: err });
      }
      if(result) {
        res.send(result)
      } else {
        res.send({ message: "Fail to bring categories" });
      }
    }
  )
}))

router.get('/category/remove/:id', expressAsyncHandler( async (req,res) => {
  db.query(
    'UPDATE categories SET categories_status = 2 WHERE categories_id = ?', req.params.id,
    (err, result) => {
      if(err) {
        console.log({ error: err });
      }
      if(result) {
        res.send(result)
      } else {
        res.send({ message: "Fail to remove categories" });
      }
    }
  )
  }));

router.post('/category', expressAsyncHandler( async (req,res) => {
  const categoryname = req.body.categoriesname;
  const categorystatus = parseInt(req.body.categoriesstatus);
  db.query(
    "INSERT INTO categories (categories_name, categories_active, categories_status) VALUES (?, ?, ?)",
    [ categoryname, categorystatus, 1 ],
    (err, result) => {
      if(result) {
        res.send(result)
      } else {
        res.send({ message: 'Failed to register brand' })
      }
    }
  )
  }))

router.put('/category/:id', expressAsyncHandler( async (req,res) => {
  const id = parseInt(req.params.id); 
  const categoryname = req.body.name;
  const categorystatus = parseInt(req.body.status);
  console.log(req.body);
  db.query(
    "UPDATE categories SET categories_name = ?, categories_active = ? WHERE categories_id = ?",
    [categoryname, categorystatus, id],
    (err, result) => {
      if(err) {
        console.log({ error: err });
      }
      if(result) {
        res.send(result)
      } else {
        res.send({ message: 'Failed to register brand' })
      }
    }
    )
  }))

export default router;