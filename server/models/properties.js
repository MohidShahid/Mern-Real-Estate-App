const { default: mongoose } = require("mongoose");

const propertySchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["Buy", "Sell", "Rent"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    features: {
        area: { type: Number, required: true },
        bedroom: { type: Number, required: true },
        bathroom: { type: Number, required: true },
    },
    location: {
        address: { type: String, required: true },
        postalCode: { type: Number },
        city: { type: String, required: true },
        country: { type: String, required: true },
        coordinates: {
            lat: { type: Number },
            lng: { type: Number }
        }
    },
    PhoneNo : String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Images : [String],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Property = mongoose.model('Property' ,propertySchema);

module.exports = Property;