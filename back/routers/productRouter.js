import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { db } from '../server.js';
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype == "image/jpg") {
    cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
};

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', expressAsyncHandler( async (req,res) => {
  db.query(
    'SELECT products.product_id, products.product_date, products.product_name, products.product_image, products.product_colour, products.product_size ,products.price_uk, products.price_kr, products.quantity, products.brand_id, products.categories_id, products.link, products.active, products.status, brands.brand_name, categories.categories_name FROM products INNER JOIN brands ON products.brand_id = brands.brand_id INNER JOIN categories ON products.categories_id = categories.categories_id WHERE products.status = 1',
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

router.post('/', upload.single('image'), expressAsyncHandler( async (req,res) => {
  console.log("file",req.file)
  console.log(req.body)
  const image = `/images/stock/${req.file.filename}`;
  const name = req.body.productname;
  const colour = req.body.colour;
  const size = req.body.size;
  const priceUk = req.body.priceUk;
  const priceKr = req.body.priceKr;
  const quantity = req.body.quantity;
  const brandname = req.body.brandname;
  const categoryname = req.body.categoryname;
  const status = parseInt(req.body.productstatus);
  const link = req.body.link;
  db.query(
    "INSERT INTO products (product_name, product_image, product_colour, product_size, price_uk, price_kr, quantity, brand_id, categories_id, link, active, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [ name, image, colour, size, priceUk, priceKr, quantity, brandname, categoryname, link, status, 1 ],
    (err, result) => {
      if(result) {
        res.send(result)
      } else {
        res.send({ message: 'Failed to register brand' })
      }
    }
  )
}))

router.put('/:id', expressAsyncHandler( async (req,res) => {
  const id = parseInt(req.params.id); 
  const image = `/images/stock/${req.file.filename}`;
  const name = req.body.name;
  const colour = req.body.colour;
  const size = req.body.size;
  const priceUk = req.body.priceUk;
  const priceKr = req.body.priceKr;
  const quantity = req.body.quantity;
  const brandname = req.body.brandname;
  const categoryname = req.body.categoryname;
  const status = parseInt(req.body.status);
  const link = req.body.link;
  console.log(req.body);
  db.query(
    "UPDATE brands SET product_name = ?, product_image = ?, product_colour = ?, product_size = ?, price_uk = ?, price_kr = ?, quantity = ?, brand_id = ?, categories_id = ?, link = ?, active = ?, status = ? WHERE brand_id = ?",
    [ name, image, colour, size, priceUk, priceKr, quantity, brandname, categoryname, link, status, id ],
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

router.get('/brand_option', expressAsyncHandler( async (req,res) => {
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

router.get('/category_option', expressAsyncHandler( async (req,res) => {
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