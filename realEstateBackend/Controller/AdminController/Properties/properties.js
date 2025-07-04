const connection = require('../../../Model/dbConnect.js');

// API: Get all property from `property_deatils`

const getAllProperties = (req, res) => {
    const sql = "SELECT * FROM property_details";
    connection.query(sql, (err, result) => {
        if (err) return res.status(500).json({ Error: err.sqlMessage });
        if (result.length === 0) return res.status(404).json({ message: "Sellers not found" });
        // console.log(result)
        return res.status(200).json(result);
    });
};

// API: Get Top Buyer from `sold_property`

const getTopBuyer = (req, res) => {
    const sql = `
    SELECT b.full_name , b.mobile as buyer_mobile, COUNT(*) AS propertiesBought  FROM sold_property sp
    JOIN buyer b ON sp.buyer_mobile = b.mobile
    GROUP BY b.mobile
    ORDER BY propertiesBought DESC
    LIMIT 1;
  `;

    connection.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        if (result.length === 0) return res.status(404).json({ message: "No sales yet" });
        res.status(200).json(result[0]);
    });
};

// API: Get Top Seller from `sold_property`

const getTopSeller = (req, res) => {
    const sql = `
        SELECT s.full_name, s.mobile AS seller_mobile, COUNT(*) AS propertiesSold
        FROM sold_property sp
        JOIN seller s ON sp.seller_mobile = s.mobile
        GROUP BY s.mobile
        ORDER BY propertiesSold DESC
        LIMIT 1;
    `;

    connection.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        if (result.length === 0) return res.status(404).json({ message: "No sales yet" });
        res.status(200).json(result[0]);
    });
};


//  API: Get Most Demanded Property Type from property_details

const getMostDemandedPropertyType = (req, res) => {
    const sql = `
        SELECT property_type, COUNT(*) AS count
        FROM property_details
        WHERE status = 'Sold'
        GROUP BY property_type
        ORDER BY count DESC
        LIMIT 1;
    `;

    connection.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        if (result.length === 0) return res.status(404).json({ message: "No sold properties yet" });
        res.status(200).json(result[0]);
    });
};


module.exports = { getAllProperties, getTopBuyer , getTopSeller , getMostDemandedPropertyType}

