CREATE TABLE region
    (
        id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        owner_id uuid NOT NULL,
        collection_id uuid REFERENCES collection(id),
        name varchar NOT NULL,
        properties jsonb,
        show_on_org_map boolean,
        calculate_statistics boolean,
	    shape geometry(MultiPolygon, 4326) NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
    );