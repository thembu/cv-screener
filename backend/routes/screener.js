const uplaod = require('../middleware/upload')
const express = require('express');
const router = express.Router();
const pdf_parse = require('pdf-parse')


router.post('/analyse', uplaod.single('cv'), async(req, res) => {

    try {
    
    const data = await pdf_parse(req.file.buffer)
    res.json({ text: data.text }) 
        

    }catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to parse PDF' })
    }
})

module.exports = router


