const express = require('express');
const fs = require('fs');
const { json } = require('express');
const router = express.Router({
    caseSensitive : false
});


router.get('/countries', (req, res) => {
    res.sendFile(process.cwd()+'/countries.json')
});
router.get('/countries/:cities', (req, res) => {
    const city = req.params.cities;
    const filedata = fs.readFileSync(process.cwd()+'/countries.json','utf-8')
    const jsonData = JSON.parse(filedata);
    res.send(jsonData[city]);
});
module.exports = router