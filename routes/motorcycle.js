const express = require("express");
const { auth } = require("../middlewares/auth");
const {motorcycleModel,validateMotorcycle} = require("../models/motorcikleModel")
const router = express.Router();

// http://localhost:3000/motorcycle/?s=bmw
// http://localhost:3000/motorcycle/?page=2
router.get("/search", async(req,res) => {
    try{
      let searchQ = req.query.s;
      let query 
      if(!searchQ){
        query = {}
      }
      else{
        let searchRegX = new RegExp(searchQ, "i")
        query = ({$or:[{name:searchRegX},{info:searchRegX}]});
      }
      let data = await motorcycleModel.find(query)
      res.json(data)
    }
    catch(err){
      console.log(err)
      res.status(500).json({err:"DB down"})
    }
  })

router.get("/", async(req,res) => {
  let perpage = req.query.perpage || 9;
  let page = (req.query.page >= 1) ? req.query.page - 1: 0; 
  let sort = req.query.sort || "_id";
  let reverse = (req.query.r == "yes") ? -1 : 1 
  try{

    let data = await motorcycleModel.find({})
    .limit(Number(perpage))
    .skip(page * perpage)
    .sort({[sort]:reverse})

    res.json(data)
  }
  catch(err){
    console.log(err)
    res.status(500).json({err:"Page and perpage must be 1+ or DB down , come back later"})
  }
})

  // http://localhost:3000/motorcycle/cat/motocross
  router.get("/cat/:catname", async(req,res) => {
    let catname = req.params.catname;
    try{ 
    let data = await motorcycleModel.find({cat:catname})
    res.json(data)
  }
  catch(err){
    console.log(err)
    res.status(500).json({err:"page must be between 1-end, or maby DB down"})
  }
})

// http://localhost:3000/motorcycle/prices/?max=x&min=y&page=z
router.get("/prices", async(req,res) => {
  try{
     let page = req.query.page || 1;
     let max = req.query.max || 99999 ;
     let min = req.query.min || 0;
    let data = await motorcycleModel.find({$and:[{price:{$lte:max}},{price:{$gte:min}}]})
    .limit(10)
    .skip(((page-1)*10))
    res.json(data)
  }
  catch(err){
    console.log(err)
    res.status(500).json({err:"page must be between 1-end, or maby DB down"})
  }
})


router.get("/myData",auth , async(req,res) => {
  try{

    let data = await motorcycleModel.find({user_id:req.userTokenData._id})
    res.json(data)
  }
  catch(err){
    console.log(err)
    res.status(500).json({err:"Page and perpage must be 1+ or DB down , come back later"})
  }
})


http://localhost:3000/motorcycle
router.post("/", auth , async(req,res) => {
  let validBody = validateMotorcycle(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let motorcycle = new motorcycleModel(req.body);
    motorcycle.user_id = req.userTokenData._id;
    await motorcycle.save();
    res.status(201).json(motorcycle);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})
// http://localhost:3000/motorcycle/:idDel
router.delete("/:idDel",auth , async(req,res) => {
  let idDel = req.params.idDel;
  try{
    let data = await motorcycleModel.deleteOne({_id:idDel,user_id:req.userTokenData._id});
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})
// http://localhost:3000/motorcycle/:idEdit
router.put("/:idEdit",auth,async(req,res) => {
  let validBody = validateMotorcycle(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let idEdit = req.params.idEdit
    let data = await motorcycleModel.updateOne({_id:idEdit,user_id:req.userTokenData._id},req.body)
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
});
  
  module.exports = router;