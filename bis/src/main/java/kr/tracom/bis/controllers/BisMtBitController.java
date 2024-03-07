package kr.tracom.bis.controllers;

import java.io.File;
import java.io.IOException;
import java.net.SocketException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;

import kr.tracom.bis.url;
import kr.tracom.bis.domain.bisCtDetailCode.BisCtDetailCode;
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
    public ApiResponse save(@RequestBody List<Map<String,Object>> BisMtBit) {
    	
    	for(Map<String,Object> temp:BisMtBit){
    		if(Boolean.TRUE.equals(temp.get("__deleted__"))){
    			bisMtBitService.delete(temp);
    		} else{
    			bisMtBitService.add(temp);
    		}
    	}
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
   
   @RequestMapping(value = "/sftpFileList", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public ResponseEntity<List<Map<String,Object>>> getSftpFileList(@RequestParam Map<String,Object> requestParam) {
    	String bitId = requestParam.get("bitId").toString();
        String directoryPath = "/srv/FTP/BIT/SCREEN/" + bitId; 
        //String directoryPath = "D:/YHW/filetest/" + bitId; // 로컬 디렉토리 경로, 수정해야함

        File directory = new File(directoryPath);
        List<Map<String,Object>> fileList = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (directory.exists() && directory.isDirectory()) {
            File[] files = directory.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isFile()) {
                    	Map<String, Object> fileMap = new HashMap<>();
                    	fileMap.put("bitId", bitId);
                    	fileMap.put("fileName", file.getName());
                    	fileMap.put("src", file.getAbsolutePath());
                    	fileMap.put("lastModified", sdf.format(file.lastModified()));
                    	fileList.add(fileMap);
                    }
                }
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(fileList, HttpStatus.OK);    	
   }
}
