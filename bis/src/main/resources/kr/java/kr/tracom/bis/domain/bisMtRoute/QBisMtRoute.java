package kr.tracom.bis.domain.bisMtRoute;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QBisMtRoute is a Querydsl query type for BisMtRoute
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBisMtRoute extends EntityPathBase<BisMtRoute> {

    private static final long serialVersionUID = 1831982703L;

    public static final QBisMtRoute bisMtRoute = new QBisMtRoute("bisMtRoute");

    public final kr.tracom.bis.domain.QSimpleJpaModel _super = new kr.tracom.bis.domain.QSimpleJpaModel(this);

    public final StringPath areaCode = createString("areaCode");

    public final StringPath countryCode = createString("countryCode");

    public final StringPath fromStationId = createString("fromStationId");

    //inherited
    public final BooleanPath new$ = _super.new$;

    public final NumberPath<Integer> permissionCount = createNumber("permissionCount", Integer.class);

    public final StringPath routeEname = createString("routeEname");

    public final StringPath routeId = createString("routeId");

    public final NumberPath<Integer> routeLength = createNumber("routeLength", Integer.class);

    public final StringPath routeName = createString("routeName");

    public final StringPath routeType = createString("routeType");

    public final StringPath runType = createString("runType");

    public final StringPath toStationId = createString("toStationId");

    public final StringPath turnStationId = createString("turnStationId");

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public final StringPath userId = createString("userId");

    public final StringPath useYn = createString("useYn");

    public QBisMtRoute(String variable) {
        super(BisMtRoute.class, forVariable(variable));
    }

    public QBisMtRoute(Path<? extends BisMtRoute> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBisMtRoute(PathMetadata metadata) {
        super(BisMtRoute.class, metadata);
    }

}

