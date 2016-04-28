(function(w,s,d) {
	//Function
	function g(a,b) {
		//b is general Object for both st and t Objects
		//Listeners
		$.listener(w,'resize',function() {
			r.update("dimension",[this.innerWidth,this.innerHeight])
		});
		//Variables
		var th = {
			snowWhite:{
				ln:{
					maj:{
						wdh:1,
						clr:"#888",
						stk_arr:[0,0]
					},
					min:{
						wdh:0.5,
						clr:"#888",
						stk_arr:[0,0]
					},
					axs: {
						wdh:1.25,
						clr:"#000",
						stk_arr:[0,0]
					}
				}
			},
			GoldenBrown:{
				ln:{

				}
			}
		},
		//The setting is regardless of themes
		st = {
			inl:{
				//In Polar graph paper,
				//The x = Angle,
				//The y = Radius
				//In that case the radius(y)
				//rng and dim values are not considered
				dim:[w.innerWidth,w.innerHeight],
				x:{
					maj:5,
					min:3,
					rng:[-10,10],
					label:{
						name:"x",
						pos:0
					},
					arw: {
						size:10,
						type:{
							selected:"pntd",
							custom:[]
						}
					},
					tick: {
						wdh:2,
						type:"pntd",
						projection:"undir"
					},
					num: {
						offset: 5,
						font:{
							face:"consolas",
							size:10
						},
						angle:0
					}
				},
				y:{
					maj:5,
					min:4,
					rng:[-10,20],
					label:{
						name:"y",
						pos:0
					},
					arw:{
						size:10,
						type:{
							selected:"pntd",
							custom:[]
						}
					},
					tick: {
						wdh:2,
						type:"pntd",
						projection:"bi"
					},
					num: {
						offset: 5,
						font: {
							face:"consolas",
							size:10
						},
						angle:0
					}
				}
			}
		};
	var ty = {
		pper:{
			loop:function(a, b, c) {
				//a: the major and minor array for a given axes
				//b: function to execute during the intervals
				var sym = false,
					x = a[2][0],
					y = a[2][1],
					off = 10,
					ava = (a[3]-off*2),
					R = a[1]+1;
				function M(m) {
					return (x+(a[0]/R)*m).toFixed(2);
				}
				if(Math.abs(x) == Math.abs(y)) {
					var t = (Math.abs(x)*2*R)/a[0];
					sym = true;
				}
				else
					var t = ((Math.abs(x) + Math.abs(y))*R)/a[0];
				
				if(t!=Infinity)
					for(var i = off,m = 0; m <= t; i+= ava/t,m++) {
						b(m % R == 0,
							(
								(sym && m == t/2) 
								||(
									!sym && Math.max(0,x) == 0 
									&& 
									m == -x*R/a[0]
								)
								||(
									!sym && Math.max(0,x) == x && m ==0
								)
							)
							? 1: 0,
						c ? m : i,M(m));
					}
						
				else
					b(false,1,ava/2);
			},
			cartesian:function(y,z,t) {
				//A major change is required:
				//It must include a well designed system
				//That can update and the code efficiently
				var intercept = {
					x:0,y:0
				}
				switch(z) {
					case 0:
					var ax = st.inl.x,
						by = st.inl.y,
						dm = st.inl.dim;
					function axes(w,K,L,M) {
						function s(q) {
							y.lineWidth = K.wdh;
							y.setLineDash(K.stk_arr)
							y.strokeStyle = K.clr;		
						}
						switch(w) {
							case 0:
							y.moveTo(L,0);
							y.lineTo(L,dm[1]);
							s();
							txt(0,L+5,dm[1]/2,st.inl.x.num)	
							break;
							case 1:
							y.moveTo(0,L);
							y.lineTo(dm[0],L);
							s();
							break;
						}
					};
					function txt(a,_x,_y,f) {
						var fnt = f.font;
						y.font = fnt.size+'px'+' '+fnt.face
						y.textAlign = "center";
						y.textBaseline = "middle";
						y.fillText(a,_x,_y,40);
					}
					ty.pper.loop([ax.maj,ax.min,ax.rng,dm[0]],function(a,b,c,Val) {
						y.beginPath();
						if(b==1) {
							axes(0,th[t].ln.axs,c);
							intercept.x = c;
						}
						else
						{
							var type = a ? th[t].ln.maj:th[t].ln.min;
							y.moveTo(c,0);
							y.lineWidth = type.wdh;
							y.setLineDash(type.stk_arr)
							y.lineTo(c,dm[1]);
							y.strokeStyle = type.clr;
							txt(Val,c,intercept.y,st.inl.x.num)
						}
						y.stroke()
						y.closePath();
					});
					ty.pper.loop([by.maj,by.min,by.rng,dm[1]],function(a,b,c,Val) {
						y.beginPath();
						if(b==1) {
							axes(1,th[t].ln.axs,c);
							intercept.y = c;
						}
						else {
							var type = a ?th[t].ln.maj:th[t].ln.min;
							y.moveTo(0,c);
							y.lineWidth = type.wdh;
							y.setLineDash(type.stk_arr)
							y.lineTo(dm[0],c);
							y.strokeStyle = type.clr;
							txt(Val,intercept.x,c,st.inl.y.num)
						}
						y.stroke()
						y.closePath();
					});
					break;

					case 1:

					break;
				}
				return {
					adapt:function(x) {
						//console.log(this);
					}
				};
			},
			polar:function(x,z) {
				switch(z) {
					case 0:
					var ax = st.inl.x,
						by = st.inl.y;
					ty.pper.loop()
					break;
					case 1:

					break
				}
			}
		}
	};
		var list = [],
			cn = synth(0);
		var r = {
			update:function() {
				//Update includes any change in settings
				//This 
				list[0].cng.adapt();
			},
			add:function(x, y, z) {
				var l = list,
					ln = l.length,
					cd = l[ln-1].child;
				if(l.length > 1 && cd.length < 10) {
					/*
					cd.push({
						cng:draw(check())
					})
					*/
				}
				else {
					list.push({
						cng:draw(check(synth(1, (ln-1).toString()).getContext('2d'), y, 1),1),
						child:[]
					})
				};
			},
			delete:function() {

			},
			Math:{
				calculus:{
					derive:function() {

					}
				},
				solve:function() {

				},
				matrix:{

				}
			},
			animation:function() {

			}
		},
		f = list[list.push({
			cng:draw(check(cn.getContext('2d'),b,0),0)
		})-1]
		//Function
		//Check evaluates the user defined properties and overrides
		//with the default values
		function check(x, y, z) {
			//This is just for now
			//The purpose of check is to evaluate the properties
			//Only the draw function returns the Object ty
			//Function overrides the user value with default value
			switch(z) {
				case 0:
				return {
					y:b,
					x:x,
					z:z
				};
				break;
				case 1:
				//For Function
				return {

				};
				break;
			}
		};
		function draw(g) {
			var x = g.x, y = g.y,P = y.type in ty.pper ? ty.pper[y.type] : ty.pper["cartesian"];
			return P(x,g.z,y.theme);
		};
		function synth(x ,y) {
			var dim = st.inl,X=dim.dim,W =X[0],
				H = X[1];
			return $.DOM(a).Append( 
				 $.DOM($.DOM("canvas").new())
				 .Attr.set(["width","height","id"],[W,H,x == 0 ? "pper" : y]),
				 true);
		}
		//Listener
		return r;
	};
	w.grapher = g;
})(window,screen,document)