CREATE TABLE waiter (
    id                 SERIAL          NOT NULL,
    email              VARCHAR(255)    NOT NULL UNIQUE,
    salary             NUMERIC(19, 2)  NOT NULL,
    employment_date    TIMESTAMP WITH TIME ZONE NOT NULL,
    restaurant_id      INT             NOT NULL,
    user_id            INT             NOT NULL UNIQUE,

    PRIMARY KEY (id),

    CONSTRAINT fk_restaurant_id
        FOREIGN KEY (restaurant_id)
            REFERENCES restaurant (id),

    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
            REFERENCES _user (id)
);
