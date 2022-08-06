const userSchema = require('../models/user-schema');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    try {
        userSchema.findOne({ email: req.body.email.trim() }).then(resp => {
            if(resp){
                bcrypt.compare(req.body.password.trim(), resp.password, function(err, result){
                    if (err) {
                        console.log(err);
                        return res.status(500).send({ message: 'Something went wrong while password encryption..!!', data: false, err });
                    }
                    if(result){
                        res.status(200).send({ message: "Login successful..!!", data: resp});
                    }
                    else {
                        res.status(400).send({ message: "Login failed..!!", data: false});
                    }
                })
            }
            else {
                res.status(401).send({ message: "Bad Request, User doesn't exist..!!", data: false });
            }
        }).catch(err => {
            console.log(err);
            return res.status(500).send({ message: 'Something went wrong while finding data..!!', data: false, err });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Something went wrong..!!', data: false });
    }
}

exports.signup = (req, res) => {
    try {
        userSchema.findOne({ email: req.body.email.trim() }).then(resp => {
            if (resp) {
                res.status(401).send({ message: "Bad Request, User already exist with this email..!!", data: false });
            }
            else {

                bcrypt.hash(req.body.password.trim(), 10, function (err, pass) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({ message: 'Something went wrong while password encryption..!!', data: false, err });
                    }
                    const user = new userSchema({
                        name: req.body.name,
                        email: req.body.email,
                        address: req.body.address,
                        phone: req.body.phone,
                        password: pass,
                        viewPassword: req.body.password.trim(),
                    });

                    user.save().then(data => {
                        return res.status(200).send({ message: 'Data saved successfully..!!', data });
                    }).catch(err => {
                        console.log(err);
                        return res.status(500).send({ message: 'Something went wrong..!!', data: false, err });
                    });
                });
            }
        }).catch(err => {
            console.log(err);
            return res.status(500).send({ message: 'Something went wrong while saving data..!!', data: false, err });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Something went wrong..!!', data: false });
    }
}