(function(w,s,d) {
    var $d = {
        prePath:d.querySelector('svg>g#drawing>g#parabolic_pre>g#parabola_lay>path'),
        preFill:d.querySelector('svg>g#drawing>g#parabolic_pre>defs#dyn>clipPath#the_mask>rect')
    },
    $X = new w.XMLHttpRequest(),
    $l = {
    	opt:'./html/ss.html'
    },
    $pre = {
        genDocSel:function(x) {
            var _i = 310;
            $d.prePath.setAttribute('stroke-dashoffset',_i-(x*_i));
        },
        docLoader:function(x) {
            var _i = 250;
            $d.preFill.setAttribute('width',_i*x+'px');
        }
    };
    function loadHTML(d) {
        //var
        var _ = {};
        //process
        $X.open("GET",d);
        $X.responseType = "document"
        $X.send();
        //Listener
        $X.addEventListener('load',function() {
            if($X.status == 200) 
                _.out = $X.responseXML;
        })
        return _;
    }
    var f = loadHTML($l.opt,function() {
        
    });
})(window,screen,document)