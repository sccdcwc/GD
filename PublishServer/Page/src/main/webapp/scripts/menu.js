var menuJosn = [{
	"templateName": "武侯区模板",
	"menuNumber": "2",
	"menuName": "页面1,页面2"
}];

var jsonData;
var temporaraydatainstan = [{
	"page_id": 0,
	"page_name": "page1",
	"blockData": [{
		"block_id": 0,
		"block_x": "241",
		"block_y": "225",
		"block_width": 120,
		"block_height": 90
	}, {
		"block_id": 1,
		"block_x": "391",
		"block_y": "225",
		"block_width": 120,
		"block_height": 60
	}],
	"blockProperty": [{
		"pro_name": "block1",
		"pro_edge": "8px",
		"block_id": 0
	}, {
		"pro_name": "block2",
		"pro_edge": "5px",
		"block_id": 1
	}]
}, {
	"page_id": 1,
	"page_name": "page1",
	"blockData": [{
		"block_id": 0,
		"block_x": "241",
		"block_y": "225",
		"block_width": 120,
		"block_height": 90
	}, {
		"block_id": 1,
		"block_x": "391",
		"block_y": "225",
		"block_width": 120,
		"block_height": 60
	}],
	"blockProperty": [{
		"pro_name": "block1",
		"pro_edge": "8px",
		"block_id": 0
	}, {
		"pro_name": "block2",
		"pro_edge": "5px",
		"block_id": 1
	}]
}, {
	"page_id": 2,
	"page_name": "page1",
	"blockData": [{
		"block_id": 0,
		"block_x": "241",
		"block_y": "225",
		"block_width": 120,
		"block_height": 90
	}, {
		"block_id": 1,
		"block_x": "391",
		"block_y": "225",
		"block_width": 120,
		"block_height": 60
	}],
	"blockProperty": [{
		"pro_name": "block1",
		"pro_edge": "8px",
		"block_id": 0
	}, {
		"pro_name": "block2",
		"pro_edge": "5px",
		"block_id": 1
	}]
}]

$(function(){
	$("#model-menu-ul2").on("click",".fa-edit",function(){
		var pageId = $(this).attr("id");
		var pageName = JSON.parse(localStorage.getItem(pageId)).page_name;
		var inputPageName = prompt("请输入页面新名称：",pageName);
		$(this).siblings("li").text(inputPageName);
		var pagesInfo = JSON.parse(localStorage.getItem("pages"))
		for(var i = 0; i < pagesInfo.length;i++){
			if(pagesInfo[i].page_id == pageId){
				pagesInfo[i].page_name = inputPageName;
			}
		}
		localStorage.setItem("pages",JSON.stringify(pagesInfo));
		var curPageInfo = JSON.parse(localStorage.getItem(pageId))
		curPageInfo.page_name = inputPageName;
		localStorage.setItem(pageId,JSON.stringify(curPageInfo));
		if(localStorage.getItem("page_id") == pageId){
			localStorage.setItem("page_name",inputPageName);
		}
	})
	$("#instance-ul2").on("click",".fa-edit",function(){
		var pageId = $(this).attr("id");
		var pageName = $(this).siblings("li").text();
		var inputPageName = prompt("请输入页面新名称：",pageName);
		$(this).siblings("li").text(inputPageName);
		var temporaryData = JSON.parse(localStorage.getItem("temporaryData"));
		var pages = temporaryData.pages;
		for(var i = 0; i< pages.length;i++){
			if(pages[i].page_id == pageId){
				pages[i].page_name = inputPageName;
			}
		}
		temporaryData.pages = pages;
		localStorage.setItem("temporaryData",JSON.stringify(temporaryData));
	})
})



/*
 *获取url上的参数，先把url解码
 */
function getparameter(name) {
	var url = location.search;
	url = decodeURI(url); //解码url，避免中文乱码
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = url.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}


//添加页面
function addPage() {
	console.log("addPage"); 
	var pageName = prompt("请输入页面名称：","新页面");
	// var t = prompt("请输入页面名称", "新页面");
	if (pageName != null && pageName != "") {
		addli(pageName);
	}
}

function addli(pageName) {
	var ul1 = document.getElementById("model-menu-ul2");
	var a = document.createElement("a");
	//计算新页面的id
	if (ul1.lastChild.firstChild != null)
		var id = parseInt(ul1.lastChild.firstChild.id) + 1;
	else
		var id = 0;
	a.innerHTML = "<li onclick='active1(this)'  id=\"" + id + "\">" + pageName + "</li><div class='fa fa-edit fa-lg' id='"+id+"'></div>";
	ul1.appendChild(a);
	//将新生成的页面id和名称作为页面元数据新生成页面，并存储在pages中
	var page = new Object();
	page.page_id = id;
	page.page_name = pageName;
	page.blockData = [];

	var strpagejson = JSON.stringify(page); //json字符串
	//将新页面数据加到模板上
	var strpages = localStorage.getItem("pages"); //String 
	if (strpages == null)
		strpages = "[" + strpagejson + "]";
	else {
		strpages = strpages.substring(0, strpages.length - 1);
		strpages = strpages.concat("," + strpagejson) + "]";
	}
	//将新页面的信息存储到以页面id为key的缓存中
	localStorage.setItem(id, strpagejson);//新页面信息
	localStorage.setItem("page_id",id);
	localStorage.setItem("page_name",pageName);
	localStorage.setItem("pages", strpages);//添加后的pages
	active1(ul1.lastChild.firstChild)//新添加的li
}

function deletePage() {
	var ul1 = document.getElementById("model-menu-ul2");
	var ac = document.getElementsByClassName("active");
	if (ul1.getElementsByTagName("li").length == 0) {
		window.confirm('没有页面可以删除');
		return;
	}
	if (window.confirm('确定删除吗？')) {
		//从localStorage的pages变量中删除页面数据
		// alert("页面id=" + ac[0].id);
		//var jsonpages = JSON.parse(localStorage.getItem("pages"));     
		var jsonpages = eval("(" + localStorage.getItem("pages") + ")");

		for (var i = 0; i < jsonpages.length; i++) {
			if (jsonpages[i]["page_id"] == ac[0].id) {
				jsonpages.splice(i, 1);
				localStorage.setItem("pages", JSON.stringify(jsonpages));
				//将缓存中以页面id为key的数据删除
				localStorage.removeItem(ac[0].id);
				var dataimg = "data_img"+ac[0].id;
				localStorage.removeItem(dataimg);
				break;
			}
		}
		//删除ul中的选定节点
		ul1.removeChild(ac[0].parentNode);
		//删除后清空右侧区域
		var content = parent.window.document.getElementById("iframe-content");
		content.src = "template/blankpage.html";
		saveTemplate();
	}
}
//删除后执行一次保存
function saveTemplate(){
	//pages里面存储了页面数量
	var pages = JSON.parse(localStorage.getItem("pages"));
	var templatepages = localStorage.getItem("templatepages");
	var jsontemplatepages = JSON.parse(templatepages);
	jsontemplatepages.temporaryData = [];
	var dataCanvas =  document.createElement("canvas");
	dataCanvas.width = width;
	dataCanvas.height = height;
	var dataCtx = dataCanvas.getContext("2d");
	//把页面数据加入到jsontemplatepages  并生成页面的img
	for (var i = 0; i < pages.length; i++) {
		var pageid = pages[i].page_id;
		var pagejson = JSON.parse(localStorage.getItem(pageid));
		jsontemplatepages.temporaryData.push(pagejson);
		dataCtx.clearRect(0,0,width,height);
		for (var j = 0; j * gridSize <= height; j++) {
			dataCtx.strokeStyle = '#C7CAEB';
			dataCtx.beginPath();
			dataCtx.moveTo(0, j * gridSize);
			dataCtx.lineTo(width, j * gridSize);
			dataCtx.closePath();
			dataCtx.stroke();
		}
		for (var j = 0; j * gridSize <= width; j++) {
			dataCtx.strokeStyle = '#C7CAEB';
			dataCtx.beginPath();
			dataCtx.moveTo(j * gridSize, 0);
			dataCtx.lineTo(j * gridSize, height);
			dataCtx.closePath();
			dataCtx.stroke();
		}
		dataCtx.strokeStyle = "#D823D8";
		for(var j = 0;j < pagejson.blockData.length;j++){
			dataCtx.strokeRect(pagejson.blockData[j].block_x,pagejson.blockData[j].block_y,pagejson.blockData[j].block_width,pagejson.blockData[j].block_height);
		}
		var img = new Image();
		img.src = dataCanvas.toDataURL("image/png");
		var previewData = img.src;
		var each_data_img = pagejson.page_id +","+pagejson.page_name+","+ previewData;
		var data_img =  JSON.stringify(each_data_img);
		data_img = data_img.substring(1,data_img.length-1);
		data_img = encodeURIComponent(data_img);
		var dataimgid = "data_img"+pagejson.page_id;
		localStorage.setItem(dataimgid,data_img);
	}
	localStorage.setItem("templatepages", JSON.stringify(jsontemplatepages));
	//把jsontemplatepages转换为文本类型数据(接口要求)
	var tps = JSON.stringify(jsontemplatepages["temporaryData"]);
	var data = "templateName=" + jsontemplatepages["templateName"] + "&" +
		"status=" + jsontemplatepages["status"] + "&" +
		"temporaryData=" + tps + "&" +
		"createrName=" + jsontemplatepages["createrName"] + "&" +
		"createrId=" + jsontemplatepages["createrId"];
	for (var i = 0; i < jsontemplatepages.temporaryData.length; i++) {
		var kk = jsontemplatepages.temporaryData[i];
		var dataimgid = "data_img" + kk.page_id;
		var data_img = localStorage.getItem(dataimgid);
		data = data + "&previewData=" + data_img;
	}
	var tempid = localStorage.getItem("template_id");
	//如果template_id为空，则表示是新增模板，否则是更新模板
	if (tempid == null) {
		var aurl = "http://211.83.111.206:7070/publish/station/rest/template/original";
		$.ajax({
			type: "post",
			url: aurl,
			data: data,
			contentType: "application/x-www-form-urlencoded",
			crossDomain: true,
			charset: "utf-8",
			dataType: "json",
			success: function(data) {
				// alert(data.meta.content);
				// console.log("新生成的模板id=" + data.data.templateId);
				//将新生成的模板id存储在缓存中，后续保存需要检测是否缓存中存在template_id数据，如果存在，则调用更新程序
				localStorage.setItem("template_id", data.data.templateId);

			}, //success over

			error: function(jqXHR) {
				alert("jqXHR.status---------" + jqXHR.status);

			}
		});
	}else{
		var aurl = "http://211.83.111.206:7070/publish/station/rest/template/" + tempid;
		$.ajax({
			type: "put",
			url: aurl,
			data: data,
			contentType: "application/x-www-form-urlencoded",
			crossDomain: true,
			charset: "utf-8",
			dataType: "json",
			success: function(data) {
				// alert(data.content);
			}, 
			error: function(jqXHR) {
				alert("jqXHR.status---------" + jqXHR.status);
			}
		});
	}
}



/**
 * from=1表示预览模板，from=2表示编辑模板
 */
function loadmenu() {
	//      var modelmenuName = document.getElementById("model-menuName");
	//      modelmenuName.textContent = sessionStorage.templateName;  
	//设置模板的名称为url传过来的名称
	var from = getparameter("from");
	var pname = getparameter("pname");
	var modelname = document.getElementById("model-menuName");
	modelname.innerHTML = pname;

	var modelul = document.getElementById("model-menu-ul2");
	//模板查询页面中所选择具体模板中包含的页面数据，前面已放在sessionStorage中,新创建模板数据为空
	var preview = sessionStorage.previewData;
	var previewData;
	if (preview != null)
		previewData = preview.split(",");
	//alert("from=" + from + ",loadmenu previewData=" + preview);
	if (from == "1") {
		for (var i = 0; i < previewData.length; i++) {
			var menuName = splitepreviewdata(previewData[i]);
			var a = document.createElement("a");
			a.innerHTML = "<li onclick='active(this)'>" + menuName + "</li>";
			modelul.appendChild(a);
		}
		var add = document.getElementById("add");
		var delet = document.getElementById("delete");
		var returnpage = document.getElementById("returnpage");
		add.style.visibility = "hidden";
		delet.style.visibility = "hidden";
		returnpage.style.visibility = "hidden";
	} else if (from == "2") {
		if (previewData != null) {
			var JsonTemplate = JSON.parse(localStorage.getItem("templatepages"));
			for (var i = 0; i < previewData.length; i++) {
				var menuName = splitepreviewdata(previewData[i]);
				var a = document.createElement("a");
				a.innerHTML = "<li onclick='active1(this)' id=\"" + JsonTemplate.temporaryData[i].page_id + "\">" + menuName + "</li><div class='fa fa-edit fa-lg' id='"+JsonTemplate.temporaryData[i].page_id+"'></div>";
				modelul.appendChild(a);
				var activeLi = modelul.getElementsByTagName("a")[0].getElementsByTagName("li")[0];
				activeLi.setAttribute("class","active");
				localStorage.setItem("page_id",activeLi.id);
			}
		}
	}

}
function splitepreviewdata(preview) {

	var pre = preview.split("/");
	var p = pre[pre.length - 1].split(".")[0].split("_")[1];
	return p;
}
/*
 * 模板预览点击事件
 */
function active(s) {
	var ac = document.getElementsByClassName("active");
	if (ac.length > 0)
		ac[0].setAttribute("class", "noactive");
	s.setAttribute("class", "active");
	var content = parent.window.document.getElementById("iframe-content");
	content.src = "template/templateview.html?pagename=" + s.textContent;
}
/*
 * 模板编辑点击事件
 */
function active1(s) {
	var ac = document.getElementsByClassName("active");
	if (ac.length > 0)
		ac[0].setAttribute("class", "noactive");
	s.setAttribute("class", "active");
	localStorage.setItem("page_id",s.id);
	var pagedata = localStorage.getItem(s.id);
	console.log(JSON.parse(localStorage.getItem(s.id)));
	var pagename = JSON.parse(pagedata).page_name;
	localStorage.setItem("page_name",pagename);
	var content = parent.window.document.getElementById("iframe-content");
	content.src = "template/newTemplate.html?page_id=" + s.id;
}




/**
 * from=1表示浏览模板，from=2表示编辑实例，from=3表示浏览实例
 */
function instance_loadmenu() {
	var instancemenuName = document.getElementById("instance-menuName");
	var instanceul = document.getElementById("instance-ul2");
	instancemenuName.textContent = sessionStorage.templateName;
	var preview = sessionStorage.templatePreview;
	var previewData;
	if (preview != null)
		previewData = preview.split(",");
	var from = getparameter("from");
	if(from == "1"){
		var ul1=document.getElementById("instance-ul2");
		var num=previewData.length;
		//		var num=jsonData.pages.length;
		for(var i=0;i<num;i++){
			var menuName = splitepreviewdata(previewData[i]);
			var a=document.createElement("a");
			if(i == 0){
				a.innerHTML='<li class="noactive" onclick="instance_active(this)">'+menuName+'</li>';
			}else{
				a.innerHTML='<li class="noactive" onclick="instance_active(this)">'+menuName+'</li>';
			}
			ul1.appendChild(a);
		}
	}else if (from == "2") {
		var instancemenuName = document.getElementById("instance-menuName");
		instancemenuName.textContent=localStorage.getItem("instanceName");
		jsonData=JSON.parse(localStorage.getItem("temporaryData"));
		var ul1=document.getElementById("instance-ul2");
		var num=previewData.length;
		for(var i=0;i<num;i++)
		{
			var a=document.createElement("a");
				var menuName = splitepreviewdata(previewData[i]);
			if(i == 0){
				a.innerHTML='<li class="active" onclick="loadT(this,\''+jsonData.pages[i].page_id+'\');">'+menuName+'</li><div class="fa fa-edit fa-lg" id="'+jsonData.pages[i].page_id+'"></div>';
			}else{
				a.innerHTML='<li class="noactive" onclick="loadT(this,\''+jsonData.pages[i].page_id+'\');">'+menuName+'</li><div class="fa fa-edit fa-lg" id="'+jsonData.pages[i].page_id+'"></div>';
			}
		ul1.appendChild(a);
		}
		var returnbutton=document.getElementById("returnpage");
		returnbutton.style.visibility = "visible";
	}else if(from =="3")
	{
		var instanceul = document.getElementById("instance-ul2");
		instancemenuName.textContent = localStorage.getItem("instanceName");
		var preview = sessionStorage.instancePreview;
		var previewData;
		if (preview != null)
			previewData = preview.split(",");
		var from = getparameter("from");
		var ul1=document.getElementById("instance-ul2");
		var num=previewData.length;
	//		var num=jsonData.pages.length;
	  	for(var i=0;i<num;i++)
	  	{
	  		var menuName = splitepreviewdata(previewData[i]);
	 		var a=document.createElement("a");
	 		if(i == 0){
	 			a.innerHTML='<li class="noactive" onclick="instance_active(this)">'+menuName+'</li>';
	 		}else{
	 			a.innerHTML='<li class="noactive" onclick="instance_active(this)">'+menuName+'</li>';
	 		}
			ul1.appendChild(a);
	  	}
	}
}
/*
 * 模板实例预览点击事件
 */
function instance_active(s) {
	var ac = document.getElementsByClassName("active");
	if (ac.length > 0)
		ac[0].setAttribute("class", "noactive");
	s.setAttribute("class", "active");
	var content = parent.window.document.getElementById("iframe-content");
	var searchtype = localStorage.getItem("searchtype");
	if(searchtype=="searchtemplate")
		content.src = encodeURI("instance/templateview.html?pagename=" + s.textContent);
	else
		content.src = encodeURI("instance/instanceview.html?pagename=" + s.textContent);
}
