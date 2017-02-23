var allId="";
var lastId="";
function changeDiv(id){
	document.getElementById(id).style.border="2px solid yellow";
	lastId=allId;
	allId=id;
	if(allId != ""){
		if(lastId!= "" && lastId!=allId){
			document.getElementById(lastId).style.border="1px solid darkgray";
		}
		if(document.getElementById(allId).innerHTML == ""){
            closeTab();
		}else{
			var pageId = document.getElementById("hidden_pageId").value;
			var page = TemplateDataManageSingle.getInstance().getPage(pageId);
			var block = TemplateDataManageSingle.getInstance().getBlock(page , allId.substring(3));
			if(1 == block.block_data.type){
				textEditor(block.block_data);
			}
			if(2 == block.block_data.type){
				imageEditor(block.block_data);
			}
			if(3 == block.block_data.type){
				tableEditor(block.block_data);
			}
		}
		
	}
}







//背景接口控件
function backgroundEditor(data){
	var img_src="",
	url = "",
	param = "",
	checked1 ="",
	checked2="";
	if(data.page_data && data.page_data != ""){
		img_src = data.page_data.page_bg;
		url = data.page_data.url;
		param = data.page_data.params;
		repeat = data.page_data.repeat;
		if(repeat == "repeat"){
			checked1="checked";
		}
		if(repeat == "no-repeat"){
			checked2="checked";
		}
	}
	var html = '<div style="margin-left:5px;"><div class="property_div" style="margin-top:5px;"><span style="margin-left:8px;">背景和接口设置</span><span style="float:left;width:240px;height:1px;background-color:darkgray;margin-top:3px;"></span></div>';
	html = html + '<div id="background_divStyle"><div class="property_div"><span class="span_style">背景</span><a style="display:inline-block; width:72px; height:23px;margin-top:6px; position:relative; overflow:hidden;"><input type="file" id="img_content"/></a><input type="text" id="img_src" hidden="true" value="'+img_src+'"/></div>';
	html = html + '<div class="property_div"><span class="span_style"></span><input type="radio" value="repeat" name="checkbox" '+checked1+'><span class="check_table">平铺</span><input type="radio" value="no-repeat" name="checkbox" '+checked2+'><span class="check_table">居中</span></div>';
	html = html + '<div class="property_div"><span class="span_style">接口</span><input class="span_input" type="text" id="url" value="'+url+'"/></div>';
	html = html + '<div class="property_div"><span class="span_style">参数</span><input class="span_input" type="text" id="param" value="'+param+'"/></div>';
	html = html + '<div class="property_div" style="margin-top:5px;margin-bottom:10px;text-align: center; "><button class="button_style" id="text_submit" onclick="setUrl();">确认</button><button class="button_style" onclick="closeTab();">取消</button></div></div></div>';
	document.getElementById("editor").style.display="";
	document.getElementById("editor").innerHTML = html;
	document.getElementById("img_content").addEventListener("change", readFile, false);
}
function setUrl(){
	var url = document.getElementById("url").value,
    param = document.getElementById("param").value,
    pageId = document.getElementById("hidden_pageId").value,
    img_src = document.getElementById("img_src").value;
	var checkedStatue = $("input[name='checkbox']:checked").val();
	if(img_src != ""){
		document.getElementById("total_are").style.backgroundImage="url('"+img_src+"')";
	}
	document.getElementById("editor").innerHTML = "";
	document.getElementById("editor").style.display="none";
	TemplateDataManageSingle.getInstance().setPageData(pageId , img_src,checkedStatue , url , param);
}








//文字控件
function textEditor(data){
	if(allId == ""){
		alert("请先选择模块框");
		return;
	}
	var font_size ="字体大小",
    font_family ="字体",
    font_weight ="",
    font_style ="",
    field_name = "",
    color ="",
    roll ="",
    content ="",
	url ="",
	param = "";
	if(data != ""){
		if(data.data_word && data.data_word!=""){
			font_size =data.data_word.font_size;
		    font_family =data.data_word.font_family;
		    font_weight =data.data_word.bold == 1 ? "checked" : "";
		    font_style =data.data_word.tilt == 1 ? "checked" : "";
		    color =data.data_word.color;
		    roll =data.data_word.roll == 1 ? "checked" : "";
		    content =data.data_word.content;
		}
//		if(data.url){
//			url =data.url;
//		}
//		if(data.params){
//			param = data.params;
//		}
		if(data.field_name){
			field_name = data.field_name;
		}
	}
	var focusId = allId;
	var html = '<div style="margin-left:5px;"><div class="property_div" style="margin-top:5px;"><span style="margin-left:8px;">文字</span><span style="float:left;width:240px;height:1px;background-color:darkgray;margin-top:3px;"></span></div>';
	html = html +'<div><div style="float:left;width:50px;height:90px;"><span style="float:left;margin:10px 0px 0px 5px">样式</span></div>';
	html = html +'<div id="div_style" style="float:left;width:185px;height:90px;border-radius:5px;border:1px solid darkgray;"><div style="margin-top:5px;margin-left:5px;">';
	html = html + '<input type="checkbox" id="text_bold" value="bold" class="checkbox" '+font_weight+'><span class="check_text">加粗</span><input type="checkbox" id="text_tilt" class="checkbox" value="italic" '+font_style+'><span class="check_text">倾斜</span><input type="checkbox" id="text_roll" class="checkbox" value="roll" '+roll+'><span class="check_text">滚动</span></div>';
	html = html + '<div><input type="text" id="test_focuseID" hidden="true" value="'+focusId+'"/>';
	html = html + '<select name="select" id="fontslt"><option selected="selected">'+font_size+'</option><option>10px</option><option>15px</option><option>20px</option></select>';
	html = html + '<select name="select" id="fontFamily"><option selected="selected">'+font_family+'</option><option>宋体</option><option>微软雅黑</option><option>幼圆</option></select></div>';
	html = html + '<div><input id="color" type="color" name="color1" value="'+color+'" class="color" style="margin-left:7px;width:40px"><button class="button_style" style="width:45px;height:27px;font-size:12px;margin-left:10px;margin-top:5px;background-color:#0099cc" onclick="setData();">日期</button>';
	html = html + '<button class="button_style" style="width:45px;height:27px;margin-top:5px;font-size:12px;background-color:#0099cc" onclick="setTime();">时间</button></div></div></div>';
	
	html = html + '<div class="property_div"><span class="span_style">内容</span><input class="span_input" type="text" id="content" value="'+content+'"/></div>';
//	html = html + '<div class="property_div"><span class="span_style">接口</span><input class="span_input" type="text" id="url" value="'+url+'"/></div>';
//	html = html + '<div class="property_div"><span class="span_style">参数</span><input class="span_input" type="text" id="param" value="'+param+'"/></div>';
	html = html + '<div class="property_div"><span class="span_style">类型</span><input class="span_input" type="text" id="fieldName" value="'+field_name+'"/></div>';
	html = html + '<div class="property_div" style="margin-top:5px;margin-bottom:10px;text-align: center; "><button class="button_style" id="text_submit" onclick="setText();">确认</button><button class="button_style" onclick="closeTab();">取消</button></div></div></div>';
	document.getElementById("editor").style.display="";
	document.getElementById("editor").innerHTML = html;
}

function setData(){
	var myDate = new Date();
	var date = myDate.toLocaleDateString(); //获取当前日期
//	var mytime=myDate.toLocaleTimeString(); //获取当前时间
	var time = myDate.toLocaleString( ); //获取日期与时间
	var value = document.getElementById("content").value;
	if(value != ""){
		document.getElementById("content").value=value + " "+date;
	}else{
		document.getElementById("content").value=date;
	}
	
}
function setTime(){
	var myDate = new Date();
//	var time = myDate.toLocaleDateString(); //获取当前日期
	var mytime=myDate.toLocaleTimeString(); //获取当前时间
//	var time = myDate.toLocaleString( ); //获取日期与时间
	var value = document.getElementById("content").value;
	if(value != ""){
		document.getElementById("content").value=value + " "+mytime;
	}else{
		document.getElementById("content").value=mytime;
	}
}
function setText(){
	var pageId = document.getElementById("hidden_pageId").value;
	var test_focuseID = document.getElementById("test_focuseID").value,
	    color = document.getElementById("color").value,
	    content = document.getElementById("content").value,
	    font_size = fontslt.options[fontslt.selectedIndex].value,
	    font_family = fontFamily.options[fontFamily.selectedIndex].value,
	    field_name = document.getElementById("fieldName").value,
	    font_weight = "",
	    font_style = "",
	    bold = "",
	    tile = "",
	    roll = "";
	
	if(document.getElementById("text_bold").checked){
		font_weight = document.getElementById("text_bold").value;
		bold = 1;
	}
    if(document.getElementById("text_tilt").checked){
    	font_style = document.getElementById("text_tilt").value;
    	tile = 1;
	}
    var html = '<p style="font-size:'+font_size+';font-family:'+font_family+';font-weight:'+font_weight+';font-style:'+font_style+';color:'+color+';word-break:break-all; word-wrap:break-word ;">'+content+'</p>';
    if(document.getElementById("text_roll").checked){
    	roll = 1;
	    html = '<marquee scrollamount="2" direction="left" >'+html+'</marquee >';
    }
    var block_data_word ={"font_size":font_size,
    "font_family":font_family,
    "bold":bold,
    "tile":tile,
    "color":color,
    "roll":roll,
    "content":content};
	if(field_name ==""){
		document.getElementById("editor").innerHTML = "";
		document.getElementById("editor").style.display="none";
//		document.getElementById(test_focuseID).innerHTML=html;
		field_name="";
		TemplateDataManageSingle.getInstance().setBlockData_word(pageId , parseInt(test_focuseID.substring(3)) , 1 , block_data_word,field_name);
		TemplateRevert.prototype.updateRevertBlock(pageId,parseInt(test_focuseID.substring(3)));
		document.getElementById(test_focuseID).style.border="1px solid black";
	}else{
		document.getElementById("editor").innerHTML = "";
		document.getElementById("editor").style.display="none";
		TemplateDataManageSingle.getInstance().setBlockData_word(pageId , parseInt(test_focuseID.substring(3)) , 1 , block_data_word,field_name);
		document.getElementById(test_focuseID).innerHTML='<p>使用文字接口</p>';
		document.getElementById(test_focuseID).style.border="1px solid black";
	}
}

//图片控件
function imageEditor(data){
	if(allId == ""){
		alert("请先选择模块框");
		return;
	}
	var img_src ="",
	field_name = "",
	url ="",
	param = "";
	if(data != ""){
		if(data.data){
			img_src =data.data;
//			img_width =data.data_word.img_width;
//			img_height =data.data_word.img_height;
		}
//		if(data.url){
//			url =data.url;
//		}
//		if(data.params){
//			param = data.params;
//		}
		if(data.field_name){
			field_name = data.field_name;
		}
	}
	var focusId = allId;
	var html = '<div style="margin-left:5px;"><div class="property_div" style="margin-top:5px;"><span style="margin-left:8px;">图片</span><span style="float:left;width:240px;height:1px;background-color:darkgray;margin-top:3px;"></span></div>';
	html = html + '<div id="img_divStyle"><div class="property_div"><input type="text" id="image_focuseID" hidden="true" value="'+focusId+'"/>';
	html = html + '<span class="span_style">本地</span><a style="display:inline-block; width:72px; height:23px;margin-top:6px; position:relative; overflow:hidden;"><input type="file" id="img_content"/></a><input type="text" id="img_src" hidden="true" value="'+img_src+'"/></div>';
//	html = html + '<div class="property_div"><span class="span_style">宽度</span><input class="span_input" type="text" id="img_width" value="'+img_width+'"/></div>';
//	html = html + '<div class="property_div"><span class="span_style">高度</span><input class="span_input" type="text" id="img_height" value="'+img_height+'"/></div>';
//	html = html + '<div class="property_div"><span class="span_style">接口</span><input class="span_input" type="text" id="url" value="'+url+'"/></div>';
//	html = html + '<div class="property_div"><span class="span_style">参数</span><input class="span_input" type="text" id="param" value="'+param+'"/></div>';
	html = html + '<div class="property_div"><span class="span_style">类型</span><input class="span_input" type="text" id="fieldName" value="'+field_name+'"/></div>';
	html = html + '<div class="property_div"><span id="img_msg" style="color:green;font-size:12px;"></span></div>';
	html = html + '<div class="property_div" style="margin-top:0px;margin-bottom:10px;text-align: center; "><button class="button_style" id="img_submit" onclick="setImg();">确认</button>';
	html = html + '<button class="button_style" onclick="closeTab();">取消</button></div></div></div>';
	document.getElementById("editor").style.display="";
	document.getElementById("editor").innerHTML = html;
	document.getElementById("img_content").addEventListener("change", readFile, false);
	
}
function readFile() {
	var file = document.getElementById("img_content").files[0];
	if(!/image\/\w+/.test(file.type)){   
		alert("请确保文件为图像类型"); 
		return; 
	}
	r = new FileReader();  //本地预览
	r.onload = function(){
		document.getElementById("img_src").value = r.result;
//		document.getElementById("img_msg").innerHTML = "本地图片已选";
	}
	r.readAsDataURL(file);
//	  if (this.files && this.files[0]) {
//	    var FR= new FileReader();
//	    FR.onload = function(e) {
//	    	console.log("111");
//	    	console.log(e.target.result);
//	    	console.log("222");
//	    	document.getElementById("img_src").value = e.target.result;
//	    };
//	  }
	}

function setImg(){
	var pageId = document.getElementById("hidden_pageId").value;
	var image_focuseID = document.getElementById("image_focuseID").value;
	var img_src = document.getElementById("img_src").value;
	var img_width = "100%";
	var img_height = "100%";
	var field_name = document.getElementById("fieldName").value;
	if(field_name ==""){
		document.getElementById("editor").innerHTML = "";
		document.getElementById("editor").style.display="none";
//		var html ='<img src=\''+img_src+'\' width=\''+img_width+'px\' height=\''+img_height+'px\'/>';
		field_name="";
		TemplateDataManageSingle.getInstance().setBlockData_data(pageId , image_focuseID.substring(3) , 2 , img_src,field_name);
		TemplateRevert.prototype.updateRevertBlock(pageId,image_focuseID.substring(3));
//		document.getElementById(image_focuseID).innerHTML='<img src=\''+img_src+'\' width=\''+img_width+'\' height=\''+img_height+'\'/>';
		document.getElementById(image_focuseID).style.border="1px solid black";
	}else{
		document.getElementById("editor").innerHTML = "";
		document.getElementById("editor").style.display="none";
		TemplateDataManageSingle.getInstance().setBlockData_data(pageId , image_focuseID.substring(3) , 2 , "",field_name);
		document.getElementById(image_focuseID).innerHTML='<p>使用图片接口</p>';
		document.getElementById(image_focuseID).style.border="1px solid black";
	}
}

//列表控件
function tableEditor(data){
	if(allId == ""){
		alert("请先选择模块框");
		return;
	}
	var row ="",
	col ="",
	url ="",
	param = "";
	checkedStatue = "",
	checked1 = "",
	checked2="",
	checked3="";
	if(data != ""){
		if(data.data_arr && data.data_arr!=""){
			row =data.data_arr.row;
			col =data.data_arr.col;
		}
		if(data.url){
			url =data.url;
		}
		if(data.params){
			param = data.params;
		}
		checkedStatue = data.data_arr.type;
		if(1 == checkedStatue){
			checked1 = "checked";
		}
		if(2 == checkedStatue){
			checked2 = "checked";
		}
		if(3 == checkedStatue){
			checked3 = "checked";
		}
	}
	var focusId = allId;
    var tableWidth = document.getElementById(focusId).style.width,
        tableheight = document.getElementById(focusId).style.height;
    var html='<div style="margin-left:5px;"><div class="property_div" style="margin-top:5px;"><span style="margin-left:8px;">列表</span><span style="float:left;width:240px;height:1px;background-color:darkgray;margin-top:3px;"></span></div>';
    html=html+'<input type="text" id="table_focuseID" hidden="true" value="'+focusId+'"/>';
    html=html+'<input type="text" id="tableWidth" hidden="true" value="'+tableWidth+'"/>';
    html=html+'<input type="text" id="tableheight" hidden="true" value="'+tableheight+'"/>';
    html = html + '<div id="table_divStyle"><div style="margin-left:45px;margin-top:5px"><input type="radio" value="1" name="checkbox" '+checked1+'><span class="check_table">标题</span><input type="radio" name="checkbox" value="2" '+checked2+'><span class="check_table">图片</span><input type="radio" name="checkbox" value="3" '+checked3+'><span class="check_table">图文</span></div>';
    html=html+'<div class="property_div"><span class="span_style">行</span><input class="span_input" type="text" id="row" value="'+row+'"/></div>';
    html=html+'<div class="property_div"><span class="span_style">列</span><input class="span_input" type="text" id="col" value="'+col+'"/></div>';
    html=html+'<div class="property_div"><span class="span_style">接口</span><input class="span_input" type="text" id="url" value="'+url+'"/></div>';
    html=html+'<div class="property_div"><span class="span_style">参数</span><input class="span_input" type="text" id="param" value="'+param+'"/></div>';
    html=html+'<div class="property_div" style="margin-top:5px;margin-bottom:;text-align: center; "><button class="button_style" id="table_submit" onclick="setTable();">确认</button>';
    html=html+'<button class="button_style" onclick="closeTab();">取消</button></div></div></div>';
	document.getElementById("editor").style.display="";
	document.getElementById("editor").innerHTML = html;
}

function setTable(){
	var pageId = document.getElementById("hidden_pageId").value;
	var table_focuseID = document.getElementById("table_focuseID").value;
	var tableWidth = document.getElementById("tableWidth").value;
	var tableheight = document.getElementById("tableheight").value;
	var checkedStatue = $("input[name='checkbox']:checked").val();
	var row = document.getElementById("row").value;
	var col = document.getElementById("col").value;
	var url = document.getElementById("url").value;
	var param = document.getElementById("param").value;
	if(Math.floor(Number(tableWidth.split("px")[0])/50)<col || Math.floor(Number(tableheight.split("px")[0])/50)<row){
		alert("表格行列超出限制");
		return;
	}
	if(url == "" && row != ""){
		document.getElementById("editor").innerHTML = "";
		document.getElementById("editor").style.display="none";
//		var html='<table border="1" cellpadding="3" cellspacing="1" width="'+tableWidth+'" height="'+tableheight+'" align="center" ><tbody>';
//		for(var i=0;i<row;i++){
//			html=html+'<tr>';
//			for(var j=0;j<col;j++){
//				html=html+'<td>';
//				html=html+'</td>';
//			}
//			html=html+'</tr>';
//		}
//		html=html+'</tbody></table>';
		TemplateDataManageSingle.getInstance().setBlockData_array(pageId , table_focuseID.substring(3) , row , col ,checkedStatue,"","");
		TemplateRevert.prototype.updateRevertBlock(pageId,table_focuseID.substring(3));
//		document.getElementById(table_focuseID).innerHTML=html;
		document.getElementById(table_focuseID).style.border="1px solid black";
	}else{
		document.getElementById("editor").innerHTML = "";
		document.getElementById("editor").style.display="none";
		TemplateDataManageSingle.getInstance().setBlockData_array(pageId , table_focuseID.substring(3) , row , col ,checkedStatue,url,param);
		document.getElementById(table_focuseID).innerHTML='<p>使用列表接口</p>';
		document.getElementById(table_focuseID).style.border="1px solid black";
	}
}

//function changeHtml(blockData,row,col,num){
//	var html = '<table border="1" cellpadding="3" cellspacing="1" width="'+blockData.block_width+'" height="'+(blockData.block_height-25)+'" align="center" ><tbody>';
//	var arr_type = data_arr.type,
//	img_width = blockData.block_width/col,
//	img_height = (blockData.block_height-25)/row;
//	for(var m=1;m<(row+1);m++){
//		 html = html + '<tr>';
//		 for(var j=1;j<(col+1);j++){
//			  html = html +'<td>';
//			  if(1 == arr_type){
//				  if(titleJson[m*j-1+row*col*(num-1)]){
//					  html = html +'<div style="width:100%;text-align:center;"><span style="font-size:12px;">'+titleJson[m*j-1+row*col*(num-1)]+'</span></div>';
//				  }
//			  }
//			  if(2 == arr_type){
//				  if(imgJson[m*j-1+row*col*(num-1)]){
//					  html = html + '<img src=\''+imgJson[m*j-1+row*col*(num-1)]+'\' width=\''+(img_width-20)+'px\' height=\''+(img_height-20)+'px\'/>';
//				  }
//			  }
//			  if(3 == arr_type){
//				  if(imgJson[m*j-1+row*col*(num-1)]){
//					  html = html + '<img src=\''+imgJson[m*j-1+row*col*(num-1)]+'\' width=\''+(img_width-20)+'px\' height=\''+(img_height-50)+'px\'/>';
//					  html = html +'<div style="width:100%;text-align:center;"><span style="text-align:center;font-size:12px;">'+titleJson[m*j-1+row*col*(num-1)]+'</span></div>';
//				  }
//			  }
//			  html = html +'</td>';
//		 }
//		 html =html + '</tr>';
//	 }
//	html = html+'</tbody></table>';
//     var num = Math.ceil(imgJson.length/(row*col));
//     html = html + '<div class="digg"  style="text-align:center;"><span class="current">1</span>';
//     for(var n=2;n<(num+1);n++){
//	  html = html+'<a href="#" onclick="changeHtml(\''+blockData+'\',\''+row+'\',\''+col+'\',\''+n+'\')">'+n+'</a>';
//     }
//    html = html + '</div> ';
//    document.getElementById("are"+blockData.block_id).innerHTML = html;
//	
//}

//清空内容控件
function clearBlockContent(){
	var pageId = document.getElementById("hidden_pageId").value;
	document.getElementById(allId).innerHTML="";
	TemplateDataManageSingle.getInstance().deleteBlockData(pageId , allId.substring(3));
	closeTab();
}
	
function closeTab(){
	document.getElementById("editor").innerHTML = "";
	document.getElementById("editor").style.display="none";
}