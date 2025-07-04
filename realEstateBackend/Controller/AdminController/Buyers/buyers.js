const connection = require('../../../Model/dbConnect.js');

const getAllBuyers = (req, res) => {
    const sql = "SELECT * FROM buyer";
    connection.query(sql, (err, result) => {
        if (err) return res.status(500).json({ Error: err.sqlMessage });
        if (result.length === 0) return res.status(404).json({ message: "Sellers not found" });
        // console.log(result)
        return res.status(200).json(result); 
    });
};

module.exports = {getAllBuyers  }

