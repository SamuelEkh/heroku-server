"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var express_1 = __importDefault(require("express"));
require('dotenv').config();
var router = express_1.default.Router();
router.use(express_1.default.json());
router.post('/contact', function (req, res) {
    var transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
    var mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: "Message from " + req.body.email + ", Name: " + req.body.name,
        text: req.body.message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('error');
        }
        console.log('Email sent:' + info.response);
        res.send('Success');
    });
});
module.exports = router;
