const mongoose = require('mongoose');

const model_Name = "Product";

const productSchema = new mongoose.Schema({
        name: {
            type:String,
            required:true
        },
        price: {
            type: Number,
            required:true
        },
        manufactured_by: {
            type: String,
            required: true
        },
        sellerId: {
            type:String,
            required:true
        },
        created_at:{
            type: Date,
            default: Date.now
        },
        description:{
            type:String,
            default:"No description available"
        },
        image_url:{
            type: String,
            default: "https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg"
        }
});

mongoose.model(model_Name,productSchema);
module.exports = {model_Name,productSchema};
