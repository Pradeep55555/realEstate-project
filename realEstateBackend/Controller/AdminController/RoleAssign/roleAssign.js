const connection = require('../../../Model/dbConnect.js');

const getUserRole = (request, response) => {
    let sqlQuery = "SELECT * FROM user_role";
    connection.query(sqlQuery, (err, result) => {
        if (err) return response.json({ message: err.sqlMessage })
        response.json(result)
    })
}

const assignUserRole = (req, res) => {
    let { user_id, rid } = req.body;
    let sqlQuery = "INSERT INTO user_role(user_id, rid) VALUES(?, ?)";
    connection.query(sqlQuery, [user_id, rid], (err, result) => {
        if (err) return res.json({ message: err.sqlMessage });
        res.json({
            message: "Role assigned successfully!",
            result: result
        });
    });
};


const deleteUserRole = (req, res) => {
    let user_id = req.query.user_id;
    let rid = req.query.rid;
    let sqlQuery = "DELETE FROM user_role WHERE user_id = ? and rid = ?";
    connection.query(sqlQuery, [user_id, rid], (err, result) => {
        if (err) return res.json({ message: "Oops, something went wrong!!!!!" })
        res.json({
            message: `Record is deleted`,
            result: result
        })
    })
}

module.exports = { getUserRole ,  assignUserRole , deleteUserRole }