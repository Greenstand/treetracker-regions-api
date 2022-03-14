const BaseRepository = require('./BaseRepository');

class RegionRepository extends BaseRepository {
  constructor(session) {
    super('region', session);
    this._tableName = 'region';
    this._session = session;
  }

  async getShapeByRegionId(id) {
    const result = await this._session.getDB().raw(
      `
      SELECT ST_AsGeoJSON(shape) AS shape, name FROM region where id = ?
    `,
      [id],
    );

    return result.rows[0];
  }

  async createRegion(object) {
    const {
      calculate_statistics,
      collection_id,
      created_at,
      id,
      name,
      owner_id,
      properties,
      shape,
      show_on_org_map,
      updated_at,
    } = object;

    const result = await this._session.getDB().raw(
      `INSERT INTO region(
          id, 
          name, 
          owner_id, 
          show_on_org_map, 
          calculate_statistics, 
          collection_id, 
          properties,
          created_at, 
          updated_at,
          shape
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ST_SETSRID(ST_GeomFromGeoJSON(?), 4326))
        RETURNING 
          calculate_statistics,
          collection_id,
          created_at,
          id,
          name,
          owner_id,
          properties,
          show_on_org_map,
          updated_at;`,
      [
        id,
        name,
        owner_id,
        show_on_org_map,
        calculate_statistics,
        collection_id,
        properties,
        created_at,
        updated_at,
        shape,
      ],
    );

    return result.rows[0];
  }
}

module.exports = RegionRepository;
