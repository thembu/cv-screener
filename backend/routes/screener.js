const uplaod = require('../middleware/upload')
const express = require('express');
const router = express.Router();
const pdf_parse = require('pdf-parse')
const analyseCV = require('../services/groq')


router.post('/analyse', uplaod.single('cv'), async(req, res) => {

    try {
    
    const {text} = await pdf_parse(req.file.buffer)
    const jd = req.body.jd

    if (!text || !jd.trim()) {
        return res.status(400).json({ error: 'Invalid input data' })
    }

    const result = await analyseCV.analyseCV(text, jd)
    res.json(result)

    }catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to parse PDF' })
    }
})

module.exports = router


