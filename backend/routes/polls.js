const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const tinify = require("tinify");
const Poll = require("../models/Poll");

tinify.key = "MwVJF8fL4YsJ1ZnHt3GpSJHF5D2xm0GX";

tinify.validate(function(err) {
    if (err) {
        console.error("Tinify API key validation failed:", err.message);
    } else {
        console.log("Tinify API key is valid!");
    }
});

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary upload directory

// router.post("/", upload.single("image"), async (req, res) => {
//   const { title, options, anonymous, createdBy } = req.body;
//   const filePath = req.file.path;
//   const optimizedPath = `uploads/optimized-${req.file.filename}.png`;

//   try {
//     // Optimize the image using TinyPNG
//     await tinify.fromFile(filePath).toFile(optimizedPath);

//     // Create the poll with optimized image
//     const poll = new Poll({
//       title,
//       options: JSON.parse(options).map((option) => ({ text: option })),
//       image: optimizedPath, // Save the optimized image path
//       anonymous,
//       createdBy,
//     });

//     await poll.save();

//     // Broadcast the new poll to all clients
//     const io = req.app.get("socketio");
//     io.emit("pollUpdated", poll);

//     // Clean up the original image file
//     fs.unlinkSync(filePath);

//     res.status(201).json({ message: "Poll created successfully", poll });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Image optimization failed" });
//   }
// });

// router.post("/", upload.single("image"), async (req, res) => {
//   const { title, options, anonymous, createdBy, image } = req.body;

//   // Handle image upload or use URL directly
//   let optimizedPath = null;
//   if (req.file) {
//     const filePath = req.file.path;
//     optimizedPath = `uploads/optimized-${req.file.filename}.png`;

//     try {
//       // Optimize the uploaded file
//       await tinify.fromFile(filePath).toFile(optimizedPath);
//       fs.unlinkSync(filePath); // Clean up original file
//     } catch (err) {
//       console.error("Image optimization failed", err);
//       return res.status(500).json({ error: "Image optimization failed" });
//     }
//   } else if (image) {
//     // Use the provided image URL directly
//     optimizedPath = image;
//   } else {
//     return res.status(400).json({ error: "No image provided" });
//   }

//   try {
//     // Create the poll
//     const poll = new Poll({
//       title,
//       options: JSON.parse(options).map((option) => ({ text: option })),
//       image: optimizedPath, // Use the optimized image or URL
//       anonymous,
//       createdBy,
//     });

//     await poll.save();

//     // Broadcast the new poll to all clients
//     const io = req.app.get("socketio");
//     io.emit("pollUpdated", poll);

//     res.status(201).json({ message: "Poll created successfully", poll });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to create poll" });
//   }
// });

// router.post("/", upload.single("image"), async (req, res) => {
//   const { title, options, anonymous, createdBy, image } = req.body;
//   console.log("The image is recieved",image)
//   // Handle image upload or use URL directly
//   let optimizedPath = null;
//   if (req.file) {
//     const filePath = req.file.path;
//     optimizedPath = `uploads/optimized-${req.file.filename}.png`;
//      console.log('Reached in here');
//     try {
//       // Optimize the uploaded file
//       await tinify.fromFile(filePath).toFile(optimizedPath);
//       fs.unlinkSync(filePath); // Clean up original file
//       console.log("Reached in here")
//     } catch (err) {
//       console.error("Image optimization failed", err);
//       return res.status(500).json({ error: "Image optimization failed" });
//     }
//   } else if (image) {
//     // Use the provided image URL directly
//     optimizedPath = image;
//   } else {
//     return res.status(400).json({ error: "No image provided" });
//   }

//   try {
//     console.log("Options received in the body:", options);

//     // Create the poll
//     const poll = new Poll({
//       title,
//       options: options.map((option) => ({
//         text: option.text, // Assuming options are sent as an array of objects
//       })),
//       image: optimizedPath, // Use the optimized image or URL
//       anonymous,
//       createdBy,
//     });

//     await poll.save();

//     // Broadcast the new poll to all clients
//     // const io = req.app.get("socketio");
//     // io.emit("pollUpdated", poll);

//     res.status(201).json({ message: "Poll created successfully", poll });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to create poll" });
//   }
// });

// router.post("/", upload.single("image"), async (req, res) => {
//   const { title, options, anonymous, createdBy, image } = req.body;

//   console.log("Options received in the body:", options);
//   let parsedOptions;
//   try {
//     parsedOptions = JSON.parse(options);
//     if (!Array.isArray(parsedOptions) || parsedOptions.length === 0) {
//       return res.status(400).json({ error: "Options must be a non-empty array" });
//     }
//   } catch (err) {
//     return res.status(400).json({ error: "Invalid options format" });
//   }

//   // Handle image upload or use URL directly
//   let optimizedPath = null;
//   if (req.file) {
//     const filePath = req.file.path;
//     optimizedPath = `uploads/optimized-${req.file.filename}.png`;
//     try {
//       await tinify.fromFile(filePath).toFile(optimizedPath);
//       fs.unlinkSync(filePath); // Clean up original file
//     } catch (err) {
//       console.error("Image optimization failed", err);
//       return res.status(500).json({ error: "Image optimization failed" });
//     }
//   } else if (image) {
//     optimizedPath = image;
//   } else {
//     return res.status(400).json({ error: "No image provided" });
//   }

//    try {
//   //   // Ensure options is an array and transform strings to objects with `text`
//   //   const parsedOptions = Array.isArray(options)
//   //     ? options.map((option) => (typeof option === "string" ? { text: option } : option))
//   //     : [];

//   //   if (!Array.isArray(parsedOptions) || parsedOptions.length === 0) {
//   //     return res.status(400).json({ error: "Options must be a non-empty array" });
//   //   }

//     // Create the poll
//     const poll = new Poll({
//       title,
//       options, // Use the transformed array
//       image: optimizedPath,
//       anonymous,
//       createdBy,
//     });

//     await poll.save();

//     res.status(201).json({ message: "Poll created successfully", poll });
//   } catch (err) {
//     console.error("Error creating poll:", err);
//     res.status(500).json({ error: "Failed to create poll" });
//   }
// });
router.post("/", upload.single("image"), async (req, res) => {
  const { title, options, anonymous, createdBy, image } = req.body;

  // Handle image upload or use URL directly
  let optimizedPath = null;
  if (req.file) {
    const filePath = req.file.path;
    optimizedPath = `uploads/optimized-${req.file.filename}.png`;
    try {
      await tinify.fromFile(filePath).toFile(optimizedPath);
      fs.unlinkSync(filePath); // Clean up original file
    } catch (err) {
      console.error("Image optimization failed", err);
      return res.status(500).json({ error: "Image optimization failed" });
    }
  } else if (image) {
    optimizedPath = image;
  } else {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    // Parse options if it is a string
    let parsedOptions;
    try {
      parsedOptions = typeof options === "string" ? JSON.parse(options) : options;
    } catch (err) {
      return res.status(400).json({ error: "Invalid options format" });
    }

    // Validate that parsedOptions is an array
    if (!Array.isArray(parsedOptions)) {
      return res.status(400).json({ error: "Options must be an array" });
    }

    // Create the poll
    const poll = new Poll({
      title,
      options: parsedOptions, // Ensure it's an array of objects
      image: optimizedPath,
      anonymous,
      createdBy,
    });

    await poll.save();

    res.status(201).json({ message: "Poll created successfully", poll });
  } catch (err) {
    console.error("Error creating poll:", err);
    res.status(500).json({ error: "Failed to create poll" });
  }
});


router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find().populate("createdBy","name");
    res.status(200).json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// router.post('/:pollId',async(req,res)=>{
//   const userId = req.params.id;
//   const optionId=req.body;
//   try{
//      const user=await Poll.findById(userId);
//      user.options.vote=
//   }catch(err){
//   }
// })
router.post('/:pollId', async (req, res) => {
  const { pollId } = req.params; // Get the pollId from URL params
  const { optionId } = req.body; // Get the optionId from request body
  
  try {
    // Find the poll by pollId
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Find the option to update
    const option = poll.options.find((opt) => opt._id.toString() === optionId);
    if (!option) {
      return res.status(404).json({ error: 'Option not found' });
    }

    // Increment the vote count for the selected option
    option.votes += 1;

    // Save the updated poll
    await poll.save();

    // Return the updated poll
    res.status(200).json({ message: 'Vote recorded successfully', poll });
  } catch (err) {
    console.error('Error voting on poll:', err);
    res.status(500).json({ error: 'Failed to record vote' });
  }
});


module.exports = router;
// const handleVote = async (pollId, optionId) => {
//   try {
//     await axios.post(`/api/polls/${pollId}/vote`, { optionId });
//     dispatch(fetchPolls()); // Refresh polls after voting
//   } catch (err) {
//     console.error("Error voting on poll:", err);
//   }
// };