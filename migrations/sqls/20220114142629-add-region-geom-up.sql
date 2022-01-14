/* Replace with your SQL commands */
SELECT AddGeometryColumn (
    'public',
    'region',
    'geom',
    4326,
    'MULTIPOLYGON',
    2
);