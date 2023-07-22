const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();

const Review = require("../../models/Reviews");

router.post("/addReview",(req,res) => {
    const newReview = new Review({
        userId:req.body.userId,
        businessId:req.body.businessId,
        review:req.body.review,
        rate:req.body.rate
      });

      newReview.save((err,success) => {
      if(err){
          return res.send(err);
      } 
      res.send(req.body);
  });


})

router.get("/getByUser", (req,res) => {
    try{
    
    var reviews= Review.find({  
    
    }).populate('userId').populate('businessId').exec((err,result) => {
      if(err){
        return res.send(err)
      } else
      return res.send(result)
    });

    
  }
  catch(err){
      res.send(err)
  }
})



router.patch('/update', async(req, res) => {
    
    try{
        const updateReview = await Review.findOneAndUpdate({_id: req.body.reviewId},{
          
            $set: {
        
        review:req.body.review,
        rate:req.body.rate
            }
        },{new: true, useFindAndModify: false});
        res.json(updateReview)
       
    }
    catch(err){
        res.send(err)
    }
})

router.post('/delete',(req,res) => {
 Review.deleteOne({_id:req.body.reviewId}).then(review => {
   if(review){
    return res.status(200).json({message: 'Review deleted successfully. Refreshing data...', success: true})
   } 
 });
});

router.post('/deleteByBusiness',(req,res) => {
  Review.deleteMany({businessId:req.body.businessId}).then(review => {
    if(review){
      return res.status(200).json({message: 'Review deleted successfully',success:true})
    }
  })
})

module.exports = router;
