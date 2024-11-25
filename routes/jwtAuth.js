const ensureAuthenticated = require('../middlewares/Authjwt');

const router = require('express').Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    res.status(200).json([
        {
            name:"mobile",
            price:32000
        },
        {
            name:"car",
            price:500000
        }
    ])
});

module.exports = router;