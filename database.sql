CREATE DATABASE jwt;
CREATE TABLE jwta (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL

);
INSERT INTO jwta (username, email, password) VALUES ('Nga', 'nga08102004@gmail.com', 'Nga123456@')