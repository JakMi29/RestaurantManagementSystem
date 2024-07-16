CREATE TABLE order_meal
(
    id          SERIAL          NOT NULL,
    order_id            INT                 NOT NULL,
    quantity            INT                 NOT NULL,
    meal_id             INT                 NOT NULL,
    price            NUMERIC(19, 2)  NOT NULL,
     status      VARCHAR(32)     NOT NULL,
     PRIMARY KEY (id),
      CONSTRAINT fk_order_id
          FOREIGN KEY (order_id)
              REFERENCES _order (id),
       CONSTRAINT fk_meal_id
                FOREIGN KEY (meal_id)
                    REFERENCES meal (id)
);