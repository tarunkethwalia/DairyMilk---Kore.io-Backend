const companySchema = require('../models/company-schema');

exports.createCompany = (req, res) => {
    try {
        companySchema.findOne({ companyName: req.body.companyName }).then(resp => {
            if (resp) {
                res.status(401).send({ message: "Bad Request, User already exist with this name..!!", data: false });
            }
            else {
                const company = new companySchema({
                    companyName: req.body.companyName.trim(),
                    email: req.body.email.trim(),
                    totalCapacity: 100,
                    capacityLeft: 100,
                });

                company.save().then(data => {
                    return res.status(200).send({ message: 'Data saved successfully..!!', data });
                }).catch(err => {
                    console.log(err);
                    return res.status(400).send({ message: 'Something went wrong..!!', data: false, err });
                });
            }
        }).catch(err2 => {
            console.log(err2);
            return res.send({ message: 'Something went wrong..!!', data: false, err: err2 });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server Error..!!", data: false, err });
    }
}

exports.getCompany = (req, res) => {
    try {
        companySchema.findOne({ companyName: req.body.companyName }).then(resp => {
            if (resp) {
                res.status(200).send({ message: "Company Found..!!..!!", data: resp });
            }
            else {
                res.status(401).send({ message: "Company not found..!!", data: false });
            }
        }).catch(err2 => {
            console.log(err2);
            return res.send({ message: 'Something went wrong..!!', data: false, err: err2 });
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({ message: "Server Error..!!", data: false, err });
    }
}

exports.checkCapacity = (req, res) => {
    try {
        companySchema.findOne({ _id: req.params.companyId }).then(resp => {
            if (resp) {
                res.status(200).send({ message: "Item Capacity Left..!!", data: resp.capacityLeft });
            }
            else {
                res.status(401).send({ message: "Company not found..!!", data: false });
            }
        }).catch(err2 => {
            console.log(err2);
            return res.send({ message: 'Something went wrong..!!', data: false, err: err2 });
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({ message: "Server Error..!!", data: false, err });
    }
}