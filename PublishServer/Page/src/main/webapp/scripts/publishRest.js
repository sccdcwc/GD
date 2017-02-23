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
 *
 * @param {Object} restUrl 请求URL
 * @param {Object} httpMethod post，get，delete
 * @param {Object} entity 数据实体
 * @param {Object} contentType 数据实体的格式，如application/json
 * @param {Object} callback 回调函数，处理返回数据
 * @param {Object} accept 客户端能接收的数据类型
 * @param {String} region 用户所在地区,not null
 * @param {boolean} isAsync 是否异步
 */
function rest(restUrl, httpMethod, entity, contentType, callback, accept, region, isAsync) {
    var resultLine = jQuery('#resultDiv');
    resultLine.html(LOADING);
    //var userId = storage.getItem("userId");
    //var userRole = storage.getItem("userRole");
    var request;
    //alert("accept");
    //alert(accept);
    region = 'areaToAuth*123'+encodeURIComponent(region);
    if(accept === null){
        //alert("accept null");
        request = jQuery.ajax({type: httpMethod, url: restUrl, async:isAsync, headers: {'AreaAuth':region}, data: entity, contentType: contentType, charset:"utf-8",
            crossDomain: true});//'Access-Control-Allow-Origin': '*',
//        alert(request);
    }else{
        request = jQuery.ajax({type: httpMethod, url: restUrl, async:isAsync, headers: {'Accept': accept, 'AreaAuth':region}, data: entity, contentType: contentType,
            charset:"utf-8", crossDomain: true});//'Access-Control-Allow-Origin': '*',
    }

    request.done(function (data) {
        //alert(data.code+" : "+data.content);
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
                alert(data.code+" : "+data.content);
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
