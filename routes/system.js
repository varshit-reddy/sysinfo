const { request } = require('express');
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const pool = require("../db");
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {


        const systems = await pool.query("select * from GetSystems()");
        
        res.json(systems.rows);

    }
    catch (err) {
        console.error(err.message);
    }
})
//update system
router.post('/', [auth, [
    check('osName', 'osName is required').not().isEmpty(),
    check('customerName', 'customerName is required').not().isEmpty(),
    check('location', 'location is required').not().isEmpty(),
    check('serialNum', 'serialNum is required').not().isEmpty(),
    check('alert', 'alert is required').not().isEmpty(),
]], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            let messages = errors.array().map(function (n, i) {
                return n.msg;
            });
            return res.status(400).json({ errors: messages });
        }
        let { osName, customerName, location, serialNum, alert } = req.body;

        const newSystem = await pool.query("CALL putsystems($1,$2, $3,$4,$5,0,'f');",
            [osName, customerName, location, serialNum, alert]);
        res.json(newSystem);

    }
    catch (err) {
        console.error(err.message);
    }
})

//update system
router.put('/', [auth, [
    check('id', 'id is required').not().isEmpty().isNumeric()
]], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            let messages = errors.array().map(function (n, i) {
                return n.msg;
            });
            return res.status(400).json({ errors: messages });
        }
        let { osName, customerName, location, serialNum, id, alert } = req.body;

        const newSystem = await pool.query("CALL putsystems($1,$2, $3,$4,$5,$6,'t');",
            [osName, customerName, location, serialNum, alert, id]);
        res.json(newSystem);

    }
    catch (err) {
        console.error(err.message);
    }
})
router.delete('/', [auth, [
    check('id', 'id is required').not().isEmpty().isNumeric()
]], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        let messages = errors.array().map(function (n, i) {
            return n.msg;
        });
        return res.status(400).json({ errors: messages });
    }
    const {id} = req.body;
    const newSystem = await pool.query("call DeleteSystems($1)",
            [id]);
        res.json(newSystem);

});
module.exports = router;