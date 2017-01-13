var dd =require('harmony-reflect')

var query=function(arr){
	
	var funcs=[]
	var proxy=new Proxy({},{
		get:function(obj,fnName){
			if(fnName=="get"){
				for(var i=0;i<funcs.length;i++){
					var linqfn=funcs[i].linqfn;
					var innerfn=funcs[i].innerfn;
					if(innerfn)
						arr=linqfn(arr,innerfn);
				}
				return arr;
			}else if(fnName in linq){
				funcs.push({linqfn:linq[fnName]});
				return linqInnerfn;
			}else{
				throw Error("null Linq detactive")
			}
		}
	})
	function linqInnerfn(innerfn){
		
		funcs[funcs.length-1].innerfn=innerfn;
		return proxy
	}
	return proxy;
}
var linq={
	where: function (val,fn) {
		var rel=[]
		for(var i=0;i<val.length;i++){
			if(fn(val[i])){
				rel.push(val[i])
			}
		}
		return rel;
	},
	orderBy:function(arr,fn){
		arr.sort(function(a,b){
			return fn(a)-fn(b);
		})
		return arr;
	},
	select:function(arr,fn){
		var rel=[];
		for(var i=0;i<arr.length;i++){
			
			rel.push(fn(arr[i]))
			
		}
		return rel;
	},
	max:function(arr,fn){
		var rel;
		for(var i=0;i<arr.length;i++){
			if(!rel||rel>fn(arr[i]))
				rel=fn(arr[i])
			
		}
		return [rel];
	},
	min:function(arr,fn){
		var rel;
		for(var i=0;i<arr.length;i++){
			if(!rel||rel<fn(arr[i]))
				rel=fn(arr[i])
			
		}
		return [rel];
	},
	sum:function(arr,fn){
		var rel=0;
		for(var i=0;i<arr.length;i++){
			
				rel+=fn(arr[i])
			
		}
		return [rel];
	}
}
var persons=[
 
    {
        name: "Daniel",
        age: 12,
        wants: "a dog",
    },
 
 
    {
        name: "Julia",
        age: 8,
        wants: "a bottle of rum"
    },
 
 
    {
        name: "Vitaly",
        age: 100,
        wants: "a dog"
    },
 
    {
        name: "Ina",
        age: 20,
        wants: "Vitaly"
    }
]

query(persons).where(p=>p.age!=12).orderBy(p=>p.age).select(p=>p.age).sum(p=>p).get
