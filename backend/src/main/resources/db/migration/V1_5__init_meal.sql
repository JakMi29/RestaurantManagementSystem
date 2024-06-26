CREATE TABLE meal
(
    id          SERIAL          NOT NULL,
    name             VARCHAR(20)     NOT NULL,
    description      VARCHAR(64)     NOT NULL,
    category      VARCHAR(32)     NOT NULL,
    price            NUMERIC(19, 2)  NOT NULL,
    restaurant_id       INT             NOT NULL,
    image      VARCHAR(128)     NOT NULL,
    meal_of_the_day BOOLEAN NOT NULL,
     PRIMARY KEY (id),
      CONSTRAINT fk_restaurant_id
          FOREIGN KEY (restaurant_id)
              REFERENCES restaurant (id)
);