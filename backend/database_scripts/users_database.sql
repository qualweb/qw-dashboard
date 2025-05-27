
CREATE TABLE Users (
    id          SERIAL PRIMARY KEY,
    auth0_id    VARCHAR UNIQUE,
    nickname    VARCHAR NOT NULL,
    picture     VARCHAR,
    email       VARCHAR NOT NULL
);