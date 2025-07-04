const connection = require('../../../Model/dbConnect.js');


const getRole =  (request, response) => {
    let sqlQuery = "SELECT * FROM role";
    connection.query(sqlQuery, (err, result) => {
        if (err) return response.json({ message: err.sqlMessage })
        response.json(result)
    })
};


const addRole = (req, res) => {
    let { rid, rname } = req.body;
    let sqlQuery = "INSERT INTO role(rid, rname) VALUES(?, ?)";
    connection.query(sqlQuery, [ rid, rname], (err, result) => {
        if (err) return res.json({ message: err.sqlMessage })
        res.json({
            message: "User created!!!!!",
            result: result
        })
    })
} ;

const deleteRole = (req, res) => {
    let rid = req.query.rid;
    let sqlQuery = "DELETE FROM role WHERE rid = ?";
    connection.query(sqlQuery, [rid], (err, result) => {
        if (err) return res.json({ message: "Oops, something went wrong!!!!!" })
        res.json({
            message: `Record is deleted`,
            result: result
        })
    })
}; 


const updateRole =(req, res) => {
    let rid = req.params.rid;
    let rname = req.body.rname;
    let sqlQuery = "UPDATE role SET rname = ? WHERE rid = ?";
    connection.query(sqlQuery, [rname , rid], (err, result) => {
        if (err) return res.json({ message: "Failed to update \n Try again !!!!!" })
        res.json({
            message: "Data Upadated",
            result: result
        })
    })
};



module.exports = {getRole , addRole , deleteRole , updateRole}