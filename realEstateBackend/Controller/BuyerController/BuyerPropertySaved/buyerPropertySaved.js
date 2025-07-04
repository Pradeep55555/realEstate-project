const connection = require('../../../Model/dbConnect.js');



// GET - Fetch buyer saved properties
const getBuyerSavedProperty = (req, res) => {
    const mobile = req.params.mobile;

    const sql = `SELECT 
            bsp.property_number,
            bsp.saved_on,
            pd.mobile AS seller_mobile,
            pd.price,
            pd.city,
            pd.location,
            pd.state,
            pd.property_type,
            pd.categories,
            pd.purpose
        FROM 
            buyer_saved_property bsp
        JOIN 
            property_details pd ON bsp.property_number = pd.property_number
        WHERE 
            bsp.mobile = ?
        ORDER BY 
            bsp.saved_on DESC
    `;

    connection.query(sql, [mobile], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });

        // if (result.length === 0) {
        //     return res.status(404).json({ message: "No saved properties found for this buyer" });
        // }

        return res.status(200).json(result);
    });
};


// POST - Insert buyer save property

const addSavedProperty = (req, res) => {    
    const { mobile, property_number } = req.body;

    if (!mobile || !property_number) {
        return res.status(400).json({ message: 'Missing data' });
    }
    const sql = 'INSERT INTO buyer_saved_property (mobile, property_number) VALUES (?, ?)';

    connection.query(sql, [mobile, property_number], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(200).json({ message: 'Property already saved' });
            }
            return res.status(500).json({ message: 'Server error' });
        }
        return res.status(201).json({ message: 'Property saved successfully' });
    });
};


module.exports = {  addSavedProperty , getBuyerSavedProperty};
