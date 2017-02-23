/**
 * Created by wim on 2016/5/24.
 */



function getFile(){
    $.ajax({
        type: "GET",
        url: "http://211.83.111.206:7070/publish/station/resource/template/temporary/新模板su6",
        data:'',
        dataType: 'jsonp',
        jsonpCallback:'jsoncallback',
        cache:false,
        success: function (json){
            alert("right");
            alert(json.template_id);
        },
        error: function (data) {
            alert('fail');
        }
    });

}

