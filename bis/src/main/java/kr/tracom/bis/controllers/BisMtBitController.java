package kr.tracom.bis.controllers;

import java.io.IOException;
import java.net.SocketException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;

import kr.tracom.bis.domain.bisMtBit.BisMtBit;
import kr.tracom.bis.domain.bisMtBit.BisMtBitService;
import kr.tracom.bis.domain.bisMtCompany.BisMtCompany;
import kr.tracom.bis.utils.RequestUtil;

@Controller
@RequestMapping(value = "/api/v1/bisMtBits")
public class BisMtBitController extends BaseController {
	@Inject
    private BisMtBitService bisMtBitService;
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisMtBit>  list(RequestParams requestParams,HttpServletRequest request) {
     //   List list = bisMtRouteService.gets(requestParams);
     //   return Responses.ListResponse.of(list);
    	
    	Map parameterMap = RequestUtil.getParameterMap(request);
    	List<BisMtBit> list = null;
    	list= bisMtBitService.findAll(parameterMap);
    	
    	 return list;
    	 }
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody BisMtBit request) {
    	bisMtBitService.add(request);
    	
        return ok();
    }
    @RequestMapping(value = "/maxPlus",method = { RequestMethod.GET }, produces = APPLICATION_JSON)
	public Map maxPlus() {
    	Map parameterMap = new HashMap();
		String max = bisMtBitService.maxPlus();
		parameterMap.put("max", max);
		parameterMap.put("remark"," ");
		//Map parameterMap = RequestUtil.getParameterMap(request);
		return parameterMap;
	}
    @RequestMapping(value = "/terminal",method = { RequestMethod.GET }, produces = APPLICATION_JSON)
	public List<Map<String,Object>> terminal_bit(RequestParams requestParams,HttpServletRequest request) {
    	Map parameterMap = RequestUtil.getParameterMap(request);
    	List<Map<String,Object>> list = null;
    	list= bisMtBitService.terminalBitFind(parameterMap);
    	
		return list;
	}
    
    //선택된 디렉토리(폴더)에 존재하는 파일이름을 모두 불러옵니다.
    public static void ftpFileReadFiles(String uri, String id, String pw,String directoryLocation){
    	FTPClient ftp = null;
		try {
			ftp = new FTPClient();
			ftp.setControlEncoding("UTF-8");
			ftp.connect(uri);
			ftp.login(id, pw);
			ftp.changeWorkingDirectory(directoryLocation);//파일 가져올 디렉터리 위치
			ftp.setFileType(FTP.BINARY_FILE_TYPE);//파일 타입 설정 기본적으로 파일을 전송할떄는 BINARY타입을 사용합니다.

			for(String fileName :ftp.listNames()){
				System.out.println(fileName);
			}
			
			ftp.logout();
		} catch (SocketException e) {
			System.out.println("Socket:" + e.getMessage());
		} catch (IOException e) {
			System.out.println("IO:" + e.getMessage());
		} finally {
			if (ftp != null && ftp.isConnected()) {
				try {
					ftp.disconnect();//ftp연결 끊기
				} catch (IOException e) {
				}
			}
		}
    }    
}
