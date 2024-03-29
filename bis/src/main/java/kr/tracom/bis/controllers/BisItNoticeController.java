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

import com.chequer.axboot.core.controllers.BaseController;

import kr.tracom.bis.domain.bisItNotice.BisItNotice;
import kr.tracom.bis.domain.bisItNotice.BisItNoticeService;

@Controller
@RequestMapping(value = "/api/v1/bisItNotice")
public class BisItNoticeController extends BaseController {

	@Inject
	private BisItNoticeService bisItNoticeService;

	@RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
	public List<BisItNotice> noticeList(@RequestParam Map<String, Object> searchMap){
		return bisItNoticeService.findAll(searchMap);
	}
	
	@RequestMapping(method = RequestMethod.PUT, produces = APPLICATION_JSON)
	public void noticeInsert(@RequestBody List<Map<String, Object>> map){
	
		String noticeId=(String)map.get(0).get("noticeId");
		if(noticeId == null || noticeId==""){
			SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
			map.get(0).put("updateDate", sdf.format(new Date()));
			bisItNoticeService.insert(map.get(0));
		}else{
			bisItNoticeService.update(map.get(0));
		}
		
	}
	
	@RequestMapping(value="/remove", method=RequestMethod.GET, produces=APPLICATION_JSON)
	public void noticeRemove(@RequestParam Map<String,Object> map){
		bisItNoticeService.delete((String)map.get("noticeId"));
	}

}