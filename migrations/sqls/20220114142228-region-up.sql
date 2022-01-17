/* Replace with your SQL commands */
CREATE TABLE region
    (
        id uuid NOT NULL PRIMARY KEY,
        owner_id uuid NOT NULL,
        collection_id uuid,
        name varchar NOT NULL,
        properties jsonb,
        show_on_org_map boolean,
        calculate_statistics boolean,
        created_at timestamptz NOT NULL,
        updated_at timestamptz NOT NULL
    );