\c proyectodesarrollo

INSERT INTO countries (name) VALUES 
    ('Argentina'),
    ('Brasil'),
    ('Colombia'),
    ('Uruguay'),
    ('Peru'),
    ('Portugal'),
    ('Mexico'),
    ('Estados Unidos'),
    ('Francia'),
    ('Chile'),
    ('Nicaragua'),
    ('Guatemala');

INSERT INTO provinces (name, "countryId") VALUES 
    ('Córdoba',1),
    ('Santa Fe',1),
    ('Mendoza',1),
    ('La Paz',4),
    ('Benfica',7),
    ('Porto Rica',6),
    ('Pimbula',8),
    ('California',8),
    ('Nevada',8),
    ('Manila',2);

INSERT INTO cities (name, "provinceId") VALUES 
    ('Córdoba Capital',1),
    ('Santa Fe Capital',1),
    ('Rosario',1),
    ('Buenos Aires',4),
    ('Santiago',7),
    ('Rio de Janeiro',6),
    ('Villa Maria',1),
    ('Bell Ville',5),
    ('Orlando',5),
    ('Miami',5),
    ('Villa Nueva',1);

INSERT INTO persons (name, email, "birthDate", "cityId") VALUES
    ('Marquito', 'marquito@gmail.com', '2018-12-09', 1),
    ('Jorgelito', 'jorgelito@gmail.com', '2018-12-12', 3),
    ('Manolo', 'manolo@gmail.com', '2018-11-10', 3),
    ('Brauni', 'brauni@gmail.com', '2018-10-03', 3),
    ('Gambino', 'gambino@gmail.com', '2018-09-18', 3),
    ('Wabilandi', 'wabilandi@gmail.com', '2018-01-15', 3),
    ('Juansito', 'juansito@gmail.com', '2018-05-23', 4);