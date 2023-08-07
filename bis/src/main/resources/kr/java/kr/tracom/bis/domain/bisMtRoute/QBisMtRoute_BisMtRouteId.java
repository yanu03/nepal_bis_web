package kr.tracom.bis.domain.bisMtRoute;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QBisMtRoute_BisMtRouteId is a Querydsl query type for BisMtRouteId
 */
@Generated("com.querydsl.codegen.EmbeddableSerializer")
public class QBisMtRoute_BisMtRouteId extends BeanPath<BisMtRoute.BisMtRouteId> {

    private static final long serialVersionUID = -1498094800L;

    public static final QBisMtRoute_BisMtRouteId bisMtRouteId = new QBisMtRoute_BisMtRouteId("bisMtRouteId");

    public QBisMtRoute_BisMtRouteId(String variable) {
        super(BisMtRoute.BisMtRouteId.class, forVariable(variable));
    }

    public QBisMtRoute_BisMtRouteId(Path<? extends BisMtRoute.BisMtRouteId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBisMtRoute_BisMtRouteId(PathMetadata metadata) {
        super(BisMtRoute.BisMtRouteId.class, metadata);
    }

}

