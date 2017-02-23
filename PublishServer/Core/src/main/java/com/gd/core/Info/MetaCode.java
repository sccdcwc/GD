package com.gd.core.Info;

/**
 * Created by wi on 2016/4/4.
 */
public interface MetaCode {
    int FIND_ERROR = 204;
    int CREATE_ERROR = 205;
    int UPDATE_ERROR = 206;
    int DELETE_EEROR = 207;
    int FIND_PARAMETER_ERROR = 208;
    int EXECUTE_ERROR = 304;

    int CREATE_SUCCESS = 200;
    int FIND_SUCCESS = 201;
    int UPDATE_SUCCESS = 202;
    int DELETE_SUCCESS = 203;

    String FIND_ERROR_INFO = "查询失败";
    String CREATE_ERROR_INFO = "创建失败";
    String UPDATE_ERROR_INFO = "更新失败";
    String DELETE_EEROR_INFO = "删除失败";
    String FIND_PARAMETER_ERROR_INFO = "查询参数错误";
    String EXECUTE_ERROR_INFO = "执行失败";

    String CREATE_SUCCESS_INFO = "创建成功";
    String FIND_SUCCESS_INFO = "查询成功";
    String UPDATE_SUCCESS_INFO = "更新成功";
    String DELETE_SUCCESS_INFO = "删除成功";

}
