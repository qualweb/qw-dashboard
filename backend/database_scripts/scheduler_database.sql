CREATE TYPE ScheduleType AS ENUM (
    'daily',
    'weekly',
    'monthly',
    'yearly',
    'one-time'
);

CREATE TABLE Schedule (
    id                  SERIAL PRIMARY KEY,
    schedule_type       ScheduleType NOT NULL,
    monitoring_id       INTEGER,
    webpages_ids        INTEGER[],
    day                 VARCHAR NOT NULL,
    month               VARCHAR NOT NULL,
    year                VARCHAR NOT NULL,
    hour                VARCHAR NOT NULL,
    minute              VARCHAR NOT NULL,
    second              VARCHAR NOT NULL,
    day_of_week         VARCHAR NOT NULL
);