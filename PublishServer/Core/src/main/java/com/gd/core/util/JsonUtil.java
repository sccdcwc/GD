package com.gd.core.util;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.StringReader;
import java.io.StringWriter;

/**
 * Created by wi on 2016/4/4.
 */
public class JsonUtil {
    public static String toJson(Object info, JAXBContext jc) throws Exception{
        Marshaller marshaller = jc.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        marshaller.setProperty("eclipselink.json.include-root", false);
        marshaller.setProperty("eclipselink.media-type", "application/json");
        StringWriter sw = new StringWriter();
        marshaller.marshal(info, sw);
        return sw.toString();
    }

    public static Object toObject(String json, JAXBContext jc) throws Exception{
        Unmarshaller unmarshaller = jc.createUnmarshaller();
        StringReader stringReader = new StringReader(json);
        return unmarshaller.unmarshal(stringReader);
    }
}
