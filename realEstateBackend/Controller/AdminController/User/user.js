const connection = require('../../../Model/dbConnect.js');
const moment = require('moment');
const bcrypt = require('bcrypt');

const getUser =  (request, response) => {
    let sqlQuery = "SELECT * FROM user";
    connection.query(sqlQuery, (err, result) => {
        if (err) return response.json({ message: err.sqlMessage });
        const formattedResult = result.map(row => ({
            ...row,
            created_on: moment(row.created_on).format('YYYY-MM-DD hh:mm:ss A')
        }));

        response.json(formattedResult);
    });
}

const addUser =  async (req, res) => {
    let { user_id, full_name, password, status } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds
        let sqlQuery = "INSERT INTO user(user_id, full_name, password, status) VALUES(?, ?, ?, ?)";
        connection.query(sqlQuery, [user_id, full_name, hashedPassword, status], (err, result) => {
            if (err) return res.json({ message: err.sqlMessage });
            res.json({
                message: "User created with hashed password!",
                result: result
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Error hashing password", error: err });
    }
};

const deleteUser = (req, res) => {
    let id = req.query.user_id;
    let sqlQuery = "DELETE FROM user WHERE user_id = ?";
    connection.query(sqlQuery, [id], (err, result) => {
        if (err) return res.json({ message: "Oops, something went wrong!!!!!" })
        res.json({
            message: `Record is deleted`,
            result: result
        })
    })
};


const updateUser = async (req, res) => {
    let user_id = req.params.user_id;
    let { full_name, password, status } = req.body;

    try {
        // Check if the password is already hashed (starts with $2b$)
        const isHashed = password.startsWith('$2b$');

        const finalPassword = isHashed
            ? password  // No need to hash again
            : await bcrypt.hash(password, 10); // Hash new plain password

        const updateData = {
            full_name,
            password: finalPassword,
            status
        };

        let sqlQuery = "UPDATE user SET ? WHERE user_id = ?";
        connection.query(sqlQuery, [updateData, user_id], (err, result) => {
            if (err) return res.json({ message: "Failed to update \n Try again !!!!!" })
            res.json({
                message: "User Updated!",
                result: result
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating password", error: err });
    }
};


module.exports = {getUser , addUser , deleteUser , updateUser}