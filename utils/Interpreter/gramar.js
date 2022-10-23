/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gramar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,6],$V2=[1,8],$V3=[1,10],$V4=[2,57],$V5=[1,19],$V6=[1,21],$V7=[1,26],$V8=[1,27],$V9=[2,5,44,45,51],$Va=[1,31],$Vb=[1,37],$Vc=[1,36],$Vd=[1,39],$Ve=[1,40],$Vf=[18,53],$Vg=[18,29,30,31,32,35,36,37,38,53],$Vh=[1,45],$Vi=[7,41,58,66],$Vj=[1,59],$Vk=[1,58],$Vl=[9,12,26,27],$Vm=[7,18,66],$Vn=[2,55],$Vo=[1,70],$Vp=[1,71];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INIT":3,"INSTRUCCIONES":4,"EOF":5,"INSTRUCCION":6,"PTCOMA":7,"JSONKEY":8,"CADENA":9,"IDENTIFICADOR":10,"JSONVALUE":11,"NUMBER":12,"JSONOBJ":13,"JSONARRAY":14,"JSONPROPERTY":15,"DOSPTS":16,"JSONPROPERTIES":17,"COMA":18,"LLAVEIZQ":19,"LLAVEDER":20,"JSONARRAYVALUES":21,"CORDER":22,"CORIZQ":23,"ARITEXPRESION":24,"BOOLEANS":25,"RESTRUE":26,"RESFALSE":27,"RELATIONALOPERATIONS":28,"EQUALSTO":29,"NOTEQUALSTO":30,"DIFERENTTO":31,"RESIS":32,"RESNOT":33,"RESNULL":34,"GREATERTHAN":35,"GREATEREQUALSTHAN":36,"LESSTHAN":37,"LESSEQUALSTHAN":38,"RELAEXPRESION":39,"LOGICEXPRESION":40,"RESAND":41,"CREATETABLEINS":42,"QUERY":43,"INVALID":44,"RESCREATE":45,"RESTABLE":46,"PARABRE":47,"PARCIERRA":48,"SELECTINS":49,"OPTIONFROMWHERE":50,"RESSELECT":51,"QUERYPARAMS":52,"RESFROM":53,"ASTERISCO":54,"LISTQUERYPARAMS":55,"RESWHERE":56,"OPTIONFROMORDERBY":57,"RESORDER":58,"RESBY":59,"ORDERBYPARAMS":60,"OPTIONFROMLIMIT":61,"ORDERBYPARAM":62,"ORDERVALUE":63,"RESASC":64,"RESDESC":65,"RESLIMIT":66,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"PTCOMA",9:"CADENA",10:"IDENTIFICADOR",12:"NUMBER",16:"DOSPTS",18:"COMA",19:"LLAVEIZQ",20:"LLAVEDER",22:"CORDER",23:"CORIZQ",26:"RESTRUE",27:"RESFALSE",29:"EQUALSTO",30:"NOTEQUALSTO",31:"DIFERENTTO",32:"RESIS",33:"RESNOT",34:"RESNULL",35:"GREATERTHAN",36:"GREATEREQUALSTHAN",37:"LESSTHAN",38:"LESSEQUALSTHAN",41:"RESAND",44:"INVALID",45:"RESCREATE",46:"RESTABLE",47:"PARABRE",48:"PARCIERRA",51:"RESSELECT",53:"RESFROM",54:"ASTERISCO",56:"RESWHERE",58:"RESORDER",59:"RESBY",64:"RESASC",65:"RESDESC",66:"RESLIMIT"},
productions_: [0,[3,2],[4,3],[4,2],[8,1],[8,1],[11,4],[15,3],[17,3],[17,1],[13,3],[13,2],[21,3],[21,1],[14,3],[14,2],[24,1],[24,1],[24,1],[25,1],[25,1],[28,1],[28,1],[28,1],[28,3],[28,2],[28,1],[28,1],[28,1],[28,1],[39,3],[40,2],[40,3],[40,1],[6,1],[6,1],[6,1],[6,2],[42,5],[43,2],[49,4],[52,1],[52,1],[55,3],[55,1],[50,3],[50,1],[57,4],[57,1],[60,3],[60,1],[62,2],[62,2],[63,1],[63,1],[63,0],[61,2],[61,0]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return $$[$0-1];
break;
case 2:
$$[$0-2].push($$[$0-1]); this.$=$$[$0-2];
break;
case 3:
this.$=[$$[$0-1]];
break;
case 4: case 5:
this.$ = $$[$0];
break;
case 16:
this.$ = new nativo.default(new Tipo.default(Tipo.DataType.NUMBER),$$[$0], _$[$0].first_line, _$[$0].first_column);
break;
case 17:
this.$ = new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$$[$0], _$[$0].first_line, _$[$0].first_column);
break;
case 18:
this.$ = new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$$[$0], _$[$0].first_line, _$[$0].first_column)
break;
case 19:
this.$ = true;
break;
case 20:
this.$ = false;
break;
case 21:
this.$ = relacional.tipoOp.EQUALS;
break;
case 22:
this.$ = relacional.tipoOp.NOTEQUALSTO;
break;
case 23:
this.$ = relacional.tipoOp.DIFERENTTO;
break;
case 24:
this.$ = relacional.tipoOp.ISNOTNULL;
break;
case 25:
this.$ = relacional.tipoOp.ISNULL;
break;
case 26:
this.$ = relacional.tipoOp.GREATERTHAN;
break;
case 27:
this.$ = relacional.tipoOp.GREATEREQUALSTHAN;
break;
case 28:
this.$ = relacional.tipoOp.LESSTHAN;
break;
case 29:
this.$ = relacional.tipoOp.LESSEQUALSTHAN;
break;
case 30:
this.$ = new relacional.default($$[$0-1], $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 31:
;
break;
case 32:
this.$ = new logica.default(logica.tipoOp.AND, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 33: case 41: case 42:
this.$ = $$[$0]
break;
case 34: case 35:
this.$=$$[$0];
break;
case 36:
console.log("Error lexico");
break;
case 37:
console.log("Error Sintactico");
break;
case 39:
$$[$0-1].setOptions($$[$0]); this.$=$$[$0-1];
break;
case 40:
this.$ = new select.default(_$[$0-3].first_line, _$[$0-3].first_column, $$[$0-2], $$[$0]);
break;
case 43: case 49:
$$[$0-2].push($$[$0]); this.$=$$[$0-2];
break;
case 44:
this.$ = [$$[$0]]
break;
case 45:
this.$={...$$[$0], where: $$[$0-1]}
break;
case 46: case 48:
this.$={...$$[$0]}
break;
case 47:
this.$={...$$[$0], orderBy: $$[$0-1]}
break;
case 50:
this.$=[$$[$0]];
break;
case 51: case 52:
this.$={"key": $$[$0-1], "value": $$[$0]};
break;
case 53: case 55:
this.$=1;
break;
case 54:
this.$=-1;
break;
case 56:
this.$={limit:$$[$0]}
break;
case 57:
this.$={}
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,42:4,43:5,44:$V1,45:$V2,49:9,51:$V3},{1:[3]},{2:$V0,5:[1,11],6:12,42:4,43:5,44:$V1,45:$V2,49:9,51:$V3},{7:[1,13]},{7:[2,34]},{7:[2,35]},{7:[2,36]},{7:[1,14]},{46:[1,15]},{7:$V4,50:16,56:[1,17],57:18,58:$V5,61:20,66:$V6},{8:25,9:$V7,10:$V8,52:22,54:[1,23],55:24},{1:[2,1]},{7:[1,28]},o($V9,[2,3]),{7:[2,37]},{10:[1,29]},{7:[2,39]},{8:33,9:$V7,10:$V8,33:$Va,39:32,40:30},{7:[2,46]},{59:[1,34]},{7:[2,48]},{9:$Vb,12:$Vc,24:35,25:38,26:$Vd,27:$Ve},{53:[1,41]},{53:[2,41]},{18:[1,42],53:[2,42]},o($Vf,[2,44]),o($Vg,[2,4]),o($Vg,[2,5]),o($V9,[2,2]),{47:[1,43]},{7:$V4,41:$Vh,57:44,58:$V5,61:20,66:$V6},{8:33,9:$V7,10:$V8,33:$Va,39:32,40:46},o($Vi,[2,33]),{28:47,29:[1,48],30:[1,49],31:[1,50],32:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55]},{9:$Vj,10:$Vk,60:56,62:57},{7:[2,56]},o($Vi,[2,16]),o($Vi,[2,17]),o($Vi,[2,18]),o($Vi,[2,19]),o($Vi,[2,20]),{10:[1,60]},{8:61,9:$V7,10:$V8},{48:[1,62]},{7:[2,45]},{8:33,9:$V7,10:$V8,39:63},o([7,58,66],[2,31],{41:$Vh}),{9:$Vb,12:$Vc,24:64,25:38,26:$Vd,27:$Ve},o($Vl,[2,21]),o($Vl,[2,22]),o($Vl,[2,23]),{33:[1,65],34:[1,66]},o($Vl,[2,26]),o($Vl,[2,27]),o($Vl,[2,28]),o($Vl,[2,29]),{7:$V4,18:[1,68],61:67,66:$V6},o($Vm,[2,50]),o($Vm,$Vn,{63:69,64:$Vo,65:$Vp}),o($Vm,$Vn,{63:72,64:$Vo,65:$Vp}),o([7,56,58,66],[2,40]),o($Vf,[2,43]),{7:[2,38]},o($Vi,[2,32]),o($Vi,[2,30]),{34:[1,73]},o($Vl,[2,25]),{7:[2,47]},{9:$Vj,10:$Vk,62:74},o($Vm,[2,51]),o($Vm,[2,53]),o($Vm,[2,54]),o($Vm,[2,52]),o($Vl,[2,24]),o($Vm,[2,49])],
defaultActions: {4:[2,34],5:[2,35],6:[2,36],11:[2,1],14:[2,37],16:[2,39],18:[2,46],20:[2,48],23:[2,41],35:[2,56],44:[2,45],62:[2,38],67:[2,47]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

    const select = require('./models/Instructions/Select')
    const nativo = require('./models/Expresions/Native');
    const aritmetico = require('./models/Expresions/Aritmetica');
    const relacional = require('./models/Expresions/Relacional');
    const logica = require('./models/Expresions/Logica');
    const Tipo = require('./models/Three/Type');
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 51;
break;
case 1:return 53;
break;
case 2:return 56;
break;
case 3:return 58;
break;
case 4:return 59;
break;
case 5:return 64;
break;
case 6:return 65;
break;
case 7:return 66;
break;
case 8:return 26;   
break;
case 9:return 27;
break;
case 10:return 32;
break;
case 11:return 33;
break;
case 12:return 34;                                           
break;
case 13:return 45;
break;
case 14:return 46;
break;
case 15:return 'RESVALUES';
break;
case 16:return 41;
break;
case 17:return 54;
break;
case 18:return 29;       
break;
case 19:return 30;    
break;
case 20:return 35;
break;
case 21:return 37;
break;
case 22:return 36;
break;
case 23:return 38;
break;
case 24:return 31;  
break;
case 25:return 19;
break;
case 26:return 20;
break;
case 27:return 16;
break;
case 28:return 18;
break;
case 29:return 7;
break;
case 30:return 47;
break;
case 31:return 48;
break;
case 32:return 23;
break;
case 33:return 22;
break;
case 34:;
break;
case 35:;
break;
case 36:;
break;
case 37:;
break;
case 38: yy_.yytext=yy_.yytext.substr(1,yy_.yyleng-2); return 9; 
break;
case 39: yy_.yytext=yy_.yytext.substr(1,yy_.yyleng-2); return 9; 
break;
case 40:return 12;
break;
case 41:return 10;
break;
case 42:return 5;
break;
case 43:return 44
break;
}
},
rules: [/^(?:SELECT\b)/i,/^(?:FROM\b)/i,/^(?:WHERE\b)/i,/^(?:ORDER\b)/i,/^(?:BY\b)/i,/^(?:ASC\b)/i,/^(?:DESC\b)/i,/^(?:LIMIT\b)/i,/^(?:TRUE\b)/i,/^(?:FALSE\b)/i,/^(?:IS\b)/i,/^(?:NOT\b)/i,/^(?:NULL\b)/i,/^(?:CREATE\b)/i,/^(?:TABLE\b)/i,/^(?:VALUES\b)/i,/^(?:AND\b)/i,/^(?:\*)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:>)/i,/^(?:<)/i,/^(?:>=)/i,/^(?:<=)/i,/^(?:<>)/i,/^(?:\{)/i,/^(?:\})/i,/^(?::)/i,/^(?:,)/i,/^(?:;)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:[/][/].*)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:[ \r\t]+)/i,/^(?:\n)/i,/^(?:"[^\"]*")/i,/^(?:"[^\"]*")/i,/^(?:[0-9]+(\.[0-9]+)?\b)/i,/^(?:\$?_?[A-Za-z]+["_"0-9A-Za-z]*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = gramar;
exports.Parser = gramar.Parser;
exports.parse = function () { return gramar.parse.apply(gramar, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}