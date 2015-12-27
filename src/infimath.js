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
            .replace(/^0+/g,"") // Bwahaha... Grandma's secret 0-trimming trick:
            .replace(/\..+/g,function(z){return z.replace(/0/g," ")})
                                // replace 0's after the decimal point with spaces,
            .trim()             // trim off the extras,
            .replace(/ /g,"0")  // and switch the 0's back.
            .replace(/\.$/,"")  // Evil, isn't it? >:-)
            .replace(/^\./,"0.");
	},
	
	exp10:function(x,y){
		if(typeof(y)=="undefined")x.replace(/([\d.]+)e([+-]?\d+)/i,function(_,a,b){x=a,y=b});
		x=""+x,y=+y;
		if(x.indexOf(".")<0)x+=".";
		function swap2(z){return z[1]+z[0]}
		if(y>0){
			while(/\.\d/.test(x)&&y)
				x=x.replace(/\.\d/,swap2),y--;
			x=x.replace(/\./,function(){return"0".repeat(y)+"."});
		}else if(y<0){
			while(/\d\./.test(x)&&y)
				x=x.replace(/\d\./,swap2),y++;
			x=x.replace(/\./,function(){return"."+"0".repeat(-y)});
		}
		return x;
	},
	
	addTwo:function(x,y){
        var p=infimath.alignNums(x,y);
        x=p[0],y=p[1];
		var e=x.indexOf(".");
		x=x.replace(/\./,"");
		y=y.replace(/\./,"");
		var a=[0],r=0;
		for(var i=0;i<x.length;i++){r=+x[i];r+=+y[i];a[i+1]=r;}
		for(r=0,i=a.length;i--;){a[i]+=r;r=0;if(a[i]>9)r=a[i]/10|0,a[i]%=10;}
		a.splice(e+1,0,".");
		a=a.join("");
		return infimath.formatNum(a);
	},
	
	add:function(){
		var args;
		if(typeof(arguments[0])=="object") args=arguments[0];
		else args=[].slice.call(arguments);
		if(args.length<1) return "0";
		var r=args.map(String).reduce(infimath.addTwo);
		return infimath.formatNum(r);
	}
};