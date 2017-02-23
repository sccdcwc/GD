/*
 * 获取已发布模板状态
 */
function gettemplate2()
{
	var templateName = document.getElementById("templateName").value;
	//var addr = "http://211.83.111.206:7070/publish/station/rest/template/criteria/condition;templateName="+templateName;
	
	rest(
    //"http://211.83.111.206:7070/publish/station/rest/template/criteria/condition;createrName=333",
		"http://211.83.111.206:7070/publish/station/rest/template/criteria/condition;status=3;templateName="+templateName,
		 GET_METHOD,
		 null,
		 null,
		 callbackforlist,
		 null,
		"成都",
		false);
}
/*
 * 获取列表回调函数
 */
function callbackforlist(data){
			if(data.data!==undefined){				
//				var Json1=JSON.stringify(data.data.templateMatchList);
//				alert(data.meta.code+" : "+data.meta.content);
			    addtemplate(data.data.templateMatchList);
			    localStorage.setItem("searchtype","searchtemplate");
			}else{
				alert(data.code+" : "+data.content);
			}
//			alert("callback:"+data);
}