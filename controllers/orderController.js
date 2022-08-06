const companySchema = require('../models/company-schema');
const userSchema = require('../models/user-schema');
const orderSchema = require('../models/order-schema');
const orderStatusSchema = require('../models/order-status-schema');

exports.addOrder = async (req, res) => {
    try {
        const companyData = await companySchema.findById({_id: req.body.companyId});
        if(companyData){
            if(companyData.capacityLeft >= req.body.capacityRequired){

                const userData = await userSchema.findById({_id: req.body.userId});
                if(userData){

                    const order = new orderSchema({
                        capacityRequired: req.body.capacityRequired,
                        userId: req.body.userId,
                        companyId: req.body.companyId,
                        paymentStatus: req.body.paymentStatus, // Paid, Unpaid
                        paymentWay: req.body.paymentWay, // COD, Online, Card
                    });

                    const orderSave = await order.save();
                    if(orderSave){
                        const reduceCapacityAfterOrder = companyData.capacityLeft - req.body.capacityRequired;
                        await companySchema.findByIdAndUpdate({_id: req.body.companyId}, {capacityLeft: reduceCapacityAfterOrder});

                        const orderStatus = new orderStatusSchema({
                            orderId: orderSave._id,
                        });
                        await orderStatus.save();

                        res.status(200).send({message: "Success..!!", data: orderSave});
                    }
                    else {
                        res.status(500).send({message: "Something went wrong while creatin order..!!", data: false});
                    }
                }
                else {
                    res.status(401).send({message: "Bad request, User not found by that Id..!!", data: false});
                }

            }
            else {
                res.status(200).send({message: `Sorry..!! Currently we have ${companyData.capacityLeft} stocks left..!!`, data: false});    
            }            
        }
        else {
            res.status(401).send({message: "Bad request, Company not found by that Id..!!", data: false});    
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({message: "Server Error..!!", data: false, err: e});
    }
}

exports.updateOrder = async function (req, res) {
    try {
        const orderData = await orderSchema.findById({_id: req.params.orderId});
        const companyData = await companySchema.findById({_id: orderData.companyId});
        if(orderData){
            let capacityValue = 0;
            if(req.body.capacityRequired){

                if(req.body.capacityRequired > orderData.capacityRequired){
                    const additionalDifference = req.body.capacityRequired - orderData.capacityRequired;
                    if(companyData.capacityLeft >= additionalDifference){
                        capacityValue = req.body.capacityRequired;
                        await companySchema.findByIdAndUpdate({_id: orderData.companyId}, {capacityLeft: companyData.capacityLeft - additionalDifference});
                    }
                    else {
                        res.status(200).send({message: `Sorry..!! Currently we have ${companyData.capacityLeft} stocks left..!!`, data: false});    
                    }
                }
                else if(req.body.capacityRequired < orderData.capacityRequired){
                    const additionalDifference = orderData.capacityRequired - req.body.capacityRequired;
                    capacityValue = req.body.capacityRequired;
                    await companySchema.findByIdAndUpdate({_id: orderData.companyId}, {capacityLeft: companyData.capacityLeft + additionalDifference});
                }
                else {
                    capacityValue = orderData.capacityRequired;
                }
            }
            let updateData = {
                capacityRequired: capacityValue,
                paymentStatus: req.body.paymentStatus ? req.body.paymentStatus : orderData.paymentStatus, // Paid, Unpaid
                paymentWay: req.body.paymentWay ? req.body.paymentWay : orderData.paymentWay, // COD, Online, Card
            }
            const orderUpdate = await orderSchema.findByIdAndUpdate({_id: req.params.orderId}, updateData);
            if(orderUpdate){
                res.status(200).send({message: `Order updated successfully..!!`, data: true});    
            }
            else {
                res.status(200).send({message: `Something went wrong while updating Order..!!`, data: false});    
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

exports.deleteOrder = async (req, res) => {
    try{
        const orderData = await orderSchema.findById({_id: req.params.orderId});
        if(orderData){
            const companyData = await companySchema.findById({_id: orderData.companyId});
            await companySchema.findByIdAndUpdate({_id: orderData.companyId}, {capacityLeft: companyData.capacityLeft + orderData.capacityRequired});
            await orderSchema.deleteOne({_id: req.params.orderId});
            await orderStatusSchema.deleteOne({orderId: req.params.orderId});

            res.status(200).send({message: "Order removed successfully..!!", data: true});    
        }
        else {
            res.status(401).send({message: "Bad request, Order not found by that Id..!!", data: false});    
        }
    }
    catch(err){
        console.log(e);
        res.status(500).send({message: "Server Error..!!", data: false, err});
    }
}