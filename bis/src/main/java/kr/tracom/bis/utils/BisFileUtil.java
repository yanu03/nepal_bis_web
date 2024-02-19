package kr.tracom.bis.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.json.JSONException;
import org.json.JSONObject;

import kr.tracom.bis.domain.bisItForm.BisItFile;

public class BisFileUtil {
	
	//final static String URL="http://192.168.40.100:8085/";	//클라우드
	//final static String URL="http://127.0.0.1:8385/bis/";	//클라우드
	//final static String URL="http://localhost:8385/bis/";	//클라우드
	final static String URL="http://comm.nepalbis.com:8385/bis/";	//클라우드
	//final static String URL="http://192.168.34.250:8085/bis/";	//파일서버
	
	public int upload(File uploadFile, String fileName, Map<String,Object> fileMap, HttpServletRequest request)
			throws Exception {
		FTPClient ftp = null; // FTP Client 객체
		FileInputStream fis = null; // File Input Stream
		String dir = (String) fileMap.get("formPath");
		String id = (String) fileMap.get("ftpId");
		String pwd = (String) fileMap.get("ftpPw");
		String ip = (String) fileMap.get("ftpIp");
		System.out.println("dir : "+dir);
		System.out.println("id : "+id);
		System.out.println("pwd : "+pwd);
		System.out.println("ip : "+ip);
		int result = -1;
		try {
			ftp = new FTPClient(); // FTP Client 객체 생성
			ftp.setControlEncoding("UTF-8"); // 문자 코드를 UTF-8로 인코딩
			ftp.connect(ip); // 서버접속 " "안에 서버 주소 입력 또는
			ftp.login(id, pwd); // FTP 로그인 ID, PASSWORLD 입력
			ftp.enterLocalPassiveMode(); // Passive Mode 접속일때
			boolean checkFolder=ftp.changeWorkingDirectory(dir); // 작업 디렉토리 변경
			
			if(!checkFolder){
				ftp.makeDirectory(dir);
			}
			System.out.println("directory : "+ftp.printWorkingDirectory());
			System.out.println("stored : "+uploadFile.getPath());
			
			ftp.setFileType(FTP.BINARY_FILE_TYPE); // 업로드 파일 타입 셋팅
			System.out.println("체크1");
			try {
				fis = new FileInputStream(uploadFile); // 업로드할 File 생성
				boolean isSuccess = ftp.storeFile(fileName, fis); // File 업로드
				if (isSuccess) {
					result = 1; // 성공
				} else {
					throw new Exception("파일 업로드를 할 수 없습니다.");
				}
			} catch (IOException ex) {
				System.out.println("IO Exception : " + ex.getMessage());
			} finally {
				if (fis != null) {
					try {
						fis.close(); // Stream 닫기
						return result;
					} catch (IOException ex) {
						System.out.println("IO Exception : " + ex.getMessage());
					}
				}
			}
			ftp.logout(); // FTP Log Out
		} catch (IOException e) {
			System.out.println("IO:" + e.getMessage());
		} finally {
			if (ftp != null && ftp.isConnected()) {
				try {
					ftp.disconnect(); // 접속 끊기
					return result;
				} catch (IOException e) {
					System.out.println("IO Exception : " + e.getMessage());
				}
			}
		}
		return result;
	}
	
	public void fileListRemove(File file){
		File[] tempFiles=file.listFiles();
		for(File removeFile:tempFiles){
			removeFile.delete();
		}
	}
	
	public Map<String, Object> CommunicationUtil(Map<String, Object> data, String tailUrl) {
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		HttpURLConnection con = null;
		try {
			Set key = data.keySet();
			JSONObject json = new JSONObject();
			/*for	(Iterator iterator = key.iterator(); iterator.hasNext();) {
				String keyName = (String) iterator.next();
				Object valueName =  data.get(keyName); 
				json.put(keyName, valueName);
			}*/
			
			for( Map.Entry<String, Object> entry : data.entrySet() ) {
				String keyName = entry.getKey();
				Object valueName = entry.getValue();
				json.put(keyName, valueName);
			}

			String url = URL + tailUrl;
			
			System.out.println("url : " + url);
			URL object = new URL(url);

			con = (HttpURLConnection) object.openConnection();
			con.setDoOutput(true);
			con.setDoInput(true);
			//con.setRequestProperty("dataType", "json");
			//con.setRequestProperty("jsonpCallback", "callback");
			con.setRequestProperty("Content-Type", "application/json");
			con.setRequestProperty("Accept", "application/json");
			con.setRequestMethod("POST");
			
			System.out.println("json : "+json.toString());
			OutputStreamWriter wr = new	OutputStreamWriter(con.getOutputStream());
			wr.write(json.toString());
			wr.flush();

			// display what returns the POST request
			StringBuilder sb = new StringBuilder();
			int HttpResult = con.getResponseCode();
			if (HttpResult == HttpURLConnection.HTTP_OK) {
				BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
				String line = null;
				while ((line = br.readLine()) != null) {
					sb.append(line);
					System.out.println("message : "+sb.toString());
				}
				br.close();

				parameterMap.put("res_code", "1");
				parameterMap.put("res_msg",  "Transfer Successful");
			} else {
				parameterMap.put("res_code", "0");
				parameterMap.put("res_msg", con.getResponseMessage());
			}
		} catch (MalformedURLException e) {
			parameterMap.put("res_code", "0");
			parameterMap.put("res_msg",e.getMessage());
			
		} catch (IOException e) {
			parameterMap.put("res_code", "0");
			parameterMap.put("res_msg",e.getMessage());
		} catch (JSONException e) {
			parameterMap.put("res_code", "0");
			parameterMap.put("res_msg",e.getMessage());
		} catch (Exception e) {
			parameterMap.put("res_code", "0");
			parameterMap.put("res_msg",e.getMessage());
		} finally {
			con.disconnect();
		}
		return parameterMap;
	}
	
}
