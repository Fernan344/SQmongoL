<h1>TEST this app</h1>
<h3>link: <a href="https://sqmongol.vercel.app/">SQMongoL APP</a>.</h3> 

<h1> GRAMMAR </h1>
<h2> Reserved Words </h2>
<h3>/*A*/</h3>
<li>AND</li>
<li>ARRAY</li>
<li>ASC</li>
<h3>/*B*/</h3>
<li>BIGINT</li>
<li>BINARY</li>
<li>BOOL</li>
<li>BOOLEAN</li>
<li>BLOB</li>
<li>BY</li>
<h3>/*C*/</h3>
<li>CREATE</li>
<li>CHAR</li>
<li>CLOB</li>
<h3>/*D*/</h3>
<li>DATABASE</li>
<li>DATE</li>
<li>DATETIME</li>
<li>DECIMAL</li>
<li>DEFAULT</li>
<li>DESC</li>
<li>DOUBLE</li>
<h3>/*E*/</h3>
<h3>/*F*/</h3>
<li>FALSE</li>
<li>FLOAT</li>
<li>FROM</li>
<h3>/*G*/</h3>
<li>GROUP</li>
<h3>/*H*/</h3>
<h3>/*I*/</h3>
<li>INT</li>
<li>INTEGER</li>
<li>INTO</li>
<li>INSERT</li>
<li>IS</li>
<h3>/*J*/</h3>
<li>JOIN</li>
<li>JSON</li>
<h3>/*K*/</h3>
<li>KEY</li>
<h3>/*L*/</h3>
<li>LIMIT</li>
<h3>/*M*/</h3>
<li>MEDIUMBLOB</li>
<li>MEDIUMTEXT</li>
<h3>/*N*/</h3>
<li>NOT</li>
<li>NULL</li>
<li>NUMERIC</li>
<h3>/*O*/</h3>
<li>ON</li>
<li>OBJECTID</li>
<li>OID</li>
<li>OR</li>
<li>ORDER</li>
<h3>/*P*/</h3>
<li>PRIMARY</li>
<h3>/*Q*/</h3>
<h3>/*R*/</h3>
<h3>/*S*/</h3>
<li>SELECT</li>
<li>SMALLINT</li>
<h3>/*T*/</h3>
<li>TABLE</li>
<li>TEXT</li>
<li>TIME</li>
<li>TIMESTAMP</li>
<li>TINYINT</li>
<li>TRUE</li>
<h3>/*U*/</h3>
<li>UNIQUE</li>
<li>USE</li>
<h3>/*V*/</h3>
<li>VALUES</li>
<li>VARCHAR</li>
<li>VARBINARY</li>
<h3>/*W*/</h3>
<li>WHERE</li>
<h3>/*X*/</h3>
<li>XML</li>
<h3>/*Y*/</h3>
<h3>/*Z*/</h3>

<h2> Symbols </h2>
<h3>Arithmetics</h3>
<li>+</li>
<li>-</li>
<li>*</li>
<li>/</li>

<h3>Relationals</h3>
<li>=</li>
<li>!=</li>
<li><></li>
<li>>=</li>
<li><=</li>
<li>></li>
<li><</li>

<h3>Others</h3>
<li>{</li>
<li>}</li>
<li>:</li>
<li>,</li>
<li>;</li>
<li>(</li>
<li>)</li>
<li>[</li>
<li>]</li>

<h3>Comments</h3>
<li>//uniline</li>
<li>--uniline</li>
<li>/* multiline */</li>

<h2> Natives </h2>
<li>DECIMAL / FLOAT</li>
[0-9]+"."[0-9]+
<br>Example: 5.255 | 5.00
<li>INT / INTEGER</li>
[0-9]+
<br>Example: 5 | 9 | 10 | 2
<li>IDENTIFIER</li>
[A-Za-z"_""$"]["_"0-9A-Za-z]*("."["_"0-9A-Za-z]+)*
<br>Example: table.property.property
<li>SIMPLE IDENTIFIER</li>
[A-Za-z"_""$"]["_"0-9A-Za-z]*
<br>Example: table | table1 | table2
<br>
<br>
<br>

<h1> GRAMMAR PRODUCTIONS</h1>

INIT: 
    
    INSTRUCCIONES EOF

INSTRUCCIONES :

    INSTRUCCIONES INSTRUCCION PTCOMA
    | INSTRUCCION PTCOMA

<h4> <li> JSON GRAMMAR </li> </h4>

JSONKEY:

    CADENA
    | SIMPLEIDENTIFICADOR 

JSONVALUE:

    NATIVEEXPRESSION

JSONPROPERTY:

    JSONKEY DOSPTS JSONVALUE 

JSONPROPERTIES:

    JSONPROPERTIES COMA JSONPROPERTY
    | JSONPROPERTY

JSONOBJ:

    LLAVEIZQ JSONPROPERTIES LLAVEDER 
    | LLAVEIZQ LLAVEDER 

JSONARRAYVALUES:

    JSONARRAYVALUES COMA NATIVEEXPRESSION
    | NATIVEEXPRESSION 

JSONARRAY:

    CORIZQ JSONARRAYVALUES CORDER 
    | CORIZQ CORDER 

JSONARRAYOBJECTSVALUES:

    JSONARRAYOBJECTSVALUES COMA JSONOBJ
    | JSONOBJ 

JSONARRAYOBJECTS:

    CORIZQ JSONARRAYOBJECTSVALUES CORDER
    | CORIZQ CORDER

<h2> NATIVE FUNCTIONS </h2>
<h4> <li> OBJECT ID FUNCTION </li> </h4>

OBJECTIDFUNCTIONINSTANCE:

    RESOBJECTID
    | RESOID

OBJECTIDFUNCTION:

    OBJECTIDFUNCTIONINSTANCE PARABRE CADENA PARCIERRA

<h2> EXPRESSIONS </h2>
<h4> <li> NATIVE </li> </h4>

IDENTIFIER:

    IDENTIFICADOR 

QUERYALIAS:

    IDENTIFIER
    | CADENA

NATIVEIDENTIFIER:

    IDENTIFIER 
    | CADENA

BOOLEANS:

    RESTRUE   
    | RESFALSE  

NATIVEEXPRESSION:

    NUMBER 
    | INTEGERNUMBER
    | BOOLEANS
    | CADENA
    | OBJECTIDFUNCTION 
    | JSONOBJ
    | JSONARRAY 
    | IDENTIFIER 

<h4> <li> ARITHMETICS </li> </h4>

ARITOPERATIONS:

    SUMSIGN 
    | MULTSIGN
    | DIVSIGN 
    | SUBSSIGN

ARITEXPRESION:

    ARITEXPRESION SUMSIGN ARITEXPRESION
    | ARITEXPRESION MULTSIGN ARITEXPRESION 
    | ARITEXPRESION DIVSIGN ARITEXPRESION
    | ARITEXPRESION SUBSSIGN ARITEXPRESION
    | PARABRE ARITEXPRESION PARCIERRA
    | NATIVEEXPRESSION

<h4> <li> RELATIONALS </li> </h4>

RELATIONALOPERATIONS:

    EQUALSTO  
    | NOTEQUALSTO
    | DIFERENTTO
    | GREATERTHAN
    | GREATEREQUALSTHAN
    | LESSTHAN
    | LESSEQUALSTHAN

RELAEXPRESION:

    ARITEXPRESION RELATIONALOPERATIONS ARITEXPRESION   
    | ARITEXPRESION RESIS RESNOT RESNULL
    | ARITEXPRESION RESIS RESNULL

<h4> <li> LOGICALS </li> </h4>

LOGICEXPRESION:

    RESNOT LOGICEXPRESION
    | LOGICEXPRESION RESOR LOGICEXPRESION   
    | LOGICEXPRESION RESAND LOGICEXPRESION
    | RELAEXPRESION  
    | PARABRE LOGICEXPRESION PARCIERRA

<h2> INSTRUCTIONS </h2>

INSTRUCCION:

    CREATETABLEINS  
    | CREATEDATABASE  
    | USEINS
    | QUERY
    | INSERTINSTRUCTION
    | INVALID
    | error PTCOMA 

<h4> <li> CREATE INSTRUCTIONS </li> </h4>

<h5> PARAMETERS </h5>

DOUBLEPARAMETER:

    PARABRE INTEGERNUMBER COMA INTEGERNUMBER PARCIERRA
    | /* nil */

SINGLEPARAMETER:

    PARABRE INTEGERNUMBER PARCIERRA
    | /* nil */

<h5> DATA TYPES </h5>

<h6> Varchar </h6>

VARCHARTYPE:

    RESVARCHAR PARABRE INTEGERNUMBER PARCIERRA

<h6> Text </h6>

TEXTTYPE:

    RESTEXT

<h6> Char </h6>

CHARTYPE:

    RESCHAR

<h6> Integer </h6>

INTEGERVALIDRES:

    RESINT
    | RESINTEGER

INTTYPE:

    INTEGERVALIDRES SINGLEPARAMETER

<h6> Big Int </h6>

BIGINTTYPE:

    RESBIGINT   

<h6> Small Int </h6>

SMALLINTTYPE:

    RESMALLINT

<h6> Tinyint </h6>

TINYINTTYPE:

    RESTINYINT

<h6> Decimal </h6>

DECIMALTYPE:

    RESDECIMAL DOUBLEPARAMETER
    | RESNUMERIC DOUBLEPARAMETER

<h6> Float </h6>

FLOATTYPE:

    RESFLOAT SINGLEPARAMETER
    | RESDOUBLE SINGLEPARAMETER

<h6> Boolean </h6>

BOOLEANTYPE:

    RESBOOLEAN
    | RESBOOL

<h6> Date </h6>

DATETYPE:

    RESDATE
    | RESDATETIME

<h6> Time </h6>

TIMETYPE:

    RESTIME SINGLEPARAMETER

<h6> Timestamp </h6>

TIMESTAMPTYPE:
    RESTIMESTAMP SINGLEPARAMETER

<h6> Binary </h6>

BINARYTYPE:

    RESBINARY

<h6> Var Binary </h6>

VARBINARYTYPE:

    RESVARBINARY

<h6> Blob </h6>

BLOBTYPE:

    RESBLOB

<h6> Clob </h6>

CLOBTYPE:

    RESCLOB

<h6> Xml </h6>

XMLTYPE:

    RESXML

<h6> Json </h6>

JSONTYPE:

    RESJSON

<h6> Array </h6>

ARRAYTYPE:

    RESARRAY CORIZQ DATATYPES CORDER

<h6> Types </h6>

DATATYPES:

    VARCHARTYPE
    | TEXTTYPE
    | CHARTYPE 
    | INTTYPE 
    | BIGINTTYPE
    | SMALLINTTYPE
    | TINYINTTYPE
    | DECIMALTYPE
    | FLOATTYPE
    | BOOLEANTYPE 
    | DATETYPE
    | TIMETYPE
    | TIMESTAMPTYPE
    | BINARYTYPE
    | VARBINARYTYPE
    | BLOBTYPE
    | CLOBTYPE
    | XMLTYPE
    | JSONTYPE

<h4> <li> CREATE TABLE INS </li> </h4>

CREATETABLEINS:

    RESCREATE RESTABLE NATIVEIDENTIFIER
    PARABRE CREATEPARAMS PARCIERRA

CREATEPARAMS:

    CREATEPARAMS COMA CREATEPARAM
    | CREATEPARAM
    |  /* nil */ 

CREATEPARAM:

    NATIVEIDENTIFIER DATATYPES CREATEOPTIONS
    | NATIVEIDENTIFIER DATATYPES 

CREATEOPTIONS:

    CREATEOPTIONS CREATEOPTION
    | CREATEOPTION

CREATEOPTION:

    RESNOT RESNULL
    | RESNULL 
    | RESDEFAULT NATIVEEXPRESSION
    | RESUNIQUE  
    | RESPRIMARY RESKEY

<h4> <li> INSERT INS </li> </h4>

INSERTINSTRUCTION:

    RESINSERT RESINTO NATIVEIDENTIFIER PARABRE
    INSERTKEYS PARCIERRA RESVALUES PARABRE INSERTDATA PARCIERRA
    | RESINSERT RESINTO NATIVEIDENTIFIER PARABRE JSONARRAYOBJECTS PARCIERRA

INSERTKEYS:

    INSERTKEYS COMA NATIVEIDENTIFIER
    | NATIVEIDENTIFIER 

INSERTDATA:

    INSERTDATA COMA INSERTREGISTER
    | INSERTREGISTER

INSERTREGISTER:

    PARABRE REGISTERVALUES PARCIERRA

REGISTERVALUES:

    REGISTERVALUES COMA NATIVEEXPRESSION
    | NATIVEEXPRESSION

<h4> <li> CREATE DATABASE INS </li> </h4>

CREATEDATABASE:

    RESCREATE RESDATABASE NATIVEIDENTIFIER

<h4> <li> USE INS </li> </h4>

USEINS:

    RESUSE NATIVEIDENTIFIER  

<h4> <li> QUERY INS </li> </h4>

QUERY:

    SELECTINS OPTIONFROMJOIN 

SELECTINS:

    RESSELECT QUERYPARAMS RESFROM NATIVEIDENTIFIER

QUERYPARAMS:

    MULTSIGN  
    | LISTQUERYPARAMS  

LISTQUERYPARAMS:

    LISTQUERYPARAMS COMA QUERYPARAM
    | QUERYPARAM 

QUERYPARAM:

    ARITEXPRESION QUERYALIAS
    | ARITEXPRESION

OPTIONFROMJOIN:

    JOINISTRUCTS OPTIONFROMWHERE
    | OPTIONFROMWHERE

JOINISTRUCTS:

    JOINISTRUCTS JOINISTRUCT
    | JOINISTRUCT  

JOINISTRUCT:

    RESJOIN NATIVEIDENTIFIER NATIVEIDENTIFIER
    RESON LOGICEXPRESION

OPTIONFROMWHERE:

    RESWHERE LOGICEXPRESION OPTIONFROMGROUPBY
    | OPTIONFROMGROUPBY  

OPTIONFROMGROUPBY:

    RESGROUP RESBY GROUPBYPARAMS OPTIONFROMORDERBY 
    | OPTIONFROMORDERBY

GROUPBYPARAMS:

    GROUPBYPARAMS COMA NATIVEIDENTIFIER 
    | NATIVEIDENTIFIER

OPTIONFROMORDERBY:

    RESORDER RESBY ORDERBYPARAMS OPTIONFROMLIMIT 
    | OPTIONFROMLIMIT

ORDERBYPARAMS:

    ORDERBYPARAMS COMA ORDERBYPARAM 
    | ORDERBYPARAM

ORDERBYPARAM:

    IDENTIFICADOR ORDERVALUE  

ORDERVALUE:

    RESASC  
    | RESDESC 
    | /* nil */ 

OPTIONFROMLIMIT:

    RESLIMIT NATIVEEXPRESSION
    | /* nil */  

<br>
<br>

<h1> EXAMPLES </h1>                

    -- Type here your SQML queries
    

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
        `idprestamo` int(11) NOT NULL,
        `idcliente` int(11) NOT NULL,
        `tasa` float NOT NULL,
        `saldo` float NOT NULL,
        `fecha_creacion` date NOT NULL
    );

    CREATE TABLE `cuenta` (
        `idcuenta` int(11) NOT NULL,
        `moneda` int(11) NOT NULL,
        `tasa` float NOT NULL,
        `capitalizacion` int(11) NOT NULL,
        `interes` float NOT NULL,
        `saldo` float NOT NULL,
        `idcliente` int(11) NOT NULL
    );

    CREATE TABLE `cliente` (
        `idcliente` int(11) NOT NULL,
        `nombre` varchar(255) NOT NULL,
        `fecha_nac` date NOT NULL,
        `cui` varchar(13) NOT NULL,
        `telefono` varchar(8) NOT NULL,
        `direccion` varchar(255) NOT NULL
    );

    INSERT INTO `cliente` ('idcliente', 'nombre', 'fecha_nac', 'cui', 'telefono', 'direccion') VALUES
    (1, 'Mario Lopez Garcia', '1980-02-02', '111111111111', '22221111', 'Ciudad Capital'),
    (2, 'Ana Maria Catañeda', '2000-03-03', '2447653241567', '77665544', 'Quetzaltenango'),
    (3, 'Juan Carlos Espinoza', '1990-12-01', '1212121212128', '55667733', 'Huehuetenango'),
    (4, 'Jorge Alejandro Paz', '2001-06-27', '2322222220987', '34567898', 'Santa Cruz del Quiche'),
    (5, 'Juan Godinez', '1970-01-01', '4598092347811', '56234567', 'Canton Xetinac, Santa Cruz del Quiché'),
    (6, 'Pedro Garcia Lopez', '1982-12-12', '2222222222222', '76562345', 'Colonia El Bombero, Quetzaltenango'),
    (7, 'Alberto Cifuentes Lopez', '1975-06-01', '4523456789011', '56872345', 'Colonia Ordonez, Huehuetenango');

    INSERT INTO `clientes` ([{hola.jose: "mundo"}, {"dos": "tres"}, {"cuatro": "tres"}]);

    INSERT INTO `cuenta` ('idcuenta', 'moneda', 'tasa', 'capitalizacion', 'interes', 'saldo', 'idcliente') VALUES
    (1, 1, 10.58, 1, 0, 1000, 4);

    INSERT INTO `prestamo` (`idprestamo`, `idcliente`, `tasa`, `saldo`, `fecha_creacion`) VALUES
    (1, 6, 1.22, 50000, '2010-01-01'),
    (2, 6, 0.18, 12000, '2018-01-31'),
    (3, 7, 0.18, 25000, '2021-06-06'),
    (4, 4, 0.16, 14000, '2023-01-15'),
    (5, 1, 0.2, 5000, '2019-05-01'),
    (6, 1, 0.14, 0, '2005-12-01');
