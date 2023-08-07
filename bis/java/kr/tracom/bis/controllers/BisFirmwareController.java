package kr.tracom.bis.controllers;
 
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.controllers.BaseController;

import kr.tracom.bis.domain.bisFirmware.BisFirmwareService;
import kr.tracom.bis.domain.bisItForm.BisItForm;
import kr.tracom.bis.utils.BisFileUtil;
 
@Controller
@RequestMapping(value = "/api/v1/bisFirmwares")
public class BisFirmwareController extends BaseController {
 
    @Inject
    private BisFirmwareService bisFirmwareService;
 

    
    @PostMapping(value="/file")
    public @ResponseBody Map<String,Object> fileUpload(@RequestPart(value="upFile",required=false) MultipartFile mfile, @RequestParam Map<String, Object> fileMap, HttpServletRequest request) throws Exception{
    	String defaultPath = request.getSession().getServletContext().getRealPath("/");
    	String path=defaultPath + "resource" + File.separator + "BisFile" + File.separator;
    
    	long time = System.currentTimeMillis(); 
    	SimpleDateFormat dayTime = new SimpleDateFormat("yyyymmddhhmm");
    	String str = dayTime.format(new Date(time));

    	String storedFileName="firmware.zip";
    	File convFile = new File(path+ storedFileName);
    	mfile.transferTo(convFile); 
    	
    	BisFileUtil bfu=new BisFileUtil();
    	Map<String,Object> ftpInfo=new HashMap<String,Object>();
    	ftpInfo.put("formPath", bisFirmwareService.formPath());
    	ftpInfo.put("ftpId", bisFirmwareService.ftpId());
    	ftpInfo.put("ftpIp", bisFirmwareService.ftpIp());
    	ftpInfo.put("ftpPw", bisFirmwareService.ftpPw());
    	ftpInfo.put("ftpPort", bisFirmwareService.ftpPort());
    	String fileName="";
    	
    	
    	int result=bfu.upload(convFile, storedFileName, ftpInfo, request);	//FTP 파일 전송
    	Map<String,Object> map=new HashMap<String,Object>();
    	if(result == 1){
    	}else{
    		System.out.println("@@@@@@ FTP연결  삭제 @@@@@@@@");
    		map.put("warning", "FTP Server Connection failed");
    	}
    	
    	map.put("data", storedFileName);
    	return map;	
    }
   
}