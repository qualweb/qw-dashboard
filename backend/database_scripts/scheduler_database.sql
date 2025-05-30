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
    day                 INTEGER NOT NULL,
    month               INTEGER NOT NULL,
    year                INTEGER NOT NULL,
    hour                INTEGER NOT NULL,
    minute              INTEGER NOT NULL,
    second              INTEGER NOT NULL,
    day_of_week         INTEGER NOT NULL
);