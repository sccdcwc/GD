package com.gd.station;

import com.gd.core.util.JsonMoxyConfigurationContextResolver;
import com.gd.core.util.PublishCrossDomainFilter;
import com.gd.station.resource.TemplateResource;
import org.eclipse.persistence.jaxb.rs.MOXyJsonProvider;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.moxy.json.MoxyJsonFeature;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;

/**
 * Created by wim on 2016/3/31.
 */
public class PublishApplication extends ResourceConfig{
    public PublishApplication() {
        register(TemplateResource.class);
        register(MultiPartFeature.class);
        register(MoxyJsonFeature.class);
        register(MOXyJsonProvider.class);
        register(PublishCrossDomainFilter.class);
//        register(JsonMoxyConfigurationContextResolver.class);
        System.setProperty("javax.xml.bind.context.factory",
                "org.eclipse.persistence.jaxb.JAXBContextFactory");
    }
}
