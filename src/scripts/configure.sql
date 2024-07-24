CREATE DATABASE db_dashboard;

USE db_dashboard;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(500) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE patients (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    birthdate DATE,
    gender VARCHAR(10),
    civil_name VARCHAR(100),
    optional_gender VARCHAR(50),
    cpf VARCHAR(14),
    rg VARCHAR(20),
    naturalness VARCHAR(100),
    nationality VARCHAR(100),
    religion VARCHAR(100),
    education VARCHAR(100),
    state VARCHAR(100),
    ethnicity VARCHAR(50),
    marital_status VARCHAR(50),
    profession VARCHAR(100),
    cep VARCHAR(10),
    address VARCHAR(200),
    number VARCHAR(10),
    complement VARCHAR(200),
    neighborhood VARCHAR(100),
    city VARCHAR(100),
    state_address VARCHAR(100),
    country VARCHAR(100),
    cell_phone VARCHAR(15),
    home_phone VARCHAR(15),
    work_phone VARCHAR(15),
    insurance VARCHAR(100),
    plan VARCHAR(100),
    card_number VARCHAR(50),
    validity DATE,
    accommodation VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    roles INT NOT NULL DEFAULT 2,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
