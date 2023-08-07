package kr.tracom.bis.utils;

import kr.tracom.bis.domain.bisCtDetailCode.BisCtDetailCode;
import kr.tracom.bis.domain.bisCtDetailCode.BisCtDetailCodeService;
import kr.tracom.bis.domain.bisMtRoute.BisMtRouteService;
import kr.tracom.bis.domain.bisMtStation.BisMtStationService;
import kr.tracom.bis.domain.code.CommonCode;
import kr.tracom.bis.domain.code.CommonCodeService;
import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.context.AppContextManager;
import com.chequer.axboot.core.parameter.RequestParams;
import com.chequer.axboot.core.utils.JsonUtils;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import static java.util.stream.Collectors.groupingBy;

public class BisCtDetailCodeUtils {
	@Inject
	private static BisCtDetailCodeService bisCtDetailCodeService;
	
    public static List<BisCtDetailCode> get(Map parameterMap) {
    	return AppContextManager.getBean(BisCtDetailCodeService.class).findAll(parameterMap);
    }
    
    public static List<BisCtDetailCode> getUseY(Map parameterMap) {
    	return AppContextManager.getBean(BisCtDetailCodeService.class).findAlluseY(parameterMap);
    }
}
