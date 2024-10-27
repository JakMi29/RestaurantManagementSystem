CREATE TABLE restaurant_owner (
    id      SERIAL NOT NULL,
    email   VARCHAR(255) UNIQUE NOT NULL,

    PRIMARY KEY (id)
);