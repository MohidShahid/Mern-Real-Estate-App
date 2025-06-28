const UserModel = require('../models/user');

const CreateUser = async (req, res) => {
  try { 
    const { sub, email, given_name, family_name, picture } = req.body;

    let existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ user: existingUser });
    }

    const createdUser = new UserModel({
      auth0Id: sub,
      fname: given_name,
      lname: family_name,
      email,
      profileImg: picture || "",
    });

    await createdUser.save();
    res.status(201).json({ user: createdUser });
  } catch (error) {
    console.error("CreateUser Error:", error.message);
    res.status(500).send("Server Error");
  }
};

const updatedUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No image file received" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { Image: req.file.path },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ message: "Update failed" });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Update User error:", error.message);
    res.status(500).send("Server Error");
  }
};


module.exports = { CreateUser, updatedUser };
