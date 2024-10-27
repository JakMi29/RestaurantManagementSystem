CREATE TABLE _user (
    id SERIAL   NOT NULL,
    name        VARCHAR(255) NOT NULL,
    surname     VARCHAR(255) NOT NULL,
    phone       VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(255) NOT NULL,
    active      BOOLEAN NOT NULL,

    PRIMARY KEY (id)
);

CREATE UNIQUE INDEX unique_active_email
ON _user (email)
WHERE active = TRUE;