-- Active: 1695257636860@@127.0.0.1@5432@pdv

CREATE DATABASE pdv 

CREATE TABLE
    usuarios (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    );

CREATE TABLE
    categorias (
        id SERIAL PRIMARY KEY,
        descricao TEXT
    );

INSERT INTO
    categorias (descricao)
VALUES ('Informática'), ('celulares'), ('Beleza e Perfumaria'), ('Mercado'), ('Livros e Papelaria'), ('Brinquedos'), ('Moda'), ('Bebê'), ('Games');

CREATE TABLE
    produtos (
        ID SERIAL PRIMARY KEY,
        DESCRICAO TEXT NOT NULL,
        QUANTIDADE_ESTOQUE INTEGER NOT NULL,
        VALOR INTEGER NOT NULL,
        CATEGORIA_ID INTEGER references categorias(id)
    );

CREATE Table
    clientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        email VARCHAR(320) NOT NULL UNIQUE,
        cpf CHAR(11) UNIQUE,
        cep VARCHAR(9),
        rua VARCHAR(100),
        numero VARCHAR(10),
        bairro VARCHAR(50),
        cidade VARCHAR(50),
        estado VARCHAR(50)
    );


    CREATE Table pedidos(
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    observacao TEXT,
    valor_total INTEGER NOT NULL
    );

    CREATE Table pedido_produtos ( 
        id SERIAL PRIMARY KEY,
        pedido_id  INTEGER REFERENCES pedidos(id),
        produto_id INTEGER  REFERENCES produtos(id),
        quantidade_produto INTEGER NOT NULL,
        valor_produto INTEGER NOT NULL
    );

     ALTER TABLE produtos ADD COLUMN  produto_imagem text
        

DROP Table  pedido_produtos;
DROP Table pedidos

