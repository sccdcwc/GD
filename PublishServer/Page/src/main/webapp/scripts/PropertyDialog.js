var url;
var url_bid=[];
var test=[];
var property_arr=[];
var blockProperty;
var blockProArr=[];
$.fn.serializeObject = function() //form转json
	{
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	
	function checkPropertySubmit() {
		if (document.block_property_form.pro_name.value == "" || document.block_property_form.pro_edge.value == "") {
			alert("方块属性不能为空!");
			document.block_property_form.focus();
			return false;
		}
		return true;
	}
	
	
	var saveButton = document.getElementById("save_button");

	saveButton.onclick = function() {

		localStorage.setItem("name_property", $("#name").val());
		localStorage.setItem("edge_property", $("#edge").val());
		var jsonuserinfo = $('#block_property_form').serializeObject();
		 
		//var blockRecords = window.localStorage.getItem("block_records");
		//jsonuserinfo.block_id = window.localStorage.getItem("block_id");
		jsonuserinfo.block_id = url_bid[0];
		jsonuserinfo.page_id=window.localStorage.getItem("page_id");
		blockProperty = JSON.stringify(jsonuserinfo);
		 
		console.log(blockProperty);
		 
		blockProArr.push(blockProperty);
	  //console.log(JSON.parse(blockProArr[0]).block_id);
		 
		if(localStorage.getItem("onload_property")!=null){
			var property_str=localStorage.getItem("onload_property");
			var count=0;
			var startIndex=0,endIndex=0;
			
		for(var i=0;i<property_str.length;i++){
			if(property_str.charAt(i)=="}"){
				
				endIndex=i;
				property_arr[count]=property_str.substring(startIndex,endIndex+1);
				startIndex=endIndex+2;
				count++;
			}
		}
 	   //console.log(property_arr);
	  // property_arr.push(blockProperty);
	   console.log(JSON.parse(property_arr[0]).block_id);
	   for(var i=0;i<property_arr.length;i++){
	   	var each_parse_pro=JSON.parse(property_arr[i]);
	   	if(JSON.parse(blockProArr[0]).block_id==each_parse_pro.block_id){
	   		property_arr.splice(i,1);
	   	}
	   }
	   blockProArr=blockProArr.concat(property_arr);
 
		}
		 
		console.log(blockProArr);
		  
		localStorage.setItem("blockProperty", blockProArr);
		 
 
		parentDialog.close();
 

	};
	
	var cancelButton = document.getElementById("cancel_button");
	cancelButton.onclick = function() {
		parentDialog.close();
	};
window.onload = function() {
	url=window.location.href;
	console.log(url);
	if(url.indexOf("?")>0){
		url=url.split("?");
		url=url[1];
	    url_bid=url.split("&");
		console.log(url_bid[0]);
	}
	 
		if(localStorage.getItem("blockProperty")!==null){ 
		var blockPropertyTmp = localStorage.getItem("blockProperty");
		//blockPropertyTmp=blockPropertyTmp.substring(0,blockPropertyTmp.length-1);
		var startIndex=0,endIndex=0;
		var resultBlockProArr=[];
		var count=0;
		for(var i=0;i<blockPropertyTmp.length;i++){//字符串转数组
			if(blockPropertyTmp.charAt(i)=="}"){
				
				endIndex=i;
				resultBlockProArr[count]=blockPropertyTmp.substring(startIndex,endIndex+1);
				startIndex=endIndex+2;
				count++;
			}
		}
		 
		localStorage.setItem("onload_property",resultBlockProArr);
 
	    console.log(resultBlockProArr);
		for(var i=0;i<resultBlockProArr.length;i++){//resultBlockProArr是字符串数组，而非json数组
			var test=JSON.parse(resultBlockProArr[i]);
			console.log(test.block_id);
			if(url_bid[0]==test.block_id){
				console.log(test.block_id);
				//$("#name").val(localStorage.getItem("name_property"));
				//$("#edge").val(localStorage.getItem("edge_property"));
				$("#name").val(test.pro_name);
				$("#edge").val(test.pro_edge);
				break;
			}
		}
	}	
 
	var otherJs = document.createElement("script");
	otherJs.setAttribute("type", "text/javascript");
	otherJs.setAttribute("src", "scripts/zDialog.js");
	document.body.appendChild(otherJs);
	
	 
};