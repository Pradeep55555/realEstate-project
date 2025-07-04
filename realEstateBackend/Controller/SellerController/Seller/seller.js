const connection = require('../../../Model/dbConnect.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ************* node mailer ***********
const nodemailer = require('nodemailer');
const cron = require('node-cron')
const { errorMonitor } = require('nodemailer/lib/xoauth2');

const transpoter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pradeepdhakad0955@gmail.com',
        pass: "pehf eogu gxch ypsm"
    }
});

// ********************************


const registerSeller = async (req, res) => {
    const { full_name, mobile, email, password } = req.body;
    const checkQuery = 'SELECT * FROM seller WHERE mobile = ?';
    const insertQuery = 'INSERT INTO seller SET ?';
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    const data1 = {
        full_name,
        mobile,
        email,
        password: pass
    };
    connection.query(checkQuery, mobile, (error, result) => {
        if (result.length > 0) {
            return res.send({ message: "this seller already exist" });
        }
        connection.query(insertQuery, data1, (err, result) => {
            if (err) {
                console.log(err)
                return res.send({ Error: err.sqlMessage });
            }
            const mailOptions = {
                from: 'pradeepdhakad0955@gmail.com',
                to: email,
                subject: 'Welcome to RealEstate – Start Selling Your Properties Today!',
                text: `Hi ${full_name},

Welcome to RealEstate! 🏠

Thank you for joining our platform as a seller. We're excited to help you reach thousands of potential buyers and grow your real estate business.

Here’s what you can do now:
- List your properties for sale or rent
- Manage inquiries from interested buyers
- Update property details and photos anytime
- Track buyer interest and save responses

Start adding your listings today and connect with buyers who are actively looking for their next home.

If you need any help, feel free to contact us at:
support@realestate.com

Wishing you great success in selling!

– Team RealEstate`
            };



            transpoter.sendMail(mailOptions, (mailErr, info) => {
                if (mailErr) {
                    console.error('Email Error:', mailErr.message);
                } else {
                    console.log('Email Sent for Seller :', info.response);
                }
            });

            // console.log(result)
            return res.send({ Status: 200, Response: result })
        });
    })
}

const loginSeller = async (req, res) => {
    const sql = "SELECT * FROM seller WHERE mobile = ?";
    connection.query(sql, [req.body.mobile], (err, data) => {
        if (err) return res.json({ Error: "Login error in server" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error" });
                if (response) {
                    const password = data[0].password;
                    const full_name = data[0].full_name;
                    const mobile = data[0].mobile;
                    const token = jwt.sign({ password, full_name, mobile }, "jwt-secret-key", { expiresIn: "1h" });

                    // Set cookie
                    res.cookie('sellerToken', token, {
                        httpOnly: true, // Prevent client-side access
                        maxAge: 8 * 60 * 60 * 1000, // 8 hour
                        secure: false, // Set to true if using HTTPS
                        sameSite: 'Lax' // or 'Strict' / 'None' based on CORS policy
                    });
                    res.cookie('sellerMobile', mobile, {
                        httpOnly: false, // frontend can access it
                        maxAge: 8 * 60 * 60 * 1000, // 8  hour
                        secure: false, // Set to true if using HTTPS
                        sameSite: 'Lax' // or 'Strict' / 'None' based on CORS policy
                    });

                    return res.json({ Status: "Success", token });
                } else {
                    return res.json({ Error: "Password not matched" });
                }
            });
        } else {
            return res.json({ Error: "No Seller existed" });
        }
    });
};



const getSeller = (req, res) => {
    const mobile = req.params.mobile;
    const sql = "SELECT * FROM seller WHERE mobile = ?";
    connection.query(sql, [mobile], (err, result) => {
        if (err) return res.status(500).json({ Error: err.sqlMessage });
        if (result.length === 0) return res.status(404).json({ message: "Seller not found" });
        // console.log(result[0])
        return res.status(200).json(result[0]); // return single object, not array
    });
};


const changePasswordSeller = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const mobile = req.params.mobile;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Both current and new passwords are required" });
    }

    const sql = "SELECT * FROM seller WHERE mobile = ?";
    connection.query(sql, [mobile], async (err, result) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        if (result.length === 0) return res.status(404).json({ message: "Seller not found" });

        const seller = result[0];
        const isMatch = await bcrypt.compare(currentPassword, seller.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        const updateSql = "UPDATE seller SET password = ? WHERE mobile = ?";
        connection.query(updateSql, [hashedNewPassword, mobile], (err, updateResult) => {
            if (err) return res.status(500).json({ message: err.sqlMessage });
            return res.status(200).json({ message: "Password changed successfully" });
        });
    });
};

const otpStore = {}; // { email: { otp: '123456', expiresAt: Date } }


const sendOtpToEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ Error: "Email is required" });
    }

    // Check if the seller exists with that email
    connection.query("SELECT * FROM seller WHERE email = ?", [email], (err, result) => {
        if (err) return res.status(500).json({ Error: err.sqlMessage });
        if (result.length === 0) return res.status(404).json({ Error: "Seller not found with this email" });

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

        otpStore[email] = { otp, expiresAt };

        const mailOptions = {
            from: 'pradeepdhakad0955@gmail.com',
            to: email,
            subject: 'OTP to Reset Your RealEstate Seller Password',
            text: `Dear Seller,\n\nYour OTP to reset your password is: ${otp}\n\nThis OTP will expire in 5 minutes.\n\nIf you did not request a password reset, please ignore this email.\n\n– Team RealEstate`
        };

        transpoter.sendMail(mailOptions, (mailErr, info) => {
            if (mailErr) {
                console.error('Error sending OTP:', mailErr.message);
                return res.status(500).json({ Error: "Failed to send OTP" });
            } else {
                console.log('OTP Sent:', info.response);
                return res.json({ Status: "Success", Message: "OTP sent to your email" });
            }
        });
    });
};


const verifyOtpAndResetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ Error: "All fields are required" });
    }

    const record = otpStore[email];
    if (!record) {
        return res.status(400).json({ Error: "No OTP requested for this email" });
    }

    const { otp: validOtp, expiresAt } = record;

    if (Date.now() > expiresAt) {
        delete otpStore[email];
        return res.status(400).json({ Error: "OTP has expired" });
    }

    if (otp !== validOtp) {
        return res.status(400).json({ Error: "Invalid OTP" });
    }

    // OTP is valid — now update the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updateSql = "UPDATE seller SET password = ? WHERE email = ?";
    connection.query(updateSql, [hashedPassword, email], (err, result) => {
        if (err) return res.status(500).json({ Error: err.sqlMessage });

        delete otpStore[email]; // clear used OTP

        return res.json({ Status: "Success", Message: "Password reset successfully" });
    });
};


module.exports = { loginSeller, registerSeller, getSeller, changePasswordSeller  , sendOtpToEmail , verifyOtpAndResetPassword }

