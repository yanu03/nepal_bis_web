package kr.tracom.bis.controllers;
 
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.controllers.BaseController;

import kr.tracom.bis.domain.bisItForm.BisItForm;
import kr.tracom.bis.domain.bisItForm.BisItFormService;
import kr.tracom.bis.utils.BisFileUtil;
 
@Controller
@RequestMapping(value = "/api/v1/bisItForms")
public class BisItFormController extends BaseController {
 
    @Inject
    private BisItFormService bisItFormService;
 
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public List<BisItForm> list(@RequestParam Map<String, Object> searchMap) {
        return bisItFormService.findAll(searchMap);
    }
    @PostMapping(value="/getFileSource")
    public @ResponseBody Map<String,Object> getFileSource(@RequestPart(value="upFile",required=false) MultipartFile mfile, @RequestParam(value="browserCheck",defaultValue="") String browserCheck, HttpServletRequest request) throws IllegalStateException, IOException{
    	String fileName="";
    	if(browserCheck.equals("Explorer")){
    		String[] tempName=mfile.getOriginalFilename().split("\\\\");
    		fileName=tempName[tempName.length-1];
    	}if(browserCheck.equals("Chrome")){
    		fileName=mfile.getOriginalFilename();
    	}
    	Map<String,Object> map=new HashMap<String,Object>();
    	
    	String defaultPath=request.getSession().getServletContext().getRealPath("/");
    	String filePath=defaultPath+"resource"+File.separator+"tempFile"+File.separator;
    	File file=new File(filePath);
    	File upFile=new File(filePath+fileName);
    	
    	if(!file.exists()){
    		file.mkdir();
    	}
    	
    	mfile.transferTo(upFile);
    	map.put("fileSource", filePath);
    	return map;
    }
    
    @PostMapping(value="/file")
    public @ResponseBody Map<String,Object> fileUpload(@RequestPart(value="upFile",required=false) MultipartFile mfile, @RequestParam Map<String, Object> fileMap, HttpServletRequest request) throws Exception{
    	BisFileUtil bfu=new BisFileUtil();
    	String formId=(String) fileMap.get("formId");
    	String upFilePath=(String) fileMap.get("upFilePath");
    	String browserCheck=(String) fileMap.get("browserCheck");
    	String formType=(String) fileMap.get("formType");
    	System.out.println("formddd : "+formId);
    	BisItForm findFormId=bisItFormService.findOne(formId);

    	String fileName="";
    	String storedFileName="";
    	
    	String calcFileNum="";
		if(findFormId==null){		//신규등록인지 아닌지 null일 경우 신규등록
    		calcFileNum=bisItFormService.maxFilePlus();	//신규등록일경우 최근파일번호에 +1을 한다.
    		if(calcFileNum==null){
    			calcFileNum="00000000";	//최초생성시 0번
    		}
    		if(formType.equals("0")){
    			storedFileName="FI"+calcFileNum+".jpg";
        	}else{
        		storedFileName="FV"+calcFileNum+".avi";
        	}
    		
    	} else{
    		calcFileNum=findFormId.getFormId().substring(2); //수정일 경우 파일번호(FI나 FV를 자름)를 가져온다.
    	}
    	
    	Map<String,Object> map=new HashMap<String,Object>();
    	if(mfile!=null){
    		if(browserCheck.equals("Explorer")){
        		String[] tempName=mfile.getOriginalFilename().split("\\\\");
        		fileName=tempName[tempName.length-1];
        	}
        	if(browserCheck.equals("Chrome")){
        		fileName=mfile.getOriginalFilename();
        	}
	    	String originalFileName=upFilePath+fileName;
	    	String ext=originalFileName.substring(originalFileName.lastIndexOf(".")+1);
	    	
	    	String defaultPath = request.getSession().getServletContext().getRealPath("/");
	    	String path=defaultPath + "resource" + File.separator + "BisFile" + File.separator;
	    	//String storePath="D:/BisFile/";
	    	
	    	//FTP에 전송할 file객체 생성
	    	File upFile=new File(originalFileName);
	    	//mfile.transferTo(upFile);
	    	
	    	//로컬에 디렉토리생성
	    	File file=new File(path);
	    	//File storeFile=new File(storePath);
	    	
	    	if(!file.exists()){
				file.mkdirs();
			}
	    	/*if(!storeFile.exists()){
	    		storeFile.mkdirs();
	    	}*/
	 
	    	int fileSize=(int) (mfile.getSize()/(1024*1024));
	    	if(fileSize<100){
		    	if(ext.equals("jpg") || ext.equals("png") || ext.equals("gif") || ext.equals("JPG") || ext.equals("PNG") || ext.equals("GIF")){
		    		storedFileName="FI"+calcFileNum+"."+ext;
		    	}else{
		    		storedFileName="FV"+calcFileNum+"."+ext;
		    	}
		    	File localFile=new File(path+storedFileName);
		    	mfile.transferTo(localFile);//로컬에 저장
		    	//mfile.transferTo(new File(storePath+storedFileName));
		    	Map<String,Object> ftpInfo=new HashMap<String,Object>();
		    	ftpInfo.put("formPath", bisItFormService.formPath());
		    	ftpInfo.put("ftpId", bisItFormService.ftpId());
		    	ftpInfo.put("ftpIp", bisItFormService.ftpIp());
		    	ftpInfo.put("ftpPw", bisItFormService.ftpPw());
		    	ftpInfo.put("ftpPort", bisItFormService.ftpPort());
		    	System.out.println("FTP 전송시작");
		    	int result=bfu.upload(upFile, storedFileName, ftpInfo, request);	//FTP 파일 전송
		    	System.out.println("FTP 전송끝");

		    	if(result == 1){
		    		System.out.println("filePath : "+upFilePath);
		    		bfu.fileListRemove(new File(upFilePath));
		    	}else{
		    		System.out.println("@@@@@@ FTP연결 실패 로컬파일 삭제 @@@@@@@@");
		    		localFile.delete();
		    		map.put("warning", "FTP서버 연결 실패");
		    	}
		    	
	    	}else{
	    		map.put("warning", "파일 사이즈가 10MB이상은 업로드할 수 없습니다.");
	    	}
    	}
    	map.put("data", storedFileName);
    	return map;	
    }
    
    @RequestMapping(value = "/parent", method = RequestMethod.PUT, produces=APPLICATION_JSON )
    public ApiResponse save(@RequestBody List<Map<String,Object>> bisItForm) {
    	SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
    	
    	String formId=(String)bisItForm.get(0).get("formId");
    	
    	String fileName=(String) bisItForm.get(1).get("data");
    	
    	String userId=(String) bisItForm.get(0).get("userId");
    	System.out.println("userId : "+userId);
    
    	if(fileName==null || fileName.equals("")){	//수정일 경우 첨부파일 없을때
    		formId=(String)bisItForm.get(0).get("formId");
    		bisItForm.get(0).put("fileName", bisItForm.get(0).get("fileName"));
    	}else{	//신규생성하거나 수정할때 첨부파일이 있으면
    		formId=fileName.split("\\.")[0];
    		bisItForm.get(0).put("fileName", bisItForm.get(1).get("data"));
    	}
    	
    	bisItForm.get(0).put("formId", formId);
    	bisItForm.get(0).put("updateDate", sdf.format(new Date()));
    	
    	bisItFormService.insert(bisItForm.get(0));
		
    	return ok();
    }
    
   
}