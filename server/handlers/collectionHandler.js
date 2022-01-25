const Session = require('../models/Session');
const CollectionService = require('../services/CollectionService');

const collectionHandlerGet = async function (req, res) {
    const {options} = req.query;
    const session = new Session();
    const collectionService = new CollectionService(session)
    const ownerCollections = await collectionService.getAllByFilter(options)
    res.status(200).json({
        collections: ownerCollections
    })
}

const collectionHandlerGetCount = async function (req, res) {
    const {filter} = req.query;
    const session = new Session()
    const collectionService = new CollectionService(session)
    const ownerCollectionsCount = await collectionService.countByFilter(filter)
    res.status(200).json({
        count: ownerCollectionsCount
    })
}

const collectionHandlerGetByCollectionId = async function (req, res) {
    const {collectionId} = req.params
    const session = new Session()
    const collectionService = new CollectionService(session)
    const collection = await collectionService.getById(collectionId)
    res.status(200).json({collection})
}

const collectionHandlerPost = async function (req, res) {
    const {ownerId} = req.query;
    const collection = req.body;
    console.log(collection)
    collection.ownerId = ownerId
    const session = new Session();
    const collectionService = new CollectionService(session);
    const newCollection = await collectionService.createCollection(collection);
    res.status(200).json(newCollection)
}

const collectionHandlerPut = async function (req, res) {
    const {collectionId} = req.params;
    const collection = req.body;
    collection.id = collectionId;
    const session = new Session();
    const collectionService = new CollectionService(session);
    const updatedCollection = await collectionService.updateCollection(collection)
    res.status(200).json({
        collection: updatedCollection
    })
}

module.exports = {
    collectionHandlerGet,
    collectionHandlerGetByCollectionId,
    collectionHandlerGetCount,
    collectionHandlerPost,
    collectionHandlerPut
}