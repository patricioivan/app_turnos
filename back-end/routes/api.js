const express = require('express');

// Routes
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        mensaje: 'project_t_v2 api',
    });
});

module.exports = router;
