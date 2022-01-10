const expect = require("expect-runtime");
const HttpError = require("../utils/HttpError");
const BaseRepository = require("./BaseRepository")

class RegionRepository extends BaseRepository{
    constructor(session){
        super("region", session)
        this._tableName = "region";
        this._session = session
    }

    async create(object){
        const result = await super.create(object);
        expect(result).match({
        id: expect.any(String),
        });
        return result;
    }
}