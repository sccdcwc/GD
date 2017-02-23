/*
 * 从零创建模板的返回页面，返回到设置新模板参数的页面
 */
function returnPage() {
	if (window.confirm('返回前请保存所编辑模板内容，否则将丢失数据！')) {
		//清除缓存中template_id变量，以保证在再次创建新模板的时候点击模板编辑页面的保存调用新建，而不是更新功能
		var menuopera = localStorage.getItem("menuopera");
		if (menuopera == "createfromscratch") {
			localStorage.removeItem("template_id");
			var menu = parent.window.document.getElementById("iframe-content");
			menu.src = "template/settemplate.html";
			window.open("menu.html", "_self");
		}
		if (menuopera == "existtemplate") {
			var tempid = localStorage.getItem("template_id");
			var orignaltemplateid = localStorage.getItem("originaltemplate_id");
			if (orignaltemplateid != "")
				tempid = orignaltemplateid;
			var content = parent.window.document.getElementById("iframe-content");
			content.src = encodeURI("template/templatedetail.html?id=" + tempid);
		}
	}
}

/*
 * 模板详情页面的返回事件
 */
function returnPageExist() {
	//history.go(-1);
	var menu = parent.window.document.getElementById("iframe-menu");
	menu.src = "include/menu.html";
	var deleteopera = localStorage.getItem("deleteopera");
	if (deleteopera == "")
		window.open("choosetemplate-create.html", "_self");
	else
		window.open("searchtemplate.html", "_self");
}

/*
 * 全选操作
 */
function selectall() {
	var checkall = document.getElementById("checkbox");
	var checkone = document.getElementsByName("checkbox-one");
	if (checkall.checked == true) {
		for (var i = 0; i < checkone.length; i++) {
			checkone[i].checked = true;
		}
	} else {
		for (var i = 0; i < checkone.length; i++) {
			checkone[i].checked = false;
		}
	}
}

/**
 * 从零创建模板链接到模板编辑页面事件
 */
function createnewtemplate() {
	localStorage.clear();
	//标志从零创建模板操作，便于设置从模板菜单返回的界面
	localStorage.setItem("menuopera", "createfromscratch");
	//创建一个模板json数据，并存储在templatepages
	var pname = document.getElementById("tName").value;
	var tWh = document.getElementById("tWh").value;
	var createrName = getparameter("name");
	var createrId = getparameter("id");
	var area = getparameter("area");
	var templ = new Object();
	templ.templateName = pname;
	templ.scale = tWh;
	templ.temporaryData = [];
	if (createrName == null)
		templ.createrName = "张三";
	else
		templ.createrName = createrName;
	if (createrId == null)
		templ.createrId = 22;
	else
		templ.createrId = createrId;
	if (area == null)
		templ.region = "成都";
	else
		templ.region = area;
	var templjson = JSON.stringify(templ);
	localStorage.setItem("templatepages", templjson);
	localStorage.setItem("templateName", pname);

	var data = "createrName=" + templ.createrName +
		"&createrId=" + templ.createrId +
		"&region=" + templ.region +
		"&scale=" + templ.scale +
		"&templateName=" + templ.templateName;
	var url = "http://211.83.111.206:7070/publish/station/rest/template/original";

	rest(url, POST_METHOD, data, "application/x-www-form-urlencoded",
		createnewtemplateCallback, null, templ.region, false);
}

function createnewtemplateCallback(data) {
	//成功才会执行回调，到这里已经成功建新模板
	// if (data.code == 205) {
	// 	alert("模板名称已经存在，请更换模板名称！")
	// }
	if (data.meta.code == 200) {
		// alert(data.meta.content);
		localStorage.setItem("template_id", data.data.templateId);
		var srcstr = encodeURI("include/model-menu.html?from=2&" + "pname=" + localStorage.getItem("templateName"));
		var menu = parent.window.document.getElementById("iframe-menu");
		menu.src = srcstr;
		window.open("blankpage.html", "_self");
	}
}

/*
 * 获取查询条件，暂时没有用到
 */
function getcondition() {
	var condition = "";
	var con = new Array();
	var id = new Array("createrName", "instanceName", "templateName", "status", "scale", "createTime", "updateTime", "publishTime");
	con[0] = document.getElementById("createrName").value;
	con[1] = document.getElementById("instanceName").value;
	con[2] = document.getElementById("templateName").value;
	con[3] = document.getElementById("status").value;
	con[4] = document.getElementById("scale").value;
	con[5] = document.getElementById("createTime").value;
	con[6] = document.getElementById("updateTime").value;
	con[7] = document.getElementById("publishTime").value;
	for (var i = 0; i < 8; i++) {
		if (con[i] != "") {
			condition += id[i] + "=" + con[i] + ";";
		}
	}
	return condition;
}
/**
 * 查询操作获取模板列表
 */
function searchtemplate() {
	//用于判断从模板详情页面返回到searchtemplanter.html还是choosestyle-create.html
	var deleteopera = document.getElementById("delete").value;
	localStorage.setItem("deleteopera", deleteopera);

	var templateName = document.getElementById("templateName").value;
	var condiurl = "http://211.83.111.206:7070/publish/station/rest/template/criteria/condition;templateName=" + templateName;
	var region = localStorage.getItem("region");
	if (region == null)
		region = "成都";
	rest(
		condiurl,
		GET_METHOD,
		null,
		null,
		searchtemplateCallback,
		null,
		region,
		false);
}
/*
 * 获取列表回调函数
 */
function searchtemplateCallback(data) {
	if (data.data !== undefined) {
		//		var Json1=JSON.stringify(data.data.templateMatchList);
		//		alert(data.meta.code+" : "+data.meta.content);
	} else {
		alert(data.code + " : " + data.content);
	}
	addtemplate(data.data.templateMatchList);
}
/**
 * 段颖 2016.6.22 分页显示功能  注释部分代码为原代码
 *
 * 添加模板列表元素至模板
 */
function addtemplate(templateJson) {
	DeleteAll();
	$('.PageNumBox').html("");
	// console.log(templateJson);
	var DataLength = templateJson.length;
	// 每页显示个数
	var PageLength = 5;
	//每组页数
	var PageGroupNum = 8;
	//总页数
	var PageCount = Math.ceil(DataLength / PageLength);
	//总组数
	var GroupCount = Math.ceil(PageCount / PageGroupNum);
	//当前页码：初始为1
	var curPageNum = 1;
	//当前页组
	var curGroupNum = 1;
	//页码按钮Id
	var PageBtnId;
	//生成页码按钮：最多8个页码按钮
	if (PageCount <= PageGroupNum) {
		for (var i = 0; i < PageCount; i++) {
			var PageNum = i + 1;
			var PageBtnHtml = "<div class='Btn pageNumBtn' data-id=" + PageNum + ">" + PageNum + "</div>";
			$('.PageNumBox').append(PageBtnHtml);
		}
	} else {
		for (var i = 0; i < PageGroupNum; i++) {
			var PageNum = i + 1;
			var PageBtnHtml = "<div class='Btn pageNumBtn' data-id=" + PageNum + ">" + PageNum + "</div>";
			$('.PageNumBox').append(PageBtnHtml);
		}
	}
	$('.preBtn').addClass('noActive');
	if(GroupCount == 1){
		$('.nextBtn').addClass('noActive');
	}
	$('.pageNumBtn').eq(0).addClass('active');
	showCurPage(curPageNum, PageLength, templateJson, PageCount);
	//分页按钮的点击事件
	$('.firstBtn').click(function() {
		$('.preBtn').addClass('noActive');
		if(GroupCount == 1){
			$('.nextBtn').addClass("noActive");
		}else{
			$('.nextBtn').removeClass("noActive");
		}
		// $('.pageNumBtn').each(function() {
		// 	$(this).css("display", "inline-block");
		// });
		$('.PageNumBox').children().removeClass('active');
		$('.pageNumBtn').eq(0).addClass('active');
		for (var i = 0; i < PageGroupNum; i++) {
			PageBtnId = i + 1;
			$('.pageNumBtn').eq(i).attr("data-id", PageBtnId);
			$('.pageNumBtn').eq(i).text(PageBtnId);
		}
		curPageNum = 1;
		$('#templatelist').html("<thead><tr><th></th><th>序号</th><th>模板名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");
		showCurPage(curPageNum, PageLength, templateJson, PageCount);
	});
	$('.lastBtn').click(function() {
		$('.nextBtn').addClass('noActive');
		if(GroupCount == 1){
			$('.preBtn').addClass("noActive");
		}else{
			$('.preBtn').removeClass('noActive');
		}
		$('.PageNumBox').children().removeClass('active');
		curPageNum = PageCount;//总页数
		for (var i = 0; i < PageGroupNum; i++) {//每组页数
			PageBtnId = (GroupCount - 1) * PageGroupNum + i + 1;
			console.log(PageBtnId)
			if (PageBtnId < PageCount + 1) {
				$('.pageNumBtn').eq(i).attr("data-id", PageBtnId);
				$('.pageNumBtn').eq(i).text(PageBtnId);
				if(PageBtnId == PageCount){
					$('.pageNumBtn').eq(i).addClass('active');
				}
			} else {
				$('.pageNumBtn').eq(i).css("display", "none");
			}
		}
		// $('.pageNumBtn :last-child').addClass('active');
		$('#templatelist').html("<thead><tr><th></th><th>序号</th><th>模板名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");
		showCurPage(curPageNum, PageLength, templateJson, PageCount);
	});
	$('.preBtn').click(function() {
		if($('.preBtn').hasClass("noActive")){
		}else{
			$('.nextBtn').removeClass('noActive');
			$('.pageNumBtn').each(function() {
				$(this).css("display", "inline-block");
			});
			//点击前页码
			curPageNum = $('.pageNumBtn.active').attr("data-id");
			//点击前页码组取整
			if (curPageNum % PageGroupNum == 0) {
				curGroupNum = parseInt(curPageNum / PageGroupNum);
			} else {
				curGroupNum = parseInt((curPageNum / PageGroupNum) + 1);
			}
			if (curGroupNum == 1) {
				alert("已经在最前了！")
			} else {
				curGroupNum--;
				console.log(curGroupNum);
				if (curGroupNum == 1) {
					$('.preBtn').addClass('noActive');
				}
				for (var i = 0; i < PageGroupNum; i++) {
					PageBtnId = (curGroupNum - 1) * PageGroupNum + i + 1;
					$('.pageNumBtn').eq(i).attr("data-id", PageBtnId);
					$('.pageNumBtn').eq(i).text(PageBtnId);
				}
				curPageNum = $('.pageNumBtn.active').attr("data-id");
				$('#templatelist').html("<thead><tr><th></th><th>序号</th><th>模板名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");
				showCurPage(curPageNum, PageLength, templateJson, PageCount);
			}			
		}
	})
	$('.nextBtn').click(function() {
		if($(".nextBtn").hasClass("noActive")){
		}else{
			$('.preBtn').removeClass('noActive');
			//点击前页码
			curPageNum = $('.pageNumBtn.active').attr("data-id");
			//点击前页码组取整
			if (curPageNum % PageGroupNum == 0) {
				curGroupNum = parseInt(curPageNum / PageGroupNum);
			} else {
				curGroupNum = parseInt((curPageNum / PageGroupNum) + 1);
			}
			if (curGroupNum >= GroupCount) {
				alert("已经到最后了！")
			} else {
				curGroupNum++;
				if (curGroupNum == GroupCount) {
					for (var i = 0; i < PageGroupNum; i++) {
						PageBtnId = (curGroupNum - 1) * PageGroupNum + i + 1;
						if (PageBtnId < PageCount + 1) {
							$('.pageNumBtn').eq(i).attr("data-id", PageBtnId);
							$('.pageNumBtn').eq(i).text(PageBtnId);
						} else {
							$('.pageNumBtn').eq(i).css("display", "none");
						}
					}
					$('.pageNumBtn').each(function() {
						if ($(this).attr("data-id") == PageCount) {
							$('this').addClass('active');
						}
					});
					$('.nextBtn').addClass('noActive');
					$('.nextBtn').css("disabled", false);
				} else {
					for (var i = 0; i < PageGroupNum; i++) {
						PageBtnId = (curGroupNum - 1) * PageGroupNum + i + 1;
						$('.pageNumBtn').eq(i).attr("data-id", PageBtnId);
						$('.pageNumBtn').eq(i).text(PageBtnId);
					}
				}
				curPageNum = $('.pageNumBtn.active').attr("data-id");
				$('#templatelist').html("<thead><tr><th></th><th>序号</th><th>模板名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");
				showCurPage(curPageNum, PageLength, templateJson, PageCount);
			}			
		}
	});
	$('.pageNumBtn').click(function() {
		curPageNum = $(this).attr('data-id');
		if (curPageNum == 1) {
			$('.preBtn').addClass('noActive');
			$('.nextBtn').removeClass('noActive');
		} else {
			if (curPageNum == PageCount) {
				$('.nextBtn').addClass('noActive');
				$('.preBtn').removeClass('noActive');
			} else {
				$('.nextBtn').removeClass('noActive');
				$('.preBtn').removeClass('noActive');
			}
		}
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('#templatelist').html("<thead><tr><th></th><th>序号</th><th>模板名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");
		showCurPage(curPageNum, PageLength, templateJson, PageCount);
	});
	$("#templatelist").on("click","tr td:not(:first-child)",function(){
		window.open("templatedetail.html?id=" + $(this).attr("class"),"_self");
	})	
}
/**
 * 段颖 2016.6.22 显示当前页内容
 * @param  {[type]} curPageNum [当前页]
 * @param  {[type]} PageLength [每页内容条数]
 * @param  {[type]} jsonData   [json数据]
 * @param  {[type]} PageCount  [总页数]
 */
function showCurPage(curPageNum, PageLength, jsonData, PageCount) {
	var startContentNum = (curPageNum - 1) * PageLength;
	if (PageCount == curPageNum) {
		var DataLength = jsonData.length;
		for (var i = startContentNum; i < DataLength; i++) {
			var curContentNum = i;
			var ContentRowHtml = "<tr><td><input name='checkbox-one' class='checkbox-one' type='checkbox'/></td><td class='" + jsonData[curContentNum].templateId + "' id='template-tr" + curContentNum + "'>" + jsonData[curContentNum].templateId + "</td><td class='" + jsonData[curContentNum].templateId + "' id='template-tr" + curContentNum + "'>" + jsonData[curContentNum].templateName + "</td><td class='" + jsonData[curContentNum].templateId + "' id='template-tr" + curContentNum + "'>" + jsonData[curContentNum].scale + "</td><td>" + jsonData[curContentNum].createrName + "</td></tr>";
			$('#templatelist').append(ContentRowHtml);
		}
	} else {
		for (var i = 0; i < PageLength; i++) {
			var curContentNum = startContentNum + i;
			var ContentRowHtml = "<tr><td><input name='checkbox-one' class='checkbox-one' type='checkbox'/></td><td class='" + jsonData[curContentNum].templateId + "' id='template-tr" + curContentNum + "'>" + jsonData[curContentNum].templateId + "</td><td class='" + jsonData[curContentNum].templateId + "' id='template-tr" + curContentNum + "'>" + jsonData[curContentNum].templateName + "</td><td class='" + jsonData[curContentNum].templateId + "' id='template-tr" + curContentNum + "'>" + jsonData[curContentNum].scale + "</td><td>" + jsonData[curContentNum].createrName + "</td></tr>";
			$('#templatelist').append(ContentRowHtml)
		};
	}
}
/*
 * 在加载模板列表之前，先删除模板列表的内容
 */
function DeleteAll() {
	var table = document.getElementById("templatelist");
	for (var i = table.rows.length - 1; i > 0; i--) {
		table.deleteRow(i);
	}
}

/**
 * 获取模板详情服务
 */
function getTemplateDetail() {
	var url = "http://211.83.111.206:7070/publish/station/rest/template/info/" + getparameter("id");
	$.ajax({
		type: "GET",
		url: url,
		data: '',
		success: function(json) {
			getdetail(json.data);
		},
		error: function(data) {
			alert('fail');
		}
	});
}
/*
 * 获取模板详情页信息
 */
function getdetail(templateDetailJson) {
	//标志已有建模板操作，便于设置从模板菜单返回的界面
	localStorage.setItem("menuopera", "existtemplate");
	//设置originaltemplateid为空，用于区分从复制返回还是编辑模板返回，两个页面所存储的template_id不一样
	localStorage.setItem("originaltemplate_id", "");
	//根据返回的模板数据给模板详情页面的元数据赋值
	var templateName = document.getElementById("templateName");
	var scale = document.getElementById("scale");
	var createtime = document.getElementById("createtime");
	var creater = document.getElementById("creater");
	var updatetime = document.getElementById("updatetime");
	var statu = document.getElementById("statu");

	templateName.textContent = templateDetailJson.templateName;
	scale.textContent = templateDetailJson.scale;
	createtime.textContent = templateDetailJson.creatTime.split(".")[0];
	creater.textContent = templateDetailJson.createrName;
	updatetime.textContent = templateDetailJson.updateTime.split(".")[0];
	statu.textContent = templateDetailJson.status;

	localStorage.setItem("template_id", getparameter("id"));
	localStorage.setItem("templateName", templateName.textContent);
	localStorage.setItem("createrName", creater.textContent);
	localStorage.setItem("createtime", createtime.textContent);
	localStorage.setItem("updatetime", updatetime.textContent);
	localStorage.setItem("statu", statu.textContent); //存储创建者Id，复制模板需要
	if (templateDetailJson.createrId == null)
		localStorage.setItem("createrId", "33");
	else
		localStorage.setItem("createrId", templateDetailJson.createrId);
	var tps = new Object();
	tps.templateId = getparameter("id");
	tps.templateName = templateName.textContent;
	tps.createrName = creater.textContent;
	tps.scale = scale.textContent;
	tps.status = status.textContent;
	tps.temporaryData = [];
	localStorage.setItem("templatepages", JSON.stringify(tps));
	sessionStorage.previewData = templateDetailJson.previewData;

	var menu = parent.window.document.getElementById("iframe-menu");
	menu.src = encodeURI("include/model-menu.html?from=1&pname=" + templateName.textContent);
}

/*
 * 特定模板的预览载入，model-menu.html中loadmenu函数调用的templateview.html调用
 */
function templateviewload() {
	var pagename = getparameter("pagename");
	var preview = sessionStorage.previewData;
	var previewData = preview.split(",");
	var pageview = document.getElementById("pageview");
	for (var i = 0; i < previewData.length; i++) {
		var menuName = splitepreviewdata(previewData[i]);
		if (menuName == pagename) {
			pageview.src = previewData[i];
			break;
		}
	}
	//alert("----"+pageview.src);
}

/*
 * 更新模板操作，获得被选中的模板id，发更新请求到后台并获得模板的编辑数据
 */
var gridSize = 5;
var width = 960;
var height = 540;
function Update() {
	var templateid = localStorage.getItem("template_id");
	$.ajax({
		type: "GET",
		url: "http://211.83.111.206:7070/publish/station/rest/template/data/" + templateid,
		async: false,
		success: function(data) {
			//利用返回的模板地址信息再次请求获得模板的具体编辑数据
			$.ajax({
				type: "GET",
				url: data.data.temporaryData,
				async: false,
				data: '',
				dataType: 'jsonp',
				jsonpCallback: 'jsoncallback',
				async: false,
				cache: false,
				success: function(jsondata){//jsondata模板各个页面详细信息
					/**
					 * 模板页面信息放入templatepages.temporaryData中
					 */
					var templatepages = localStorage.getItem("templatepages");
					var jsontemplatepages = JSON.parse(templatepages);
					jsontemplatepages.temporaryData = jsondata;
					localStorage.setItem("templatepages", JSON.stringify(jsontemplatepages));
					/**
					 * 生成各个页面的data_img
					 */
					var dataCanvas =  document.createElement("canvas");
					dataCanvas.width = width;
					dataCanvas.height = height;
					var dataCtx = dataCanvas.getContext("2d");
					for(var i = 0;i < jsondata.length;i++){
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
						for(var j = 0;j < jsondata[i].blockData.length;j++){
							dataCtx.strokeRect(jsondata[i].blockData[j].block_x,jsondata[i].blockData[j].block_y,jsondata[i].blockData[j].block_width,jsondata[i].blockData[j].block_height);
						}
						var img = new Image();
						img.src = dataCanvas.toDataURL("image/png");
						var previewData = img.src;
						var each_data_img = jsondata[i].page_id +","+jsondata[i].page_name+","+ previewData;
						var data_img =  JSON.stringify(each_data_img);
						data_img = data_img.substring(1,data_img.length-1);
						data_img = encodeURIComponent(data_img);
						var dataimgid = "data_img"+jsondata[i].page_id;
						localStorage.setItem(dataimgid,data_img);
					}
					opentemplate(jsondata);
				},
				error: function(json123) {
					alert('fail');
				}
			});
		},
		error: function(json123) {
			alert('fail');
		}
	});
}



/*
 * 调用模板编辑数据，并打开模板进行编辑
 */
function opentemplate(jsondata) {
	localStorage.removeItem("pages");
	for (var i = 0; i < jsondata.length; i++) {
		localStorage.setItem(jsondata[i].page_id.toString(), JSON.stringify(jsondata[i]));
		//将页面id和名称作为页面元数据新生成页面，并存储在pages中
		var page = new Object();
		page.page_id = jsondata[i].page_id.toString();
		page.page_name = jsondata[i].page_name.toString();
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
		localStorage.setItem("pages", strpages); //添加后的pages
	}
	var menu = parent.window.document.getElementById("iframe-menu");
	menu.src = encodeURI("include/model-menu.html?from=2&pname=" + localStorage.getItem("templateName"));
	var content = parent.window.document.getElementById("iframe-content");
	content.src = "template/newTemplate.html?page_id=" + jsondata[0].page_id;
}

/**
 * copytemplate.html页面的确定按钮有调用此函数
 */
function copytemplate() {
	//这里的createrName和createrId应该用登陆用户信息，而不是父模板信息，下面是临时数据
	var newTemplateName = encodeURIComponent(document.getElementById("tName").value);
	var requestData = "{\"templateId\":" + localStorage.getItem("template_id") +
		",\"templateName\":" + "\"" + newTemplateName +
		"\",\"createrName\":" + "\"" + encodeURIComponent(localStorage.getItem("createrName")) +
		"\",\"createrId\":" + localStorage.getItem("createrId") + "}";
	console.log("copytemplate,requestData: " + requestData);
	$.ajax({
		type: "POST",
		url: "http://211.83.111.206:7070/publish/station/rest/template/replica",
		async: false,
		headers: {
			'Accept': 'application/json'
		},
		data: requestData,
		contentType: 'application/json',
		charset: "utf-8",
		success: function(data) {
			copytemplateCallback(data);
		},
		error: function(res) {
			alert("错误！");
		}
	});
}

function copytemplateCallback(data) {
	console.log(data);
	localStorage.setItem("originaltemplate_id", localStorage.getItem("template_id"));
	var newtempid = data.data.templateId;
	var newscale = data.data.scale;
	var urlstr = data.data.temporaryData;
	$.ajax({
		type: "GET",
		url: urlstr,
		data: '',
		dataType: 'jsonp',
		jsonpCallback: 'jsoncallback',
		cache: false,
		success: function(data) {
			console.log(JSON.stringify(data));
			localStorage.setItem("template_id", newtempid);
			localStorage.setItem("templateName", document.getElementById("tName").value);
			localStorage.setItem("scale", newscale);
			var tps = new Object();
			tps.templateId = localStorage.getItem("template_id");
			tps.templateName = document.getElementById("tName").value;
			tps.createrName = localStorage.getItem("createrName");
			tps.scale = localStorage.getItem("scale");
			tps.status = "1";
			tps.temporaryData = data;
			localStorage.setItem("templatepages", JSON.stringify(tps));
			opentemplate(data);
		},
		error: function(json123) {
			alert('fail');
		}
	});
}

/*
 * 删除操作，获得被选中的模板id，发删除指令到后台
 * Modified by Sush
 */
function Delete() {
	if (window.confirm('确定删除吗？')) {
		var chosentemplateid = document.getElementById("chosentemplateid");
		var checkone = document.getElementsByName("checkbox-one");
		var ids = "";
		for (var i = 0; i < checkone.length; i++) {
			if (checkone[i].checked) {
				var kk = document.getElementById("templatelist").rows[i + 1].cells[1].innerHTML;
				//			alert("----------"+kk);
				if (ids == "")
					ids = kk;
				else
					ids = ids + "," + kk; //删除多个组成的id数组格式需要确认
			}
		}
		document.getElementById("chosentemplateid").value = ids;
		deletetemplate();
	}
}
/**
 * 删除复选框选择的模板，删除后重新获得模板列表
 * @author Sush
 */
function deletetemplate() {
	var chosentemplateid = document.getElementById("chosentemplateid").value;

	var addr = "http://211.83.111.206:7070/publish/station/rest/template/" + chosentemplateid;
	//alert(addr);
	$.ajax({
		type: "DELETE",
		url: addr,
		success: function(data) {
			alert(data.content);
			searchtemplate();
		},
		error: function(data) {
			alert(data.code + " : " + data.content);
		}
	});

}
var headBarHeight = 80;
var canvasPaddingTop = 20;
var canvasPaddingLeft = 20;
var smallSize = 20;
var scale = 16;
$(function(){
	$("#canvas_div").on("click",".box",function(){
		console.log("click");
	})
})
function initGrid() {

	drawGrid();
	if (localStorage.getItem("templatepages") == null)
		alert("templatepages==null");
	var nameArr = [];
	var this_id = getparameter("page_id");
	var this_blocks = JSON.parse(localStorage.getItem(this_id));
	for (var i = 0; i < this_blocks.blockData.length; i++) {
		nameArr[i] = document.createElement("div");
		nameArr[i].id = this_blocks.blockData[i].block_id;
		nameArr[i].className = "box";
		nameArr[i].pageId = this_blocks.page_id;
		var divStartX = this_blocks.blockData[i].block_x + canvasPaddingLeft;
			divStartY = this_blocks.blockData[i].block_y + canvasPaddingTop;
		nameArr[i].style.cssText = "position:absolute;margin:0;left:" +	divStartX + 'px' + 
			";top:" + divStartY + 'px' + 
			";width:" +	this_blocks.blockData[i].block_width + 'px' + 
			";height:" + this_blocks.blockData[i].block_height + 'px' + ";border:solid 1px red";
		$("#canvas_div").append(nameArr[i]);
		//删除选中方块
		nameArr[i].onclick = function() {
			stopEventBubble(event);
			if ($(this).attr("class").indexOf("selected") > 0) {
				$(this).removeClass("selected");
				$(this).css("background", "#fff");
			} else {
				$(this).addClass("selected");
				$(this).css("background", "#ccc");
			}
		};
		var pre_right_div = document.createElement("div");
		pre_right_div.style.cssText = "width:15px;height:100%;background:#f00;float:right;position:absolute;right:0;top:0;cursor:e-resize;overflow:hidden;opacity:0;z-index:1";
		nameArr[i].appendChild(pre_right_div);
		var pre_scale_div = document.createElement("div");
		pre_scale_div.style.cssText = "width:15px;height:15px;background:#99CC00;position:absolute;right:0px;bottom:0px;cursor:nw-resize;overflow:hidden;font-size:12px;text-align:center;line-height:15px;color:#FFFFFF;float:right;z-index:3";
		pre_scale_div.innerHTML = "拖";
		nameArr[i].appendChild(pre_scale_div);
		var pre_bottom_div = document.createElement("div");
		pre_bottom_div.style.cssText = "width:100%;height:15px;background:#f00;position:absolute;left:0;bottom:0;cursor:n-resize;overflow:hidden;filter:alpha(opacity:0);opacity:0;z-index:1";
		nameArr[i].appendChild(pre_bottom_div);
		/**
		 * 方块拖拽
		 */
		var mouseStart = {};
		var divStart = {};
		var rightStart = {};
		var bottomStart = {};
		var curBlock;
		var origW;
		var origH;
		/**
		 * 拽动方法
		 */
		//1. 往右拽
		pre_right_div.onmousedown = function(ev) {
			stopEventBubble(ev);
			var oEvent = ev || event;
			curBlock = ev.target.parentNode;
			mouseStart.x = oEvent.clientX;
			mouseStart.y = oEvent.clientY;
			rightStart.x = pre_right_div.offsetLeft;
			origW = parseInt(del_last_two_char(curBlock.style.width));
			if (pre_right_div.setCapture) {
				pre_right_div.onmousemove = doDrag1;
				pre_right_div.onmouseup = stopDrag1;
				pre_right_div.setCapture();
			} else {
				document.addEventListener("mousemove", doDrag1, true);
				document.addEventListener("mouseup", stopDrag1, true);
			}
		};
		//2. 往下拽
		pre_bottom_div.onmousedown = function(ev) {
			stopEventBubble(ev);
			var oEvent = ev || event;
			curBlock = ev.target.parentNode;
			mouseStart.x = oEvent.clientX;
			mouseStart.y = oEvent.clientY;
			bottomStart.y = pre_bottom_div.offsetTop;
			origH = parseInt(del_last_two_char(curBlock.style.height));
			if (pre_bottom_div.setCapture) {
				pre_bottom_div.onmousemove = doDrag2;
				pre_bottom_div.onmouseup = stopDrag2;
				pre_bottom_div.setCapture();
			} else {
				document.addEventListener("mousemove", doDrag2, true);
				document.addEventListener("mouseup", stopDrag2, true);
			}
		};
		//3. 往右下同时拽
		pre_scale_div.onmousedown = function(ev) {
			stopEventBubble(ev);
			var oEvent = ev || event;
			curBlock = ev.target.parentNode;
			mouseStart.x = oEvent.clientX;
			mouseStart.y = oEvent.clientY;
			divStart.x = pre_scale_div.offsetLeft;
			divStart.y = pre_scale_div.offsetTop;
			origW = parseInt(del_last_two_char(curBlock.style.width));
			origH = parseInt(del_last_two_char(curBlock.style.height));
			if (pre_scale_div.setCapture) {
				pre_scale_div.onmousemove = doDrag;
				pre_scale_div.onmouseup = stopDrag;
				pre_scale_div.setCapture();
			} else {
				document.addEventListener("mousemove", doDrag, true);
				document.addEventListener("mouseup", stopDrag, true);
			}
		};
		/**
		 * mousemove -- 往右拽
		 */
		function doDrag1(ev) {
			var page_id = getparameter("page_id");
			var oEvent = ev || event;
			var movedW = origW + oEvent.clientX - mouseStart.x;
			var w = Math.ceil(movedW / gridSize) * gridSize;
			if(w < smallSize){
				w = smallSize;
			}
			curBlock.style.width = w + "px";
			// var r_max_d = maxCommonDivisor(parseInt(del_last_two_char(curBlock.style.width)), parseInt(del_last_two_char(curBlock.style.height)));
			// document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(curBlock.style.width) + ",宽：" + del_last_two_char(curBlock.style.height) + ",长宽比：" + parseInt(del_last_two_char(curBlock.style.width)) / r_max_d + ":" + parseInt(del_last_two_char(curBlock.style.height)) / r_max_d;
			document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(curBlock.style.width) + 
			",宽：" + del_last_two_char(curBlock.style.height) + 
			",长宽比：" + 16 +
			":" + 16/parseInt(del_last_two_char(curBlock.style.width))*parseInt(del_last_two_char(curBlock.style.height));

		};
		/**
		 * mouseup -- 往右拽
		 */
		function stopDrag1() {
			var page_id = getparameter("page_id");
			var judgeDrag = true;
			var curBlockId = curBlock.id;
			var pageInfo = JSON.parse(localStorage.getItem(page_id));
			for(var i = 0; i< pageInfo.blockData.length;i++){
				if(pageInfo.blockData[i].block_id == curBlockId){
					rectStart[0] = pageInfo.blockData[i].block_x;
					rectStart[1] = pageInfo.blockData[i].block_y;
					break;					
				}
			}		
			for (var existBlock = 0; existBlock < pageInfo.blockData.length; existBlock++) {						
				if(pageInfo.blockData[existBlock].block_id == curBlockId){
					continue;
				}
				var block_X = pageInfo.blockData[existBlock].block_x,
					block_Y = pageInfo.blockData[existBlock].block_y,
					block_endY = pageInfo.blockData[existBlock].block_height + block_Y,
					block_endX = pageInfo.blockData[existBlock].block_width + block_X;
				var drawEndX = rectStart[0] + parseInt(del_last_two_char(curBlock.style.width)),
					drawEndY = rectStart[1] + parseInt(del_last_two_char(curBlock.style.height));
				if (block_X > rectStart[0] && block_Y > rectStart[1]) {
					if (drawEndX > block_X && drawEndY > block_Y) {
						// alert("添加失败---原有区域被覆盖1");
						judgeDrag = false;
						break;
					}
				} else if (block_Y <= rectStart[1] && rectStart[1] < block_endY && block_X > rectStart[0]) {
					if (drawEndX > block_X) {
						// alert("添加失败---原有区域被覆盖2");
						judgeDrag = false;
						break;
					}
				} else if (block_X <= rectStart[0] && rectStart[0] < block_endX && block_Y > rectStart[1]) {
					if (drawEndY > block_Y) {
						// alert("添加失败---原有区域被覆盖3");
						judgeDrag = false;
						break;
					}
				}
			}
			if(judgeDrag){

				var rectMoveEndX = parseInt(del_last_two_char(curBlock.style.left)) - canvasPaddingLeft + parseInt(del_last_two_char(curBlock.style.width));
				// var rectMoveEndY = parseInt(del_last_two_char(curBlock.style.top)) - canvasPaddingTop + parseInt(del_last_two_char(curBlock.style.height));
				if(rectMoveEndX >= myCanvas.width){
					curBlock.style.width = (myCanvas.width - rectStart[0]) + "px";
				}
				// if(rectMoveEndY >= myCanvas.height){
				// 	curBlock.style.height = (myCanvas.height - rectStart[1]) + "px";
				// }

				var pageinfo = localStorage.getItem(page_id);
				var pageJson = JSON.parse(pageinfo);
				for (var curBlockData = 0; curBlockData < pageJson.blockData.length; curBlockData++) {
					if (pageJson.blockData[curBlockData].block_id == curBlock.id) {
						pageJson.blockData[curBlockData].block_width = parseInt(del_last_two_char(curBlock.style.width));
					}
				}
				localStorage.setItem(page_id, JSON.stringify(pageJson));		
			}else{
				alert("覆盖其他方块，更改失败！")
				for(var i = 0; i < pageInfo.blockData.length; i++){
					console.log(pageInfo.blockData[i].block_id)
					if(pageInfo.blockData[i].block_id == curBlockId){
						console.log(pageInfo.blockData[i].block_width)
						curBlock.style.width = pageInfo.blockData[i].block_width + "px";
					}else{
						continue;
					}
				}
			}
			if (pre_right_div.releaseCapture) {
				pre_right_div.onmousemove = null;
				pre_right_div.onmouseup = null;
				pre_right_div.releaseCapture();
			} else {
				document.removeEventListener("mousemove", doDrag1, true);
				document.removeEventListener("mouseup", stopDrag1, true);
			}
		};
		/**
		 * mousemove -- 往下拽
		 */
		function doDrag2(ev) {
			var page_id = getparameter("page_id");
			var oEvent = ev || event;
			var movedH = origH + oEvent.clientY - mouseStart.y;
			h = Math.ceil(movedH / gridSize) * gridSize;
			if(h < smallSize){
				h = smallSize;
			}
			curBlock.style.height = h + "px";
			// var r_max_d = maxCommonDivisor(parseInt(del_last_two_char(curBlock.style.width)), parseInt(del_last_two_char(curBlock.style.height)));
			// document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(curBlock.style.width) + ",宽：" + del_last_two_char(curBlock.style.height) + ",长宽比：" + parseInt(del_last_two_char(curBlock.style.width)) / r_max_d + ":" + parseInt(del_last_two_char(curBlock.style.height)) / r_max_d;
			document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(curBlock.style.width) + 
			",宽：" + del_last_two_char(curBlock.style.height) + 
			",长宽比：" + 16 +
			":" + 16/parseInt(del_last_two_char(curBlock.style.width))*parseInt(del_last_two_char(curBlock.style.height));
		};
		/**
		 * mouseup -- 往下拽
		 */
		function stopDrag2() {
			var page_id = getparameter("page_id");
			var judgeDrag = true;
			var curBlockId = curBlock.id;
			var pageInfo = JSON.parse(localStorage.getItem(page_id));
			for(var i = 0; i< pageInfo.blockData.length;i++){
				if(pageInfo.blockData[i].block_id == curBlockId){
					rectStart[0] = pageInfo.blockData[i].block_x;
					rectStart[1] = pageInfo.blockData[i].block_y;
					break;					
				}
			}
			for(var existBlock = 0; existBlock < pageInfo.blockData.length; existBlock++) {						
				if(pageInfo.blockData[existBlock].block_id == curBlockId){
					continue;
				}
				var block_X = pageInfo.blockData[existBlock].block_x,
					block_Y = pageInfo.blockData[existBlock].block_y,
					block_endY = pageInfo.blockData[existBlock].block_height + block_Y,
					block_endX = pageInfo.blockData[existBlock].block_width + block_X;
				var drawEndX = rectStart[0] + parseInt(del_last_two_char(curBlock.style.width)),
					drawEndY = rectStart[1] + parseInt(del_last_two_char(curBlock.style.height));
				if (block_X > rectStart[0] && block_Y > rectStart[1]) {
					if (drawEndX > block_X && drawEndY > block_Y) {
						// alert("添加失败---原有区域被覆盖1");
						judgeDrag = false;
						break;
					}
				} else if (block_Y <= rectStart[1] && rectStart[1] < block_endY && block_X > rectStart[0]) {
					if (drawEndX > block_X) {
						// alert("添加失败---原有区域被覆盖2");
						judgeDrag = false;
						break;
					}
				} else if (block_X <= rectStart[0] && rectStart[0] < block_endX && block_Y > rectStart[1]) {
					if (drawEndY > block_Y) {
						// alert("添加失败---原有区域被覆盖3");
						judgeDrag = false;
						break;
					}
				}
			}
			if(judgeDrag){

				// var rectMoveEndX = parseInt(del_last_two_char(curBlock.style.left)) - canvasPaddingLeft + parseInt(del_last_two_char(curBlock.style.width));
				var rectMoveEndY = parseInt(del_last_two_char(curBlock.style.top)) - canvasPaddingTop + parseInt(del_last_two_char(curBlock.style.height));
				// if(rectMoveEndX >= myCanvas.width){
				// 	curBlock.style.width = (myCanvas.width - rectStart[0]) + "px";
				// }
				if(rectMoveEndY >= myCanvas.height){
					curBlock.style.height = (myCanvas.height - rectStart[1]) + "px";
				}



				var pageinfo = localStorage.getItem(page_id);
				var pageJson = JSON.parse(pageinfo);
				for (var curBlockData = 0; curBlockData < pageJson.blockData.length; curBlockData++) {
					if (pageJson.blockData[curBlockData].block_id == curBlock.id) {
						pageJson.blockData[curBlockData].block_height = parseInt(del_last_two_char(curBlock.style.height));
					}
				}
				localStorage.setItem(page_id, JSON.stringify(pageJson));		
			}else{
				alert("覆盖其他方块，更改失败！")
				for(var i = 0; i < pageInfo.blockData.length; i++){
					if(pageInfo.blockData[i].block_id == curBlockId){
						curBlock.style.height = pageInfo.blockData[i].block_height + "px";
					}else{
						continue;
					}
				}
			}
			if (pre_bottom_div.releaseCapture) {
				pre_bottom_div.onmousemove = null;
				pre_bottom_div.onmouseup = null;
				pre_bottom_div.releaseCapture();
			} else {
				document.removeEventListener("mousemove", doDrag2, true);
				document.removeEventListener("mouseup", stopDrag2, true);
			}
		};
		/**
		 * mousemove --右下拽
		 */
		function doDrag(ev) {
			var page_id = getparameter("page_id");
			var oEvent = ev || event;
			var movedW = origW + oEvent.clientX - mouseStart.x;
			var movedH = origH + oEvent.clientY - mouseStart.y;
			w = Math.ceil(movedW / gridSize) * gridSize;
			h = Math.ceil(movedH / gridSize) * gridSize;
			if(w < smallSize){
				w = smallSize;
			}
			if(h < smallSize){
				h = smallSize;
			}
			curBlock.style.width = w + "px";
			curBlock.style.height = h + "px";
			// var r_max_d = maxCommonDivisor(parseInt(del_last_two_char(curBlock.style.width)), parseInt(del_last_two_char(curBlock.style.height)));
			// document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(curBlock.style.width) + ",宽：" + del_last_two_char(curBlock.style.height) + ",长宽比：" + parseInt(del_last_two_char(curBlock.style.width)) / r_max_d + ":" + parseInt(del_last_two_char(curBlock.style.height)) / r_max_d;
			document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(curBlock.style.width) + 
			",宽：" + del_last_two_char(curBlock.style.height) + 
			",长宽比：" + 16 +
			":" + 16/parseInt(del_last_two_char(curBlock.style.width))*parseInt(del_last_two_char(curBlock.style.height));
		};
		/**
		 * mouseup --- 右下拽
		 */
		function stopDrag() {
			var page_id = getparameter("page_id");
			var judgeDrag = true;
			var curBlockId = curBlock.id;
			var pageInfo = JSON.parse(localStorage.getItem(page_id));
			for(var i = 0; i< pageInfo.blockData.length;i++){
				if(pageInfo.blockData[i].block_id == curBlockId){
					rectStart[0] = pageInfo.blockData[i].block_x;
					rectStart[1] = pageInfo.blockData[i].block_y;
					break;					
				}
			}
			for (var existBlock = 0; existBlock < pageInfo.blockData.length; existBlock++) {						
				if(pageInfo.blockData[existBlock].block_id == curBlockId){
					continue;
				}
				var block_X = pageInfo.blockData[existBlock].block_x,
					block_Y = pageInfo.blockData[existBlock].block_y,
					block_endY = pageInfo.blockData[existBlock].block_height + block_Y,
					block_endX = pageInfo.blockData[existBlock].block_width + block_X;
				var drawEndX = rectStart[0] + parseInt(del_last_two_char(curBlock.style.width)),
					drawEndY = rectStart[1] + parseInt(del_last_two_char(curBlock.style.height));
				if (block_X > rectStart[0] && block_Y > rectStart[1]) {
					if (drawEndX > block_X && drawEndY > block_Y) {
						// alert("添加失败---原有区域被覆盖1");
						judgeDrag = false;
						break;
					}
				} else if (block_Y <= rectStart[1] && rectStart[1] < block_endY && block_X > rectStart[0]) {
					if (drawEndX > block_X) {
						// alert("添加失败---原有区域被覆盖2");
						judgeDrag = false;
						break;
					}
				} else if (block_X <= rectStart[0] && rectStart[0] < block_endX && block_Y > rectStart[1]) {
					if (drawEndY > block_Y) {
						// alert("添加失败---原有区域被覆盖3");
						judgeDrag = false;
						break;
					}
				}
			}
			if(judgeDrag){				
				var rectMoveEndX = parseInt(del_last_two_char(curBlock.style.left)) - canvasPaddingLeft + parseInt(del_last_two_char(curBlock.style.width));
				var rectMoveEndY = parseInt(del_last_two_char(curBlock.style.top)) - canvasPaddingTop + parseInt(del_last_two_char(curBlock.style.height));
				if(rectMoveEndX >= myCanvas.width){
					curBlock.style.width = (myCanvas.width - rectStart[0]) + "px";
				}
				if(rectMoveEndY >= myCanvas.height){
					curBlock.style.height = (myCanvas.height - rectStart[1]) + "px";
				}
				var pageinfo = localStorage.getItem(page_id);
				var pageJson = JSON.parse(pageinfo);
				for (var curBlockData = 0; curBlockData < pageJson.blockData.length; curBlockData++) {
					if (pageJson.blockData[curBlockData].block_id == curBlock.id) {
						pageJson.blockData[curBlockData].block_width = parseInt(del_last_two_char(curBlock.style.width));
						pageJson.blockData[curBlockData].block_height = parseInt(del_last_two_char(curBlock.style.height));
					}
				}
				localStorage.setItem(page_id, JSON.stringify(pageJson));		
			}else{
				alert("覆盖其他方块，更改失败！")
				for(var i = 0; i < pageInfo.blockData.length; i++){
					if(pageInfo.blockData[i].block_id == curBlockId){
						curBlock.style.width = pageInfo.blockData[i].block_width + "px";
						curBlock.style.height = pageInfo.blockData[i].block_height + "px";
					}else{
						continue;
					}
				}
			}
			if (pre_scale_div.releaseCapture) {
				pre_scale_div.onmousemove = null;
				pre_scale_div.onmouseup = null;
				pre_scale_div.releaseCapture();
			} else {
				document.removeEventListener("mousemove", doDrag, true);
				document.removeEventListener("mouseup", stopDrag, true);
			}
		};
	}
}

/**
 * 去掉字符串最后两位
 */
function del_last_two_char(str) {
	return str.substring(0, str.length - 2);
}
