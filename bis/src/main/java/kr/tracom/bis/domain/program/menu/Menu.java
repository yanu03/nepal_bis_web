package kr.tracom.bis.domain.program.menu;

import kr.tracom.bis.domain.BaseJpaModel;
import kr.tracom.bis.domain.program.Program;
import com.chequer.axboot.core.annotations.ColumnPosition;
import com.chequer.axboot.core.annotations.Comment;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.jpa.JsonNodeConverter;
import com.chequer.axboot.core.utils.JsonUtils;
import com.chequer.axboot.core.utils.RequestUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.persistence.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;


@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "MENU_M")
@Comment(value = "메뉴")
@ToString
public class Menu extends BaseJpaModel<Long> implements Cloneable {
	private static final Logger logger = LoggerFactory.getLogger(BaseController.class);
    @Id
    @Column(name = "MENU_ID", precision = 20, nullable = false)
    @Comment(value = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnPosition(1)
    private Long menuId;

    @Column(name = "MENU_GRP_CD", length = 100)
    @Comment(value = "메뉴 그룹코드")
    @ColumnPosition(2)
    private String menuGrpCd;

    @Column(name = "MENU_NM", length = 100)
    @Comment(value = "메뉴명")
    @ColumnPosition(3)
    private String menuNm;

    @Column(name = "MULTI_LANGUAGE", length = 100)
    @Comment(value = "메뉴 다국어 필드")
    @ColumnPosition(4)
    @Convert(converter = JsonNodeConverter.class)
    private JsonNode multiLanguageJson;

    @Column(name = "PARENT_ID", precision = 19)
    @Comment(value = "부모 ID")
    @ColumnPosition(5)
    private Long parentId;

    @Column(name = "LEVEL", precision = 10)
    @Comment(value = "레벨")
    @ColumnPosition(6)
    private Integer level;

    @Column(name = "SORT", precision = 10)
    @Comment(value = "정렬")
    @ColumnPosition(7)
    private Integer sort;

    @Column(name = "PROG_CD", length = 50)
    @Comment(value = "프로그램 코드")
    @ColumnPosition(8)
    private String progCd;

    @Transient
    private boolean open = false;

    @Transient
    private List<Menu> children = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "PROG_CD", referencedColumnName = "PROG_CD", insertable = false, updatable = false)
    private Program program;

    @Override
    public Long getId() {
        return menuId;
    }

    @JsonProperty("name")
    public String label() {
        return menuNm;
    }

    @JsonProperty("id")
    public Long id() {
        return menuId;
    }

    @JsonProperty("open")
    public boolean isOpen() {
        return open;
    }

    public void addChildren(Menu menu) {
        children.add(menu);
    }

    public Menu clone() {
        try {
            Menu menu = (Menu) super.clone();
            menu.setChildren(new ArrayList<>());
            return menu;
        } catch (CloneNotSupportedException e) {
        	logger.error("Menu Clone Exception", e);
        }
        return null;
    }

    public static Menu of(Long id, String menuGrpCd, String menuNm, JsonNode languageJson, Long parentId, int level, int sort, String progCd) {
        Menu menu = new Menu();
        menu.setMenuId(id);
        menu.setMenuGrpCd(menuGrpCd);
        menu.setMenuNm(menuNm);
        menu.setMultiLanguageJson(languageJson);
        menu.setParentId(parentId);
        menu.setLevel(level);
        menu.setSort(sort);
        menu.setProgCd(progCd);
        return menu;
    }

    @JsonIgnore
    public String getLocalizedMenuName(HttpServletRequest request) {
        //Locale locale = RequestUtils.getLocale(request);
        
        //프로그램명 locale 설정부분
        //locale = new Locale("en");
        
        HttpSession session = request.getSession(false); // 세션 생성을 방지하기 위해 false 사용    	

        if (getMultiLanguageJson() != null) {
            //JsonNode jsonNode = getMultiLanguageJson().findPath(locale.getLanguage()); //기존 소스
            JsonNode jsonNode = getMultiLanguageJson().findPath((String) session.getAttribute("loginLocale")); //loginLocale로 변경함 20240207
            if (jsonNode != null) {
                return jsonNode.asText();
            }
        }
        return menuNm;
    }
}
