package com.gd.core.util;

import org.apache.commons.io.IOUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
public class PublishCrossDomainFilter implements ContainerRequestFilter, ContainerResponseFilter {
    private final Logger log = LogManager.getLogger(PublishCrossDomainFilter.class.getName());

    @Override
    public void filter(final ContainerRequestContext requestContext) throws IOException {
        log.debug(requestContext.getHeaders().getFirst("Access-Control-Allow-Origin"));
    }

    @Override
    public void filter(final ContainerRequestContext requestContext, final ContainerResponseContext responseContext) throws IOException {
//        String result = IOUtils.toString(requestContext.getEntityStream(), "UTF-8");
//        System.out.println("result---------"+result);
        System.out.println("getMediaType---------"+requestContext.getMediaType());
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
        responseContext.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
//        responseContext.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization, Atup-User, Atup-UserRole");
        responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        responseContext.getHeaders().add("Access-Control-Max-Age", "1209600");
    }
}