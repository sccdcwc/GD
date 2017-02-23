package com.gd.core.util;

import java.io.*;
import java.nio.channels.FileChannel;

/**
 * Created by wi on 2016/4/4.
 */
public class FileCustomUtil {
    public static void isDirExist(String path){
        File dirFile = new File(path);
        if (!dirFile.exists()) {
            dirFile.mkdir();
        }
    }
    public static void writerText(File file, String content) throws Exception{
        OutputStreamWriter write = new OutputStreamWriter(new FileOutputStream(file),"utf-8");
        BufferedWriter bw1 = new BufferedWriter(write);
        bw1.write(content);
        bw1.flush();
        bw1.close();
        write.close();
    }

    public static void copyFile(File originalFile, File replicaFile) throws Exception{
        FileInputStream fi = null;
        FileOutputStream fo = null;
        FileChannel in = null;
        FileChannel out = null;
        try {
            fi = new FileInputStream(originalFile);
            fo = new FileOutputStream(replicaFile);
            in = fi.getChannel();//得到对应的文件通道
            out = fo.getChannel();//得到对应的文件通道
            in.transferTo(0, in.size(), out);//连接两个通道，并且从in通道读取，然后写入out通道
        } finally {
            fi.close();
            in.close();
            fo.close();
            out.close();
        }
    }

    public static File renameFile(File oldFile, String newName){
        if(!oldFile.getName().equals(newName)){//新的文件名和以前文件名不同时,才有必要进行重命名
            File newFile=new File(oldFile.getParent()+"/"+newName);
            if(!oldFile.exists()){
                return null;//重命名文件不存在
            }
            if(newFile.exists()) {//若在该目录下已经有一个文件和新文件名相同，则不允许重命名
                System.out.println(newName + "已经存在！");
                return null;
            }
            else{
                oldFile.renameTo(newFile);
                return newFile;
            }
        }else{
            System.out.println("新文件名和旧文件名相同...");
            return null;
        }
    }
}
