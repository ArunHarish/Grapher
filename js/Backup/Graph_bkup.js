//By Arun Harish Balasubramonian
//Copyright 2016
(function(w, s, d) {
    Number.prototype.toPx = function() {
        return this + 'px';
    };
    function g(a, b) {
        //If selected property is an object
        //Then it would be accessible globally instead
        //of relying on defined variables 
        var __ = $.type,
            list = [],
            st = {
                app: {
                    cng:{
                        func: [
                        {
                            dim: function(n) {
                                var  l = list;
                                l.forEach(function(e) {
                                    var dc = $.DOM(e.DOM),
                                        ac = ["width","height"];
                                    e.dim = n;
                                    dc.Attr.set(ac,n);
                                });
                            }
                        }
                        ]
                    },
                    restrict :[],
                    default: {
                    	pper: 'cartesian',
                        pr: {
                            dim: [w.innerWidth.toPx(), w.innerHeight.toPx()],
                            x: {
                                maj: 5,
                                min: 3,
                                rng: [-10, 10],
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
                                    wdh: 2,
                                    type: "pntd",
                                    projection: "undir"
                                },
                                num: {
                                    offset: 5,
                                    font: {
                                        face: "consolas",
                                        size: 10
                                    },
                                    angle: 0
                                }
                            },
                            y: {
                                maj: 5,
                                min: 4,
                                rng: [-10, 20],
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
                                    wdh: 2,
                                    type: "pntd",
                                    projection: "bi"
                                },
                                num: {
                                    offset: 5,
                                    font: {
                                        face: "consolas",
                                        size: 10
                                    },
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
                                        wdh: 1,
                                        clr: "#888",
                                        stk_arr: [0, 0]
                                    },
                                    min: {
                                        wdh: 0.5,
                                        clr: "#888",
                                        stk_arr: [0, 0]
                                    },
                                    axs: {
                                        wdh: 1.25,
                                        clr: "#000",
                                        stk_arr: [0, 0]
                                    }
                                },
                                ax: {

                                },
                                lb: {
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
                    cartesian: function(v) {
                        var pr = st.app.default.pr,
                            x = pr.x, y = pr.y;
                        return {
                            draw: function() {

                            },
                            update: function() {

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
                dim: __(b.dim).isArray ? b.dim : st.app.default.pr.dim,
                cntxt:{},
                func: {}, 
                child: [["polynomial",{
                    el: ["x^2","x^3","x^4"],
                    col:[]
                }],
                [{
                    el:["sin(x)"],
                    col:{

                    }   
                }]] 
            }) - 1],
        	r = {
        		add: function(a,b) {
                    var _a = __(a),
                        _b = __(b);
                    if(_a.isArray) a.forEach(function(u) {
                        f.func.draw(u);
                    })
            		return true;
        		},
            	update: function(m,n) {
                    //Maj change is required here
            		var df = st.app.default
            			,m = m.replace(/\s/g,""),
            			_m = m.split(":"),
                        _ml = _m.length-1,
                         o = [];
                    for(var x = _ml;x >= 0; x--) {
                        var q = {},
                            l = o.length-1;
                        q[_m[x]] = x == _ml ? n : o[l];
                        o.push(q);
                        //Because the last index must be included, the variable "l" is incremented by 1
                        if(x == 0) evl(st.app.default,o[l+1],st.app.restrict);
                    }
                    //Now have to notify the change
                    //The change in dimension affects the entire GUI, 
                    var fnc = st.app.cng.func;
                    console.log(fnc)
            	},
            	delete: function() {

            	}
        	};
            $.listener(w,"resize",function() {
            	r.update("pr:dim",[this.innerWidth.toPx(),this.innerHeight.toPx()])
            });
            //Must evaluate the Object b, before getting below
            //evl(b,st.app.default,st.app.restrict)
            f.func = f.pper(f.cntxt = f.DOM.getContext('2d'));
            return r;
        }
        else return {
        	setDefault: function() {

        	},
        	load: function() {

        	}
        };
    }
    w.grapher = g;
})(window, screen, document)