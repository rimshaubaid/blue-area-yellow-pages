const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// Load User model
const Business = require("../../models/Business");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/business", upload.single("businessImage"), (req, res) => {
  console.log(req.file);
  Business.findOne({ name: req.body.name }).then((business) => {
    if (business) {
      return res.status(400).json({ name: "name already exists" });
    } else {
      const newBusiness = new Business({
        userId: req.body.userId,
        name: req.body.name,
        type: req.body.type,
        location: req.body.location,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        phone: req.body.phone,
        email:req.body.email,
        timings: req.body.timings,
        address : req.body.address,
        delivery: req.body.delivery,
        businessImage: req.file.path,
      });
      newBusiness.save((err, success) => {
        if (err) {
          return res.send(err);
        }
        res.send(req.body);
      });
    }
  });
});

router.get("/business", async (req, res) => {
  try {
    var names = await Business.find({}).populate("userId").exec();

    if (names.length > 0) {
      return res.send(names);
    } else {
      return res.send({ message: "not found" });
    }
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("/search", async (req, res) => {
  try {
    var names = await Business.find({ name: req.params.name });

    if (names) {
      return res.send(names);
    } else {
      return res.send({ message: "not found" });
    }
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("/restaurants", async (req, res) => {
  try {
    var data = await Business.find({});
    const restaurants = data;
    const dataToSend = [];
    restaurants.forEach((res) => {
      if (
        res.type == "Cafe" ||
        res.type == "cafe" ||
        res.type == "Restaurant" ||
        res.type == "restaurant" ||
        res.type == "Indian Restaurant" ||
        res.type == "Pakistani Restaurant" ||
        res.type == "Chinese Restaurant" ||
        res.type == "Desi Restaurant" ||
        res.type == "desi restaurant" ||
        res.type == "Chinese restaurant" ||
        res.type == "Bakery" ||
        res.type == "bakery" ||
        res.type == "Ice cream shop"
      ) {
        dataToSend.push({
          _id: res._id,
          name: res.name,
          type: res.type,
          location: res.location,
          longitude: res.longitude,
          latitude: res.latitude,
          phone: res.phone,
          timings: res.timings,
          delivery: res.delivery,
          email: res.email,
          address: res.address,
          businessImage: res.businessImage,
        });
      }
    });
    res.send(dataToSend);
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("/hospitals", async (req, res) => {
  try {
    var data = await Business.find({});
    const restaurants = data;
    const dataToSend = [];
    restaurants.forEach((res) => {
      if (
        res.type == "Hospital" ||
        res.type == "hospital" ||
        res.type == "Medical Clinic" ||
        res.type == "medical clinic" ||
        res.type == "optician" ||
        res.type == "Optician" ||
        res.type == "dentist" ||
        res.type == "Dentist"
      ) {
        dataToSend.push({
          _id: res._id,
          name: res.name,
          type: res.type,
          location: res.location,
          longitude: res.longitude,
          latitude: res.latitude,
          phone: res.phone,
          timings: res.timings,
          delivery: res.delivery,
          email: res.email,
          address: res.address,
          businessImage: res.businessImage,
        });
      }
    });
    res.send(dataToSend);
  } catch (err) {
    return res.sned(err.message);
  }
});

router.get("/outdoors", async (req, res) => {
  try {
    var data = await Business.find({});
    const restaurants = data;
    const dataToSend = [];
    restaurants.forEach((res) => {
      if (res.type == "outdoor & recreation") {
        dataToSend.push({
          _id: res._id,
          name: res.name,
          type: res.type,
          location: res.location,
          longitude: res.longitude,
          latitude: res.latitude,
          phone: res.phone,
          timings: res.timings,
          delivery: res.delivery,
          email: res.email,
          address: res.address,
          businessImage: res.businessImage,
        });
      }
    });
    res.send(dataToSend);
  } catch (err) {
    return res.sned(err.message);
  }
});


router.get("/carrepair", async (req, res) => {
  try {
    var data = await Business.find({});
    const restaurants = data;
    const dataToSend = [];
    restaurants.forEach((res) => {
      if (res.type == "car repair") {
        dataToSend.push({
          _id: res._id,
          name: res.name,
          type: res.type,
          location: res.location,
          longitude: res.longitude,
          latitude: res.latitude,
          phone: res.phone,
          timings: res.timings,
          delivery: res.delivery,
          email: res.email,
          address: res.address,
          businessImage: res.businessImage,
        });
      }
    });
    res.send(dataToSend);
  } catch (err) {
    return res.sned(err.message);
  }
});


router.get("/gstore", async (req, res) => {
  try {
    var data = await Business.find({});
    const restaurants = data;
    const dataToSend = [];
    restaurants.forEach((res) => {
      if (res.type == "grocery store") {
        dataToSend.push({
          _id: res._id,
          name: res.name,
          type: res.type,
          location: res.location,
          longitude: res.longitude,
          latitude: res.latitude,
          phone: res.phone,
          timings: res.timings,
          delivery: res.delivery,
          email: res.email,
          address: res.address,
          businessImage: res.businessImage,
        });
      }
    });
    res.send(dataToSend);
  } catch (err) {
    return res.sned(err.message);
  }
});


router.get("/others", async (req, res) => {
  try {
    var data = await Business.find({});
    const restaurants = data;
    const dataToSend = [];
    restaurants.forEach((res) => {
      if (res.type == "others") {
        dataToSend.push({
          _id: res._id,
          name: res.name,
          type: res.type,
          location: res.location,
          longitude: res.longitude,
          latitude: res.latitude,
          phone: res.phone,
          timings: res.timings,
          delivery: res.delivery,
          email: res.email,
          address: res.address,
          businessImage: res.businessImage,
        });
      }
    });
    res.send(dataToSend);
  } catch (err) {
    return res.sned(err.message);
  }
});

router.get("/filterByDelivery", async (req, res) => {
  try {
    var data = await Business.find({});
    const restaurants = data;
    const dataToSend = [];
    restaurants.forEach((res) => {
      if (
        res.delivery == "yes" ||
        (res.delivery == "Yes" &&
          (res.type == "Cafe" ||
            res.type == "cafe" ||
            res.type == "Restaurant" ||
            res.type == "restaurant" ||
            res.type == "Indian Restaurant" ||
            res.type == "Pakistani Restaurant" ||
            res.type == "Chinese Restaurant" ||
            res.type == "Desi Restaurant" ||
            res.type == "desi restaurant" ||
            res.type == "Chinese restaurant" ||
            res.type == "Bakery" ||
            res.type == "bakery" ||
            res.type == "Ice cream shop"))
      ) {
        dataToSend.push({
          _id: res._id,
          name: res.name,
          type: res.type,
          location: res.location,
          longitude: res.longitude,
          latitude: res.latitude,
          phone: res.phone,
          timings: res.timings,
          delivery: res.delivery,
          email: res.email,
          address: res.address,
          businessImage: res.businessImage,
        });
      }
    });
    res.send(dataToSend);
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("/filterByLocation/:location/:type", async (req, res) => {
  try {
    var location = req.params.location;
    var type = req.params.type;
    var data = await Business.find({
      $and: [{ location: location }, { type: type }],
    });
    const restaurants = data;
    const dataToSend = [];
    restaurants.forEach((res) => {
      if (restaurants.length > 0) {
        dataToSend.push({
          _id: res._id,
          name: res.name,
          type: res.type,
          location: res.location,
          longitude: res.longitude,
          latitude: res.latitude,
          phone: res.phone,
          timings: res.timings,
          delivery: res.delivery,
          email:res.email,
          address:res.address,
          businessImage: res.businessImage,
        });
      }
    });
    res.send(dataToSend);
  } catch (err) {
    return res.send(err.message);
  }
});

router.patch("/update", upload.single("businessImage"), async (req, res) => {
  try {
    const updateBusiness = await Business.findOneAndUpdate(
      { name: req.body.name },
      {
        $set: {
          name: req.body.newName,
          type: req.body.type,
          location: req.body.location,
          longitude: req.body.longitude,
          latitude: req.body.latitude,
          phone: req.body.phone,
          timings: req.body.timings,
          delivery: req.body.delivery,
          email:req.body.email,
          address:req.body.address,
          businessImage: req.file ? req.file.path : req.body.businessImage,
        },
      },
      { new: true, useFindAndModify: false }
    );
    res.json(updateBusiness);
  } catch (err) {
    res.send(err);
  }
});

router.post("/delete", (req, res) => {
  Business.deleteOne({ name: req.body.name }).then((business) => {
    if (business) {
      return res
        .status(200)
        .json({
          message: "Business deleted successfully. Refreshing data...",
          success: true,
        });
    }
  });
});

{
  /*router.get('/searchBusiness/:name',async (req,res) => {
  try{
    
    var data=await Business.find({ name:req.params.name
    });
    const restaurants=data;
    const dataToSend = [];
    restaurants.forEach((res) => {
      {
        dataToSend.push({
          _id:res._id,
          name:res.name,
          type:res.type,
          location:res.location,
          longitude:res.longitude,
          latitude:res.latitude,
          phone:res.phone,
          timings:res.timings,
          delivery:res.delivery,
          businessImage:res.businessImage
        });
      }
    });
    res.send(dataToSend);
  } catch(err){
    return res.sned(err.message)
  }
  
});*/
}

router.get("/searchBusiness/:name", async (req, res) => {
  try {
    var name = req.params.name;
    var names = await Business.find({
      name: { $regex: new RegExp(name, "i") },
    });
    if (names.length > 0) {
      return res.send(names);
    } else {
      return res.status(400).send({ message: "not found!" });
    }
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports = router;
