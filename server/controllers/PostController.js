const Property = require('../models/properties');
const User = require('../models/user');
const cloudinary = require('../utils/cloudinary')

const createProperty = async (req, res) => {
    try {
        const p = req.body;
         const imageUrls = req.files?.map(file => `${file.path}`) || [];
         console.log(p , imageUrls , req.files);
         console.log(req)
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
            res.status(201).json(listings);
        } catch (error) {
            console.error("Listing Error:", error.message);
            res.status(500).send("Server Error");
        }

    }

const userListing = async(req , res)=>{
    try {
   const {sub} = req.auth;
   const user = await User.findOne({auth0Id : sub});
   const lists = await Property.find({userId : user._id});
   res.status(201).json(lists);
    } catch (error) {
        console.error("User List Error:", error.message)
        res.status(500).send("Server Error");
    }
}

const deleteProperty = async(req , res)=>{
    try {
   const {id} = req.body;
   const property = await Property.findById(id);
   const imgRes = await cloudinary.api.delete_resources(property.Images);
   console.log(imgRes);
   await Property.deleteOne({_id : id});
   res.status(201).send("deleted successfully")
    } catch (error) {
        console.error("Delete Property Error:", error.message)
        res.status(500).send("Server Error");
    }
}   

const updateProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updated = await Property.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

    if (!updated) return res.status(404).json({ message: "Property not found" });

    res.status(200).json({ message: "Property updated successfully", property: updated });
  } catch (error) {
    console.error("Update Property Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


  const getProperty = async(req , res)=>{
    try {
       const property = await Property.findById({_id : req.params.id});
       if(property) res.status(201).json({property})
    } catch (error) {
        console.error("Get Property Error" , error.message);
        res.status(500).send("Server Error");
    }
  }

  const filterByCategoryandLocation = async(req , res) =>{
    try {
     const {category , location} = req.body;
     console.log(req.body);
     const filter = {};
     if(category && category.trim() != '') filter.category = category;
     if(location && location.trim() != '') filter["location.city"] = location;
     const filterResponse = await Property.find(filter);
     res.status(201).json({filterResponse})
    } catch (error) {
        console.error("Get Property Error" , error.message);
        res.status(500).send("Server Error");
    }
  }

module.exports = { createProperty , showProperty, userListing , updateProperty , deleteProperty , getProperty , filterByCategoryandLocation}