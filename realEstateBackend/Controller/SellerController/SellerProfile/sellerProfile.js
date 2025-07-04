const connection = require('../../../Model/dbConnect.js');

const getSellerDetails = (req, res) => {
    const mobile = req.params.mobile;
    const sql = "SELECT * FROM seller_profile WHERE mobile = ?";
    connection.query(sql, [mobile], (err, result) => {
        if (err) return res.status(500).json({ Error: err.sqlMessage });
        // console.log(result[0])

        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ message: "Profile Details Not Available" });
        }
    });
};

const postSellerProfile = (req, res) => {
    const { mobile, aadhar, pan, status, gender, dob, address } = req.body;
    const status1 = status === "Active" ? 1 : 0;
    if (!mobile || !aadhar || !pan || !gender || !dob || !address) {
        return res.status(400).json({ Error: "Required fields are missing." });
    }
    const photoPath = req.file ? `${req.file.filename}` : null;

    const handleInsertOrUpdate = (finalPhoto) => {
        const sql = `
            INSERT INTO seller_profile (mobile, aadhar, pan, status, photo, gender, dob, address) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                aadhar = VALUES(aadhar),
                pan = VALUES(pan),
                status = VALUES(status),
                photo = VALUES(photo),
                gender = VALUES(gender),
                dob = VALUES(dob),
                address = VALUES(address)
        `;

        const values = [mobile, aadhar, pan, status, finalPhoto, gender, dob, address];
        // console.log('Status value kya h : ', values[3])
        connection.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ Error: err.sqlMessage });
            }
            return res.status(200).json({ message: "Seller profile saved successfully." });
        });
    };

    // If new photo uploaded, use it directly
    if (photoPath) {
        // console.log("New photo uploaded:", photoPath);
        handleInsertOrUpdate(photoPath);
    }
    else {
        // No new photo – get existing photo from DB
        const selectSql = 'SELECT photo FROM seller_profile WHERE mobile = ?';
        connection.query(selectSql, [mobile], (err, results) => {
            if (err) {
                return res.status(500).json({ Error: err.sqlMessage });
            }
            const existingPhoto = results.length > 0 ? results[0].photo : null;
            console.log("No new photo, keeping existing:", existingPhoto);
            handleInsertOrUpdate(existingPhoto);
        });
    }
};

module.exports = { getSellerDetails, postSellerProfile };

