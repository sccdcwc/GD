package com.gd.core.dao;

import com.gd.core.Info.TemplateMatchInfo;
import com.gd.core.Info.TemplateQueryInfo;
import com.gd.core.domain.Template;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import java.util.List;

/**
 * Created by wim on 2016/3/31.
 */
@Repository
public class TemplateDao extends Dao<Template> {
    public TemplateDao() {
        super();
    }

    public List<Template> findByCriteria(final TemplateQueryInfo queryInfo){
        String jpql = "SELECT template FROM Template template WHERE";
        String jpqlName = " template.name= :name ";
        String jpqlStatus = " template.status = :status ";
        String jpqlCreaterName = " template.createrName = :createrName ";
        String jpqlScale = " template.scale = :scale ";
        String jpqlCreatTime = " substring(template.creatTime, 1, 10) = :creatTime ";
        String jpqlUpdateTime = " substring(template.updateTime, 1, 10) = :updateTime ";
        String jpqlPublishTime = " substring(template.publishTime, 1, 10) = :publishTime";
        boolean isNull = true;
        if(queryInfo.getTemplateName()!=null){
            isNull = false;
            jpql = jpql.substring(jpql.length()-5, jpql.length()).compareTo("WHERE")==0?jpql + jpqlName : jpql + "AND" + jpqlName;
        }
        if(queryInfo.getStatus()!=null){
            isNull = false;
            jpql = jpql.substring(jpql.length()-5, jpql.length()).compareTo("WHERE")==0?jpql + jpqlStatus : jpql + "AND" + jpqlStatus;
        }
        if(queryInfo.getCreaterName()!=null){
            isNull = false;
            jpql = jpql.substring(jpql.length()-5, jpql.length()).compareTo("WHERE")==0?jpql + jpqlCreaterName : jpql + "AND" + jpqlCreaterName;
        }
        if(queryInfo.getScale()!=null){
            isNull = false;
            System.out.println("jpql: '"+ jpql+"'"+jpql.substring(jpql.length()-5, jpql.length()));
            jpql = jpql.substring(jpql.length()-5, jpql.length()).compareTo("WHERE")==0?jpql + jpqlScale : jpql + "AND" + jpqlScale;
        }
        if(queryInfo.getCreatTime()!=null){
            isNull = false;
            jpql = jpql.substring(jpql.length()-5, jpql.length()).compareTo("WHERE")==0?jpql + jpqlCreatTime : jpql + "AND" + jpqlCreatTime;
        }
        if(queryInfo.getUpdateTime()!=null){
            isNull = false;
            jpql = jpql.substring(jpql.length()-5, jpql.length()).compareTo("WHERE")==0?jpql + jpqlUpdateTime : jpql + "AND" + jpqlUpdateTime;
        }
        if(queryInfo.getPublishTime()!=null){
            isNull = false;
            jpql = jpql.substring(jpql.length()-5, jpql.length()).compareTo("WHERE")==0?jpql + jpqlPublishTime : jpql + "AND" + jpqlPublishTime;
        }
        System.out.println("jpql: "+ jpql);
        if(!isNull){
            Query query = entityManager.createQuery(jpql, Template.class);
            if(queryInfo.getTemplateName()!=null){
                query.setParameter("name", queryInfo.getTemplateName());
            }
            if(queryInfo.getStatus()!=null){
                query.setParameter("status", queryInfo.getStatus());
            }
            if(queryInfo.getCreaterName()!=null){
                query.setParameter("createrName", queryInfo.getCreaterName());
            }
            if(queryInfo.getScale()!=null){
                query.setParameter("scale", queryInfo.getScale());
            }
            if(queryInfo.getCreatTime()!=null){
                query.setParameter("creatTime", queryInfo.getCreatTime());
            }
            if(queryInfo.getUpdateTime()!=null){
                query.setParameter("updateTime", queryInfo.getUpdateTime());
            }
            if(queryInfo.getPublishTime()!=null){
                query.setParameter("publishTime", queryInfo.getPublishTime());
            }
            return query.getResultList();
        }else{
            return null;
        }

    }

    public Template findByName(final String templateName) {
        System.out.println("-------------------------"+templateName);
        System.out.println("-------------"+entityManager);
//        Query query = entityManager.createNamedQuery("findByName", Template.class);
//        query.setParameter("name", templateName);
//        Template template = (Template) query.getSingleResult();
        return entityManager.createNamedQuery("findByName", Template.class).setParameter("name", templateName).getSingleResult();
//        return template;
    }

    @Transactional
    public Template update(final Template entity){
//        final Template updateTemplate = findById(entity.getTemplateId());
//        if(updateTemplate!=null){
//            updateTemplate.setName(entity.getName());
//            updateTemplate.setStatus(entity.getStatus());
//            updateTemplate.setPreviewData(entity.getPreviewData());
//            updateTemplate.setTemporaryData(entity.getTemporaryData());
            return entityManager.merge(entity);
//        }else{
//            return null;
//        }
    }

}
