const connection = require('../../../Model/dbConnect.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pradeepdhakad0955@gmail.com',  // your email
    pass: 'pehf eogu gxch ypsm'           // app password or actual password (better use env)
  }
});

// Register Buyer API
const registerBuyer = async (req, res) => {
  const { full_name, mobile, email, password } = req.body;
  const checkQuery = 'SELECT * FROM buyer WHERE mobile = ?';
  const insertQuery = 'INSERT INTO buyer SET ?';

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const buyerData = {
      full_name,
      mobile,
      email,
      password: hashedPassword
    };

    connection.query(checkQuery, [mobile], (checkErr, result) => {
      if (checkErr) return res.status(500).json({ error: checkErr.sqlMessage });

      if (result.length > 0) {
        return res.status(409).json({ message: "This buyer already exists" });
      }

      connection.query(insertQuery, buyerData, (insertErr, result) => {
        if (insertErr) return res.status(500).json({ error: insertErr.sqlMessage });

        // Send welcome email
        const mailOptions = {
          from: 'pradeepdhakad0955@gmail.com',
          to: email,
          subject: 'Welcome to RealEstate – Let’s Find Your Dream Home!',
          text: `Hi ${full_name},\n\nWelcome to RealEstate! 🎉\n\nThank you for registering on our platform. We're excited to help you discover properties, connect with sellers, and find your dream home with ease.\n\nHere’s what you can do now:\n- Browse and explore property listings\n- Save your favorite homes\n- Contact sellers directly\n\nIf you have any questions or need assistance, feel free to reach out to our support team at:\nsupport@realestate.com\n\nHappy house hunting!\n\n– Team RealEstate`
        };

        transporter.sendMail(mailOptions, (mailErr, info) => {
          if (mailErr) {
            console.error('Email Error:', mailErr.message);
          } else {
            console.log('Email Sent for Buyer :', info.response);
          }
        });

        return res.status(201).json({ status: "Success", data: result });
      });
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error", detail: err.message });
  }
};

// Login Buyer API  ********** buyer fill info 

const loginBuyer = (req, res) => {
  const { identifier, password } = req.body; // identifier = email or mobile

  const sql = "SELECT * FROM buyer WHERE email = ? OR mobile = ?";

  connection.query(sql, [identifier, identifier], (err, data) => {
    if (err) return res.status(500).json({ message: "Login error in server" });

    if (data.length > 0) {
      const hashedPassword = data[0].password;

      bcrypt.compare(password.toString(), hashedPassword, (err, response) => {
        if (err) return res.status(500).json({ message: "Password compare error" });

        if (response) {
          const full_name = data[0].full_name;
          const mobile = data[0].mobile;
          const email = data[0].email;

          const token = jwt.sign(
            { full_name, mobile, email },
            "jwt-secret-key",
            { expiresIn: "1h" }
          );

          // Set cookies
          res.cookie("buyerToken", token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60 * 1000,
            secure: false, // Set true if using HTTPS
            sameSite: "Lax",
          });

          res.cookie("buyerMobile", mobile, {
            httpOnly: false,      // frontend can access 
            maxAge: 8 * 60 * 60 * 1000,
            secure: false,
            sameSite: "Lax",
          });

          return res.status(200).json({ Status: "Success", token });
        } else {
          return res.status(401).json({ message: "Password not matched" });
        }
      });
    } else {
      return res.status(404).json({ message: "No Buyer existed" });
    }
  });
};


/////////  for firebase   login by Google   /////

const googleLoginBuyer = (req, res) => {

  // const { full_name, email, profile_pic, auth_provider } = req.body;
  const { full_name, email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const findQuery = "SELECT * FROM buyer WHERE email = ?";
  connection.query(findQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (result.length > 0) {
      
      const buyer = result[0];
      const token = jwt.sign(
        { full_name: buyer.full_name, mobile: buyer.mobile, email: buyer.email },
        "jwt-secret-key",
        { expiresIn: "1h" }
      );

      res.cookie("buyerToken", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60 * 1000,
        sameSite: "Lax",
      });

      res.cookie("buyerMobile", buyer.mobile, {
        httpOnly: false,
        maxAge: 8 * 60 * 60 * 1000,
        sameSite: "Lax",
      });

      return res.status(200).json({ Status: "Success", token });
    }
  });
};

// GitHub Login Buyer API

const githubLoginBuyer = (req, res) => {
  const { full_name, email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const findQuery = "SELECT * FROM buyer WHERE email = ?";
  connection.query(findQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (result.length > 0) {
      const buyer = result[0];

      const token = jwt.sign(
        { full_name: buyer.full_name, mobile: buyer.mobile, email: buyer.email },
        "jwt-secret-key",
        { expiresIn: "1h" }
      );

      res.cookie("buyerToken", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60 * 1000,
        sameSite: "Lax",
      });

      res.cookie("buyerMobile", buyer.mobile || "", {
        httpOnly: false,
        maxAge: 8 * 60 * 60 * 1000,
        sameSite: "Lax",
      });

      return res.status(200).json({ Status: "Success", token });
    }
  });
};



///////////////////////

const getBuyer = (req, res) => {
  const { mobile } = req.params;
  const sql = " select * from buyer where mobile = ?";

  connection.query(sql, [mobile], (err, data) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (data.length === 0) {
      return res.status(404).json({ message: "Buyer not found" });
    }
    // console.log(data[0])
    return res.json(data[0]);

  });
};

//   send Otp

const otpMap = new Map(); // Store email-OTP temporarily

const sendOtpBuyer = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    //  Check if buyer exists
    const [rows] = await connection.promise().query("SELECT * FROM buyer WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "No account found with this email." });
    }

    //  Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins
    otpMap.set(email, { otp, expiresAt });

    //  Email config
    const mailOptions = {
      from: 'pradeepdhakad0955@gmail.com',
      to: email,
      subject: 'OTP for Password Reset - RealEstate',
      text: `Your OTP is ${otp}. It is valid for 5 minutes. Please do not share it.`,
    };

    //  Send OTP
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Send OTP Email Error:", err.message);
        return res.status(500).json({ message: "Failed to send OTP. Please try again." });
      }
      return res.status(200).json({ message: "OTP sent successfully to your email." });
    });

  } catch (error) {
    console.error("Send OTP Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


//  Reset Password 

const resetPasswordBuyer = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
  

    //  Check OTP validity
    const record = otpMap.get(email);
    if (!record || record.otp !== parseInt(otp) || Date.now() > record.expiresAt) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    //  Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    //  Update password in DB
    const sql = "UPDATE buyer SET password = ? WHERE email = ?";
    await connection.promise().query(sql, [hashed, email]);

    //  Remove OTP record
    otpMap.delete(email);

    return res.status(200).json({ message: "Password updated successfully" });

  } catch (err) {
    console.error("Reset Password Error:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = { registerBuyer, loginBuyer, googleLoginBuyer,  githubLoginBuyer , getBuyer  , sendOtpBuyer , resetPasswordBuyer};
