const route = require('express').Router();
const userController = require('../controllers/users');

route.get('/', async(req,res)=>{
    const CartProducts = await userController.getCart(req.user.email);
    return res.json(CartProducts);
});

route.post('/:id', async (req,res)=>{
    const data = await userController.addToCart(req.user.email,req.params.id);
    return res.json(data);
});

route.delete('/:id', async (req,res)=>{
    const data = await userController.removeFromCart(req.user.email, req.params.id);
    return res.json(data);
});

module.exports = {route};