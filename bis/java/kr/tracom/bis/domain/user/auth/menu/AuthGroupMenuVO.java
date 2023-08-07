package kr.tracom.bis.domain.user.auth.menu;

import kr.tracom.bis.domain.program.Program;
import lombok.Data;

import java.util.List;

@Data
public class AuthGroupMenuVO {

    private List<AuthGroupMenu> list;

    private Program program;
}
