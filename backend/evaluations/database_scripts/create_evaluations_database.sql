CREATE DATABASE Evaluations;

\c evaluations

CREATE TYPE module_type AS ENUM('wcag-techniques', 'act-rules', 'best-practices');
CREATE TYPE success_criteria_level AS ENUM('A', 'AA', 'AAA');
CREATE TYPE success_criteria_principle AS ENUM('Perceivable', 'Operable', 'Understandable', 'Robust');
CREATE TYPE result_verdict AS ENUM('passed', 'warning', 'failed', 'inapplicate');

CREATE TABLE Evaluation (
    id                  SERIAL PRIMARY KEY,
    qualweb_version     VARCHAR NOT NULL,
    evaluation_date     DATE DEFAULT CURRENT_DATE,
    input_url           VARCHAR NOT NULL,
    domainName          VARCHAR NOT NULL,
    domain              VARCHAR NOT NULL,
    uri                 VARCHAR NOT NULL,
    complete_url        VARCHAR NOT NULL,
    is_mobile           BOOLEAN NOT NULL,
    is_landscape        BOOLEAN NOT NULL,
    display_width       INTEGER NOT NULL,
    display_height      INTEGER NOT NULL,
    dom                 VARCHAR NOT NULL,
    title               VARCHAR NOT NULL,
    element_count       INTEGER NOT NULL,
    passed              INTEGER NOT NULL,
    warning             INTEGER NOT NULL,
    failed              INTEGER NOT NULL,
    inapplicable        INTEGER NOT NULL
);

CREATE TABLE Module (
    id                  SERIAL PRIMARY KEY,
    evaluation_id       INTEGER NOT NULL,
    module_type         module_type NOT NULL,
    passed              INTEGER NOT NULL,
    warning             INTEGER NOT NULL,
    failed              INTEGER NOT NULL,
    inapplicable        INTEGER NOT NULL,

    FOREIGN KEY (evaluation_id) REFERENCES Evaluation(id) ON DELETE CASCADE
);

CREATE TABLE Assertion (
    id                      SERIAL PRIMARY KEY,
    module_id               INTEGER NOT NULL,
    passed                  INTEGER NOT NULL,
    warning                 INTEGER NOT NULL,
    failed                  INTEGER NOT NULL,
    inapplicable            INTEGER NOT NULL,
    outcome                 VARCHAR NOT NULL,
    description             VARCHAR NOT NULL,

    FOREIGN KEY (module_id) REFERENCES Module(id) ON DELETE CASCADE
);

CREATE TABLE Assertion_Metadata (
    id                          SERIAL PRIMARY KEY,
    assertion_id                INTEGER UNIQUE,
    code                        VARCHAR UNIQUE NOT NULL,
    assertion_metadata_date     DATE DEFAULT CURRENT_DATE,
    assertion_name              VARCHAR NOT NULL,
    description                 VARCHAR NOT NULL,
    url                         VARCHAR NOT NULL,
    mapping                     VARCHAR NOT NULL,
    target_elements             VARCHAR[],
    target_attributes           VARCHAR[],

    FOREIGN KEY (assertion_id) REFERENCES Assertion(id) ON DELETE CASCADE
);

CREATE TABLE Success_Criteria (
    id                      SERIAL PRIMARY KEY,
    success_criteria_name   VARCHAR NOT NULL,
    success_criteria_level  success_criteria_level NOT NULL,
    principle               success_criteria_principle NOT NULL,
    success_criteria_url    VARCHAR NOT NULL,
    success_criteria_date   DATE DEFAULT CURRENT_DATE
);

CREATE TABLE Assertion_Metadata_Success_Criteria (
    assertion_metadata_id          INTEGER NOT NULL,
    success_criteria_id            INTEGER NOT NULL,

    PRIMARY KEY (assertion_metadata_id, success_criteria_id),
    FOREIGN KEY (assertion_metadata_id) REFERENCES Assertion_Metadata(id) ON DELETE CASCADE,
    FOREIGN KEY (success_criteria_id) REFERENCES Success_Criteria(id) ON DELETE CASCADE
);

CREATE TABLE Result (
    id                  SERIAL PRIMARY KEY,
    assertion_id        INTEGER NOT NULL,
    verdict             result_verdict NOT NULL,
    description         VARCHAR NOT NULL,

    FOREIGN KEY (assertion_id) REFERENCES Assertion(id) ON DELETE CASCADE
);

CREATE TABLE Element (
    id                  SERIAL PRIMARY KEY,
    result_id           INTEGER NOT NULL,
    html_code           VARCHAR NOT NULL,
    pointer             VARCHAR NOT NULL,

    FOREIGN KEY (result_id) REFERENCES Result(id) ON DELETE CASCADE
);