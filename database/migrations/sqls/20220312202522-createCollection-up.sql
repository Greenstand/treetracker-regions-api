CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE collection 
    (
        id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        owner_id uuid NOT NULL,
        name varchar NOT NULL,
	    created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
    );