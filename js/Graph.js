//By Arun Harish Balasubramonian
/*
The line properties must have a separate function
So it can be used in any drawings
A complete recheck is necessary
*/

/*
The power of precedence of an operation should be defined: addition and multiplication
and subtraction and division have same power respectively.

The mathematical operation requires the user-defined
variables to be global; there should be a map of variables.
The default variables x and y are domain and range 
respectively.

The mathematical operation also requires regex evaluation
in order for the operation(s) to communicate with "Javascript"

Brackets might have their own BODMAS rule, meaning it is a BODMAS
within BODMAS.
bracket regex evaluation might be tricky. 
*/
(function(w, s, d) {
    Number.prototype.toPx = function() {
        return this + 'px';
    };
    String.prototype.toFloat = function(x) {
        return parseFloat(this, x || 0);
    }
    String.prototype.add = function(x) {
        var t = this;
        for (var v = 0; v <= x; v++)
            t = v == 0 && x > 0 ? t + "." : t + "0";
        return t;
    }

    function g(a, b) {
        //If selected property is an object
        //Then it would be accessible globally instead
        //of relying on defined variables 
        var __ = $.type,
            list = [],
            st = {
                app: {
                    cng: {
                        func: function() {
                                var l = list;
                                l.forEach(function(e) {
                                    var D = e.DOM,
                                        _ = $.DOM(D),
                                        d = st.app.default.pr.dim;
                                    _.Attr.set({
                                        width:d[0].toFloat(),
                                        height:d[1].toFloat()
                                    })
                                });
                            }
                    },
                    restrict: [],
                    default: {
                        pper: 'cartesian',
                        pr: {
                            dim: [w.innerWidth.toPx(), w.innerHeight.toPx()],
                            x: {
                                maj: 5,
                                min: 3,
                                rng: [-20, 20],
                                label: {
                                    name: "x",
                                    pos: 0
                                },
                                arw: {
                                    size: 10,
                                    type: {
                                        selected: "pntd",
                                        custom: []
                                    }
                                },
                                tick: {
                                    wdh: 4,
                                    type: "pntd",
                                    projection: "undir"
                                },
                                num: {
                                    offset: 2,
                                    angle: 0
                                }
                            },
                            num: {
                                font: "15px consolas",
                                rounding: {
                                    value: [0, 1, 2, 3, 4, 5],
                                    selected: 2
                                }
                            },
                            label: {
                                font: "30px consolas"
                            },
                            y: {
                                maj: 5,
                                min: 3,
                                rng: [-20, 20],
                                label: {
                                    name: "y",
                                    pos: 0
                                },
                                arw: {
                                    size: 10,
                                    type: {
                                        selected: "pntd",
                                        custom: []
                                    }
                                },
                                tick: {
                                    wdh: 4,
                                    type: "pntd",
                                    projection: "bi"
                                },
                                num: {
                                    offset: 2,
                                    angle: 0
                                }
                            }
                        },
                        th: {
                            selected: {},
                            snowWhite: {
                                bg: "#FFF",
                                ln: {
                                    maj: {
                                        wdh: 0.5,
                                        clr: "#333",
                                        stk_arr: [0, 0]
                                    },
                                    min: {
                                        wdh: 0.25,
                                        clr: "#888",
                                        stk_arr: [0, 0]
                                    },
                                    axs: {
                                        wdh: 1.25,
                                        clr: "#000",
                                        stk_arr: [0, 0]
                                    },
                                    tck: {
                                        wdh:2,
                                        clr:"#000",
                                        stk_arr:[0,0]
                                    }
                                },
                                ax: {

                                },
                                lb: {
                                    txtColor: "#000"
                                },
                                nm: {
                                    txtColor: "#000"
                                }
                            },
                            DarkTheme: {
                                ln: {
                                    maj: {

                                    }
                                },
                                ax: {

                                },
                                lb: {
                                    txtColor: "#000"
                                }
                            },
                            custom: {
                                list: [],
                                //By default the theme is set to snowWhite
                                //But user can set to override a particular theme
                                add: function(a, b) {
                                    var at = __(a),
                                        bt = __(b),
                                        df = (bt.isUndefined || !(a in st.th)) ? st.th.snowWhite : st.th[a],
                                        vl = at.isObject ? a : b;
                                    evl(df, vl);
                                    return df;
                                }
                            }
                        }
                    }
                }
            },
            ty = {
                pper: {
                    //Note that currently the evaluation of variable b is under progress
                    //It is necessary for now to get Objects directly from the theme property.
                    //Otherwise, evaluation would consider the user-inputs.
                    cartesian: function(C) {
                        
                        function update() {
                            function MTW(t, _y) {
                            C.font = pr.num.font;
                            switch (_y) {
                                case 1:
                                    C.save(); 
                                    C.fillStyle = "#FF0000";
                                    C.textAlign = "start";
                                    C.textBaseline = "alphabetic";
                                    C.fillText("D", 30, 50);
                                    C.restore();
                                    var data = C.getImageData(0, 0, 500, 50).data,
                                        s = false;
                                    for (var x = 0; x < 2000; x++) {
                                        if (s == false)
                                            for (var y = x; y < 50 * 2000; y += 2000) {
                                                if (data[y] > 0) {
                                                    s = true;
                                                    break;
                                                }
                                            }
                                        else break;
                                    };
                                    C.clearRect(0, 0, 500, 500);
                                    return 50 - Math.round((y - x) / 2000);
                                    break;
                                case 0:
                                    return C.measureText(t).width;
                                    break;
                            }
                        }

                        function E(x, y) {
                            var M = x.maj,
                                m = x.min + 1,
                                r = x.rng[0],
                                R = x.rng[1],
                                tck = x.tick,
                                A = x.arw,
                                o = MTW(Math.max(r, R).toString().add(pr.num.rounding.value[pr.num.rounding.selected]), y)+A.size*2;
                            return {
                                M: M,
                                m: m,
                                r: r,
                                R: R,
                                o: o,
                                t: (Math.abs(r) == Math.abs(R)) ? (Math.abs(r) * 2 * m / M) : ((R > 0 ? Math.abs(r) + Math.abs(R) : Math.abs(r) - Math.abs(R)) * m) / M,
                                a: pr.dim[y].toFloat() - 2 * o,
                                tck:tck,
                                A:A,
                                Sym: Math.abs(R) == Math.abs(r)
                            };
                        };

                        function num(a, z, b) {
                            C.font = pr.num.font;
                            switch (a) {
                                case 0:
                                    C.textAlign = "center";
                                    C.textBaseline = "top";
                                    var a = X.r + (X.M / X.m) * z[1],
                                        w = Y.tck.wdh;
                                    C.fillText(a, z[0], b + w);  
                                    break;
                                case 1:
                                    C.textAlign = "left";
                                    C.textBaseline = "middle";
                                    var a = Y.r + (Y.M / Y.m) * z[1],
                                        w = X.tck.wdh;
                                    C.fillText(a, b + w, z[0]);
                                    break;
                            }
                        };

                        function tick(w, x, y, z) {
                            switch (w) {
                                case 0:
                                    C.beginPath();
                                    C.moveTo(x,y);
                                    C.lineTo(x,y+z.wdh);
                                    C.lineWidth = K.wdh;
                                    C.stroke();
                                    C.closePath();
                                    break;
                                case 1:
                                    C.beginPath();
                                    C.moveTo(x,y);
                                    C.lineTo(x+z.wdh,y);
                                    C.lineWidth = K.wdh;
                                    C.stroke();
                                    C.closePath();
                                    break;
                            }
                        }
                        //Have to find intercepts before initiating the loop
                        var pr = st.app.default.pr,
                            x = pr.x,
                            y = pr.y,
                            intercept = {
                                x: 0,
                                y: 0
                            },
                            X = E(x, 0),
                            Y = E(y, 1),
                            T = st.app.default.th.snowWhite,
                            M = T.ln.maj,
                            m = T.ln.min,
                            A = T.ln.axs,
                            K = T.ln.tck;
                            C.clearRect(0,0,pr.dim[0].toFloat(),pr.dim[1].toFloat())
                            function draw(w, x, y, z) {
                                switch (w) {
                                    case 0: //Means it is done horizontally
                                    var int = ((intercept.x) * Y.a / Y.t) + Y.o;
                                        C.beginPath();
                                        C.moveTo(z[0], 0);
                                        C.lineTo(z[0], pr.dim[1].toFloat());
                                        if (!x && !y) {
                                            //Means it is a min
                                            C.strokeStyle = m.clr;
                                            C.lineWidth = m.wdh;
                                            num(0, z,int);
                                        } else if (x && !y) {
                                            //Means it is a maj
                                            C.strokeStyle = M.clr;
                                            C.lineWidth = M.wdh;
                                            num(0, z,int);
                                        } else if (y) {
                                            //Means it is a axs
                                            C.strokeStyle = A.clr;
                                            C.lineWidth = A.wdh;
                                            arw();
                                        }
                                        C.stroke();
                                        C.closePath();
                                        tick(0,z[0],int,X.tck);
                                        break;
                                    case 1:
                                    var int = ((intercept.y) * X.a / X.t) + X.o;
                                        C.beginPath();
                                        C.moveTo(0, z[0]);
                                        C.lineTo(pr.dim[0].toFloat(), z[0]);
                                        if (!x && !y) {
                                            C.strokeStyle = m.clr;
                                            C.lineWidth = m.wdh;
                                            num(1, z,int);
                                        } else if (x && !y) {
                                            C.strokeStyle = M.clr;
                                            C.lineWidth = M.wdh;
                                            num(1, z,int);
                                        } else if (y) {
                                            C.strokeStyle = A.clr;
                                            C.lineWidth = A.wdh;
                                            
                                        }
                                        C.stroke();
                                        C.closePath();
                                        tick(1,int,z[0],Y.tck)
                                        break;
                                }
                            }
                            function hor() {
                                for (var i = X.o, m = 0; m <= X.t; i += X.a / X.t, m++)
                                    draw(0, m % X.m == 0, m == intercept.y, [i, m]);
                                ver();
                            };

                            function ver() {
                                for (var i = Y.o, m = 0; m <= Y.t; i += Y.a / Y.t, m++)
                                    draw(1, m % Y.m == 0, m == intercept.x, [i, m]);
                            };
                            function arw() {

                            }
                            function bg() {
                                C.save();
                                C.fillStyle = T.bg;
                                C.fillRect(0, 0, pr.dim[0].toFloat(), pr.dim[1].toFloat());
                                C.restore();
                                hor();
                            }
                            function int() {
                                function _x() {
                                    //The highest value does not mean it has the smallest number of digits.
                                    //There is a possibility that a longest characters of a value present
                                    //in any part of the axes. Meaning that a standard number of decimal places
                                    //along with the highest value gives the maximum width that can be found in any
                                    //part of the axes.
                                    intercept.y = (Math.max(0, X.r) == X.r) ? 0  : (Math.min(X.R,0) == X.R)?X.t: -X.r * X.m / X.M;
                                    _y();
                                }
                                function _y() {
                                    intercept.x = (Math.max(0, Y.r) == Y.r) ? 0 : (Math.min(Y.R,0) == Y.R) ?Y.t: -Y.r * Y.m / Y.M;
                                    bg();
                                };
                                _x();
                            }
                            int();
                        }
                        update();
                        return {
                            draw: function() {
                                console.log(this);
                            },
                            update: update,
                            getInfo: function() {

                            }
                        };
                    },
                    polar: function() {
                        return {};
                    }
                }
            };

        function evl(x, y, z) {
            function pard(a, b) {
                for (e in b) {
                    var uc = false,
                        t = __(a);
                    if (t.isObject && e in a) pard(a[e], b[e]);
                    else
                    if (t.isArray)
                        a.forEach(function(g) {
                            if (g in b) delete b[g];
                            else uc = true;
                        });
                    if (uc) pard(a, b[e])
                }
            };
            //Recursion function (RF)
            function L1(y, z) {
                var _z = __(z);
                for (e in y) {
                    var uc = false;
                    if (_z.isArray)
                        z.forEach(function(i) {
                            var t = __(i);
                            if (t.isObject && e in i) pard(i[e], y[e]);
                            else if (t.isString && i in y)
                                delete y[i];
                            else uc = true;
                        });
                    else if (_z.isString)
                        if (z in y) delete y[z];
                        else uc = true;
                    else if (_z.isObject)
                        if (e in z) pard(z[e], y[e]);
                    if (uc) L1(y[e], z);
                }
            };
            L1(y, z);
            //RF
            function L2(a, b) {
                for (var q in a) {
                    if (q in b) {
                        var _b = __(b[q]);
                        if (_b.isObject)
                            L2(a[q], b[q]);
                        else a[q] = b[q];
                    }
                }
            }
            L2(x, y);
        }

        function synth(x, y) {
            var X = st.app.default.pr.dim,
                W = X[0],
                H = X[1];
            return $.DOM(a).Append($.DOM($.DOM("canvas").new()).Attr.set(["width", "height", "id"], [W, H, x == 0 ? "pper" : y]), true);
        };
        if (__(a).isDOM && __(b).isObject) {
            var f = list[list.push({
                    DOM: synth(0),
                    type: 0,
                    pper: ty.pper[b.type in ty.pper ? b.type : st.app.default.pper],
                    cntxt: {},
                    func: {},
                    child: [{
                        el: ["x^2", "x^3", "x^4"],
                        col: [],
                        name: "polynomial"
                    }, {
                        el: ["sin(x)"],
                        col: {

                        }
                    }]
                }) - 1],
                r = {
                    add: function(a, b) {
                        var _a = __(a),
                            _b = __(b);
                        console.log(a,b);
                        return true;
                    },
                    delete: function() {

                    },
                    update: function(m, n) {
                        //Maj change is required here
                        var df = st.app.default,
                            m = m.replace(/\s/g, ""),
                            _m = m.split(":"),
                            _ml = _m.length - 1,
                            o = [];
                        for (var x = _ml; x >= 0; x--) {
                            var q = {},
                                l = o.length - 1;
                            q[_m[x]] = x == _ml ? n : o[l];
                            o.push(q);
                            //Because the last index must be included, the variable "l" is incremented by 1
                            if (x == 0) evl(st.app.default, o[l + 1], st.app.restrict);
                        }
                        //Now have to notify the change
                        st.app.cng.func();
                    }

                };
            $.listener(w, "resize", function() {
                r.update("pr:dim", [this.innerWidth.toPx(), this.innerHeight.toPx()])
            });
            //The mousemove event helps to get the x and y value of the graph.
            //The information must be global.
            $.listener(f.DOM,"scroll", function(e) {
                console.log(e);
            });
            //Must evaluate the Object b, before getting below
            //evl(b,st.app.default,st.app.restrict)
            f.func = f.pper(f.cntxt = f.DOM.getContext('2d'));
            return r;
        } else return {
            setDefault: function() {

            },
            load: function() {

            }
        };
    }
    w.grapher = g;
})(window, screen, document)
