const mongoose = require("mongoose");
const Joi = require("joi");

let motorcycleSchema = new mongoose.Schema({
    name:String,
    price:Number,
    info:String,
    cat:String,
    img:{
      type:String, default:"https://images.pexels.com/photos/6212576/pexels-photo-6212576.jpeg?cs=srgb&dl=pexels-jeremy-bishop-6212576.jpg&fm=jpg"
    },
    date_created:{
      type:Date, default:Date.now()
    },
    user_id:String
  })
  
  exports.motorcycleModel = mongoose.model("motorcycles",motorcycleSchema);
  
  exports.validateMotorcycle = (_reqBody) => {
    let joiSchema = Joi.object({
      name:Joi.string().min(2).max(99).required(),
      price:Joi.number().min(1).max(999999).required(),
      info:Joi.string().min(1).max(9999).required(),
      cat:Joi.string().min(1).max(99).required(),
      img:Joi.string().min(1).max(9999).allow(null,'')
    })
    return joiSchema.validate(_reqBody)
  }