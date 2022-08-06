const orderStatusSchema = require('../models/order-status-schema');

exports.updateOrderStatus = async (req, res) => {
    try {
        const orderStatusData = await orderStatusSchema.find({orderId: req.params.orderId});
        if(orderStatusData.length > 0){
            let dataUpdate = await orderStatusSchema.findOneAndUpdate({orderId: orderStatusData[0].orderId}, {orderStatus: req.body.orderStatus});
            if(dataUpdate){
                res.status(200).send({message: "Order Status updated successfully..!!", data: true});    
            }
            else {
                res.status(500).send({message: "Something went wrong..!!", data: false});    
            }
        }
        else {
            res.status(401).send({message: "Bad request, Order not found by that Id..!!", data: false});    
        }
        
    } catch (e) {
        console.log(e);
        res.status(500).send({message: "Server Error..!!", data: false, err: e});
    }
}