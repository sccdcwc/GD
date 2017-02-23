var temporaryData = [];
var template_pos;
var data_img = [];
var block_pos = [];
var blockId = 0;
var pageId = localStorage.getItem("page_id");
var each_block_pos;
//画布信息
var myCanvas = document.getElementsByTagName('canvas')[0];
	myCanvas.width = 960;
	myCanvas.height = 540;
	myCanvas.float = "left";
var ctx = myCanvas.getContext("2d");
var height = myCanvas.height, width = myCanvas.width;
var headBarHeight = 80, canvasPaddingTop = 20, canvasPaddingLeft = 20, canvasDivMarginLeft = 25, gridSize = 5, smallSize = 20;

//canvas外层的div
var mycanvas_div = document.getElementById("canvas_div");
var templateX = getPosition(mycanvas_div)[0],
	templateY = getPosition(mycanvas_div)[1];
	template_pos = {
		template_x: templateX,
		template_y: templateY,
		template_width: width,
		template_height: height
	};
localStorage.setItem("template_pos", JSON.stringify(template_pos));

//添加方块信息
var drawBtn = document.getElementById("draw");
var colorActive;
var active_box;//正在添加的block
var ab;
var divStart = [], divEnd = [], rectStart = [], rectMove = [], rectEnd = [];
var movingBox;
var moveStart = [];
var moveDis = [];
var mbTop,mbLeft;//移动前初始左上距离
//拖拽对象
var pre_right_div,
	pre_scale_div,
	pre_bottom_div;
/**
 * 画canvas格子，引入js,设置添加方块和删除方块事件
 */
function drawGrid() {
	/**
	 * 画画布格子
	 */
	for (var i = 0; i * gridSize <= height; i++) {
		ctx.strokeStyle = '#C7CAEB';
		ctx.beginPath();
		ctx.moveTo(0, i * gridSize);
		ctx.lineTo(width, i * gridSize);
		ctx.closePath();
		ctx.stroke();
	}
	for (var j = 0; j * gridSize <= width; j++) {
		ctx.strokeStyle = '#C7CAEB';
		ctx.beginPath();
		ctx.moveTo(j * gridSize, 0);
		ctx.lineTo(j * gridSize, height);
		ctx.closePath();
		ctx.stroke();
	}
	/**
	 * 引入zDialog.js和zDrag.js
	 */
	var otherJs = document.createElement("script");
	otherJs.setAttribute("type", "text/javascript");
	otherJs.setAttribute("src", "../scripts/zDialog.js");
	document.body.appendChild(otherJs);
	var otherJs2 = document.createElement("script");
	otherJs2.setAttribute("type", "text/javascript");
	otherJs2.setAttribute("src", "../scripts/zDrag.js");
	document.body.appendChild(otherJs2);
	/**
	 * 添加方块、删除方块、保存按钮、发布按钮
	 */
	document.getElementById("draw").onclick = function() {
		drawBlock(event);
	}
	document.getElementById("delete").onclick = function() {
		deleteBlock();
	}
	document.getElementById("save_button").onclick = function(){
		saveTemplate();
	}
	document.getElementById("release_button").onclick = function(){
		releaseTemplate();
	}
}


document.onmousedown = function(e){
	if(e.target.className.indexOf("box") >= 0){
		stopEventBubble(e);
		if(drawBtn.style.color == colorActive){
			alert("请在空白地方绘制方块！")
		}else{
			if($(this).hasClass("selected") > 0) {
				$(this).removeClass("selected");
				$(this).css("background", "#fff");
			}else{
				$(this).addClass("selected");
				$(this).css("background", "#ccc");
			}
			e.target.className += " movingBox";
			moveStart[0] = e.pageX;
			moveStart[1] = e.pageY;
			mbTop = parseInt(del_last_two_char(e.target.style.top));
			mbLeft = parseInt(del_last_two_char(e.target.style.left));
		}
	}else if(e.target.id == "canvas_to_grid"){
		stopEventBubble(e);
		if(drawBtn.style.color  == colorActive){
			rectStart = getRectPos(e.pageX,e.pageY);
			divStart[0] = rectStart[0] + canvasPaddingLeft - 0.5;
			divStart[1] = rectStart[1] + myCanvas.offsetTop - 0.5;
			active_box = document.createElement("div");
			active_box.id = "active_box";
			active_box.className = "box";
			active_box.style.left = divStart[0]  + 'px';
			active_box.style.top = divStart[1]  + 'px';
			mycanvas_div.appendChild(active_box);
			active_box = null;
		}else{
			alert("请点击--添加方块按钮--后进行绘制！")
		}
	}
}
document.onmousemove = function(e){
	if(document.getElementById("active_box") !== null) {
		ab = document.getElementById("active_box");
		rectMove = getRectPos(e.pageX, e.pageY);
		ab.style.width = (rectMove[0] - rectStart[0]) + 'px';
		ab.style.height = (rectMove[1] - rectStart[1]) + 'px';
		document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(ab.style.width) + ",宽：" + del_last_two_char(ab.style.height) + ",长宽比：" + 16 +":" + 16/parseInt(del_last_two_char(ab.style.width))*parseInt(del_last_two_char(ab.style.height));
	}else if(document.getElementsByClassName("movingBox").length != 0){
		movingBox = document.getElementsByClassName("movingBox")[0];
		moveDis[0] = Math.ceil((e.pageX - moveStart[0])/gridSize)*gridSize;
		moveDis[1] = Math.ceil((e.pageY - moveStart[1])/gridSize)*gridSize;
		if(moveDis[0] < 0 && Math.abs(moveDis[0]) > (mbLeft - canvasPaddingLeft)){
			movingBox.style.left = canvasPaddingLeft +"px";
		}else if(moveDis[0] > 0 && (mbLeft - canvasPaddingLeft + parseInt(del_last_two_char(movingBox.style.width)) + moveDis[0]) > myCanvas.width){
			movingBox.style.left = myCanvas.width - parseInt(del_last_two_char(movingBox.style.width)) + canvasPaddingLeft + "px";
		}else{
			movingBox.style.left = (mbLeft + moveDis[0]) + "px";
		}
		if(moveDis[1] < 0 && Math.abs(moveDis[1])> (mbTop - canvasPaddingTop)){
			movingBox.style.top = canvasPaddingTop + "px";
		}else if(moveDis[1] > 0 && (mbTop - canvasPaddingTop + parseInt(del_last_two_char(movingBox.style.height)) + moveDis[1]) > myCanvas.height){
			movingBox.style.top = myCanvas.height - parseInt(del_last_two_char(movingBox.style.height)) + canvasPaddingTop + "px";		
		}else{
			movingBox.style.top = (mbTop + moveDis[1])+ "px";
		}
	}
}
document.onmouseup = function(e){	
	if(document.getElementById("active_box") !== null) {
		// console.log("active_box");
		drawBtn.style.backgroundColor = "#dddddd";
		drawBtn.style.color = "#333";
		ab = document.getElementById("active_box");
		var page_id = getparameter("page_id");
		var pageInfo = JSON.parse(localStorage.getItem(page_id));
		var blockNum = pageInfo.blockData.length;
		var judgeBlock = true;
		for (var existBlock = 0; existBlock < blockNum; existBlock++) {
			var block_X = pageInfo.blockData[existBlock].block_x,
				block_Y = pageInfo.blockData[existBlock].block_y,
				block_endY = pageInfo.blockData[existBlock].block_height + block_Y,
				block_endX = pageInfo.blockData[existBlock].block_width + block_X;
			var drawEndX = rectStart[0] + parseInt(del_last_two_char(ab.style.width)),
				drawEndY = rectStart[1] + parseInt(del_last_two_char(ab.style.height));
			if (block_X > rectStart[0] && block_Y > rectStart[1]) {
				if (drawEndX > block_X && drawEndY > block_Y) {
					// alert("添加失败---原有区域被覆盖1");
					judgeBlock = false;
					break;
				}
			} else if (block_Y <= rectStart[1] && rectStart[1] < block_endY && block_X > rectStart[0]) {
				if (drawEndX > block_X) {
					// alert("添加失败---原有区域被覆盖2");
					judgeBlock = false;
					break;
				}
			} else if (block_X <= rectStart[0] && rectStart[0] < block_endX && block_Y > rectStart[1]) {
				if (drawEndY > block_Y) {
					// alert("添加失败---原有区域被覆盖3");
					judgeBlock = false;
					break;
				}
			}
		}
		if (judgeBlock) {
			//长或宽不足一格时，移除active_box
			if (ab.offsetWidth < gridSize || ab.offsetHeight < gridSize) {
				document.getElementById("canvas_div").removeChild(ab);
				alert("所画方块不足一格");
			}else{
				var rectMoveEndX = parseInt(del_last_two_char(ab.style.left)) - canvasPaddingLeft + parseInt(del_last_two_char(ab.style.width));
				var rectMoveEndY = parseInt(del_last_two_char(ab.style.top)) - canvasPaddingTop + parseInt(del_last_two_char(ab.style.height));
				rectEnd = getRectPos(e.pageX, e.pageY);
				if(rectMoveEndX >= myCanvas.width){
					rectEnd[0] = myCanvas.width;
					ab.style.width = (rectEnd[0] - rectStart[0]) + "px";
				}
				if(rectMoveEndY >= myCanvas.height){
					rectEnd[1] = myCanvas.height;
					ab.style.height = (rectEnd[1] - rectStart[1]) + "px";
				}
				//初次画好的方块添加右、下、右下拖放模块
				var pre_right_div = document.createElement("div");
				pre_right_div.className = "pre_right_div";
				pre_right_div.style.cssText = "width:15px;height:100%;background:#f00;float:right;position:absolute;right:0;top:0;cursor:e-resize;overflow:hidden;opacity:0;z-index:1";
				ab.appendChild(pre_right_div);
				var pre_scale_div = document.createElement("div");
				pre_scale_div.style.cssText = "width:15px;height:15px;background:#99CC00;position:absolute;right:0px;bottom:0px;cursor:nw-resize;overflow:hidden;font-size:12px;text-align:center;line-height:15px;color:#FFFFFF;float:right;z-index:3";
				pre_scale_div.innerHTML = "拖";
				ab.appendChild(pre_scale_div);
				var pre_bottom_div = document.createElement("div");
				pre_bottom_div.style.cssText = "width:100%;height:15px;background:#f00;position:absolute;left:0;bottom:0;cursor:n-resize;overflow:hidden;filter:alpha(opacity:0);opacity:0;z-index:1";
				ab.appendChild(pre_bottom_div);	
				//当前页面的信息：page_id,page_name,blockData[]
				var abs = JSON.parse(localStorage.getItem(page_id));
				if(abs.blockData.length == 0) {
					blockId = 0;
				}else{
					var maxblockid = 0;
					for (var i = 0; i < abs.blockData.length; i++) {
						if (abs.blockData[i].block_id > maxblockid) {
							maxblockid = abs.blockData[i].block_id;
						}
					}
					blockId = maxblockid + 1;
				};
				ab.removeAttribute("id");
				ab.id = blockId;
				/**
				 * 当前所画方块信息-----posR 方块结束时的位置
				 */
				each_block_pos = {
					block_id: blockId,
					block_x: rectStart[0],
					block_y: rectStart[1],
					block_width: rectEnd[0] - rectStart[0],
					block_height: rectEnd[1] - rectStart[1]
				};
				/**
				 * 显示所画方块的长宽比---求最大公约数
				 */					
				// var max_d = maxCommonDivisor(each_block_pos.block_width, each_block_pos.block_height);
				// document.getElementById("block_data").innerHTML = "长：" + each_block_pos.block_width + ",宽：" + each_block_pos.block_height + ",长宽比：" + each_block_pos.block_width / max_d + ":" + each_block_pos.block_height / max_d;
				document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(ab.style.width) + 
				",宽：" + del_last_two_char(ab.style.height) + 
				",长宽比：" + 16 +
				":" + 16/parseInt(del_last_two_char(ab.style.width))*parseInt(del_last_two_char(ab.style.height));
				/**
				 * 将新画的方块信息加入对于页面的缓存
				 */
				if(localStorage.getItem(page_id) !== null) {
					block_pos = JSON.parse(localStorage.getItem(page_id));
				}
				if(each_block_pos.block_width > gridSize && each_block_pos.block_height > gridSize) {
					block_pos.blockData.push(each_block_pos);
				}
				localStorage.setItem(page_id, JSON.stringify(block_pos));
				/**
				 * 方块拖拽
				 */
				var mouseStart = {};
				var divStart = {};
				var rightStart = {};
				var bottomStart = {};
				//拽动方法
				//往右拽
				pre_right_div.onmousedown = function(ev) {
					stopEventBubble(ev);
					var oEvent = ev || event;
					ab = ev.target.parentNode;
					mouseStart.x = oEvent.clientX;
					mouseStart.y = oEvent.clientY;
					rightStart.x = pre_right_div.offsetLeft;
					if (pre_right_div.setCapture) {
						pre_right_div.onmousemove = doDrag1;
						pre_right_div.onmouseup = stopDrag1;
						pre_right_div.setCapture();
					} else {
						document.addEventListener("mousemove", doDrag1, true);
						document.addEventListener("mouseup", stopDrag1, true);
					}
				};
				//往下拽
				pre_bottom_div.onmousedown = function(ev) {
					stopEventBubble(ev);
					var oEvent = ev || event;
					ab = ev.target.parentNode;
					mouseStart.x = oEvent.clientX;
					mouseStart.y = oEvent.clientY;
					bottomStart.y = pre_bottom_div.offsetTop;
					if (pre_bottom_div.setCapture) {
						pre_bottom_div.onmousemove = doDrag2;
						pre_bottom_div.onmouseup = stopDrag2;
						pre_bottom_div.setCapture();
					} else {
						document.addEventListener("mousemove", doDrag2, true);
						document.addEventListener("mouseup", stopDrag2, true);
					}
				};
				//往右下同时拽
				pre_scale_div.onmousedown = function(ev) {
					stopEventBubble(ev);
					var oEvent = ev || event;
					ab = ev.target.parentNode;
					mouseStart.x = oEvent.clientX;
					mouseStart.y = oEvent.clientY;
					divStart.x = pre_scale_div.offsetLeft;
					divStart.y = pre_scale_div.offsetTop;
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
				function doDrag1(ev){
					var page_id = getparameter("page_id");
					var oEvent = ev || event;
					var l = oEvent.clientX - mouseStart.x + rightStart.x;
					var w = l + pre_scale_div.offsetWidth;
					if (w < pre_scale_div.offsetWidth) {
						w = pre_scale_div.offsetWidth;
					} else if (w > document.documentElement.clientWidth - ab.offsetLeft) {
						w = document.documentElement.clientWidth - ab.offsetLeft;
					}
					w = Math.ceil(w / gridSize) * gridSize;
					var tmp_w = Math.ceil(w / gridSize);
					var v_w = tmp_w * gridSize;
					if(v_w < smallSize){
						v_w = smallSize;
					}
					ab.style.width = v_w + "px";
					document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(ab.style.width) + 
					",宽：" + del_last_two_char(ab.style.height) + 
					",长宽比：" + 16 +
					":" + 16/parseInt(del_last_two_char(ab.style.width))*parseInt(del_last_two_char(ab.style.height));
					// var r_max_d = maxCommonDivisor(parseInt(del_last_two_char(ab.style.width)), parseInt(del_last_two_char(ab.style.height)));
					// document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(ab.style.width) + ",宽：" + del_last_two_char(ab.style.height) + ",长宽比：" + parseInt(del_last_two_char(ab.style.width)) / r_max_d + ":" + parseInt(del_last_two_char(ab.style.height)) / r_max_d;
				};
				/**
				 * mouseup -- 往右拽
				 */
				function stopDrag1(){
					var judgeDrag = true;
					var curBlockId = ab.id;
					var pageInfo = JSON.parse(localStorage.getItem(page_id));
					rectStart[0] = pageInfo.blockData[curBlockId].block_x;
					rectStart[1] = pageInfo.blockData[curBlockId].block_y;
					for (var existBlock = 0; existBlock < pageInfo.blockData.length; existBlock++) {						
						if(pageInfo.blockData[existBlock].block_id == curBlockId){
							continue;
						}
						var block_X = pageInfo.blockData[existBlock].block_x,
							block_Y = pageInfo.blockData[existBlock].block_y,
							block_endY = pageInfo.blockData[existBlock].block_height + block_Y,
							block_endX = pageInfo.blockData[existBlock].block_width + block_X;
						var drawEndX = rectStart[0] + parseInt(del_last_two_char(ab.style.width)),
							drawEndY = rectStart[1] + parseInt(del_last_two_char(ab.style.height));
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
						var rectMoveEndX = parseInt(del_last_two_char(ab.style.left)) - canvasPaddingLeft + parseInt(del_last_two_char(ab.style.width));
						// var rectMoveEndY = parseInt(del_last_two_char(ab.style.top)) - canvasPaddingTop + parseInt(del_last_two_char(ab.style.height));
						if(rectMoveEndX >= myCanvas.width){
							ab.style.width = (myCanvas.width - rectStart[0]) + "px";
						}
						// if(rectMoveEndY >= myCanvas.height){
						// 	ab.style.height = (myCanvas.height - rectStart[1]) + "px";
						// }
						var pageinfo = localStorage.getItem(page_id);
						var pageJson = JSON.parse(pageinfo);
						for (var curBlockData = 0; curBlockData < pageJson.blockData.length; curBlockData++) {
							if (pageJson.blockData[curBlockData].block_id == ab.id) {
								pageJson.blockData[curBlockData].block_width = parseInt(del_last_two_char(ab.style.width));
							}
						}
						localStorage.setItem(page_id, JSON.stringify(pageJson));		
					}else{
						alert("覆盖其他方块，更改失败！")
						for(var i = 0; i < pageInfo.blockData.length; i++){
							console.log(pageInfo.blockData[i].block_id)
							if(pageInfo.blockData[i].block_id == curBlockId){
								console.log(pageInfo.blockData[i].block_width)
								ab.style.width = pageInfo.blockData[i].block_width + "px";
							}else{
								continue;
							}
						}
					}
					if (pre_right_div.releaseCapture) {
						pre_right_div.onmousemove = null;
						pre_right_div.onmouseup = null;
						pre_right_div.releaseCapture();
					}else{
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
					var t = oEvent.clientY - mouseStart.y + bottomStart.y;
					var h = t + pre_scale_div.offsetHeight;
					if (h < pre_scale_div.offsetHeight) {
						h = pre_scale_div.offsetHeight;
					}else if (h > document.documentElement.clientHight - ab.offsetTop) {
						h = document.documentElement.clientHight - ab.offsetTop;
					}
					h = Math.ceil(h / gridSize) * gridSize;
					var tmp_h = Math.ceil(h / gridSize);
					var v_h = tmp_h * gridSize;
					if(v_h < smallSize){
						v_h = smallSize;
					}
					ab.style.height = v_h + "px";
					document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(ab.style.width) + 
					",宽：" + del_last_two_char(ab.style.height) + 
					",长宽比：" + 16 +
					":" + 16/parseInt(del_last_two_char(ab.style.width))*parseInt(del_last_two_char(ab.style.height));
					
					// var r_max_d = maxCommonDivisor(parseInt(del_last_two_char(ab.style.width)), parseInt(del_last_two_char(ab.style.height)));
					// document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(ab.style.width) + ",宽：" + del_last_two_char(ab.style.height) + ",长宽比：" + parseInt(del_last_two_char(ab.style.width)) / r_max_d + ":" + parseInt(del_last_two_char(ab.style.height)) / r_max_d;
				};
				/**
				 * mouseup -- 往下拽
				 */
				function stopDrag2() {	
					var judgeDrag = true;
					var curBlockId = ab.id;
					var pageInfo = JSON.parse(localStorage.getItem(page_id));
					rectStart[0] = pageInfo.blockData[curBlockId].block_x;
					rectStart[1] = pageInfo.blockData[curBlockId].block_y;
					for (var existBlock = 0; existBlock < pageInfo.blockData.length; existBlock++) {						
						if(pageInfo.blockData[existBlock].block_id == curBlockId){
							continue;
						}
						var block_X = pageInfo.blockData[existBlock].block_x,
							block_Y = pageInfo.blockData[existBlock].block_y,
							block_endY = pageInfo.blockData[existBlock].block_height + block_Y,
							block_endX = pageInfo.blockData[existBlock].block_width + block_X;
						var drawEndX = rectStart[0] + parseInt(del_last_two_char(ab.style.width)),
							drawEndY = rectStart[1] + parseInt(del_last_two_char(ab.style.height));
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
						// var rectMoveEndX = parseInt(del_last_two_char(ab.style.left)) - canvasPaddingLeft + parseInt(del_last_two_char(ab.style.width));
						var rectMoveEndY = parseInt(del_last_two_char(ab.style.top)) - canvasPaddingTop + parseInt(del_last_two_char(ab.style.height));
						// if(rectMoveEndX >= myCanvas.width){
						// 	ab.style.width = (myCanvas.width - rectStart[0]) + "px";
						// }
						if(rectMoveEndY >= myCanvas.height){
							ab.style.height = (myCanvas.height - rectStart[1]) + "px";
						}
						var pageinfo = localStorage.getItem(page_id);
						var pageJson = JSON.parse(pageinfo);
						for (var curBlockData = 0; curBlockData < pageJson.blockData.length; curBlockData++) {
							if (pageJson.blockData[curBlockData].block_id == ab.id) {
								pageJson.blockData[curBlockData].block_height = parseInt(del_last_two_char(ab.style.height));
							}
						}
						localStorage.setItem(page_id, JSON.stringify(pageJson));		
					}else{
						alert("覆盖其他方块，更改失败！")
						for(var i = 0; i < pageInfo.blockData.length; i++){
							console.log(pageInfo.blockData[i].block_id)
							if(pageInfo.blockData[i].block_id == curBlockId){
								ab.style.height = pageInfo.blockData[i].block_height + "px";
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
					var oEvent = ev || event;
					var l = oEvent.clientX - mouseStart.x + divStart.x;
					var t = oEvent.clientY - mouseStart.y + divStart.y;
					var w = l + pre_scale_div.offsetWidth;
					var h = t + pre_scale_div.offsetHeight;
					if (w < pre_scale_div.offsetWidth) {
						w = pre_scale_div.offsetWidth;
					} else if (w > document.documentElement.clientWidth - ab.offsetLeft) {
						w = document.documentElement.clientWidth - ab.offsetLeft;
					}
					if (h < pre_scale_div.offsetHeight) {
						h = pre_scale_div.offsetHeight;
					}else if (h > document.documentElement.clientHeight - ab.offsetTop) {
						h = document.documentElement.clientHeight - ab.offsetTop;
					}
					h = Math.ceil(h / gridSize) * gridSize;
					m = Math.ceil(w / gridSize) * gridSize;
					var tmp_h = Math.ceil(h / gridSize);
					var tmp_w = Math.ceil(w / gridSize);
					var v_h = tmp_h * gridSize;
					var v_w = tmp_w * gridSize;
					if(v_h < smallSize){
						v_h = smallSize;
					}
					if(v_w < smallSize){
						v_w = smallSize;
					}
					ab.style.width = v_w + "px";
					ab.style.height = v_h + "px";
					document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(ab.style.width) + 
					",宽：" + del_last_two_char(ab.style.height) + 
					",长宽比：" + 16 +
					":" + 16/parseInt(del_last_two_char(ab.style.width))*parseInt(del_last_two_char(ab.style.height));
					// var r_max_d = maxCommonDivisor(parseInt(del_last_two_char(ab.style.width)), parseInt(del_last_two_char(ab.style.height)));
					// document.getElementById("block_data").innerHTML = "长：" + del_last_two_char(ab.style.width) + ",宽：" + del_last_two_char(ab.style.height) + ",长宽比：" + parseInt(del_last_two_char(ab.style.width)) / r_max_d + ":" + parseInt(del_last_two_char(ab.style.height)) / r_max_d;
				};
				/**
				 * mouseup --- 右下拽
				 */
				function stopDrag() {
					var judgeDrag = true;
					var curBlockId = ab.id;
					var pageInfo = JSON.parse(localStorage.getItem(page_id));
					rectStart[0] = pageInfo.blockData[curBlockId].block_x;
					rectStart[1] = pageInfo.blockData[curBlockId].block_y;
					for (var existBlock = 0; existBlock < pageInfo.blockData.length; existBlock++) {						
						if(pageInfo.blockData[existBlock].block_id == curBlockId){
							continue;
						}
						var block_X = pageInfo.blockData[existBlock].block_x,
							block_Y = pageInfo.blockData[existBlock].block_y,
							block_endY = pageInfo.blockData[existBlock].block_height + block_Y,
							block_endX = pageInfo.blockData[existBlock].block_width + block_X;
						var drawEndX = rectStart[0] + parseInt(del_last_two_char(ab.style.width)),
							drawEndY = rectStart[1] + parseInt(del_last_two_char(ab.style.height));
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
						var rectMoveEndX = parseInt(del_last_two_char(ab.style.left)) - canvasPaddingLeft + parseInt(del_last_two_char(ab.style.width));
						var rectMoveEndY = parseInt(del_last_two_char(ab.style.top)) - canvasPaddingTop + parseInt(del_last_two_char(ab.style.height));
						if(rectMoveEndX >= myCanvas.width){
							ab.style.width = (myCanvas.width - rectStart[0]) + "px";
						}
						if(rectMoveEndY >= myCanvas.height){
							ab.style.height = (myCanvas.height - rectStart[1]) + "px";
						}
						var pageinfo = localStorage.getItem(page_id);
						var pageJson = JSON.parse(pageinfo);
						for (var curBlockData = 0; curBlockData < pageJson.blockData.length; curBlockData++) {
							if (pageJson.blockData[curBlockData].block_id == ab.id) {
								pageJson.blockData[curBlockData].block_width = parseInt(del_last_two_char(ab.style.width));
								pageJson.blockData[curBlockData].block_height = parseInt(del_last_two_char(ab.style.height));
							
							}
						}
						localStorage.setItem(page_id, JSON.stringify(pageJson));		
					}else{
						alert("覆盖其他方块，更改失败！")
						for(var i = 0; i < pageInfo.blockData.length; i++){
							if(pageInfo.blockData[i].block_id == curBlockId){
								ab.style.width = pageInfo.blockData[i].block_width + "px";
								ab.style.height = pageInfo.blockData[i].block_height + "px";
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
				ab.onclick = function() {
					stopEventBubble(event);
					if ($(this).attr("class").indexOf("selected") > 0) {
						$(this).removeClass("selected");
						$(this).css("background", "#fff");
					} else {
						$(this).addClass("selected");
						$(this).css("background", "#ccc");
					}
				}
			}
		} else {
			alert("添加失败---原有方块被覆盖");
			document.getElementById("canvas_div").removeChild(ab);
		}
	}else if(document.getElementsByClassName("movingBox").length!= 0){
		movingBox = document.getElementsByClassName("movingBox")[0];
		var curBlockId = movingBox.id;
		var judgeDrag =true;		
		var page_id = getparameter("page_id");
		var pageInfo = JSON.parse(localStorage.getItem(page_id))
		for(var i = 0 ;i < pageInfo.blockData.length;i ++){
			if(pageInfo.blockData[i].block_id == curBlockId){
				continue;
			}			
			var block_X = pageInfo.blockData[i].block_x,
				block_Y = pageInfo.blockData[i].block_y,
				block_endY = pageInfo.blockData[i].block_height + block_Y,
				block_endX = pageInfo.blockData[i].block_width + block_X;
			var moveEndTop = parseInt(del_last_two_char(movingBox.style.top)) - canvasPaddingTop,
				moveEndLeft = parseInt(del_last_two_char(movingBox.style.left)) - canvasPaddingLeft,
				moveEndX = moveEndLeft + parseInt(del_last_two_char(movingBox.style.width)),
				moveEndY = moveEndTop + parseInt(del_last_two_char(movingBox.style.height));
				// console.log(block_X)
			if (block_X > moveEndLeft && block_Y > moveEndTop) {
				if (moveEndX > block_X && moveEndY > block_Y) {
					// alert("添加失败---原有区域被覆盖1");
					judgeDrag = false;
					break;
				}
			} else if (block_Y <= moveEndTop && moveEndTop < block_endY && block_X > moveEndLeft) {
				if (moveEndX > block_X) {
					// alert("添加失败---原有区域被覆盖2");
					judgeDrag = false;
					break;
				}
			} else if (block_X <= moveEndLeft && moveEndLeft < block_endX && block_Y > moveEndTop) {
				if (moveEndY > block_Y) {
					// alert("添加失败---原有区域被覆盖3");
					judgeDrag = false;
					break;
				}
			} else if(block_X <=  moveEndLeft && moveEndLeft < block_endX ){
				if(moveEndTop < block_endY){
					judgeDrag = false;
					break;
				}
			}
		}
		if(judgeDrag){
			for (var curBlockData = 0; curBlockData < pageInfo.blockData.length; curBlockData++) {
				if (pageInfo.blockData[curBlockData].block_id == curBlockId) {
					pageInfo.blockData[curBlockData].block_x = parseInt(del_last_two_char(movingBox.style.left)) - canvasPaddingLeft;
					pageInfo.blockData[curBlockData].block_y = parseInt(del_last_two_char(movingBox.style.top)) - canvasPaddingTop;
				}
			}
			localStorage.setItem(page_id, JSON.stringify(pageInfo));
		}else{
			alert("覆盖其他方块，移动失败！")
			for(var i = 0; i < pageInfo.blockData.length; i++){
				if(pageInfo.blockData[i].block_id == curBlockId){
					movingBox.style.left = pageInfo.blockData[i].block_x  + canvasPaddingTop + "px";
					movingBox.style.top = pageInfo.blockData[i].block_y + canvasPaddingTop +"px";
				}else{
					continue;
				}
			}
		}
		$(movingBox).removeClass("movingBox");
	}		
}
/**
 * 点击添加方块
 */
function drawBlock() {
	drawBtn.style.backgroundColor = "#3399FF";
	drawBtn.style.color = "#fff";
	colorActive = drawBtn.style.color;
}
/**
 * 点击删除按钮
 */
function deleteBlock() {
	if ($(".selected").length == 0) {
		alert("没有选中的方块！")
	} else {
		if (confirm("确定要删除" + $(".selected").length + "个选中的方块吗？")) {
			var page_id = getparameter("page_id");
			var pageInfo = JSON.parse(localStorage.getItem(page_id));
			for (var selectedNum = 0; selectedNum < $(".selected").length; selectedNum++) {
				var curblockId = parseInt($(".selected").eq(selectedNum).attr("id"));
				for (var blockIndex = 0; blockIndex < pageInfo.blockData.length; blockIndex++) {
					if (pageInfo.blockData[blockIndex].block_id == curblockId) {
						pageInfo.blockData.splice(blockIndex, 1);
					}
				}
			}
			localStorage.setItem(page_id, JSON.stringify(pageInfo));
			$(".selected").remove();
		}
	}
}
/**
 * 点击保存按钮
 */
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
				alert(data.meta.content);
				console.log("新生成的模板id=" + data.data.templateId);
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
				alert(data.content);
			}, 
			error: function(jqXHR) {
				alert("jqXHR.status---------" + jqXHR.status);
			}
		});
	}
}
/**
 * 点击发布按钮
 */
function releaseTemplate(){
	var template_pos = JSON.parse(localStorage.getItem("template_pos"));
	var templatepages = JSON.parse(localStorage.getItem("templatepages"));
	var templateid = localStorage.getItem("template_id");
	var data = {
		"template_id": templateid,
		"template_x": template_pos.template_x,
		"template_y": template_pos.template_y,
		"template_width": template_pos.template_width,
		"template_height": template_pos.template_height,
		"pages": templatepages.temporaryData,
	};
	data = JSON.stringify(data);
	data = "publishData=" + data;
	console.log("---publishdata: " + data);
	//如果template_id为空，则表示是新增模板，否则是更新模板
	if (templatepages == null) {
		alert("空模板，无法发布！");
	}else{
		var aurl = "http://211.83.111.206:7070/publish/station/rest/template/release/" + templateid;
		console.log(aurl);
		$.ajax({
			type: "put",
			url: aurl,
			data: data,
			contentType: "application/x-www-form-urlencoded",
			success: function(data) {
				if (data.code == "202")
					alert("发布成功");
				if (data.code == "206")
					alert("发布失败");
			}, 
			error: function(jqXHR) {
				alert("jqXHR.status---------" + jqXHR.status);
			}
		});
	}
}

/**
 * 获取元素相对于offsetParent的左上角和右下角坐标
 */
function getPosition(oElement) {
	var width = oElement.offsetWidth,
		height = oElement.offsetHeight,
		posX = oElement.offsetLeft,
		posY = oElement.offsetTop;
	var x2 = posX + width,
		y2 = posY + height;
	return [posX,posY,x2,y2];
}
/**
 * 鼠标位置相对canvas左上角的距离
 */
function getRectPos(pageX,pageY){
	var rectLX = parseInt((pageX - myCanvas.offsetLeft - canvasDivMarginLeft)/gridSize)*gridSize,
		rectLY = parseInt((pageY - myCanvas.offsetTop - headBarHeight)/gridSize)*gridSize;
	return [rectLX,rectLY];
}
/*
 *获取url上的参数
 */
function getparameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
function stopEventBubble(event) {
	var e = event || window.event;
	if (e && e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}
//json数组去重
function unique(arr) {
	var hash = {};
	for (var i = 0; i < arr.length; i++) {
		//去除json数组里面重复情况
		(hash[arr[i]] == undefined) && (hash[arr[i]["page_name"] + "," + arr[i]["page_id"] + "," + arr[i]["block_id"] + "," + arr[i]["start_x"] + "," + arr[i]["start_y"] + "," + arr[i]["width"] + "," + arr[i]["height"]] = arr[i]["page_name"] + "," + arr[i]["page_id"] + "," + arr[i]["block_id"] + "," + arr[i]["start_x"] + "," + arr[i]["start_y"] + "," + arr[i]["width"] + "," + arr[i]["height"]);
	}
	var arrNum = [];
	for (var o in hash) {
		//alert(o);
		page_name = o.split(",")[0];
		page_id = o.split(",")[1];
		block_id = o.split(',')[2];
		start_x = o.split(',')[3];
		start_y = o.split(',')[4];
		width = o.split(',')[5];
		height = o.split(',')[6];
		var ar = "{" + "page_name:" + page_name + "," + "page_id:" + page_id + "," + "block_id:" + block_id + "," + "start_x:" + start_x + "," + "start_y:" + start_y + "," + "width:" + width + "," + "height:" + height + "}";
		ar = eval('(' + ar + ')');
		//document.write(arr);
		arrNum.push(ar);
		//document.write("<br>");
	}
	return arrNum;

}
//判断某个值是否在数组中
function inArray(stringToSearch, arrayToSearch) {
	for (s = 0; s < arrayToSearch.length; s++) {
		thisEntry = arrayToSearch[s].toString();
		if (thisEntry == stringToSearch) {
			return true;
		}
	}
	return false;
}

//查找指定的值在数组中的位置
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};

//根据上述函数得到的索引，从数组中删除此数
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};

function maxCommonDivisor(m, n) { //辗转相除法 求最大公约数
	if (m < n) { // 保证m>n,若m<n,则进行数据交换  
		var temp = m;
		m = n;
		n = temp;
	}
	while (m % n != 0) { // 在余数不能为0时,进行循环  
		var temp = m % n;
		m = n;
		n = temp;
	}
	return n; // 返回最大公约数  
}
//去掉最后两个字符
function del_last_two_char(str) {
	return str.substring(0, str.length - 2);
}


document.oncontextmenu = function(){return false};
document.ondragstart=function(){return false};
document.onselectstart =function(){return false};
document.onselect=function(){document.selection.empty();};
document.oncopy=function(){document.selection.empty();};
document.onbeforecopy=function(){return false};