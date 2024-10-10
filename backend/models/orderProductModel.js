// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//     productDetails :{
//         type : Array,
//         default : []
//     },
//     email:{

//         type:String,
//         default:""
//     },
//     userId : {
//         type : String,
//         default : ""
//     },
//     paymentDetails:{
//         paymentId : {
//             type : String,
//             default:""
//         },
//         payment_method_type : [],
//         payment_status : {
//             type : String,
//             default : ""
//         }
//     },
//     shipping_options : [],
//     totalAmount :{
//         type: Number,
//         default :0
//     }
    
// },{
//     timestamps : true
// })

// const OrderModel = mongoose.model('ord', OrderSchema)

// module.exports=OrderModel;



// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//     productDetails: {
//         type: Array,
//         default: []
//     },
//     email: {
//         type: String,
//         default: ""
//     },
//     paymentDetails: {
//         paymentId: {
//             type: String,
//             default: ""
//         },
//         payment_method_type: [],
//         payment_status: {
//             type: String,
//             default: ""
//         }
//     },
//     shipping_options: [],
//     totalAmount: {
//         type: Number,
//         default: 0
//     }
// }, {
//     timestamps: true
// });

// const OrderModel = mongoose.model('order', OrderSchema);

// module.exports = OrderModel;





const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    productDetails: {
        type: Array,
        default: []
    },
    email: {
        type: String,
        default: ""
    },
    userId: {
        type: String,
        default: ""
    },
    paymentDetails: {
        paymentId: {
            type: String,
            default: ""
        },
        payment_method_type: {
            type: Array,
            default: []
        },
        payment_status: {
            type: String,
            default: ""
        }
    },
    shipping_options: {
        type: Array,
        default: []
    },
    totalAmount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const OrderModel = mongoose.model('ord', OrderSchema);

module.exports = OrderModel;
