const Property = require('../models/properties');
const User = require('../models/user')

const createProperty = async (req, res) => {
    try {
        const p = req.body;
         const imageUrls = req.files?.map(file => `${file.path}`) || [];
        const user = await User.findOne({ auth0Id: req.auth?.sub });
        if (!user) return res.status(401).json({ message: "User not found" });
        const newProperty = new Property({
            title: p.title,
            description: p.description,
            category: p.category,
            price: p.price,
            features: {
                bedroom: p.bedroom,
                bathroom: p.bathroom,
                area: p.area
            },
            location: {
                address: p.address,
                postalCode: p.postalCode,
                city : p.city,
                country : p.country
            },
            PhoneNo: p.PhoneNo,
            userId: user._id,
            Images : imageUrls,
        })

        await newProperty.save()
        res.status(201).json({ user })
    } catch (error) {
        console.error("CreateProperty Error:", error.message);
        res.status(500).send("Server Error");
    }

}

const showProperty = async (req, res) => {
        try {
            const listings = await Property.find({});
            res.status(201).json(listings)
        } catch (error) {
            console.error("Listing Error:", error.message);
            res.status(500).send("Server Error");
        }

    }

module.exports = { createProperty , showProperty }