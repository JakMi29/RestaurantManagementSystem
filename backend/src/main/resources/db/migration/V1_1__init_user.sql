  CREATE TABLE _user (
        id SERIAL NOT NULL,
        name VARCHAR(255),
        surname VARCHAR(255),
        phone VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255),
        role VARCHAR(255),
        active BOOLEAN NOT NULL,
        PRIMARY KEY (id)
    );