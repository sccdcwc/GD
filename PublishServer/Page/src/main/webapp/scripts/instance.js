var region="成都";
/*
 *生成模板列表行元素
 */
function createtablerow()
{
	var tr=document.createElement("tr");
	var checkone=document.createElement("td");
	var instanceId=document.createElement("td");
	var instanceName=document.createElement("td");
	var instanceScale=document.createElement("td");
	var createrName=document.createElement("td");
	var e=document.createElement("input");
	e.type="checkbox";
	e.className="checkbox-one";
//	tr.onclick=linktodetail();
	tr.appendChild(checkone);
	tr.appendChild(instanceId);
	tr.appendChild(instanceName);
	tr.appendChild(instanceScale);
	tr.appendChild(createrName);
	checkone.appendChild(e);
	return tr;	
}

function addinstance_original(instanceJson)
{
        DeleteAll();
		$('.PageNumBox').html("");
		console.log(instanceJson);
			var DataLength = instanceJson.length;
			// 每页显示个数
			var PageLength = 5;
			//每组4页
			var PageGroupNum = 8;
			//总页数
			var PageCount = DataLength/PageLength;
			//页数取整
			if(PageCount > parseInt(PageCount)){
				PageCount = 1 + parseInt(PageCount);
			}else{
				PageCount = parseInt(PageCount);
			}
			//总组数
			var GroupCount = PageCount/PageGroupNum;
			//组数取整
			if(GroupCount > parseInt(GroupCount)){
				GroupCount = 1+ parseInt(GroupCount);
			}else{
				GroupCount = parseInt(GroupCount);
			}
			//当前页码：初始为1
			var curPageNum = 1;
			//当前页组
			var curGroupNum = 0;
			//页码按钮Id
			var PageBtnId;
			//生成页码按钮：最多8个页码按钮
			if(PageCount <= 8){
				for(var i = 0;i < PageCount; i++){
					var PageNum = i + 1;
					var PageBtnHtml = "<div class='Btn pageNumBtn' data-id="+PageNum+">"+PageNum+"</div>";
					$('.PageNumBox').append(PageBtnHtml);
				}
			}else{
				for(var i = 0;i < PageGroupNum; i++){
					var PageNum = i + 1;
					var PageBtnHtml = "<div class='Btn pageNumBtn' data-id="+PageNum+">"+PageNum+"</div>";
					$('.PageNumBox').append(PageBtnHtml);
				}
			}
			//初始显示
			var curPageNum = 1;
			$('.preBtn').addClass('noActive');
			$('.pageNumBtn').eq(0).addClass('active');
			showCurPage(curPageNum,PageLength,instanceJson,PageCount);
			//分页按钮的点击事件
			$('.firstBtn').click(function(){
				$('.preBtn').addClass('noActive');
				$('.pageNumBtn').each(function(){
					$(this).css("display","inline-block");
				});
				$('.nextBtn').removeClass('noActive');
				$('.PageNumBox').children().removeClass('active');
				$('.pageNumBtn').eq(0).addClass('active');
				for(var i = 0; i < PageGroupNum; i++){
					PageBtnId = i+1;
					$('.pageNumBtn').eq(i).attr("data-id",PageBtnId);
					$('.pageNumBtn').eq(i).text(PageBtnId);
				}
				curPageNum = 1;
				$('#templatelist').html("<thead><tr><th></th><th>序号</th><th>模板名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");				
				showCurPage(curPageNum,PageLength,instanceJson,PageCount);
			});
			$('.lastBtn').click(function(){
				$('.nextBtn').addClass('noActive');
				$('.preBtn').removeClass('noActive');
				$('.PageNumBox').children().removeClass('active');
				$('.pageNumBtn :last-child').addClass('active');
				curPageNum = PageCount;
				for(var i = 0; i < PageGroupNum; i++){
					PageBtnId = (GroupCount-1)*PageGroupNum +i;
					if(PageBtnId <  PageCount+1){
						$('.pageNumBtn').eq(i).attr("data-id",PageBtnId);
						$('.pageNumBtn').eq(i).text(PageBtnId);
					}else{
						$('.pageNumBtn').eq(i).css("display","none");
					}
				}
				$('#templatelist').html("<thead><tr><th></th><th>序号</th><th>模板名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");				
				showCurPage(curPageNum,PageLength,instanceJson,PageCount);
			});
			$('.preBtn').click(function(){
				$('.nextBtn').removeClass('noActive');
				$('.pageNumBtn').each(function(){
					$(this).css("display","inline-block");
				});
				//点击前页码
				curPageNum = $('.pageNumBtn.active').attr("data-id");
				//点击前页码组取整
				if(curPageNum%PageGroupNum == 0){
					curGroupNum = parseInt(curPageNum/PageGroupNum);
				}else{
					curGroupNum = parseInt((curPageNum/PageGroupNum)+1);
				}
				if(curGroupNum == 1){
					alert("已经在最前了！")
				}else{
					curGroupNum--;
					console.log(curGroupNum);
					if(curGroupNum == 1){
						$('.preBtn').addClass('noActive');
					}
					for(var i = 0; i < PageGroupNum; i++){
						PageBtnId = (curGroupNum-1)*PageGroupNum +i+1;
						$('.pageNumBtn').eq(i).attr("data-id",PageBtnId);
						$('.pageNumBtn').eq(i).text(PageBtnId);
					}
					curPageNum = $('.pageNumBtn.active').attr("data-id");
					$('#templatelist').html("<thead><tr><th></th><th>序号</th><th>模板名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");					
					showCurPage(curPageNum,PageLength,instanceJson,PageCount);
				}
			})
			$('.nextBtn').click(function(){
				$('.preBtn').removeClass('noActive');
				//点击前页码
				curPageNum = $('.pageNumBtn.active').attr("data-id");
				//点击前页码组取整
				if(curPageNum%PageGroupNum == 0){
					curGroupNum = parseInt(curPageNum/PageGroupNum);
				}else{
					curGroupNum = parseInt((curPageNum/PageGroupNum)+1);
				}
				if(curGroupNum >= GroupCount){
					alert("已经到最后了！")
				}else{
					curGroupNum++;
					if(curGroupNum == GroupCount){
						for(var i = 0; i < PageGroupNum; i++){
							PageBtnId = (curGroupNum-1)*PageGroupNum +i+1;
							if(PageBtnId <  PageCount+1){
								$('.pageNumBtn').eq(i).attr("data-id",PageBtnId);
								$('.pageNumBtn').eq(i).text(PageBtnId);
							}else{
								$('.pageNumBtn').eq(i).css("display","none");
							}
						}
						$('.pageNumBtn').each(function(){
							if($(this).attr("data-id") == PageCount){
								$('this').addClass('active');
							}
						});
						$('.nextBtn').addClass('noActive');
						$('.nextBtn').css("disabled",false);
					}else{
						for(var i = 0; i < PageGroupNum; i++){
							PageBtnId = (curGroupNum-1)*PageGroupNum +i+1;
							$('.pageNumBtn').eq(i).attr("data-id",PageBtnId);
							$('.pageNumBtn').eq(i).text(PageBtnId);
						}
					}
					curPageNum = $('.pageNumBtn.active').attr("data-id");					
					$('#templatelist').html("<thead><tr><th></th><th>序号</th><th>模板名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");					
					showCurPage(curPageNum,PageLength,instanceJson,PageCount);
				}
			});
			$('.pageNumBtn').click(function(){
				curPageNum = $(this).attr('data-id');
				if(curPageNum == 1){
					$('.preBtn').addClass('noActive');
					$('.nextBtn').removeClass('noActive');
				}else{
					if(curPageNum == PageCount){
						$('.nextBtn').addClass('noActive');
						$('.preBtn').removeClass('noActive');
					}
					else{
						$('.nextBtn').removeClass('noActive');
						$('.preBtn').removeClass('noActive');
					}
				}
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				$('#templatelist').html("<thead><tr><th></th><th>序号</th><th>模板名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");				
				showCurPage(curPageNum,PageLength,instanceJson,PageCount);
			});
			$('#instancelist tr td:not(:first-child)').click(function(){
				window.open("tetemplatedetail.html?id=" + $(this).attr("class"), "_self");
			});
//	var instanceList=document.getElementById("instancelist");
//	for(var i = 0; i < instanceJson.length; i++){
//		var tr=createtablerow();
//		for(var l=1;l<4;l++)
//		{
//                      tr.childNodes[l].className=instanceJson[i].instanceId;
//			tr.childNodes[l].onclick=function(){
//			    window.open("instancedetail_original.html?id="+$(this).attr("class"),"_self");
//			};
//		}			
//		tr.childNodes[1].textContent=instanceJson[i].instanceId;
//		tr.childNodes[2].textContent=instanceJson[i].instancName;
//		tr.childNodes[3].textContent=instanceJson[i].scale;
//		tr.childNodes[4].textContent=instanceJson[i].createrName;
//		instanceList.childNodes[1].appendChild(tr);
//	}
}

function addinstance_replica(instanceJson)
{
	 DeleteAll();
		$('.PageNumBox').html("");
		console.log(instanceJson);
			var DataLength = instanceJson.length;
			// 每页显示个数
			var PageLength = 5;
			//每组4页
			var PageGroupNum = 8;
			//总页数
			var PageCount = DataLength/PageLength;
			//页数取整
			if(PageCount > parseInt(PageCount)){
				PageCount = 1 + parseInt(PageCount);
			}else{
				PageCount = parseInt(PageCount);
			}
			//总组数
			var GroupCount = PageCount/PageGroupNum;
			//组数取整
			if(GroupCount > parseInt(GroupCount)){
				GroupCount = 1+ parseInt(GroupCount);
			}else{
				GroupCount = parseInt(GroupCount);
			}
			//当前页码：初始为1
			var curPageNum = 1;
			//当前页组
			var curGroupNum = 0;
			//页码按钮Id
			var PageBtnId;
			//生成页码按钮：最多8个页码按钮
			if(PageCount <= 8){
				for(var i = 0;i < PageCount; i++){
					var PageNum = i + 1;
					var PageBtnHtml = "<div class='Btn pageNumBtn' data-id="+PageNum+">"+PageNum+"</div>";
					$('.PageNumBox').append(PageBtnHtml);
				}
			}else{
				for(var i = 0;i < PageGroupNum; i++){
					var PageNum = i + 1;
					var PageBtnHtml = "<div class='Btn pageNumBtn' data-id="+PageNum+">"+PageNum+"</div>";
					$('.PageNumBox').append(PageBtnHtml);
				}
			}
			//初始显示
			var curPageNum = 1;
			$('.preBtn').addClass('noActive');
			$('.pageNumBtn').eq(0).addClass('active');
			showCurPage(curPageNum,PageLength,instanceJson,PageCount);
			//分页按钮的点击事件
			$('.firstBtn').click(function(){
				$('.preBtn').addClass('noActive');
				$('.pageNumBtn').each(function(){
					$(this).css("display","inline-block");
				});
				$('.nextBtn').removeClass('noActive');
				$('.PageNumBox').children().removeClass('active');
				$('.pageNumBtn').eq(0).addClass('active');
				for(var i = 0; i < PageGroupNum; i++){
					PageBtnId = i+1;
					$('.pageNumBtn').eq(i).attr("data-id",PageBtnId);
					$('.pageNumBtn').eq(i).text(PageBtnId);
				}
				curPageNum = 1;
				$('#instancelist').html("<thead><tr><th></th><th>序号</th><th>模板实例名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");				
				showCurPage(curPageNum,PageLength,instanceJson,PageCount);
			});
			$('.lastBtn').click(function(){
				$('.nextBtn').addClass('noActive');
				$('.preBtn').removeClass('noActive');
				$('.PageNumBox').children().removeClass('active');
				$('.pageNumBtn :last-child').addClass('active');
				curPageNum = PageCount;
				for(var i = 0; i < PageGroupNum; i++){
					PageBtnId = (GroupCount-1)*PageGroupNum +i;
					if(PageBtnId <  PageCount+1){
						$('.pageNumBtn').eq(i).attr("data-id",PageBtnId);
						$('.pageNumBtn').eq(i).text(PageBtnId);
					}else{
						$('.pageNumBtn').eq(i).css("display","none");
					}
				}
				$('#instancelist').html("<thead><tr><th></th><th>序号</th><th>模板实例名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");				
				showCurPage(curPageNum,PageLength,instanceJson,PageCount);
			});
			$('.preBtn').click(function(){
				$('.nextBtn').removeClass('noActive');
				$('.pageNumBtn').each(function(){
					$(this).css("display","inline-block");
				});
				//点击前页码
				curPageNum = $('.pageNumBtn.active').attr("data-id");
				//点击前页码组取整
				if(curPageNum%PageGroupNum == 0){
					curGroupNum = parseInt(curPageNum/PageGroupNum);
				}else{
					curGroupNum = parseInt((curPageNum/PageGroupNum)+1);
				}
				if(curGroupNum == 1){
					alert("已经在最前了！")
				}else{
					curGroupNum--;
					console.log(curGroupNum);
					if(curGroupNum == 1){
						$('.preBtn').addClass('noActive');
					}
					for(var i = 0; i < PageGroupNum; i++){
						PageBtnId = (curGroupNum-1)*PageGroupNum +i+1;
						$('.pageNumBtn').eq(i).attr("data-id",PageBtnId);
						$('.pageNumBtn').eq(i).text(PageBtnId);
					}
					curPageNum = $('.pageNumBtn.active').attr("data-id");
					$('#instancelist').html("<thead><tr><th></th><th>序号</th><th>模板实例名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");
					showCurPage(curPageNum,PageLength,instanceJson,PageCount);
				}
			})
			$('.nextBtn').click(function(){
				$('.preBtn').removeClass('noActive');
				//点击前页码
				curPageNum = $('.pageNumBtn.active').attr("data-id");
				//点击前页码组取整
				if(curPageNum%PageGroupNum == 0){
					curGroupNum = parseInt(curPageNum/PageGroupNum);
				}else{
					curGroupNum = parseInt((curPageNum/PageGroupNum)+1);
				}
				if(curGroupNum >= GroupCount){
					alert("已经到最后了！")
				}else{
					curGroupNum++;
					if(curGroupNum == GroupCount){
						for(var i = 0; i < PageGroupNum; i++){
							PageBtnId = (curGroupNum-1)*PageGroupNum +i+1;
							if(PageBtnId <  PageCount+1){
								$('.pageNumBtn').eq(i).attr("data-id",PageBtnId);
								$('.pageNumBtn').eq(i).text(PageBtnId);
							}else{
								$('.pageNumBtn').eq(i).css("display","none");
							}
						}
						$('.pageNumBtn').each(function(){
							if($(this).attr("data-id") == PageCount){
								$('this').addClass('active');
							}
						});
						$('.nextBtn').addClass('noActive');
						$('.nextBtn').css("disabled",false);
					}else{
						for(var i = 0; i < PageGroupNum; i++){
							PageBtnId = (curGroupNum-1)*PageGroupNum +i+1;
							$('.pageNumBtn').eq(i).attr("data-id",PageBtnId);
							$('.pageNumBtn').eq(i).text(PageBtnId);
						}
					}
					curPageNum = $('.pageNumBtn.active').attr("data-id");					
					$('#instancelist').html("<thead><tr><th></th><th>序号</th><th>模板实例名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");					
					showCurPage(curPageNum,PageLength,instanceJson,PageCount);
				}
			});
			$('.pageNumBtn').click(function(){
				curPageNum = $(this).attr('data-id');
				if(curPageNum == 1){
					$('.preBtn').addClass('noActive');
					$('.nextBtn').removeClass('noActive');
				}else{
					if(curPageNum == PageCount){
						$('.nextBtn').addClass('noActive');
						$('.preBtn').removeClass('noActive');
					}
					else{
						$('.nextBtn').removeClass('noActive');
						$('.preBtn').removeClass('noActive');
					}
				}
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				$('#instancelist').html("<thead><tr><th></th><th>序号</th><th>模板实例名称</th><th>长宽比</th><th>创建者名称</th></tr></thead>");				
				showCurPage(curPageNum,PageLength,instanceJson,PageCount);
			});
		
//      DeleteAll();
//	var instanceList=document.getElementById("instancelist");
//	for(var i = 0; i < instanceJson.length; i++){
//		var tr=createtablerow();
//		for(var l=1;l<4;l++)
//		{
//                      tr.childNodes[l].className=instanceJson[i].instanceId;
//			tr.childNodes[l].onclick=function(){
//			    window.open("instancedetail_replica.html?id="+$(this).attr("class"),"_self");
//			};
//		}			
//		tr.childNodes[1].textContent=instanceJson[i].instanceId;
//		tr.childNodes[2].textContent=instanceJson[i].instancName;
//		tr.childNodes[3].textContent=instanceJson[i].scale;
//		tr.childNodes[4].textContent=instanceJson[i].createrName;
//		instanceList.childNodes[1].appendChild(tr);
//	}
}

/**
 * 段颖 2016.6.22 显示当前页内容
 * @param  {[type]} curPageNum [当前页]
 * @param  {[type]} PageLength [每页内容条数]
 * @param  {[type]} jsonData1   [json数据]
 * @param  {[type]} PageCount  [总页数]
 */
function showCurPage(curPageNum,PageLength,jsonData,PageCount){
	var startContentNum = (curPageNum - 1) * PageLength;
	if(PageCount == curPageNum){
		var DataLength = jsonData.length;
		for(var i = startContentNum; i < DataLength;i++){
			var curContentNum = i;
			var ContentRowHtml = "<tr><td><input name='checkbox-one' class='checkbox-one' type='checkbox'/></td><td class='"+ jsonData[curContentNum].instanceId +"' id='template-tr" + curContentNum+"'>"+jsonData[curContentNum].instanceId+"</td><td class='"+jsonData[curContentNum].instanceId+"' id='template-tr" + curContentNum+"'>"+jsonData[curContentNum].instancName+"</td><td class='"+jsonData[curContentNum].instanceId+"' id='template-tr" + curContentNum+"'>"+jsonData[curContentNum].scale+"</td><td>"+ jsonData[curContentNum].createrName+"</td></tr>";
			$('#instancelist').append(ContentRowHtml);
		}
	}else{
		for(var i = 0;i < PageLength;i++){
			var curContentNum = startContentNum + i;
			var ContentRowHtml = "<tr><td><input name='checkbox-one' class='checkbox-one' type='checkbox'/></td><td class='"+ jsonData[curContentNum].instanceId +"' id='template-tr" + curContentNum+"'>"+jsonData[curContentNum].instanceId+"</td><td class='"+jsonData[curContentNum].instanceId+"' id='template-tr" + curContentNum+"'>"+jsonData[curContentNum].instancName+"</td><td class='"+jsonData[curContentNum].instanceId+"' id='template-tr" + curContentNum+"'>"+jsonData[curContentNum].scale+"</td><td>"+ jsonData[curContentNum].createrName+"</td></tr>";
			$('#instancelist').append(ContentRowHtml)
		};
	}
	$('#instancelist tr td:not(:first-child)').click(function(){
		window.open("../instance/instancedetail_replica.html?id=" + $(this).attr("class"), "_self");
	});
}

function addinstancefromsearch(instanceJson)
{
        DeleteAll();
	var instanceList=document.getElementById("instancelist");
	for(var i = 0; i < instanceJson.length; i++){
		var tr=createtablerow();
		for(var l=1;l<4;l++)
		{
                        tr.childNodes[l].className=instanceJson[i].instanceId;
			tr.childNodes[l].onclick=function(){
			    window.open("instancedetailfromsearch.html?id="+$(this).attr("class"),"_self");
			};
		}			
		tr.childNodes[1].textContent=instanceJson[i].instanceId;
		tr.childNodes[2].textContent=instanceJson[i].instancName;
		tr.childNodes[3].textContent=instanceJson[i].scale;
		tr.childNodes[4].textContent=instanceJson[i].createrName;
		instanceList.childNodes[1].appendChild(tr);
	}
}

/*
 *模板实例查询页面编辑按钮事件
 */
function editbutton() {
	var buttonedit = document.getElementById("buttonedit");
	var cancel = document.getElementById("cancel1");
	if (buttonedit.value == "编辑") {
		cancel.style.visibility = "visible";
		buttonedit.value = "完成";
	} else {
		cancel.style.visibility = "hidden";
		buttonedit.value = "编辑";
	}

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


/*
 * 删除操作，获得被选中的实例id，发删除指令到后台
 * Modified by Sush
 */
function Delete() {
	if (window.confirm('确定删除吗？')) {
		var choseninstanceid = document.getElementById("choseninstanceid");
		var checkone = document.getElementsByName("checkbox-one");
		var ids = "";
		for (var i = 0; i < checkone.length; i++) {
			if (checkone[i].checked) {
				var kk = document.getElementById("instancelist").rows[i + 1].cells[1].innerHTML;
				//			alert("----------"+kk);
				if (ids == "")
					ids = kk;
				else
					ids = ids + "," + kk; //删除多个组成的id数组格式需要确认
			}
		}
		document.getElementById("choseninstanceid").value = ids;
		deleteinstance();
	}
}
/**
 * 删除复选框选择的实例，删除后重新获得实例列表
 * @author Sush
 */
function deleteinstance() {
	var choseninstanceid = document.getElementById("choseninstanceid").value;

	var addr = "http://211.83.111.206:7070/publish/station/rest/instance/" + choseninstanceid;
	console.log("delete instance url="+addr);
	$.ajax({
		type: "DELETE",
		url: addr,
		success: function(data) {
			alert(data.content);
			getinstance_replica();
		},
		error: function(data) {
			alert(data.code + " : " + data.content);
		}
	});

}

function DeleteAll(){
    var table = document.getElementById("instancelist");
    for (var i = table.rows.length-1;i>0;i--){
        table.deleteRow(i);
    }
}

//模板详情页面返回模板列表 modified by Sush
function returnPageExistinctance() {
	var searchtype = localStorage.getItem("searchtype");
	if(searchtype=="searchtemplate"){
		var templateid = localStorage.getItem("templateID");
		window.open("../instance/templatedetail.html?id="+templateid, "_self");		
	}else{		
		history.go(-1);
	}
}
/*
//模板详情页面返回模板列表
function returnPageExistinctance() {
	//history.go(-1);
	var menu = parent.window.document.getElementById("iframe-menu");
	menu.src = "include/menu.html";	
	var searchtype = localStorage.getItem("searchtype");
	if(searchtype=="searchtemplate"){
		window.open("../instance/templatedetail.html", "_self");		
	}else{
		window.open("../instance/instancedetail_original.html", "_self");
	}
}*/
/**
 * 从模板详情页面返回模板列表页面
 */
function returntemplatelist(){
	    var menu = parent.window.document.getElementById("iframe-menu");
		menu.src = "include/menu.html";	
		window.open("../instance/instancefromtemplate.html", "_self");
}

/**
 * 从实例详情页面返回实例列表页面
 */
function returninstancelist(){
	var menu = parent.window.document.getElementById("iframe-menu");
	menu.src = "include/menu.html";		
	var searchtype = localStorage.getItem("searchtype");
	if(searchtype=="searchinstance"){
		window.open("../instance/searchinstance.html", "_self");		
	}else if(searchtype=="replicainstance"){
		window.open("../instance/instancebysearch.html", "_self");
	}
}

/*
 * 返回上一页事件
 */
//function returnpage()
//{
//	history.go(-1);
//}

/*
 * 返回Json数据
 */
function callback(data)
{
    if(data.data!==undefined){				
//	alert(data.meta.code+" : "+data.meta.content);
	localStorage.setItem("publishdata",data.data.publishData);
	localStorage.setItem("instanceID",data.data.instanceId);
		$.ajax({
	        type: "POST",
	        url: data.data.publishData,
	        data:'',
	        dataType: 'jsonp',
	        jsonpCallback:'jsoncallback',  
	        cache:false,
	        async:false,
	        success: function (data){
//	        	alert("ok");
	        	jsonData = data;
//	        	for(var i=0;i<jsonData.pages.length;i++)
//	        	{
//	        		var imgdata=jsonData.pages[i].page_id+","+jsonData.pages[i].page_name;
//	        		localStorage.setItem("data_img"+jsonData.pages[i].page_id,"a");
//					setTimeout(function(){
//						saveimg(jsonData,i);
//					});
////					imgdata=imgdata+","+previewData[i];
////	        		localStorage.setItem("data_img"+jsonData.pages[i].page_id,imgdata);
//	        	}
	        	localStorage.setItem("temporaryData",JSON.stringify(jsonData));
	        	var menu=parent.window.document.getElementById("iframe-menu");
				menu.src="include/instance-menu.html?from=2";
				var content=parent.window.document.getElementById("iframe-content");
				content.src="instance/instance-edit.html";
//	        	window.open("../instance/img.html","_self");
	        },
	        error: function (data) {  
	                alert('fail');  
	        } 
	  });
    }else{
	alert(data.code+" : "+data.content);
    }
}
/*
 * 直接创建模板实例  调用后台接口
 */
function rest_original(){
	var instanceName=document.getElementById("tName").value;
	var createrName="张三";
	var datas="{\"templateId\":"+localStorage.getItem("templateID")+",\"createrName\":\""+encodeURIComponent(createrName)+"\",\"createrId\":3,\"instanceName\":\""+encodeURIComponent(instanceName)+"\"}"
    rest("http://211.83.111.206:7070/publish/station/rest/instance/original", 
    POST_METHOD, 
    datas, 
    "application/json", 
    callback, 
    "application/json",
    region,
    false
    );
}

/*
 * 从模板实例库复制并创建模板实例  调用后台接口
 */
function linktosetinstance2()
{
	window.open("../instance/setinstance.html","_self");
}

function linktodetail_replica()
{
	localStorage.setItem("menuopera","createfrominstancetoreplica");
    rest_replica();
}

function rest_replica()
{
	var instanceId=localStorage.getItem("instanceID");
	localStorage.setItem("oldinstanceID",instanceId);
	var createrName=localStorage.getItem("CreaterName");
	var instanceName=document.getElementById("tName").value;
	var createrId="3";
	var datas="{\"instanceId\":"+instanceId+",\"createrName\":\""+encodeURIComponent(createrName)+"\",\"createrId\":"+createrId+",\"instanceName\":\""+encodeURIComponent(instanceName)+"\"}";
   rest("http://211.83.111.206:7070/publish/station/rest/instance/replica",
   POST_METHOD,
   datas,
   "application/json",
   callbackforinstance,
   "application/json",
   region,
   false
   );
}

/*
 *获得实例数据地址并从地址获取数据加载实例编辑页面 
 */
function callbackforinstance(data)
{
    if(data.data!==undefined){				
//	alert(data.meta.code+" : "+data.meta.content);
	localStorage.setItem("publishData",data.data.temporaryData);
	localStorage.setItem("instanceID",data.data.instanceId);
		$.ajax({
	        type: "POST",
	        url: data.data.temporaryData,
	        data:'',
	        dataType: 'jsonp',
	        jsonpCallback:'jsoncallback',  
	        cache:false,
	        async:false,
	        success: function (data){
	        	jsonData = data;
	        	localStorage.setItem("temporaryData",JSON.stringify(jsonData));	  
	        	previewData = sessionStorage.templatePreview.split(",");
	        	for(var i=0;i<jsonData.pages.length;i++)
	        	{
	        		var imgdata=jsonData.pages[i].page_id+","+jsonData.pages[i].page_name;	        		
					imgdata=imgdata+","+previewData[i];
	        		localStorage.setItem("data_img"+jsonData.pages[i].page_id,imgdata);
	        	}
	        	var instanceName=document.getElementById("tName").value;
				localStorage.setItem("instanceName",instanceName);
	        	window.open("../instance/instance-edit.html","_self");
				var menu=parent.window.document.getElementById("iframe-menu");
				menu.src="include/instance-menu.html?from=2";
	        },
	        error: function (data) {  
	                alert('fail');  
	        } 
	  });
    }else{
	alert(data.code+" : "+data.content);
    }
}
function linktosetinstance()
{
	window.open("../instance/settemplate.html","_self");
}
function linktodetail_original()
{ 
	var instanceName=document.getElementById("tName").value;
	localStorage.setItem("instanceName",instanceName);
	localStorage.setItem("menuopera","createfromteplate");
    rest_original();
    $('.operate_toolbar').show();
//  document.getElementById("buttons").style.display="none";
}
/*
 * 直接编辑模板
*/
function edit_origin()
{
	localStorage.setItem("menuopera","createfrominstancetoedit");
	var instanceId=localStorage.getItem("instanceID");
	localStorage.setItem("oldinstanceID",instanceId);
	rest("http://211.83.111.206:7070/publish/station/rest/instance/data/"+instanceId,
		 GET_METHOD,
		 null,
		 null,
		 callbackforedit_original,
		 null,
        region,
    	false
    );
}

function callbackforedit_original(data)
{
	if(data.data!==undefined){				
		localStorage.setItem("publishData",data.data.temporaryData);
		$.ajax({
	        type: "POST",
	        url: data.data.temporaryData,
	        data:'',
	        dataType: 'jsonp',
	        jsonpCallback:'jsoncallback',  
	        cache:false,
	        async:false,
	        success: function (data){
	        	jsonData = data;
	        	localStorage.setItem("temporaryData",JSON.stringify(jsonData));
	        	previewData=sessionStorage.templatePreview.split(",");
	        	for(var i=0;i<jsonData.pages.length;i++)
	        	{
	        		var imgdata=jsonData.pages[i].page_id+","+jsonData.pages[i].page_name;	        		
					imgdata=imgdata+","+previewData[i];
	        		localStorage.setItem("data_img"+jsonData.pages[i].page_id,imgdata);
	        	}
	        	window.open("../instance/instance-edit.html","_self");
				var menu=parent.window.document.getElementById("iframe-menu");
				menu.src="include/instance-menu.html?from=2";
	        },
	        error: function (data) {  
	                alert('fail');  
	        } 
	  });
	}else{
			alert(data.code+" : "+data.content);
	}
}
/*
 * 获取列表反馈函数
 */
function callbackforlist_original(data){
			if(data.data!==undefined){				
//				var Json1=JSON.stringify(data.data.templateMatchList);
//				alert(data.meta.code+" : "+data.meta.content);
			}else{
				alert(data.code+" : "+data.content);
			}
			addinstance_original(data.data.instanceMatchLists);                    
//			alert("callback:"+data);
}

function callbackforlist_replica(data){
			if(data.data!==undefined){				
			}else{
				alert(data.code+" : "+data.content);
			}
			addinstance_replica(data.data.instanceMatchLists);                    
}

function callbackforlistfromsearch(data){
			if(data.data!==undefined){				
			}else{
				alert(data.code+" : "+data.content);
			}
			addinstancefromsearch(data.data.instanceMatchLists);                    
}

function getinstance_original()
{
    rest("http://211.83.111.206:7070/publish/station/rest/instance/criteria/condition;"+getcondition(),
		 GET_METHOD,
		 null,
		 null,
		 callbackforlist_original,
		 null,
    	region,
    	false
    );
}

function getinstance_replica(type)
{
	if(type==1)
	   localStorage.setItem("searchtype","searchinstance");
	else if(type==2){
	   localStorage.setItem("searchtype","replicainstance");
	}else{
		
	}
	var instanceName = document.getElementById("instanceName").value;
    rest("http://211.83.111.206:7070/publish/station/rest/instance/criteria/condition;instanceName="+instanceName,
		 GET_METHOD,
		 null,
		 null,
		 callbackforlist_replica,
		 null,
    	region,
    	false);
}

function getinstancefromsearch()
{
    rest("http://211.83.111.206:7070/publish/station/rest/instance/criteria/condition;"+getcondition(),
		 GET_METHOD,
		 null,
		 null,
		 callbackforlistfromsearch,
		 null,
    	region,
    	false);
}

/*
 * 获取查询条件
 */
function getcondition()
{
    var condition = "";
    var con = new Array();
    var id = new Array("createrName","instanceName","templateName","status","scale","createTime","updateTime","publishTime");
    con[0] = document.getElementById("createrName").value;
    con[1] = document.getElementById("instanceName").value;
    con[2] = document.getElementById("templateName").value;
    con[3] = document.getElementById("status").value;
    con[4] = document.getElementById("scale").value;
    con[5] = document.getElementById("createTime").value;
    con[6] = document.getElementById("updateTime").value;
    con[7] = document.getElementById("publishTime").value;
    for(var i=0;i<8;i++){
        if(con[i]!=""){
            condition+=id[i]+"="+con[i]+";";
        }
    }
    console.log("condition="+condition);
    return condition;
}

/*
 *获取url上的参数 
 */
function getparameter(name)
{
    var url = location.search;
	url = decodeURI(url); //解码url，避免中文乱码
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = url.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

/*
 * 获取模板实例详情页信息
 */
function getdetail(templateDetailJson)
{
	var instanceName=document.getElementById("templateName");
	var scale=document.getElementById("scale");
	var createtime=document.getElementById("create-time");
	var creater=document.getElementById("creater");
	var updatetime=document.getElementById("update-time");
    var publishtime=document.getElementById("publish-time");
	var statu=document.getElementById("statu");
	
	instanceName.textContent=templateDetailJson.templateName;
	scale.textContent=templateDetailJson.scale;
	createtime.textContent=templateDetailJson.creatTime;
	creater.textContent=templateDetailJson.createrName;
	updatetime.textContent=templateDetailJson.updateTime;
//      publishtime.textContent=templateDetailJson.publishTime;
	statu.textContent=templateDetailJson.status;
	
	localStorage.setItem("templateID",getparameter("id"));
//  var i=templateDetailJson.previewData;
	localStorage.setItem("previewData",templateDetailJson.previewData);
	localStorage.setItem("CreaterName",templateDetailJson.createrName);
	sessionStorage.templatePreview=templateDetailJson.previewData;
	sessionStorage.templateName=templateDetailJson.templateName;
	var menu = parent.window.document.getElementById("iframe-menu");
	menu.src = "include/instance-menu.html?from=1";
}

/*
 * 详情页反馈函数
 */
function callbackforDetail(data)
{
	if(data.data!==undefined){				
		//alert(data.meta.code+" : "+data.meta.content);
		getdetailforinstance(data.data);
	}else{
		alert(data.code+" : "+data.content);
	}
}
function getdetailforinstance(templateDetailJson)
{
	var instanceName=document.getElementById("instanceName");
	var scale=document.getElementById("scale");
	var createtime=document.getElementById("create-time");
	var creater=document.getElementById("creater");
	var updatetime=document.getElementById("update-time");
    var publishtime=document.getElementById("publish-time");
	var statu=document.getElementById("statu");
	
	instanceName.textContent=templateDetailJson.templateName;
	scale.textContent=templateDetailJson.scale;
	createtime.textContent=templateDetailJson.creatTime.split(".")[0];
	creater.textContent=templateDetailJson.createrNames;
	updatetime.textContent=templateDetailJson.updateTime.split(".")[0];
    publishtime.textContent=templateDetailJson.publishTime.split(".")[0];
	statu.textContent=templateDetailJson.status;
	
	localStorage.setItem("instanceID",getparameter("id"));
//  var i=templateDetailJson.previewData;
	localStorage.setItem("instanceName",templateDetailJson.templateName);
	localStorage.setItem("CreaterName",templateDetailJson.createrName);
	sessionStorage.templatePreview=templateDetailJson.previewData;

	var menu = parent.window.document.getElementById("iframe-menu");
	menu.src = "include/instance-menu.html?from=3";
}
function getInstanceDetail()
{
	var serchtype=localStorage.getItem("searchtype");
	if(serchtype=="searchinstance")
	{
		var buttons=document.getElementsByClassName("button-confirm");
		for(var i=0;i<buttons.length;i++)
		{
			buttons[i].style.visibility="hidden";
		}
		var cancelbutton=document.getElementsByClassName("button-cancel");
		cancelbutton[0].style.width="10%";
		cancelbutton[0].style.marginRight="40%";
		cancelbutton[0].style.marginLeft="-20%";
	}
	if(serchtype=="replicainstance")
	{
		
	}
	rest("http://211.83.111.206:7070/publish/station/rest/instance/info/"+getparameter("id"),
		 GET_METHOD,
		 null,
		 null,
		 callbackforDetail,
		 null,
    	region,
    	false);
}

/*
 * 模板实例预览载入
 */
function instanceviewload(){
	var searchtype=localStorage.getItem("searchtype");
	if(searchtype=="searchinstance")
	{
		var buttons=document.getElementsByClassName("button-confirm");
		for(var i=0;i<buttons.length;i++)
		{
			buttons[i].style.visibility="hidden";
		}
		var cancelbutton=document.getElementsByClassName("button-cancel");
		cancelbutton[0].style.width="10%";
		cancelbutton[0].style.marginRight="40%";
		cancelbutton[0].style.marginLeft="-30%";
	}
    var pageview=document.getElementById("instance_pageview");
	var pagename=getparameter("pagename");
	var preview=sessionStorage.templatePreview;
	var previewData=preview.split(",");
	for(var i=0;i<previewData.length;i++)
	{
		var menuName=splitepreviewdata(previewData[i]);
		if(menuName==pagename)
		{
			pageview.src=previewData[i];
		}
	}
}

function restforDelete(i){
    rest("http:// 211.83.111.206:7070/publish/station/rest/instance/"+getClass(i),
		 DELETE_METHOD,
		 null,
		 null,
		 callback,
		 null,
    	region,
    	false);
}

/*
 * 删除/保存返回函数
 */
function callback1(data)
{
    alert(data.code+" : "+data.content);
}

function restforsave()
{
    rest("http://211.83.111.206:7070/publish/station/rest/instance/"+getparameter("id"),
		 PUT_METHOD,
		 "{\"instanceName\":\"testUP\",\"status\":1,\"temporaryData\":56768567,\"previewData\":1%2Cdata%3Aimage%2Fpng%3Bbase64%2CiVBORwOKGgoAAAANSUhEUgAAASwAAACWCAYAA,\"previewData\":1%2Cdata%3Aimage%2Fpng%3Bbase64%2CiVBORwOKGgoAAAANSUhEUgAAASwAAACWCAYAA}",
		 "application/x-www-form-urlencoded",
		 callback,
		 null);
}

function callbackforedit(data)
{
    if(data.data!==undefined){				
//			alert(data.meta.code+" : "+data.meta.content);
        getFile(data.data.temporaryData);
	}else{
		alert(data.code+" : "+data.content);
	}
}

function restforedit()
{
    rest("http://211.83.111.206:7070/publish/station/rest/instance/data/"+getparameter("id"),
		 GET_METHOD,
		 null,
		 null,
		 callbackforedit,
		 null,
    	region,
    	false
    );
}

function getFile(temporaryData){
        $.ajax({
        type: "GET",
        url: temporaryData+"",
        data:'',
        dataType: 'jsonp',
        jsonpCallback:'jsoncallback',  
        cache:false,
        success: function (json){
//          alert("right");
            alert(json.template_id);
        },
        error: function (data) {
                alert('fail');
        } 
});
}
/*
 * 将实例转换为图片
 */
function DrawPreviewData()
{
	jsonData=JSON.parse(localStorage.getItem("temporaryData"));
	var pages=jsonData.pages;
	var pageId=localStorage.getItem("pageID");
	var i=0;
	for(i;i<pages.length;i++)
	{
		if(pages[i].page_id==pageId)
		   localStorage.setItem("page_name",pages[i].page_name);
	}
	var myCanvas;
	html2canvas(document.getElementById("template"), {
                onrendered: function(canvas) {
					myCanvas=canvas;
					var img = new Image();
					img.src = myCanvas.toDataURL("image/png");
					var previewData = img.src;
					//each_data_img数据格式（page_id,page_name,img.src）			
					var each_data_img = localStorage.getItem("pageID") + "," + localStorage.getItem("page_name") + "," + previewData;
					console.log()
					console.log("each_data_img：" + each_data_img);
					data_img = JSON.stringify(each_data_img);
					data_img = data_img.substring(1, data_img.length - 1);
					data_img = encodeURIComponent(data_img);
					//增加id到data_img上
					var dataimgid = "data_img" + localStorage.getItem("pageID");
					window.localStorage.setItem(dataimgid, data_img);
                }
	});
	
}


/*
 * 从模板创建模板实例的返回页面，返回到设置新实例参数的页面
 */
function returnPage() {
	if (window.confirm('返回前请保存所编辑实例内容，否则将丢失数据！')) {
		//清除缓存中template_id变量，以保证在再次创建新模板的时候点击模板编辑页面的保存调用新建，而不是更新功能
		var menuopera = localStorage.getItem("menuopera");
		if (menuopera == "createfromteplate") {
			localStorage.removeItem("temporaryData");
			localStorage.removeItem("instanceName");
			localStorage.removeItem("menuopera");
			localStorage.removeItem("publishdata");
			localStorage.removeItem("pageID");
			var menu = parent.window.document.getElementById("iframe-content");
			menu.src = "instance/instancefromtemplate.html";
			window.open("../include/menu.html", "_self");
		}
		if (menuopera == "createfrominstancetoreplica") {
			var tempid = localStorage.getItem("oldinstanceID");			
			var content = parent.window.document.getElementById("iframe-content");
			content.src = encodeURI("instance/instancedetail_replica.html?id=" + tempid);
		}
		if(menuopera == "createfrominstancetoedit") {
			var tempid = localStorage.getItem("oldinstanceID");			
			var content = parent.window.document.getElementById("iframe-content");
			content.src = encodeURI("instance/instancedetail_replica.html?id=" + tempid);
		}
	}
}
//将图片转换为base64格式
function convertImgToBase64(url, callback, outputFormat) {
			var canvas = document.createElement('CANVAS');
			var ctx = canvas.getContext('2d');
			var img = new Image;
			img.crossOrigin = 'Anonymous';
			img.onload = function() {
				canvas.height = img.height;
				canvas.width = img.width;
				ctx.drawImage(img, 0, 0);
				var dataURL = canvas.toDataURL(outputFormat || 'image/png');
				callback.call(this, dataURL);
				// Clean up 
				canvas = null;
			};
			img.src = url;
		}