const Session = require('../models/Session');

const collectionHandlerGet = async function (req, res) {
    const {filter} = req.query;
    const session = new Session();
    
}