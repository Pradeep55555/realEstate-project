

const connection = require('../../../Model/dbConnect.js');

const buyerRemark = (req, res) => {
  const { property_number, buyer_mobile } = req.params;
  const sql = `SELECT * FROM buyer_remarks WHERE property_number = ? AND buyer_mobile = ?`;

  connection.query(sql, [property_number, buyer_mobile], (err, results) => {
    if (err) {
      return res.status(500).json({ Error: err.sqlMessage });
    }
    if (results.length > 0) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(404).json({ message: 'No remark found' });
    }
  });
};

const addOrUpdateRemark = (req, res) => {
  const { seller_mobile, buyer_mobile, property_number, remark } = req.body;

  if (!seller_mobile || !buyer_mobile || !property_number || !remark) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const checkSql = `SELECT * FROM buyer_remarks WHERE property_number = ? AND buyer_mobile = ?`;
  connection.query(checkSql, [property_number, buyer_mobile], (err, results) => {
    if (err) {
      return res.status(500).json({ Error: err.sqlMessage });
    }
    if (results.length > 0) {
      const updateSql = `
        UPDATE buyer_remarks 
        SET remark = ?, updated_at = NOW() 
        WHERE property_number = ? AND buyer_mobile = ?`;
      connection.query(updateSql, [remark, property_number, buyer_mobile], (err) => {
        if (err) return res.status(500).json({ Error: err.sqlMessage });
        return res.status(200).json({ message: 'Remark updated successfully' });
      });
    } else {
      const insertSql = `
        INSERT INTO buyer_remarks (seller_mobile, buyer_mobile, property_number, remark, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW())`;
      connection.query(insertSql, [seller_mobile, buyer_mobile, property_number, remark], (err) => {
        if (err) return res.status(500).json({ Error: err.sqlMessage });
        return res.status(201).json({ message: 'Remark added successfully' });
      });
    }
  });
};

module.exports = { buyerRemark, addOrUpdateRemark };
