var temDM = TemplateDataManageSingle.getInstance();
function TemplateRevert()
{  
	  
}  
TemplateRevert.prototype={
		  revertPage:function(pageId)
		  {
			  var jsonData = temDM.getJsonData();
			  var pageData = temDM.getPage(pageId);
			  var page_bg = "";
			  var repeat = "";
			  if(pageData.page_data != null){
				  page_bg = pageData.page_data.page_bg;
				  repeat = pageData.page_data.repeat;
			  }
			  var style= 'width:'+jsonData.template_width+'px;height:'+jsonData.template_height+'px;border:20px solid #53585F;border-radius:10px;margin:5px 5px 5px 5px;background:url('+page_bg+') '+repeat;
			  var html = '<div id="total_are" style="'+style+'"><input id="hidden_pageId" hidden="true" value="'+pageId+'"/>';
			  for(var i=0;i<pageData.blockData.length;i++){
				  var block = pageData.blockData[i];
				  html =html + this.revertBlock(pageId,block.block_id);
			  }
			  html = html + '</div>';
			  return html;
		  },
		  revertBlock:function(pageId,block_id)
		  {
			    var jsonData = temDM.getJsonData();
			    var pageData = temDM.getPage(pageId);
			    var blockProperty = pageData.blockProperty;
			    var pro_edge = "";
			    if(blockProperty != null){
			    	if(blockProperty.block_id == block_id){
				    	pro_edge = blockProperty.pro_edge;
				    }
			    }
			    var blockData = temDM.getBlock(pageData,block_id);
			    var html="";
			    html= html+'<div id="are'+(block_id)+'" style="width:'+blockData.block_width+'px;height:'+blockData.block_height+'px;background-color:white;border:1px solid darkgray;margin:'+blockData.block_y+'px 0px 0px '+blockData.block_x+'px;padding:'+pro_edge+'px;position: absolute;" onclick="changeDiv(\'are'+(block_id)+'\');">';
					html = html + this.setBlockData(blockData);
					html = html +'</div>';
			    return html;
		  },
		  setBlockData:function(blockData) {
			  var type = 0;
			  var html = "";
			    if( blockData.block_data != null){
					 type=blockData.block_data.type;
			  	}
				else {
					return html;
				}
			    if(type==1){
			    	if(!blockData.block_data.field_name || blockData.block_data.field_name ==""){
			    		var data_word = blockData.block_data.data_word
				    	if(data_word){
				    		var font_weight = "",
				    		font_style = "";
				    		if(Number(data_word.bold) == 1){
				    			font_weight = "bold";
				    		}
	                        if(Number(data_word.tile) == 1){
	                        	font_style = "italic";
				    		}
				    		html = '<p style="font-size:'+data_word.font_size+';font-family:'+data_word.font_family+';font-weight:'+font_weight+';font-style:'+font_style+';color:'+data_word.color+';word-break:break-all; word-wrap:break-word ;">'+data_word.content+'</p>';
				    		if(Number(data_word.roll) == 1){
				    			html = '<marquee scrollamount="2" direction="left" >'+html+'</marquee >';
				    		}
				    	}
			    	}else{
			    		html = '<p>使用文字接口</p>';
			    	}
					return html;
				}
				if(type==2){
					if(!blockData.block_data.field_name || blockData.block_data.field_name ==""){
						var src = blockData.block_data.data
				    	if(src){
				    	    html = '<img src=\''+src+'\' width=100% height=100%/>';
				    	}
					}else{
			    		html = '<p>使用图片接口</p>';
			    	}
					
					return html;
				}
				if(type==3){
						var data_arr = blockData.block_data.data_arr
				    	if(data_arr){
				    		var row =data_arr.row,
				    		col =data_arr.col;
				    		var html = '<table border="1" cellpadding="3" cellspacing="1" width="'+blockData.block_width+'" height="'+blockData.block_height+'" align="center" ><tbody>';
							var arr_type = data_arr.type,
							img_width = blockData.block_width/col,
							img_height = blockData.block_height/row;
							html = html + this.reverTableBlock(blockData,row,col,arr_type,img_width,img_height);
							html = html+'</tbody></table>';
//							var num = Math.ceil(imgJson.length/(row*col));
//							  html = html + '<div class="digg" style="text-align:center;"><span class="current">1</span>';
//							  for(var n=2;n<(num+1);n++){
//								  html = html+'<a href="#" onclick="changeHtml(\''+blockData+'\',\''+row+'\',\''+col+'\',\''+n+'\')">'+n+'</a>';
//							  }
//							  html = html + '</div> ';
				    	}
					    return html;
				}
		  },
		  updateRevertBlock:function(pageId,block_id) 
		  {
			  var pageData = temDM.getPage(pageId);
			  var blockData = temDM.getBlock(pageData,block_id);
			  document.getElementById('are'+(block_id)).innerHTML = this.setBlockData(blockData);
		  },
		  reverTableBlock:function(blockData,row,col,arr_type,img_width,img_height){
			  var html ='';
			  row = Number(row);
			  col = Number(col);
			  for(var m=1;m<(row+1);m++){
					 html = html + '<tr>';
					 for(var j=1;j<(col+1);j++){
						  html = html +'<td>';
						  if(1 == arr_type){
							  if(titleJson[m*j-1]){
								  html = html +'<div style="width:100%;text-align:center;"><span style="font-size:12px;">'+titleJson[m*j-1]+'</span></div>';
							  }
						  }
						  if(2 == arr_type){
							  if(imgJson[m*j-1]){
								  html = html + '<img src=\''+imgJson[m*j-1]+'\' width=\''+(img_width-20)+'px\' height=\''+(img_height-20)+'px\'/>';
							  }
						  }
						  if(3 == arr_type){
							  if(imgJson[m*j-1]){
								  html = html + '<img src=\''+imgJson[m*j-1]+'\' width=\''+(img_width-20)+'px\' height=\''+(img_height-50)+'px\'/>';
								  html = html +'<div style="width:100%;text-align:center;"><span style="text-align:center;font-size:12px;">'+titleJson[m*j-1]+'</span></div>';
							  }
						  }
						  html = html +'</td>';
					 }
					 html =html + '</tr>';
				 }
			  return html;
		  }
} 