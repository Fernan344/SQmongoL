export const textDefaultNewTab = `-- Type here your SQML queries

SELECT campo1 FROM tabla1;

SELECT campo1, campo2 FROM tabla1;

SELECT * FROM tabla1
WHERE campo1 IS NOT NULL;

SELECT * FROM tabla1
WHERE campo1 IS NOT NULL OR campo2 = 0.5;

SELECT * FROM tabla1
WHERE campo1 IS NOT NULL OR 
        (campo2 = 0 AND campo3 <> 16);

SELECT * FROM tabla1
WHERE campo1 IS NOT NULL OR 
        campo2 = 0 OR (campo3 = 1 AND campo4 <> 16);

SELECT * FROM tabla1
WHERE campo1 IS NULL;

SELECT campo1, campo2 FROM tabla1
WHERE campo1 = false 
        AND campo2 > 5 
        AND campo3 < 5;

SELECT campo1, campo2 FROM tabla1
WHERE campo1 = false 
        AND campo2 > 5 
        AND campo3 < 5
ORDER BY campo1, campo2 ASC, campo3 DESC;

SELECT campo1, campo2 FROM tabla1
WHERE campo1 = false 
        AND campo2 > 5 
        AND campo3 < 5
ORDER BY campo1, campo2 ASC, campo3 DESC
limit 10;

/*** Query AGGREGATES examples ***/

SELECT prestamo.idcliente "cinfo.id", prestamo.saldo pinfo.saldo, 
c.nombre "cinfo.nombre" FROM prestamo
JOIN cliente c ON "c.idcliente" = "prestamo.idcliente";

SELECT prestamo.idcliente "cinfo.id", prestamo.saldo "pinfo.saldo", 
c.nombre "cinfo.nombre", cu.saldo "account.saldo" FROM prestamo
JOIN cliente c ON "c.idcliente" = "prestamo.idcliente"
JOIN cuenta cu ON "cu.idcliente" = "c.idcliente"
ORDER BY c.idcliente DESC;

SELECT campo1, campo2 FROM tabla1
WHERE campo1 = false 
        AND campo2 > 5 
        AND campo3 < 5
GROUP BY campo1
ORDER BY campo1, campo2 ASC, campo3 DESC;

SELECT curso.nombre course, student.nombre student,
        ciudad.lvl1.lvl2.lvl3.lvl4.value city.info.value
FROM asignacion
JOIN curso curso ON curso._id = asignacion.id_curso AND curso.nombre = "curso1"
JOIN profesor profesor ON curso.profesor = profesor._id AND profesor.nombre <> "profe"
JOIN student student ON asignacion.id_estudiante = student._id AND student.nombre <> "stud"
JOIN ciudad ciudad ON profesor.ciudad_id = ciudad._id AND ciudad.nombre <> "guate"
WHERE course IS NOT NULL;

SELECT curso.nombre course, "student.nombre" student,
        ciudad.lvl1.lvl2.lvl3.lvl4.value city.info.value, "$$GroupBy" groupedFields
FROM asignacion
JOIN curso curso ON curso._id = asignacion.id_curso AND curso.nombre = "curso1"
JOIN profesor profesor ON curso.profesor = profesor._id AND profesor.nombre <> "profe"
JOIN student student ON asignacion.id_estudiante = student._id AND student.nombre <> "stud"
JOIN ciudad ciudad ON profesor.ciudad_id = ciudad._id AND ciudad.nombre <> "guate"
WHERE course IS NOT NULL
GROUP BY curso.nombre;

CREATE DATABASE nuevabase;

USE nuevabase;

CREATE TABLE prestamos (
    \`idprestamo\` int(11) NOT NULL,
    \`idcliente\` int(11) NOT NULL,
    \`tasa\` float NOT NULL,
    \`saldo\` float NOT NULL,
    \`fecha_creacion\` date NOT NULL
);

CREATE TABLE \`cuenta\` (
    \`idcuenta\` int(11) NOT NULL,
    \`moneda\` int(11) NOT NULL,
    \`tasa\` float NOT NULL,
    \`capitalizacion\` int(11) NOT NULL,
    \`interes\` float NOT NULL,
    \`saldo\` float NOT NULL,
    \`idcliente\` int(11) NOT NULL
);

CREATE TABLE \`cliente\` (
    \`idcliente\` int(11) NOT NULL,
    \`nombre\` varchar(255) NOT NULL,
    \`fecha_nac\` date NOT NULL,
    \`cui\` varchar(13) NOT NULL,
    \`telefono\` varchar(8) NOT NULL,
    \`direccion\` varchar(255) NOT NULL
);

INSERT INTO \`cliente\` ('idcliente', 'nombre', 'fecha_nac', 'cui', 'telefono', 'direccion') VALUES
(1, 'Mario Lopez Garcia', '1980-02-02', '111111111111', '22221111', 'Ciudad Capital'),
(2, 'Ana Maria Catañeda', '2000-03-03', '2447653241567', '77665544', 'Quetzaltenango'),
(3, 'Juan Carlos Espinoza', '1990-12-01', '1212121212128', '55667733', 'Huehuetenango'),
(4, 'Jorge Alejandro Paz', '2001-06-27', '2322222220987', '34567898', 'Santa Cruz del Quiche'),
(5, 'Juan Godinez', '1970-01-01', '4598092347811', '56234567', 'Canton Xetinac, Santa Cruz del Quiché'),
(6, 'Pedro Garcia Lopez', '1982-12-12', '2222222222222', '76562345', 'Colonia El Bombero, Quetzaltenango'),
(7, 'Alberto Cifuentes Lopez', '1975-06-01', '4523456789011', '56872345', 'Colonia Ordonez, Huehuetenango');

INSERT INTO \`clientes\` ([{hola.jose: "mundo"}, {"dos": "tres"}, {"cuatro": "tres"}]);

INSERT INTO \`cuenta\` ('idcuenta', 'moneda', 'tasa', 'capitalizacion', 'interes', 'saldo', 'idcliente') VALUES
(1, 1, 10.58, 1, 0, 1000, 4);

INSERT INTO \`prestamo\` (\`idprestamo\`, \`idcliente\`, \`tasa\`, \`saldo\`, \`fecha_creacion\`) VALUES
(1, 6, 1.22, 50000, '2010-01-01'),
(2, 6, 0.18, 12000, '2018-01-31'),
(3, 7, 0.18, 25000, '2021-06-06'),
(4, 4, 0.16, 14000, '2023-01-15'),
(5, 1, 0.2, 5000, '2019-05-01'),
(6, 1, 0.14, 0, '2005-12-01');
`

export const makeData = (number) => {
    const data = [];
    for (let i = 0; i < number; i++) {
      data.push({
        title:  `New File *`,
        content: textDefaultNewTab
      });
    }
    return data;
}

export const translateModes = {
    OnlyTranslate: false,
    TranslateAndRun: true
}