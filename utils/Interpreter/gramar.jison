%{
    const select = require('./models/Instructions/Select')
    const join = require('./models/Instructions/Join')
    const nativo = require('./models/Expresions/Native');
    const aritmetico = require('./models/Expresions/Aritmetica');
    const relacional = require('./models/Expresions/Relacional');
    const createDatabase = require('./models/Instructions/CreateDatabase');
    const createCollection = require('./models/Instructions/CreateCollection');
    const insertInto = require('./models/Instructions/InsertInto');
    const logica = require('./models/Expresions/Logica');
    const Tipo = require('./models/Three/Type');
%}
%lex 


%options case-insensitive 
//inicio analisis lexico
%%

/*A*/
"AND"                                                       return 'RESAND';
"ARRAY"                                                     return 'RESARRAY';
"ASC"                                                       return 'RESASC';
/*B*/
"BIGINT"                                                    return 'RESBIGINT';
"BINARY"                                                    return 'RESBINARY';
"BOOL"                                                      return 'RESBOOL';
"BOOLEAN"                                                   return 'RESBOOLEAN';
"BLOB"                                                      return 'RESBLOB';
"BY"                                                        return 'RESBY';
/*C*/
"CREATE"                                                    return 'RESCREATE';
"CHAR"                                                      return 'RESCHAR';
"CLOB"                                                      return 'RESCLOB';
/*D*/
"DATABASE"                                                  return 'RESDATABASE';
"DATE"                                                      return 'RESDATE';
"DATETIME"                                                  return 'RESDATETIME';    
"DECIMAL"                                                   return 'RESDECIMAL';
"DEFAULT"                                                   return 'RESDEFAULT';
"DESC"                                                      return 'RESDESC';
"DOUBLE"                                                    return 'RESDOUBLE';
/*E*/
/*F*/
"FALSE"                                                     return 'RESFALSE';
"FLOAT"                                                     return 'RESFLOAT';
"FROM"                                                      return 'RESFROM';
/*G*/
/*H*/
/*I*/
"INT"                                                       return 'RESINT';
"INTEGER"                                                   return 'RESINTEGER';
"INTO"                                                      return 'RESINTO';
"INSERT"                                                    return 'RESINSERT';
"IS"                                                        return 'RESIS';
/*J*/
"JOIN"                                                      return 'RESJOIN';
"JSON"                                                      return 'RESJSON';
/*K*/
"KEY"                                                       return 'RESKEY';
/*L*/
"LIMIT"                                                     return 'RESLIMIT';
/*M*/
"MEDIUMBLOB"                                                return 'RESMEDIUMBLOB';
"MEDIUMTEXT"                                                return 'RESMEDIUMTEXT';
/*N*/
"NOT"                                                       return 'RESNOT';
"NULL"                                                      return 'RESNULL';  
"NUMERIC"                                                   return 'RESNUMERIC';
/*O*/
"ON"                                                        return 'RESON';   
"OBJECTID"                                                  return 'RESOBJECTID';
"OID"                                                       return 'RESOID';
"OR"                                                        return 'RESOR';    
"ORDER"                                                     return 'RESORDER';
/*P*/
"PRIMARY"                                                   return 'RESPRIMARY';
/*Q*/
/*R*/
/*S*/
"SELECT"                                                    return 'RESSELECT';
"SMALLINT"                                                  return 'RESMALLINT';
/*T*/
"TABLE"                                                     return 'RESTABLE';
"TEXT"                                                      return 'RESTEXT';
"TIME"                                                      return 'RESTIME';
"TIMESTAMP"                                                 return 'RESTIMESTAMP';
"TINYINT"                                                   return 'RESTINYINT';
"TRUE"                                                      return 'RESTRUE';  
/*U*/
"UNIQUE"                                                    return 'RESUNIQUE';
"USE"                                                       return 'RESUSE';
/*V*/
"VALUES"                                                    return 'RESVALUES';
"VARCHAR"                                                   return 'RESVARCHAR';
"VARBINARY"                                                 return 'RESVARBINARY';
/*W*/
"WHERE"                                                     return 'RESWHERE';
/*X*/
"XML"                                                       return 'RESXML';
/*Y*/
/*Z*/

"*"                                                         return 'ASTERISCO';

"="                                                         return 'EQUALSTO';       
"!="                                                        return 'NOTEQUALSTO';    
"<>"                                                        return 'DIFERENTTO';  
">="                                                        return 'GREATEREQUALSTHAN';
"<="                                                        return 'LESSEQUALSTHAN';
">"                                                         return 'GREATERTHAN';
"<"                                                         return 'LESSTHAN';

"{"                                                         return 'LLAVEIZQ';
"}"                                                         return 'LLAVEDER';
":"                                                         return 'DOSPTS';
","                                                         return 'COMA';
";"                                                         return 'PTCOMA';
"("                                                         return 'PARABRE';
")"                                                         return 'PARCIERRA';
"["                                                         return 'CORIZQ';
"]"                                                         return 'CORDER';

[/][/].*                                                    {;}
[-][-].*                                                    {;}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]                         {;}

[ \r\t]+                                                    {;}
\n                                                          {;}
\"[^\"]*\"|\'[^\']*\'|\`[^\`]*\`                            { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+"."[0-9]+\b  	                                        return 'NUMBER';
[0-9]+\b  	                                                return 'INTEGERNUMBER';
"$"?"_"?[A-Za-z]+["-""_"0-9A-Za-z]*                         return 'IDENTIFICADOR';

<<EOF>>                                                     return 'EOF';
.                                                           return 'INVALID'

/lex

%left 'SUMA' 'RESTA'
%left 'MULTIPLICACION' 'DIVIDIDO'
%right UNEGATION 'RESNOT'
%left 'RESOR'
%left 'RESAND'

%start INIT
//Inicio
//Definicion de gramatica
%%

INIT: INSTRUCCIONES EOF                                     {return $1;}                     
;

INSTRUCCIONES : 
    INSTRUCCIONES INSTRUCCION PTCOMA                        {$1.push($2); $$=$1;}
    | INSTRUCCION PTCOMA                                    {$$=[$1];}
;

// GRAMATICA JSON

JSONKEY: 
    CADENA                                                  {$$ = $1;}
|   IDENTIFICADOR                                           {$$ = $1;}
;

JSONVALUE:
    ARITEXPRESION,
    | JSONOBJ,
    | JSONARRAY
;

JSONPROPERTY:
    JSONKEY DOSPTS JSONVALUE
;

JSONPROPERTIES:
    JSONPROPERTIES COMA JSONPROPERTY
|   JSONPROPERTY
;

JSONOBJ: 
    LLAVEIZQ JSONPROPERTIES LLAVEDER
|   LLAVEIZQ LLAVEDER
;

JSONARRAYVALUES:
    JSONARRAYVALUES COMA JSONOBJ
|   JSONOBJ
;

JSONARRAY:
    CORDER JSONARRAYVALUES CORIZQ
|   CORDER CORIZQ
;

// TABLE PROPS

/*********** NATIVE FUNCTIONS ***********/

// OBJECT ID FUNCTION

OBJECTIDFUNCTIONINSTANCE:
    RESOBJECTID
    | RESOID
;

OBJECTIDFUNCTION:
    OBJECTIDFUNCTIONINSTANCE PARABRE CADENA PARCIERRA      {$$ = $3;}
;

/*********** EXPRESIONS ***********/
// ARITMETICS

ARITEXPRESION:
    NUMBER                                                  {$$ = new nativo.default(new Tipo.default(Tipo.DataType.NUMBER),$1, @1.first_line, @1.first_column);}
    | INTEGERNUMBER                                         {$$ = new nativo.default(new Tipo.default(Tipo.DataType.NUMBER),$1, @1.first_line, @1.first_column);}
    | BOOLEANS                                              {$$ = new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$1, @1.first_line, @1.first_column);}
    | JSONKEY                                               {$$ = new nativo.default(new Tipo.default(Tipo.DataType.JSONKEY),$1, @1.first_line, @1.first_column);}
    | OBJECTIDFUNCTION                                      {$$ = new nativo.default(new Tipo.default(Tipo.DataType.OBJECTID),$1, @1.first_line, @1.first_column);}
    | 
;

BOOLEANS:
    RESTRUE                                                 {$$ = true;}
    | RESFALSE                                              {$$ = false;}
;

// RELATIONALS

RELATIONALOPERATIONS:
    EQUALSTO                                                {$$ = relacional.tipoOp.EQUALS;}
    | NOTEQUALSTO                                           {$$ = relacional.tipoOp.NOTEQUALSTO;}
    | DIFERENTTO                                            {$$ = relacional.tipoOp.DIFERENTTO;}
    | GREATERTHAN                                           {$$ = relacional.tipoOp.GREATERTHAN;}
    | GREATEREQUALSTHAN                                     {$$ = relacional.tipoOp.GREATEREQUALSTHAN;}
    | LESSTHAN                                              {$$ = relacional.tipoOp.LESSTHAN;}
    | LESSEQUALSTHAN                                        {$$ = relacional.tipoOp.LESSEQUALSTHAN;}
;

RELAEXPRESION:
    ARITEXPRESION RELATIONALOPERATIONS ARITEXPRESION        {$$ = new relacional.default($2, $1, $3, @1.first_line, @1.first_column);}           
    | JSONKEY RESIS RESNOT RESNULL                          {$$ = new relacional.default(relacional.tipoOp.ISNOTNULL, new nativo.default(new Tipo.default(Tipo.DataType.JSONKEY),$1, @1.first_line, @1.first_column), undefined, @1.first_line, @1.first_column);}
    | JSONKEY RESIS RESNULL                                 {$$ = new relacional.default(relacional.tipoOp.ISNULL, new nativo.default(new Tipo.default(Tipo.DataType.JSONKEY),$1, @1.first_line, @1.first_column), undefined, @1.first_line, @1.first_column);}
;

// LOGICALS

LOGICEXPRESION:
    RESNOT LOGICEXPRESION %prec UNEGATION                   {$$ = new logica.default(logica.tipoOp.NOT, $1, undefined, @1.first_line, @1.first_column);}   
    | LOGICEXPRESION RESOR LOGICEXPRESION                   {$$ = new logica.default(logica.tipoOp.OR, $1, $3, @1.first_line, @1.first_column);}
    | LOGICEXPRESION RESAND LOGICEXPRESION                  {$$ = new logica.default(logica.tipoOp.AND, $1, $3, @1.first_line, @1.first_column);}
    | RELAEXPRESION                                         {$$ = $1;}
    | PARABRE LOGICEXPRESION PARCIERRA                      {$$ = $2;}
;

// INSTRUCCIONES
INSTRUCCION:
    CREATETABLEINS                                          {$$=$1;}
    | CREATEDATABASE                                        {$$=$1;}
    | USEINS                                                {$$=$1;}
    | QUERY                                                 {$$=$1;}
    | INSERTINSTRUCTION                                     {$$=$1;}
    | INVALID                                               {console.log("Error lexico");}
    | error PTCOMA                                          {console.log(`Error Sintactico`);}
;

/* CREATE INSTRUCTIONS */

// PARAMETER TYPES

DOUBLEPARAMETER:
    PARABRE INTEGERNUMBER COMA INTEGERNUMBER PARCIERRA
    | /* nil */
;


SINGLEPARAMETER:
    PARABRE INTEGERNUMBER PARCIERRA
    | /* nil */
;

// DATA TYPES

VARCHARTYPE:
    RESVARCHAR PARABRE INTEGERNUMBER PARCIERRA
;

// TEXT

TEXTTYPE:
    RESTEXT 
;

// CHAR

CHARTYPE:
    RESCHAR
;

// INTEGER

INTEGERVALIDRES:
    RESINT
    | RESINTEGER
;

INTTYPE:
    INTEGERVALIDRES SINGLEPARAMETER
;

// BIGINT

BIGINTTYPE:
    RESBIGINT
;

// SMALLINT

SMALLINTTYPE:
    RESMALLINT
;

// TINYINT

TINYINTTYPE:
    RESTINYINT
;

// DECIMAL

DECIMALTYPE:
    RESDECIMAL DOUBLEPARAMETER
    | RESNUMERIC DOUBLEPARAMETER
;

// FLOAT

FLOATTYPE:
    RESFLOAT SINGLEPARAMETER
    | RESDOUBLE SINGLEPARAMETER
;

// BOOLEAN

BOOLEANTYPE:
    RESBOOLEAN
    | RESBOOL
;

// DATE

DATETYPE:
    RESDATE
    | RESDATETIME
;

// TIME

TIMETYPE:
    RESTIME SINGLEPARAMETER
;

// TIMESTAMP

TIMESTAMPTYPE:
    RESTIMESTAMP SINGLEPARAMETER
;

// BINARY

BINARYTYPE:
    RESBINARY
;

// VARBINARY

VARBINARYTYPE:
    RESVARBINARY
;

// BLOB

BLOBTYPE:
    RESBLOB
;

// CLOB

CLOBTYPE:
    RESCLOB
;

// XML

XMLTYPE:
    RESXML
;

// JSON

JSONTYPE:
    RESJSON
;

// ARRAY

ARRAYTYPE:
    RESARRAY CORDER DATATYPES CORIZQ
;

// ALL TYPES

DATATYPES:
    VARCHARTYPE                                             {$$={ bsonType: 'string' };}
    | TEXTTYPE                                              {$$={ bsonType: 'string' };}
    | CHARTYPE                                              {$$={ bsonType: 'string', minLength: 1, maxLength: 1 };}
    | INTTYPE                                               {$$={ bsonType: 'int' };}
    | BIGINTTYPE                                            {$$={ bsonType: 'long' };}
    | SMALLINTTYPE                                          {$$={ bsonType: 'int', minimum: -32768, maximum: 32767 };}
    | TINYINTTYPE                                           {$$={ bsonType: 'int', minimum: 0, maximum: 255 };}
    | DECIMALTYPE                                           {$$={ bsonType: 'decimal' };}
    | FLOATTYPE                                             {$$={ bsonType: 'double' };}
    | BOOLEANTYPE                                           {$$={ bsonType: 'bool' };}
    | DATETYPE                                              {$$={ bsonType: 'date' };}
    | TIMETYPE                                              {$$={ bsonType: 'string', pattern: "^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$" };}
    | TIMESTAMPTYPE                                         {$$={ bsonType: 'timestamp' };}
    | BINARYTYPE                                            {$$={ bsonType: 'binData' };}
    | VARBINARYTYPE                                         {$$={ bsonType: 'binData' };}
    | BLOBTYPE                                              {$$={ bsonType: 'binData' };}
    | CLOBTYPE                                              {$$={ bsonType: 'string' };}
    | XMLTYPE                                               {$$={ bsonType: 'string' };}
    | JSONTYPE                                              {$$={ bsonType: 'object' };}
;

//CREATE TABLE INS

CREATETABLEINS:
    RESCREATE RESTABLE JSONKEY PARABRE CREATEPARAMS PARCIERRA     {$$=new createCollection.default($3, $5, @1.first_line, @1.first_column)}
;

CREATEPARAMS:
    CREATEPARAMS COMA CREATEPARAM                           {$1.push($3); $$=$1;}
    | CREATEPARAM                                           {$$=[$1];}
    |  /* nil */                                            {$$=[];}
;

CREATEPARAM:
    JSONKEY DATATYPES CREATEOPTIONS                          { $$= {key: $1, type: $2, options: $3}; }
    | JSONKEY DATATYPES                                      { $$= {key: $1, type: $2}; }
;

CREATEOPTIONS:
    CREATEOPTIONS CREATEOPTION                              {$$={...$1, ...$2};}
    | CREATEOPTION                                          {$$=$1;}
;

CREATEOPTION:
    RESNOT RESNULL                                          {$$={required: true};}
    | RESNULL                                               {$$={required: false};}
    | RESDEFAULT ARITEXPRESION                              {$$={default: $2};}
    | RESUNIQUE                                             {$$={unique: true};}
    | RESPRIMARY RESKEY                                     {$$={index: true};}
;

// INSERT INS

INSERTINSTRUCTION:
    RESINSERT RESINTO JSONKEY PARABRE INSERTKEYS PARCIERRA RESVALUES INSERTDATA         {$$=new insertInto.default($3, $5, $8, @1.first_line, @1.first_column)}
;

INSERTKEYS:
    INSERTKEYS COMA JSONKEY                                 {$1.push($3); $$=$1;}      
    | JSONKEY                                               {$$=[$1];} 
;

INSERTDATA:
    INSERTDATA COMA INSERTREGISTER                          {$1.push($3); $$=$1;}    
    | INSERTREGISTER                                        {$$=[$1];}  
;

INSERTREGISTER:
    PARABRE REGISTERVALUES PARCIERRA                        {$$=$2;}
;

REGISTERVALUES:
    REGISTERVALUES COMA ARITEXPRESION                       {$1.push($3); $$=$1;}     
    | ARITEXPRESION                                         {$$=[$1];}   
;

// CREATE DATABASE INS

CREATEDATABASE:
    RESCREATE RESDATABASE IDENTIFICADOR                     {$$=new createDatabase.default(@1.first_line, @1.first_column, $3)}
;

//USE INS

USEINS:
    RESUSE IDENTIFICADOR                                    {$$=new createDatabase.default(@1.first_line, @1.first_column, $2)}
;

// QUERY INSTRUCTION

QUERY:
    SELECTINS OPTIONFROMJOIN                                {$1.setOptions($2); $$=$1;}
;

SELECTINS:
    RESSELECT QUERYPARAMS RESFROM JSONKEY             {$$ = new select.default(@1.first_line, @1.first_column, $2, $4);}
;

// PARAMS

QUERYPARAMS:
    ASTERISCO                                               {$$ = $1}
    | LISTQUERYPARAMS                                       {$$ = $1}
;

LISTQUERYPARAMS:
    LISTQUERYPARAMS COMA QUERYPARAM                            {$1.push($3); $$=$1;}
    | QUERYPARAM                                               {$$ = [$1]}
;

QUERYALIAS: 
    IDENTIFICADOR                                              {$$ = $1;}
    | CADENA                                                   {$$ = $1;}
;

QUERYPARAM:
    | JSONKEY QUERYALIAS                                       {$$ = {base: $1, alias: $2};}   
    | JSONKEY                                                  {$$ = {base: $1};}
;

// JOIN OPTIONS BUILD

OPTIONFROMJOIN:
    JOINISTRUCTS OPTIONFROMWHERE                               {$$ = {...$2, join: $1}}                 
    | OPTIONFROMWHERE                                          {$$= {...$1};}
;

JOINISTRUCTS:
    JOINISTRUCTS JOINISTRUCT                                   {$1.push($2); $$=$1;}
    | JOINISTRUCT                                              {$$=[$1];}
;

JOINISTRUCT: 
    RESJOIN IDENTIFICADOR IDENTIFICADOR RESON LOGICEXPRESION   {
                                                                    $$=new join.default(@1.first_line, @1.first_column, $2, $3, $5);   
                                                               }
;   

// WHERE OPTIONS BUILD

OPTIONFROMWHERE:
    RESWHERE LOGICEXPRESION OPTIONFROMORDERBY               {$$={...$3, where: $2}}
    | OPTIONFROMORDERBY                                     {$$={...$1}}
;

// ORDER BY OPTIONS BUILD

OPTIONFROMORDERBY:
    RESORDER RESBY ORDERBYPARAMS OPTIONFROMLIMIT            {$$={...$4, orderBy: $3}}
    | OPTIONFROMLIMIT                                       {$$={...$1}}
;

ORDERBYPARAMS:
    ORDERBYPARAMS COMA ORDERBYPARAM                         {$1.push($3); $$=$1;}
    | ORDERBYPARAM                                          {$$=[$1];}
;

ORDERBYPARAM:
    IDENTIFICADOR ORDERVALUE                                {$$={"key": $1, "value": $2};}
    | CADENA ORDERVALUE                                     {$$={"key": $1, "value": $2};}
;

ORDERVALUE:
    RESASC                                                  {$$=1;}
    | RESDESC                                               {$$=-1;}
    | /* nil */                                             {$$=1;}
;

// LIMIT OPTION BUILD

OPTIONFROMLIMIT:
    RESLIMIT ARITEXPRESION                                  {$$={limit:$2}}   
    |                                                       {$$={}}            
;