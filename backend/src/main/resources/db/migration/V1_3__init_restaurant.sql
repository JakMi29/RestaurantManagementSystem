 CREATE TABLE restaurant(
    id SERIAL           NOT NULL,
    name                VARCHAR(255) UNIQUE NOT NULL,
    restaurant_owner_id INT UNIQUE NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_restaurant_owner_id
        FOREIGN KEY (restaurant_owner_id)
            REFERENCES restaurant_owner (id)
        );