function menu_createtemplate()
{
	var content=parent.window.document.getElementById("iframe-content");
	content.src="template/choosestyle.html";
}


function menu_searchtemplate()
{
	var content=parent.window.document.getElementById("iframe-content");
	content.src="template/searchtemplate.html";
}

function menu_changemenu()
{ 	
	var menu=parent.window.document.getElementById("iframe-menu");
	menu.src="include/model-menu.html";
}

function menu_createinstance()
{
	var content=parent.window.document.getElementById("iframe-content");
	content.src="instance/choosestyle.html";
}

function menu_searchinstance()
{
	var content=parent.window.document.getElementById("iframe-content");
	content.src="instance/searchinstance.html";
}

function clearall()
{
	localStorage.clear();
	sessionStorage.clear();
}
