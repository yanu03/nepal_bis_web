package kr.tracom.bis.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.controllers.BaseController;

import kr.tracom.bis.domain.bisCtCommonCode.BisCtCommonCode;
import kr.tracom.bis.domain.bisCtCommonCode.BisCtCommonCodeService;
import kr.tracom.bis.domain.bisCtDetailCode.BisCtDetailCode;
import kr.tracom.bis.domain.bisCtDetailCode.BisCtDetailCodeService;
 
@Controller
@RequestMapping(value = "/api/v1/bisCtCommonCodes")
public class BisCtCommonCodeController extends BaseController {
    @Inject
    private BisCtCommonCodeService bisCtCommonCodeService;
    @Inject
    private BisCtDetailCodeService bisCtDetailCodeService;
 
    @RequestMapping(value="/parent", method = RequestMethod.GET, produces = APPLICATION_JSON)
/*    public List<BisCtCommonCodeDTO> list() {
    	return bisCtCommonCodeService.findAll();
    }
*/    public List<BisCtCommonCode> list(@RequestParam Map<String, Object> searchData) {
        return bisCtCommonCodeService.searchAll(searchData);
    }
    @RequestMapping(value="/parent", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<Map<String,Object>> bisCtCommon) {
    	SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
    	for(Map<String,Object> temp:bisCtCommon){
    		temp.put("updateDate",sdf.format(new Date()));
    		if(Boolean.TRUE.equals(temp.get("__created__"))) {
    			bisCtCommonCodeService.insert(temp);
    		} else if (Boolean.TRUE.equals(temp.get("__modified__"))) {
                bisCtCommonCodeService.update(temp);
            } else if (Boolean.TRUE.equals(temp.get("__deleted__"))) {
                bisCtCommonCodeService.delete(temp);
            }
    	}
    	return ok();
	}
    
    @RequestMapping(value = "/child", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisCtDetailCode> childList(@RequestParam Map<String,Object> parentKey) {
        return bisCtDetailCodeService.findAll(parentKey);
    }

	@RequestMapping(value = "/child", method = RequestMethod.PUT, produces = APPLICATION_JSON)
	public ApiResponse childSave(@RequestBody List<Map<String, Object>> bisCtDetailCode) {
		String allClearCheck = (String) bisCtDetailCode.get(0).get("allClearCheck");
		String parentKey = (String) bisCtDetailCode.get(0).get("parentKey");
		bisCtDetailCodeService.delete(parentKey);
		if (!allClearCheck.equals("yes")) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			for (Map<String, Object> temp : bisCtDetailCode) {
				temp.put("updateDate", sdf.format(new Date()));
				bisCtDetailCodeService.insert(temp);
			}
		}
		return ok();
	}
}