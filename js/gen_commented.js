(function(w,s,d) {
	var $ = {
		set:function() {
			//Not sure about this
			return {
			}
		},
		new:function(x,y,z,m) {
			var __ = $.type,
				opt = {
					txtNode:false,
					dupNum:0,
					stcOrd:false
				},
				_x = __(x),
				_y = __(y),
				_z = __(z),
				_m = __(m);
			/*
				$.DOM.new(Array, Array);
				0:DOMElement name - String
				1:textNodeIndex - Number
				___________________________________
				$.DOM.new(Array,Array,Array,T||F);
				0:DOMElement name - String
				1:textNodeIndex - Number
				2:Duplication of set index - Number || Object
				3:order of duplication be Element dependent - Boolean
				Note(3): DEFAULT:FALSE => RET Array
				___________________________________
				$.DOM.new(Array,T||F,Number,T||F);
				0:DOMElement name - String
				1:All index textNode - Boolean
				2:Duplication of set index - Number + Array
				3:order of duplication be Element dependent - Boolean
				___________________________________
				$.DOM.new(Array,Array,Object,Boolean)
				___________________________________
				$.DOM.new(Array,Number,Boolean);
				0:DOMElement name - String
				1: # of duplications - Number
				2: Order should be element dependent - Boolean
				___________________________________
				$.DOM.new(String,Number,...);
				0: DOMElement name
				1: # of duplications
				___________________________________
				Note DOMElement name can also define # of duplication;
				Parsing of the string defines the exact #:
				$.DOM.new("div*2,span*3,i*1"...)
				Once string is parsed, the process of detecting duplication array
				is not skipped, but rather it is detected. Now it is necessary that a 
				systematic approach is used to detect the correct and suitable parameters.
				Also the properties of the nodes should be defined in a strict order: once
				the duplication property is defined, then other property such as "txtNode" are
				not valid even if they are intended to be defined later. In addition, the above
				stated possibilites should change in next version, because of the type conflict
				in defining properties txtNode and dupNum, both of which can be defined as an array.
				The next version can resolve this issue by enabling any one to be an array but with a 
				length of 1 element string typed and then parse it. 
			*/
			function synth(x,y) {
				return y ? d.createTextNode(x) : d.createElement(x);
			}
			function imp(z) {
				var o = opt,
					_ = $.type,
					_f = o.txtNode,
					_g = o.dupNum,
					f = _(_f),
					g = _(_g),
					m = o.stcOrd,
					r = [];
				
				switch(z) {
					//Array
					case 0:
					function tNode(h,j) {
						if(f.isArray) {
							if(_f.indexOf(j) > -1)
								return synth(h,true);
							else
								return synth(h,false);
						}
						else if(f.isBoolean && f) {
							return synth(h,_f);
						}	
					};
					function chk() {
						if(g.isArray) return 0;
						else if(g.isObject) return 1;
						else if(g.isNumber) return 2;
					};
					function e(a,b) {
						for(var i = 0; i <= _g[b]; i++) {
							r.push(tNode(a,b))
						}
					}
					switch(chk()) {
						case 0:
						x.forEach(function(a,b) {
							if(_g[b]) e(a,b);
							else r.push(tNode(a,b))
						})
						break;
						case 1:
						x.forEach(function(a,b) {
							if(b in _g) e(a,b);
							else r.push(tNode(a,b))
						})
						break;
						case 2:
						if(m)
							x.forEach(function(a,b) {
								for(var i = 0; i <= _g; i++) r.push(tNode(a,b))
							});
						else {
							for(var i = 0; i <= _g; i++)
								x.forEach(function(a,b) {
									r.push(tNode(a,b))
								});
						}
						break;
					}
					break;
					case 1:
					for(var i = 0; i <= _g; i++) r.push(tNode(x,i))
					break;
				}
				return r;
			}
			function Eval() {
				if(_x.isArray) {
					if(_y.isArray || _y.isBoolean) {
						opt.txtNode = y;
						if(_z.isArray || _z.isNumber || _z.isObject) opt.dupNum = z;
						if(_m.isBoolean) opt.stcOrd = m;
					}
					else if(_y.isNumber || _y.isObject) {
						opt.dupNum = y;
						if(_z.isBoolean) opt.stcOrd = z;
						if(_m.isArray || _m.isNumber || _m.isObject) opt.dupNum = m;
					}
					return imp(0);
				}
				else
					if(_x.isString) {
						if(_y.isBoolean) {
							if(_z.isNumber) opt.dupNum = z;
							opt.txtNode = y;
						}
						else if(_y.isNumber) {
							opt.dupNum = y;
						}
						return imp(1);
					}
			}
			return Eval();
		},
		DOM:{
			Append:function(x,q,z) {
				var __ = $.type;
				//Planning
				//if x is DOM, DOMList, Array
				//DOM = x_DOM, DOMList, Array = x_init;
				function x_int(h) {
					h.forEach(function(q) {
						x_DOM(q);
					})
				}
				function x_DOM(h) {
					var _y = __(q);
					//Due to the condition:
					//For one DOM element there cannot be multiple parent nodes
					//Because deep is default to false the children cannot be cloned as is
					if(_y.isArray) y_Array(h);
					else if(_y.isDOM) h.appendChild(q.cloneNode(true));	
				}
				function y_Array(k) {
					q.forEach(function(g) {
						var _t = $.type(g);
						if(_t.isDOM) k.appendChild(g.cloneNode(true));
						else if(_t.isString) k.appendChild($.new(g));
					})
				}
				ADL(__(x),x_int,x_DOM,x);
				return x;
			},
			Attr:{
				set:function(x,y,z) {
					//Plan:
					//$.DOM.Attr(DOMElement,[[DOMList, DOMArray]], Object,[[Array,String]], Array,[[String]])
					var __ = $.type;
					function x_d(_) {
						var _y = __(y);
						if(_y.isObject) 
							y_o(_,y);
						else if (_y.isArray)
							y_a(_,y);
					}
					function x_a(g) {
						g.forEach(function(_) {
							x_d(_);
						})
					}
					function y_o(a,b) {
						for(var g in b) a.setAttribute(g,b[g]);
					}
					function y_a(a,b) {
						b.forEach(function(m,n) {
							if(z[n]) a.setAttribute(m,z[n]);
						})
					}
					ADL(__(x),x_a,x_d,x);
					return x;
				}
			},
			CSS:{
				set:function(x,y,z) {
					var __ = $.type;
					function x_d(_) {
						var _y = __(y);
						if(_y.isObject) 
							y_o(_,y);
						else if (_y.isArray)
							y_a(_,y);
					}
					function x_a(g) {
						g.forEach(function(_) {
							x_d(_);
						})
					}
					function y_o(a,b) {
						for(var g in b) a.style.setProperty(g,b[g]);
					}
					function y_a(a,b) {
						b.forEach(function(m,n) {
							if(z[n]) a.style.setProperty(m,z[n]);
						})
					}
					ADL(__(x),x_a,x_d,x);
					return x;
				},
				get:function(x,y,z) {
					//$.DOM.CSS.get(DOMElement,DOMList,[[Array of req, String of req)
					var __ = $.type,
						_ret;
					function x_d(_) {
						var _y = __(y);
						if(_y.isString) 
							y_s(_,y);
						else if (_y.isArray)
							y_a(_,y);
					}
					function x_a(g) {
						g.forEach(function(_) {
							x_d(_);
						})
					}
					function y_s(a,b) {
						var u = w.getComputedStyle(a).getPropertyValue(b);
						_ret = u;
						return u;
					}
					function y_a(a,b) {
						for(var _d = [], l = 0 ; l < b.length ; l++) _d.push(y_s(a,b[l]));
						_ret = _d;
					}
					ADL(__(x),x_a,x_d,x);
					return _ret;
				}
			}
		},
		type:function(i) {
			var _ = {
				isObject:false,
				isArray:false,
				isString:false,
				isBoolean:false,
				isNumber:false,
				isDOM:false,
				isNList:false,
				isFunc:false,
				isUndefined:false,
				isList:false
			};
			if(i != void 0) {
				//instanceof is an operator not a method
				var p = [String,Number,Array,Boolean,Function,NodeList,Object],
					s = ["isString","isNumber","isArray","isBoolean","isFunc","isNList","isObject"];
				for(var t = 0; t < p.length; t++) {
					if(i instanceof p[t] || i.constructor == p[t]) {
						_[s[t]] = true;
						break;
					}
				}
			}
			else _.isUndefined = true;
			return _;
		},
		listener:function(x,y,z,q) {
			var __ = $.type,
			 	_1 = __(x),
			 	q  = q ? q : (__(z).isBoolean ? z : false);
			/*
				x = Array,DOM
				y = Array(c),Object,String(c)
				z = Array(c) or Func,Boolean(o),Func
				But z Array can have length lesser than y:
				in which case the value of least available index will 
				become default for the non-corresponding index(es)
			*/
			function doer(b,c,d,$w) {
				switch($w) {
					case 0:
					var t;
					c.forEach(function(e,i) {
						var __t = __(e);
						if(__t.isArray) {
							e.forEach(function(f) {
								b.addEventListener(f,d[i] || d, q);
							})
						}
						else{
							if(i in d) t = i;
							//If undefined then assume the callback as a Function type
							//And pass it.
							b.addEventListener(e,d[t] || d, q)
						}	
					})
					break;
					case 1:
						for(var x in c) b.addEventListener(x,c[x],q);
					break;
					case 2:
						b.addEventListener(c,d, q);
					break;
				}
			}
			function _e(x) {
				var _2 = __(y),
					_3 = __(z);
				if(_2.isArray && (_3.isArray || _3.isFunc))
					doer(x,y,z,0);
				else if(_2.isObject) {
					doer(x,y,z,1);
				}	
				else if(_2.isString){
					doer(x,y,z,2);
				}		
			};
			function init(A) {

				A.forEach(function(e) {
					_e(e);
				})
			}
			ADL(_1,init,_e,x);
		}
	};
	function ADL(M,a,b,n) {
		if(M.isArray) a(n);
		else if(M.isDOM) b(n);
		else if(M.isNList) a(Array.prototype.slice.call(n));
		else {
			try {
				b(n);
			}
			catch(e) {
				throw e;
			}
		}
	};
w.$ = $;
})(window,screen,document)