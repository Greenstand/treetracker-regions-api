/* Replace with your SQL commands */
SELECT AddGeometryColumn (
    'public',
    'region',
    'shape',
    4326,
    'MULTIPOLYGON',
    2
);