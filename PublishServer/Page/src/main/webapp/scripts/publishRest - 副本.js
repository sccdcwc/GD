var storage = window.sessionStorage;

var STATION_PATH = "/publish/station";
var PAGE_PATH = "/publish/page";

var STATION_TEMPLATE_PATH = "/rest/template";
var STATION_INSTANCE_PATH = "/rest/instance";

var NO_RESULT = "There's no result from the server";

var GET_METHOD = 'GET';
var POST_METHOD = 'POST';
var PUT_METHOD = 'PUT';
var DELETE_METHOD = 'DELETE';

var SPAN_BEGIN = "<span style='width:100px;display:inline-block;'>";
var SPAN_BEGIN2 = "<span style='width:200px;display:inline-block;'>";
var SPAN_BEGIN4 = "<span style='width:400px;display:inline-block;'>";

//var ROLE_ADMIN = 1;
//var ROLE_JOB_KILLER = 2;
//var ROLE_DEVICE_MANAGER = 3;
//var ROLE_USER = 4;
//
//var DEVICE_STATUS_IDLE = "0";
//var DEVICE_STATUS_BUSY = "1";
//var DEVICE_STATUS_ERROR = "2";

var NORMAL_STATUS = 9200;
var LOADING = "Loading...";

//function restGet(restUrl, httpMethod, contentType, dataType, callback, aceept) {
//    rest(restUrl, httpMethod, "", contentType, dataType, callback);
//}
//function restSet(restUrl, httpMethod, entity, contentType, dataType, callback, aceept) {
//    rest(restUrl, httpMethod, entity, contentType, dataType, callback);
//}

/**
 * 获取模板列表
 * @param {Object} restUrl
 * @param {Object} httpMethod
 * @param {Object} entity
 * @param {Object} contentType
 * @param {Object} callback
 * @param {Object} accept
 */
function rest(restUrl, httpMethod, entity, contentType, callback, accept) {
    var resultLine = jQuery('#resultDiv');
    resultLine.html(LOADING);
    //var userId = storage.getItem("userId");
    //var userRole = storage.getItem("userRole");
    var request;
//    alert("accept");
    // alert(accept);
    if(accept == null){
        // alert("accept null");
        request = jQuery.ajax({type: httpMethod, url: restUrl, async:true, data: entity, contentType: contentType, charset:"utf-8",
            crossDomain: true});//'Access-Control-Allow-Origin': '*',
    }else{
        request = jQuery.ajax({type: httpMethod, url: restUrl, async:true, headers: {'Accept': accept}, data: entity, contentType: contentType,
            charset:"utf-8", crossDomain: true});//'Access-Control-Allow-Origin': '*',
    }

    request.done(function (data) {
//      alert(data.code+" : "+data.content);
        try {
            if (data === null || data === undefined) {
                resultLine.html(NO_RESULT);
            } else if(data.data!==undefined){
//              alert(data.data);
//              alert(data.meta);
                if (callback != null) {
//                  alert("callback");
                    resultLine.html("");
                    callback(data);
                }
            }else{
                alert("--"+data.code+" : "+data.content);
            }
        } catch (e) {
            resultLine.html(e);
        }
    });
    request.fail(function (textStatus, errorThrown) {
        resultLine.html(errorThrown + " status=" + textStatus.status + " text=" + textStatus.statusText);
    });
    resultLine.append(" DONE!");
}
