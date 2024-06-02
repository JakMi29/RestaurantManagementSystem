CREATE TABLE waiter(
              id SERIAL NOT NULL,
              email VARCHAR(255),
              restaurant_id INT NOT NULL,
              PRIMARY KEY (id),
              CONSTRAINT fk_restaurant_id
                          FOREIGN KEY (restaurant_id)
                              REFERENCES restaurant (id)
              );