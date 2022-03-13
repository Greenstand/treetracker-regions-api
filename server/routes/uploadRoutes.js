const express = require('express');
const { handlerWrapper } = require('../handlers/utils');
const { uploadHandlerPost } = require('../handlers/uploadHandler');

const router = express.Router();

router.post('/', handlerWrapper(uploadHandlerPost));

module.exports = router;
