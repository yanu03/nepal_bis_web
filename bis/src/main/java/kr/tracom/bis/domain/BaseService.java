package kr.tracom.bis.domain;

import java.io.Serializable;

import com.chequer.axboot.core.domain.base.AXBootBaseService;
import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import kr.tracom.bis.domain.code.QCommonCode;
import kr.tracom.bis.domain.file.QCommonFile;
import kr.tracom.bis.domain.program.QProgram;
import kr.tracom.bis.domain.program.menu.QMenu;
import kr.tracom.bis.domain.user.QUser;
import kr.tracom.bis.domain.user.auth.QUserAuth;
import kr.tracom.bis.domain.user.auth.menu.QAuthGroupMenu;
import kr.tracom.bis.domain.user.role.QUserRole;


public class BaseService<T, ID extends Serializable> extends AXBootBaseService<T, ID> {

    protected QUserRole qUserRole = QUserRole.userRole;
    protected QAuthGroupMenu qAuthGroupMenu = QAuthGroupMenu.authGroupMenu;
    protected QCommonCode qCommonCode = QCommonCode.commonCode;
    protected QUser qUser = QUser.user;
    protected QProgram qProgram = QProgram.program;
    protected QUserAuth qUserAuth = QUserAuth.userAuth;
    protected QMenu qMenu = QMenu.menu;
    protected QCommonFile qCommonFile = QCommonFile.commonFile;

    protected AXBootJPAQueryDSLRepository<T, ID> repository;

    public BaseService() {
        super();
    }

    public BaseService(AXBootJPAQueryDSLRepository<T, ID> repository) {
        super(repository);
        this.repository = repository;
    }
}
