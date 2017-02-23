var TemplateDataManageSingle = (function () {
    var instantiated;
    var jsonData=JSON.parse(localStorage.getItem("temporaryData"));
    function Construct(json){
        jsonData = json;
    }
    
    function getPage(page_id) {
        var pages = jsonData.pages;
        for(var i = 0 ; i < pages.length ; i++)
        {
            var element = pages[i];
            if (element.page_id == page_id) {
                return element;
            }
        }
    }

    function getBlock(page , block_id) {
        var blocks = page.blockData;
        for(var i = 0 ; i < blocks.length ; i++)
        {
            var element = blocks[i];
            if (element.block_id == block_id) {
                return element;
            }
        }
    }
    
    //设置页面数据
    function setPageData(page_id , page_bg ,repeat, block_url , block_params){
        var page = getPage(page_id);
        var pageData = page.page_data;
        if (!pageData) {
            pageData = new Object();
            page.page_data = pageData;
        }
        pageData.page_bg = page_bg;
        pageData.repeat = repeat;
        pageData.url = block_url;
        pageData.params = block_params;
        localStorage.setItem("temporaryData",JSON.stringify(jsonData));
        setTimeout(function(){DrawPreviewData();});
    }
    
//    //用于修改方块的接口地址和参数
//    function setBlockData_url(page_id , block_id , block_type , block_url , block_params) {
//        var page = getPage(page_id);
//        var block = getBlock(page , block_id);
//        var blockData = block.block_data;
//        if (!block.block_data) {
//            blockData = new Object();
//            block.block_data = blockData;
//        }
//        blockData.type = block_type;
//        blockData.url = block_url;
//        blockData.params = block_params;
//        console.log(jsonData);
//    }
//    
    //用于修改方块的数据,图片方式
    function setBlockData_data(page_id , block_id , block_type , block_data , field_name) {
        var page = getPage(page_id);
        var block = getBlock(page , block_id);
        var blockData = block.block_data;
        if (!block.block_data) {
            blockData = new Object();
            block.block_data = blockData;
        }
        blockData.type = block_type;
        blockData.data = block_data;
        blockData.field_name = field_name;
        console.log(jsonData);
        localStorage.setItem("temporaryData",JSON.stringify(jsonData));
        setTimeout(function(){DrawPreviewData();});
    }
    
    //用于修改方块的数据,列表方式
    function setBlockData_array(page_id , block_id , row , col ,array_type , data_arr , block_url , block_params) {
        var page = getPage(page_id);
        var block = getBlock(page , block_id);
        var block_data = block.block_data;
        if (!block.block_data) {
        	block_data = new Object();
            block.block_data = block_data;
        }
        var arr = new Object();
        arr.row = row;
        arr.col = col;
        arr.type = array_type;
        arr.arr = data_arr;
        arr.block_url = block_url;
        arr.block_params = block_params;
        block_data.type = 3;
        block_data.data_arr = arr;
        console.log(jsonData);
        localStorage.setItem("temporaryData",JSON.stringify(jsonData));
        setTimeout(function(){DrawPreviewData();});
    }
    
    //用于修改方块的数据,文本方式
    function setBlockData_word(page_id , block_id , block_type , block_data_word , field_name) {
        var page = getPage(page_id);
        var block = getBlock(page , block_id);
        var block_data = block.block_data;
        if (!block.block_data) {
        	block_data = new Object();
            block.block_data = block_data;
        }
        block_data.type = block_type;
        block_data.data_word = block_data_word;
        block_data.field_name = field_name;
        console.log(jsonData);
        localStorage.setItem("temporaryData",JSON.stringify(jsonData));
    	setTimeout(function(){DrawPreviewData();});
    }
    
    //用于获取方块的数据,列表方式
    function getBlockData_array(page_id , block_id) {
        var page = getPage(page_id);
        var block = getBlock(page , block_id);
        var block_data = block.block_data;
        return block_data.data_arr;
    }
    
    //用于删除方块的数据
    function deleteBlockData(page_id , block_id) {
        var page = getPage(page_id);
        var block = getBlock(page , block_id);
        block.block_data = null;
        console.log(block);
        localStorage.setItem("temporaryData",JSON.stringify(jsonData));
	    setTimeout(function(){DrawPreviewData();});        
    }
        
    function init() {
        /*这里定义单例代码*/
        return {
            setJsonData:function (json) {
                Construct(json);
            },
            getJsonData:function (json) {
                return jsonData;
            },
            getPage:getPage,
            getBlock:getBlock,
            setPageData:setPageData,
            setBlockData_data:setBlockData_data,
            setBlockData_array:setBlockData_array,
            setBlockData_word:setBlockData_word,
            getBlockData_array:getBlockData_array,
            deleteBlockData:deleteBlockData
        };
    }

    return {
        getInstance: function () {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    };
})();