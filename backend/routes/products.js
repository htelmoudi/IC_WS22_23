const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const { id } = req.query;
  db.query(
    `SELECT p.id, p.title, p.image, p.price, p.quantity,
        c.title as category FROM products p JOIN categories c ON
            c.id = p.cat_id `,
    (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    }
  );
});


// GET ALL By vendor
router.get("/vendor/:userId", async (req, res) => {
  const { userId } = req.params;
  db.query(
    `SELECT p.id, p.title, p.image, p.price, p.quantity,
        c.title as category FROM products p JOIN categories c ON
            c.id = p.cat_id where user_id=${userId} `,
    (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    }
  );
});

// GET SINGLE PRODUCT BY ID
router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  db.query(
    `SELECT p.id, p.title, p.image, p.images, p.description, p.price, p.quantity,
        c.title as category FROM products p JOIN categories c ON
            c.id = p.cat_id WHERE p.id = ${productId}`,
    (err, results) => {
      if (err) console.log(err);
      else res.json(results[0]);
    }
  );
});


// GET SINGLE PRODUCT BY ID
router.post("/", async (req, res) => {
  const { title, image, price, quantity, description, user_id} = req.body;

  db.query(
    `insert into  products (title, image, description, price, quantity, user_id) values ('${title}', '${image}', '${description}', ${price}, ${quantity}, ${user_id} )`,
    (err, results) => {
      if (err) console.log(err);
      else res.json(results[0]);
    }
  );
});


module.exports = router;
