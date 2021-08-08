const express = require('express');
const router = express.Router();
const Uploads = require('../models/uploads');

// Getting all
router.get('/', async (req, res, next) => {
  try {
    // res.send("This is the Getting all route");
    const uploads = await Uploads.find();
    res.send(uploads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
});

// // Getting one WITHOUT middleware function getFile
// router.get('/:id', (req, res, next) => {
//   res.send(req.params.id);
// });
// Getting one WITH middleware function getFile
router.get('/:id', getFile, (req, res, next) => {
  // res.send(res.upload.description); // "normal" version
  res.json(res.upload); // JSON version
});

// Creating one
router.post('/', async (req, res, next) => {
  const upload = new Uploads({
    description: req.body.description
    // fileUpload: req.body.fileUpload
  });

  try {
    const newUpload = await upload.save();
    res.status(201).json(newUpload); // 201 = successfully created one item
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 = something wrong with the user input
  }
});

// Editing one
router.patch('/:id', getFile, async (req, res, next) => { // router.patch only updates what the user passes us, while router.put updates everything
  // check and update for for all properties of the model the the user can enter
  if ( req.body.description != null ) {
    // set object property from db to object property from User request 
    res.upload.description = req.body.description;
  }
  
  try {
    const editUpload = await res.upload.save();
    res.json(editUpload);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  
});

// Deleting one
router.delete('/:id', getFile,  async (req, res, next) => {;
  try {
    await res.upload.remove();
    res.json({ message: 'Deleted Upload' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware function because it is less code
async function getFile( req, res, next ) {
  let upload;
  try {
    upload = await Uploads.findById(req.params.id);
    // check if uplaod exists
    if ( upload == null ) {
      return res.status(404).json({ message: 'Cannot find upload' }); // if we cannot find anything, we immediatly want to leave the function
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // put upload into response object
  res.upload = upload;
  next();
}

module.exports = router;