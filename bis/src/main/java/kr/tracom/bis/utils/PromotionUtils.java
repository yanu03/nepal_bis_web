package kr.tracom.bis.utils;

import kr.tracom.bis.domain.bisItForm.BisItFormService;
import kr.tracom.bis.domain.bisItScenario.BisItScenarioService;
import kr.tracom.bis.domain.code.CommonCode;
import kr.tracom.bis.domain.code.CommonCodeService;
import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.context.AppContextManager;
import com.chequer.axboot.core.parameter.RequestParams;
import com.chequer.axboot.core.utils.JsonUtils;

import java.util.List;
import java.util.Map;



public class PromotionUtils {
    public static List<Map<String, Object>> scenarioTypeGet() {
        return AppContextManager.getBean(BisItScenarioService.class).scenarioTypeList();
    }
    
    public static List<Map<String, Object>> formTypeGet() {
    	return AppContextManager.getBean(BisItFormService.class).formTypeList();
    }
    
}
