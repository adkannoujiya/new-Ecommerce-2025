import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    product:[
        {
        type:mongoose.ObjectId,
        ref:"Products",
    }
    ],
    payment:{},
    
    buyer:{
        type:mongoose.ObjectId,
        ref:"users"
    },
    status:{
        type:String,
        default:"Not Process",
        enum:["Not Process", "Proccessing", "Shipped","Delivered", "Cancel"]
    },

},
{timestamps:true}
);

export default mongoose.model('Order', orderSchema);