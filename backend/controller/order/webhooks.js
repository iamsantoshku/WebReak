

// const stripe = require('../../config/stripe');
// const OrderModel = require('../../models/orderProductModel');
// const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOKS_SECRET_KEY;

// async function getLineItems(lineItems) {
//     let productItems = [];
//     if (lineItems?.data?.length) {
//         for (const item of lineItems.data) {
//             const product = await stripe.products.retrieve(item.price.product);
//             const productId = product.metadata.productId;

//             const productData = {
//                 productId: productId,
//                 name: product.name,
//                 price: item.price.unit_amount / 100,
//                 quantity: item.quantity,
//                 image: product.image,
//             };
//             productItems.push(productData);
//         }
//     }
//     return productItems;
// }

// const webhooks = async (request, response) => {
//     const sig = request.headers['stripe-signature'];
//     let event;

//     try {
//         // Parse the raw body to verify the signature
//         event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//     } catch (err) {
//         console.error(`Webhook error: ${err.message}`);
//         return response.status(400).send(`Webhook error: ${err.message}`);
//     }

//     // Handle the event
//     switch (event.type) {
//         case 'checkout.session.completed': {
//             const session = event.data.object;
//             console.log(`Checkout session completed for ${session.amount_total / 100} INR`);

//             try {
//                 // Fetch line items for the session
//                 const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
//                 const productDetails = await getLineItems(lineItems);

//                 const OrderDetails = {
//                     productDetails: productDetails,
//                     email: session.customer_email,
//                     userId: session.metadata.userId,
//                     paymentDetails: {
//                         paymentId: session.payment_intent,
//                         payment_method_type: session.payment_method_types,
//                         payment_status: session.payment_status,
//                     },
//                     shipping_options: session.shipping_options,
//                     totalAmount: session.amount_total / 100,
//                 };

//                 const order = new OrderModel(OrderDetails);
//                 await order.save();
//                 console.log('Order saved successfully');
//             } catch (err) {
//                 console.error(`Error fetching line items: ${err.message}`);
//                 return response.status(500).send(`Error fetching line items: ${err.message}`);
//             }
//             break;
//         }

//         default:
//             console.log(`Unhandled event type: ${event.type}`);
//     }

//     // Send success response
//     response.status(200).send();
// };

// module.exports = webhooks;




// this si prefrable

// const stripe = require('../../config/stripe');
// const OrderModel = require('../../models/orderProductModel');


// const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOKS_SECRET_KEY

// const webhooks = async(request, response)=>{
//     const sig = request.headers['stripe-signature']

//     const payloadString = JSON.stringify(request.body);

//     const header = stripe.webhooks.generateTestHeaderString({
//         payload: payloadString,
//         secret : endpointSecret,
//       });

//     let event;

//     try{
//         event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);

//     }catch(err){
//         response.status(400).send(`webhooks error: ${err.message}`);
//         return;

//     }

//     switch (event.type) {
//         case 'payment_intent.succeeded':
//           const session = event.data.object;
//         //   console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//         const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
//           // Then define and call a method to handle the successful payment intent.
//           // handlePaymentIntentSucceeded(paymentIntent);
//           console.log("lineitems", lineItems)
//           console.log("totalAmount", session.amount_total);
//           break;
//         // case 'payment_method.attached':
//         //   const paymentMethod = event.data.object;
//         //   // Then define and call a method to handle the successful attachment of a PaymentMethod.
//         //   // handlePaymentMethodAttached(paymentMethod);
//         //   break;
//         default:
//           // Unexpected event type
//           console.log(`Unhandled event type ${event.type}.`);
//       }
//     response.status(200).send();


// }
// module.exports = webhooks


// async function getLineItems(lineItems) {
//     let productItems = [];
//     if (lineItems?.data?.length) {
//         for (const item of lineItems.data) {
//             const product = await stripe.products.retrieve(item.price.product);
//             const productId = product.metadata.productId;

//             const productData = {
//                 productId: productId,
//                 name: product.name,
//                 price: item.price.unit_amount / 100,
//                 quantity: item.quantity,
//                 image: product.image,
//             };
//             productItems.push(productData);
//         }
//     }
//     return productItems;
// }

// const webhooks = async (request, response) => {
//     const sig = request.headers['stripe-signature'];
//     const payloadString = JSON.stringify(request.body)

//     const header = stripe.webhooks.generateTestHeaderString({
//                 payload: payloadString,
//                 secret : endpointSecret,
//               });

//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(payloadString,header, endpointSecret);
//     } catch (err) {
//         console.error(`Webhook signature verification failed: ${err.message}`);
//         return response.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     switch (event.type) {
//         case 'payment_intent.succeeded':
//             const session = event.data.object;

//             try {

//                 // const session = await stripe.checkout.sessions.retrieve(paymentIntent.metadata.checkout_session_id);
//                 const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
//                 // const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
//                 // console.log("Line items:", lineItems);
//                 // console.log("Total Amount:", session.amount_total/100);
//                 const productDetails = await getLineItems(lineItems)

//                 const orderDetails = {
//                     productDetails : productDetails,
//                     email : session.customer_email,
//                     userId : session.metadata.userId,
//                     paymentDetails:{
//                         paymentId : session.payment_intent,                       
//                         payment_method_type : session.payment_method_types,
//                         payment_status : session.payment_status,

//                     },
//                     shipping_options : session.shipping_options,
//                     totalAmount : session.amount_total / 100


//                 }
//                 const order = new OrderModel(orderDetails).save();
//                 // const saveOrder = await order.save();

//             } catch (error) {
//                 console.error("Error retrieving line items:", error.message);
//                 return response.status(500).send('Internal Server Error');
//             }
//             break;
//         default:
//             console.log(`Unhandled event type ${event.type}.`);
//     }

//     response.status(200).send('Webhook received');
// };

// module.exports = webhooks;




const stripe = require('../../config/stripe');
const OrderModel = require('../../models/orderProductModel');
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOKS_SECRET_KEY;

async function getLineItems(lineItems) {
    let productItems = [];
    if (lineItems?.data?.length) {
        for (const item of lineItems.data) {
            const product = await stripe.products.retrieve(item.price.product);
            const productId = product.metadata.productId;

            const productData = {
                productId: productId,
                name: product.name,
                price: item.price.unit_amount / 100,
                quantity: item.quantity,
                image: product.image
            };
            productItems.push(productData);
        }
    }
    return productItems;
}

const webhooks = async (request, response) => {
    const sig = request.headers['stripe-signature'];
    const payloadString = JSON.stringify(request.body);

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret,
    });

    let event;

    try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log('Event received:', event);

    switch (event.type) {
        case 'payment_intent.succeeded':
            const session = event.data.object;
            console.log('Payment Intent Succeeded:', session);

            try {
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            console.log('Line items:', lineItems);

            const productDetails = await getLineItems(lineItems);
            console.log('Product Details:', productDetails);

            const orderDetails = {
                productDetails: productDetails,
                email: session.customer_email,
                userId: session.metadata.userId,
                paymentDetails: {
                    paymentId: session.payment_intent,
                    payment_method_type: session.payment_method_types,
                    payment_status: session.payment_status,
                },
                shipping_options: session.shipping_options,
                totalAmount: session.amount_total / 100,
            };
            const order = new OrderModel(orderDetails)
            const saveOrder = await order.save();

            // await new OrderModel(orderDetails).save();
            console.log('Order saved successfully', saveOrder);
    } catch (error) {
        console.error('Error processing order:', error.message);
        return response.status(500).send('Internal Server Error');
    }
    break;
            default:
console.log(`Unhandled event type ${event.type}`);
    }

response.status(200).send();
};

module.exports = webhooks;




