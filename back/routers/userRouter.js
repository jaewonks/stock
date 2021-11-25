import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { db } from '../server.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();
//'/api/users'에서 시작한다.

router.post('/signin', expressAsyncHandler( async (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    (err, result) => {
      if(err) {
        console.log({ error: err });
      }
      if(result.length > 0) {
        bcrypt.compare(password, result[0].password, (err,response) => {
          if(response) {
            const id = result[0].user_id;
            const token = jwt.sign({id}, 'jwtSecret', {
              expiresIn: 300, 
            })
            // token을 frontend로 보내기
            res.send({ isAuth: true, token: token, result: result });    
          } else {
            res.send({ message: 'Wrong username or password' });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  )
}));

router.get('/', (req, res, next) => {
  return res.json(req.user || false);
});

/*
router.get('/', expressAsyncHandler( async (req,res) => {
  // user table에 모든 정보를 가져오기
  db.query(
    'SELECT * FROM users', 
    (err, result) => {
      if(err) {
        console.log({ error: err });
      }
        if(result) {
          res.send(result)
        } else {
          res.send({ message: "Fail to bring userInfo" });
        }
    }
  )
}));
*/
export default router;