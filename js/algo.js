(function(w, d, s) {
    //The mathematical operation depends on the precedence of the operator.
    //This precedence has the usual rule of going from left to right.
    //However, there are operators that are much stronger, and happens
    //to follow other weaker operators, in which case the left to right rule
    //has to be violated for the operation to follow a correct order.
    //These are the major problem in evaluation and parsing.
    //The Brackets are not recognised yet.
    //:x^2+32*2+-2 => The negative integer is not recognised.
    //The solution for above might be to make the algo understand the
    //positives and negatives
    //The nature of substring gets your nerves :(
    //The use of split method might simplify the process :D
    var DOM = {
            dmn: d.querySelector("input#dmn"),
            btn: d.querySelector("input#smt"),
            inp: d.querySelector("input#inp")
        },
        operation = {
            //The validation seems to be common for every operation.
            pow: {
                reg: RegExp(/\^/g),
                pre: 2.5,
                func: function(s) {
                    
                }
            },
            div: {
                reg: RegExp(/\//g),
                pre: 2,
                func: function() {

                }
            },
            pro: {
                reg: RegExp(/\*/g),
                pre: 2,
                func: function(s,t) {
                    switch(t) {
                        case 0:
                        //I am not going to use "map" method because of browser incompatibility
                        //I am targetting older browsers although use of svg for canvas might sound weird.
                        for(var x = 0,y = 1; x < s.length; x++) {
                            var S = parseFloat(s[x]);
                            if($.type(S).isNumber)
                                s.splice(x, x + 1, parseFloat(s[x]));
                            y*=s[x];
                        }
                        return y;
                        break;
                        case 1:

                        break;
                    }
                }
            },
            mod: {
                reg: RegExp(/%/g),
                pre: 1.5,
                func: function() {

                }
            },
            sub: {
                reg: RegExp(/\-/g),
                pre: 1,
                func: function() {

                }
            },
            add: {
                reg: RegExp(/\+/g),
                pre: 1,
                func: function(s) {
                    console.log(s);
                }
            }
        },
        gen = {
            reg: {
                var: /[a-zA-Z]+/g
            }
        };

    function trim(x) {
        return x.replace(/\s+/g, "");
    };

    function rngInt(x, y) {
        //The function is comparative only between two arrays.
        return ((y[0] >= x[0] && y[0] <= x[1]) || (y[1] >= x[0] && y[1] <= x[1]));
    };

    function subInt(x, y) {
        for (var _ = 0; _ < arguments.length; _++)
            arguments[_].sort(function(a, b) {
                //The compare function is precautionary.
                return a - b;
            });
        //Must evaluate for both max and min.
        while (y[0] <= x[1] && y[0] > x[0]) y[0]++;
        while (y[1] >= x[0] && y[1] < x[1]) y[1]--;
        return y;
    };

    function conInt(x, y) {
        return rngInt(x, y) ? [Math.min(x[0], y[0]), Math.max(x[1], y[1])] : false;
    };

    function oii(x, y) {
        //Operator's Internal Index
        return $.type(x).isArray ? [x[0] - y[0], x[1] - y[0]] : x - y[0];
    };

    function register(M, OP, x, EVO) {
        var g = { in : M,
            pre: OP.pre,
            ope: x,
            oii: undefined,
            rng: [null, null],
            str: "",
            con: false,
            func: OP.func
        };
        if (EVO.length > 0 && EVO.every(function(e) {
                return e.pre <= OP.pre;
            })) EVO.unshift(g)
        else EVO.push(g)
    };

    function calculate(a, b, c) {
        var _r,
            l = [];
        while ((m = gen.reg.var.exec(a)) !== null) l.push(m.index);
            //only numbers
            //32*2*2
            //[32,2,2];
            //Thinking of how to use the l array
           // console.log(b[1](a.split(operation[b[0]].reg),0),b);
           console.log(a);
    };

    function refine(I) {
        //The function checks for any reptition
        //It also looks for any mis-spells
        //End process: Links to calculate function
        for(var x = 0; x < I.length; x++) {
            console.log(I[x]);
        }
    };

    function parse(s, EVO) {
        var e = EVO,
            _S = [];
        for (var x = 0; x < e.length; x++) {
            var o = {
                m: 0,
                M: s.length
            };
            for (var y = 0; y < e.length; y++) {
                if (x != y) {
                    if (e[y].in > e[x].in) {
                        //The loop follows the precedence order
                        if (e[y].in <= o.M) o.M = e[y].in;
                    } else {
                        if (e[y].in >= o.m) o.m = e[y].in;
                    }
                }
            };
            e[x].rng = [o.m > 0 ? o.m + 1 : 0, o.M - 1];

        }
        //The index gives the operator's coordinate.
        //Due to the nature of substring(2nd Parameter), it is omitted.
        //e[x].rng = [o.m>0?o.m+1:0,o.M] => s.substring
        //The above is an instruction or fact for the substring to work.
        //Now consider the below in terms of "index" ONLY.
        //Have to do two things: create a conjointment function and a subtraction
        //function. 
        for (var x = 0; x < e.length; x++) {
            for (var y = 0; y < e.length; y++) {
                if (x != y) {
                    if (rngInt(e[x].rng, e[y].rng)) {
                        if (e[x].pre > e[y].pre) {
                            e[y].rng = subInt(e[x].rng, e[y].rng);
                        } else if (e[x].pre === e[y].pre && e[x].ope === e[y].ope) {
                            e[x].rng = e[y].rng = conInt(e[x].rng, e[y].rng);
                            e[x].oii = e[y].oii = [e[x].in, e[y].in];
                        }
                    }
                }
            }
            /*e[x].val = calculate(
                s.substring(e[x].rng[0], e[x].rng[1] + 1), [e[x].ope, e[x].func]
                //oii(e[x].oii || e[x].in, e[x].rng)
            );*/
        }
        console.log(e);
    }

    function evaluate(f) {
        var evl = {
            inp: f,
            operation: []
        };
        for (var x in operation) {
            var OP = operation[x],
                EVO = evl.operation;
            while ((m = OP.reg.exec(evl.inp)) !== null) register(m.index, OP, x, EVO);
        }
        parse(evl.inp, EVO)
    }
    evaluate("32*2*2+5*2-10-32+x^2");
})(window, document, screen)