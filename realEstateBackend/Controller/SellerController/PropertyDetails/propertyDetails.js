
const connection = require('../../../Model/dbConnect.js');


const getPropertyDetails = (req, res) => {
    const mobile = req.params.mobile;
    const query = "SELECT * FROM property_details where mobile = ?";
    connection.query(query, [mobile], (err, results) => {
        if (err) {
            console.error("Error fetching property data:", err);
            return res.status(500).json({ error: "Database error" });
        }
        // console.log(results)
        res.json(results);
    });
};


const getAllProperty = (req, res) => {
    const query = "SELECT p.*, s.full_name FROM property_details p JOIN seller s ON p.mobile = s.mobile";
    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching property data:", err);
            return res.status(500).json({ error: "Database error" });
        }
        // console.log(results)
        res.json(results);
    });
};


const countProperty = (req, res) => {
    const mobile = req.params.mobile;
    const query = "SELECT status FROM property_details WHERE mobile = ?";
    connection.query(query, [mobile], (err, results) => {
        if (err) {
            console.error("Error fetching property data:", err);
            return res.status(500).json({ error: "Database error" });
        }
        // console.log(results)
        res.json(results);
    });
};

const postProperty = (req, res) => {
    try {
        const { property_number, mobile, property_type, categories, state, city, location, nearby, status,
            description, area, price, ownership, purpose } = req.body;

        // Handle uploaded photo files (from multer)
        const photoFiles = req.files || [];
        const photoPaths = photoFiles.map(file => file.filename);
        // console.log(req.body)
        // console.log("Files received:", photoPaths);

        const query = "INSERT INTO property_details (property_number, mobile, property_type, categories, state, city, location, nearby, photos, status, description, area, price, ownership, purpose) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const values = [property_number, mobile, property_type,
            typeof categories === "string" ? categories : JSON.stringify(categories),
            state, city, location, nearby || null, JSON.stringify(photoPaths),
            status, description, area, price, ownership, purpose];

        connection.query(query, values, (err, results) => {
            if (err) {
                console.error("MySQL Error:", err.sqlMessage || err);
                return res.status(500).json({ error: "Database error ", details: err.sqlMessage || err });
            }
            res.status(201).json({
                message: " Property added successfully",
                insertedId: results.insertId,
                uploadedFiles: photoPaths
            });
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// ******* property form field for dynamic purpose 

const getPropertyTypes = (req, res) => {
  const query = "SELECT * FROM property_types ORDER BY property_type";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching property types:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};


const getPropertyCategories = (req, res) => {
  const query = "SELECT * FROM property_categories ORDER BY property_category";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching property categories:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

const getPropertyPurpose = (req, res) => {
  const query = "SELECT * FROM property_purpose ORDER BY property_purpose";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching property purposes:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};



module.exports = { getPropertyDetails, getAllProperty, countProperty, postProperty  , getPropertyTypes , getPropertyCategories , getPropertyPurpose};