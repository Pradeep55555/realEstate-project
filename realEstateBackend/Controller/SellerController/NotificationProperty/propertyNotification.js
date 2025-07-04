
const connection = require('../../../Model/dbConnect.js');

// GET - Fetch notifications for a seller

const getNotificationsForSeller = (req, res) => {
  const seller_mobile = req.params.seller_mobile;

  const sql = `
    SELECT property_number, buyer_mobile, notified_at 
    FROM notification_buyer_inquiry 
    WHERE seller_mobile = ?
    ORDER BY notified_at DESC
  `;

  connection.query(sql, [seller_mobile], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    return res.status(200).json(result);
  });
};

// PUT: Mark notifications as viewed for a property

const deleteNotificationsForSeller = (req, res) => {
  const { seller_mobile, property_number } = req.body;
  if (!seller_mobile || !property_number) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql = `DELETE FROM notification_buyer_inquiry WHERE seller_mobile = ? AND property_number = ?`;
  connection.query(sql, [seller_mobile, property_number], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    return res.status(200).json({ message: "Notifications cleared" });
  });
};

module.exports = {getNotificationsForSeller , deleteNotificationsForSeller };
