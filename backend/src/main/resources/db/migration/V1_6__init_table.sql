CREATE TABLE _table
(
    id  SERIAL  NOT NULL,
    name    VARCHAR(32)     NOT NULL,
    status  VARCHAR(32)     NOT NULL,
    restaurant_id   INT NOT NULL,
     PRIMARY KEY (id),
      CONSTRAINT fk_restaurant_id
          FOREIGN KEY (restaurant_id)
              REFERENCES restaurant (id)
);