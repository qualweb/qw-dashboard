CREATE DATABASE Evaluations;

\c evaluations

CREATE TYPE module_type AS ENUM('wcag-techniques', 'act-rules', 'best-practices');
CREATE TYPE success_criteria_level AS ENUM('A', 'AA', 'AAA');
CREATE TYPE success_criteria_principle AS ENUM('Perceivable', 'Operable', 'Understandable', 'Robust');
CREATE TYPE result_verdict AS ENUM('passed', 'warning', 'failed', 'inapplicable');
CREATE TYPE accessibility_metric AS ENUM('a3');

CREATE TABLE MonitoringRegistry (
    id                      SERIAL PRIMARY KEY,
    accessibility_metric    accessibility_metric,
    main_url                VARCHAR NOT NULL,
    domain_name             VARCHAR NOT NULL,
    is_mobile               BOOLEAN NOT NULL,
    is_landscape            BOOLEAN NOT NULL,
    display_width           INTEGER NOT NULL,
    display_height          INTEGER NOT NULL,
    latest_evaluation       TIMESTAMP,
    score                   FLOAT DEFAULT -1.0,
    user_id                 INTEGER NOT NULL,
    website_name            VARCHAR NOT NULL
);

CREATE TABLE LoginWebpage (
    id                      SERIAL PRIMARY KEY,
    username_field          VARCHAR NOT NULL,
    password_field          VARCHAR NOT NULL,
    submit_button           VARCHAR NOT NULL
);

CREATE TABLE Webpage (
    id                          SERIAL PRIMARY KEY,
    url                         VARCHAR NOT NULL,
    monitoring_registry_id      INTEGER,
    needs_authentication        BOOLEAN NOT NULL DEFAULT FALSE,
    login_webpage_id            INTEGER,
    num_elements                INTEGER NOT NULL DEFAULT 0,
    page_size_kb                INTEGER NOT NULL DEFAULT 0,

    FOREIGN KEY (monitoring_registry_id) REFERENCES MonitoringRegistry(id) ON DELETE CASCADE,
    FOREIGN KEY (login_webpage_id) REFERENCES LoginWebpage(id) ON DELETE CASCADE
);

CREATE TABLE Monitoring_Cycle (
    id                      SERIAL PRIMARY KEY,
    monitoring_registry_id  INTEGER NOT NULL,
    cycle_date              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (monitoring_registry_id) REFERENCES MonitoringRegistry(id) ON DELETE CASCADE
);

CREATE TABLE Evaluation (
    id                      SERIAL PRIMARY KEY,
    monitored_website_id    INTEGER NOT NULL,
    qualweb_version         VARCHAR NOT NULL,
    evaluation_date         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    input_url               VARCHAR NOT NULL,
    complete_url            VARCHAR NOT NULL,
    dom                     VARCHAR NOT NULL,
    title                   VARCHAR NOT NULL,
    element_count           INTEGER NOT NULL,
    passed                  INTEGER NOT NULL,
    warning                 INTEGER NOT NULL,
    failed                  INTEGER NOT NULL,
    inapplicable            INTEGER NOT NULL,
    score                   FLOAT,
    screenshot              BYTEA,

    FOREIGN KEY (monitored_website_id) REFERENCES MonitoringRegistry(id) ON DELETE CASCADE
);

CREATE TABLE Monitoring_Cycle_Evaluation (
    monitoring_cycle_id     INTEGER NOT NULL,
    evaluation_id           INTEGER NOT NULL,

    PRIMARY KEY (monitoring_cycle_id, evaluation_id),
    FOREIGN KEY (monitoring_cycle_id) REFERENCES Monitoring_Cycle(id) ON DELETE CASCADE,
    FOREIGN KEY (evaluation_id) REFERENCES Evaluation(id) ON DELETE CASCADE
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

CREATE TABLE Assertion_Metadata (
    id                          SERIAL PRIMARY KEY,
    code                        VARCHAR NOT NULL,
    assertion_metadata_date     DATE DEFAULT CURRENT_DATE,
    assertion_name              VARCHAR NOT NULL,
    description                 VARCHAR NOT NULL,
    url                         VARCHAR NOT NULL,
    mapping                     VARCHAR NOT NULL,
    target_elements             VARCHAR[],
    target_attributes           VARCHAR[],
    parent_module_type          module_type NOT NULL
);

CREATE TABLE Assertion (
    id                      SERIAL PRIMARY KEY,
    module_id               INTEGER NOT NULL,
    assertion_metadata_id   INTEGER NOT NULL,
    passed                  INTEGER NOT NULL,
    warning                 INTEGER NOT NULL,
    failed                  INTEGER NOT NULL,
    inapplicable            INTEGER NOT NULL,
    outcome                 VARCHAR NOT NULL,
    description             VARCHAR NOT NULL,

    FOREIGN KEY (module_id) REFERENCES Module(id) ON DELETE CASCADE,
    FOREIGN KEY (assertion_metadata_id) REFERENCES Assertion_Metadata(id) ON DELETE CASCADE
);

CREATE TABLE Success_Criteria (
    id                      SERIAL,
    success_criteria_name   VARCHAR NOT NULL,
    success_criteria_level  success_criteria_level NOT NULL,
    principle               success_criteria_principle NOT NULL,
    success_criteria_url    VARCHAR NOT NULL,
    success_criteria_date   DATE DEFAULT CURRENT_DATE,

    PRIMARY KEY (success_criteria_name, success_criteria_level)
);

CREATE TABLE Assertion_Metadata_Success_Criteria (
    assertion_metadata_id       INTEGER NOT NULL,
    success_criteria_name       VARCHAR NOT NULL,
    success_criteria_level      success_criteria_level NOT NULL,

    PRIMARY KEY (assertion_metadata_id, success_criteria_name, success_criteria_level),
    FOREIGN KEY (assertion_metadata_id) REFERENCES Assertion_Metadata(id) ON DELETE CASCADE,
    FOREIGN KEY (success_criteria_name, success_criteria_level) REFERENCES Success_Criteria(success_criteria_name, success_criteria_level) ON DELETE CASCADE
);

CREATE TABLE Issue (
    id                  SERIAL PRIMARY KEY,
    assertion_id        INTEGER NOT NULL,
    verdict             result_verdict NOT NULL,
    description         VARCHAR NOT NULL,
    result_code         VARCHAR NOT NULL,

    FOREIGN KEY (assertion_id) REFERENCES Assertion(id) ON DELETE CASCADE
);

CREATE TABLE Element (
    id                  SERIAL PRIMARY KEY,
    issue_id            INTEGER NOT NULL,
    html_code           VARCHAR NOT NULL,
    pointer             VARCHAR NOT NULL,
    x                   FLOAT NOT NULL,
    y                   FLOAT NOT NULL,
    width               FLOAT NOT NULL,
    height              FLOAT NOT NULL,

    FOREIGN KEY (issue_id) REFERENCES Issue(id) ON DELETE CASCADE
);