const express = require('express');
const router = express.Router();

const Devotional = require('../models/devotional');

// GET api/devotional
// Get daily Devotionals
router.get('/', async (req, res) => {
    try {
        const date = new Date();
        const dateFormat = date.getFullYear()+'-'+("0"+(date.getMonth()+1))+'-'+date.getDate()
        const devs = await Devotional.find({date:dateFormat});

        res.status(200).json({success:true, message:!devs?"No devotionals":"Ok", devotionals:devs});
    } catch (err) {
        res.status(400).json({success:false, message:err})   
    }
})

// GET api/devotional/summary
// Get daily Devotionals summary
router.get('/summary', async (req, res) => {
    try {
        const date = new Date();
        const dateFormat = date.getFullYear()+'-'+("0"+(date.getMonth()+1))+'-'+date.getDate()
        const devs = await Devotional.find({date:dateFormat}, {_id:0, category:1, bookName:1, author:1, imageURL:1});//title:1, date:1,});

        res.status(200).json({success:true, message:!devs?"No devotionals":"Ok", devotionals:devs});
    } catch (err) {
        res.status(400).json({success:false, message:err})   
    }
})

// GET api/devotional/:category
// Get daily Devotional by category
router.get('/:category', async (req, res) => {
    try {
        const date = new Date();
        const dateFormat = date.getFullYear()+'-'+("0"+(date.getMonth()+1))+'-'+date.getDate()
        const dev = await Devotional.findOne({date:dateFormat, category:req.params.category});

        res.status(200).json({success:true, message:!dev?"No devotional":"Ok", devotional:dev});
    } catch (err) {
        res.status(400).json({success:false, message:err});
    }
})

// DELETE api/devotional/:id
// Delete a especific Devotional
router.delete('/:id', async (req, res) => {
    try {
        const dev = await Devotional.findByIdAndDelete(req.params.id);

        res.status(200).json({success:true, message:!dev?"No devotional found":"Deleted correctly", devotional:dev});
    } catch (err) {
        res.status(400).json({success:false, message:err});
    }
})

// UPDATE api/devotional/:id
// Update a especific Devotional
router.patch('/:id', async (req, res) => {
    try {
        const dev = await Devotional.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).json({success:true, message:"Updated correctly", devotional:dev});
    } catch (err) {
        res.status(400).json({success:false, message:err});
    }
})

// POST api/devotional
// Create a new Devotional
router.post('/', async (req, res) => {
    const newDevotional = Devotional(req.body);
    
    try {
        const exists = await Devotional.find({title:newDevotional.title, category:newDevotional.category, bookName:newDevotional.bookName, verse:newDevotional.verse});

        if (exists != []) { //Item already exists
            res.status(200).json({success:true, message:"Devotional alredy exists", devotional:exists});
        } else { 
            const dev = await newDevotional.save();
            res.status(200).json({success:true, message:"Saved correctly", devotional:dev});            
        }
    } catch (err) {
        res.status(400).json({success:false, message:err});
    }
})

module.exports = router;