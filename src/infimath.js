String.prototype.repeat=String.prototype.repeat||function(x){return Array(~~x+1).join(this)};
infimath = {
    alignNums:function(){
        var args;
		if(typeof(arguments[0])=="object")
            args=arguments[0];
		else
            args=[].slice.call(arguments);
        var maxE=-1,maxD=-1;
        args=args.map(function(x){
            var a="",b="";
            x.replace(/([\d.]+)e([+-]?\d+)/i,function(_,y,z){a=y,b=z});
            if(a&&b)x=infimath.exp10(a,b);
            if(x.indexOf(".")<0)x+=".";
            return x;
        });
        args.map(function(x){
            maxE=Math.max(maxE,x.indexOf("."));
            maxD=Math.max(maxD,x.length-x.indexOf(".")-1);
        });
        args=args.map(function(x,i){
            return"0".repeat(maxE-x.indexOf("."))+x+"0".repeat(maxD-(x.length-x.indexOf(".")-1));
        });
        return args;
    },
	
	formatNum:function(x){
		return x
          .replace(/0+$/,"")
          .replace(/\.$/,"")
          .replace(/^0/,"")
          .replace(/^\./,"0.");
	},
    
    exp10:function(x,y){
		if(typeof(y)=="undefined")x.replace(/([\d.]+)e([+-]?\d+)/i,function(_,a,b){x=a,y=b});
        x=""+x,y=+y;
        function swap2(z){return z[1]+z[0]}
        if(y>0){
            while(/\.\d/.test(x)&&y--)
                x=x.replace(/\.\d/,swap2);
            x=x.replace(/\./,function(){return"0".repeat(y)+"."});
        }else if(y<0){
            while(/\d\./.test(x)&&y++)
                x=x.replace(/\d\./,swap2);
            x=x.replace(/\./,function(){return"."+"0".repeat(-y)});
        }
        return x;
    },
    
    addTwo:function(x,y){
        var e=x.indexOf(".");
        x=x.replace(/\./,"");
        y=y.replace(/\./,"");
        var a=[0],r=0;
        for(var i=0;i<x.length;i++){r=+x[i];r+=+y[i];a[i+1]=r;}
        for(r=0,i=a.length;i--;){a[i]+=r;r=0;if(a[i]>9)r=a[i]/10|0,a[i]%=10;}
        a.splice(e+1,0,".");
        a=a.join("");
        return a;
    },
    
    add:function(){
		var args=[].slice.call(arguments);
		args=infimath.alignNums(args);
		var r=args.reduce(function(a,b){return infimath.addTwo(a,b)});
		return infimath.formatNum(r);
    }
};
