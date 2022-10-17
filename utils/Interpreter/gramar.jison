%{
    const select = require('./models/Instructions/Select')
%}
%lex 


%options case-insensitive 
//inicio analisis lexico
%%

"SELECT"                                                    return 'RESSELECT';
"FROM"                                                      return 'RESFROM';
"WHERE"                                                     return 'RESWHERE';

"CREATE"                                                    return 'RESCREATE';
"TABLE"                                                     return 'RESTABLE';
"VALUES"                                                    return 'RESVALUES';

"*"                                                         return 'ASTERISCO';

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
    CADENA
|   IDENTIFICADOR
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
    RESSELECT QUERYPARAMS RESFROM IDENTIFICADOR             {$$ = new select.default(@1.first_line, @1.first_column, $2, $1);}
;

// PARAMS

QUERYPARAMS:
    ASTERISCO                                               {$$ = $1}
    | LISTQUERYPARAMS                                       {$$ = $1}
;

LISTQUERYPARAMS:
    LISTQUERYPARAMS COMA IDENTIFICADOR                      {$1.push($3); $$=$1;}
    | IDENTIFICADOR                                         {$$ = [$1]}
;