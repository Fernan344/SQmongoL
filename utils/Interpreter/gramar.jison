%{
    const select = require('./models/Instructions/Select')
    const nativo = require('./models/Expresions/Native');
    const aritmetico = require('./models/Expresions/Aritmetica');
    const relacional = require('./models/Expresions/Relacional');
    const logica = require('./models/Expresions/Logica');
    const Tipo = require('./models/Three/Type');
%}
%lex 


%options case-insensitive 
//inicio analisis lexico
%%

"SELECT"                                                    return 'RESSELECT';
"FROM"                                                      return 'RESFROM';
"WHERE"                                                     return 'RESWHERE';
"ORDER"                                                     return 'RESORDER';
"BY"                                                        return 'RESBY';
"ASC"                                                       return 'RESASC';
"DESC"                                                      return 'RESDESC';
"LIMIT"                                                     return 'RESLIMIT';
"TRUE"                                                      return 'RESTRUE';   
"FALSE"                                                     return 'RESFALSE';
"IS"                                                        return 'RESIS';
"NULL"                                                      return 'RESNULL';                                           

"CREATE"                                                    return 'RESCREATE';
"TABLE"                                                     return 'RESTABLE';
"VALUES"                                                    return 'RESVALUES';

"AND"                                                       return 'RESAND';
"NOT"                                                       return 'RESNOT';
"OR"                                                        return 'RESOR';

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
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]                         {;}

[ \r\t]+                                                    {;}
\n                                                          {;}
\"[^\"]*\"                                                  { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
\"[^\"]*\"                                                  { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+("."[0-9]+)?\b  	                                    return 'NUMBER';
"$"?"_"?[A-Za-z]+["_"0-9A-Za-z]*                            return 'IDENTIFICADOR';

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
    CADENA,
    NUMBER,
    JSONOBJ,
    JSONARRAY
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

/*********** EXPRESIONS ***********/
// ARITMETICS

ARITEXPRESION:
    NUMBER                                                  {$$ = new nativo.default(new Tipo.default(Tipo.DataType.NUMBER),$1, @1.first_line, @1.first_column);}
    | CADENA                                                {$$ = new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1, @1.first_line, @1.first_column);}
    | BOOLEANS                                              {$$ = new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$1, @1.first_line, @1.first_column)}
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
    JSONKEY RELATIONALOPERATIONS ARITEXPRESION              {$$ = new relacional.default($2, $1, $3, @1.first_line, @1.first_column);}           
    | JSONKEY RESIS RESNOT RESNULL                          {$$ = new relacional.default(relacional.tipoOp.ISNOTNULL, $1, undefined, @1.first_line, @1.first_column);}
    | JSONKEY RESIS RESNULL                                 {$$ = new relacional.default(relacional.tipoOp.ISNULL, $1, undefined, @1.first_line, @1.first_column);}
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
    | QUERY                                                 {$$=$1;}
    | INVALID                                               {console.log("Error lexico");}
    | error  PTCOMA                                         {console.log("Error Sintactico");}
;

CREATETABLEINS:
    RESCREATE RESTABLE IDENTIFICADOR PARABRE PARCIERRA
;

QUERY:
    SELECTINS OPTIONFROMWHERE                               {$1.setOptions($2); $$=$1;}
;

SELECTINS:
    RESSELECT QUERYPARAMS RESFROM IDENTIFICADOR             {$$ = new select.default(@1.first_line, @1.first_column, $2, $4);}
;

// PARAMS

QUERYPARAMS:
    ASTERISCO                                               {$$ = $1}
    | LISTQUERYPARAMS                                       {$$ = $1}
;

LISTQUERYPARAMS:
    LISTQUERYPARAMS COMA JSONKEY                            {$1.push($3); $$=$1;}
    | JSONKEY                                               {$$ = [$1]}
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