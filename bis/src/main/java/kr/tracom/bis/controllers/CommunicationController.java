package kr.tracom.bis.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.inject.Inject;

import org.json.JSONException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.seleniumhq.jetty7.util.ajax.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.chequer.axboot.core.controllers.BaseController;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.tracom.bis.url;
import kr.tracom.bis.domain.bisItBitschedulegroup.BisItBitschedulegroup;
import kr.tracom.bis.domain.bisItBitschedulegroup.BisItBitschedulegroupService;
import kr.tracom.bis.domain.bisItSchedulegroup.BisItSchedulegroup;
import kr.tracom.bis.domain.bisItSchedulegroup.BisItSchedulegroupService;
import kr.tracom.bis.domain.bisItSendsystemversion.BisItSendsystemversion;
import kr.tracom.bis.domain.bisItSendsystemversion.BisItSendsystemversionService;
import kr.tracom.bis.domain.bisMtBit.BisMtBit;
import kr.tracom.bis.domain.bisMtBit.BisMtBitService;
import kr.tracom.bis.domain.bisMtTerminal.BisMtTerminal;
import kr.tracom.bis.domain.bisMtTerminal.BisMtTerminalService;

@Controller
@RequestMapping(value = "/communication")
public class CommunicationController extends BaseController {
	@Inject
	private BisMtBitService bisMtBitService;

	@Inject
	private BisMtTerminalService bisMtTerminalService;

	@Inject
	private BisItBitschedulegroupService bisItBitschedulegroupService;

	@Inject
	private BisItSchedulegroupService bisItSchedulegroupService;

	@Inject
	private BisItSendsystemversionService bisItSendsystemversionService;

	url communication = new url();
	String communicationurl = communication.url();

	@RequestMapping(value = "/monitor", method = RequestMethod.POST, produces = APPLICATION_JSON)
	public Map<String, Object> list(@RequestBody List<Map<String, Object>> sendList ) throws JSONException, ParseException {
	
		int size = sendList.size();
		List<Map<String, Object>> receiveList = new ArrayList<>();
		int check = 0;
		for(int s = 0 ;s < size;s++)
		{
			Map<String,Object> senddata = sendList.get(s);
			List<BisItBitschedulegroup> list = bisItBitschedulegroupService.findAll(senddata);
			String url = communicationurl + "/bis/bit/monitor";
			BisItSendsystemversion version = new BisItSendsystemversion();
			int listsize = list.size();
			for (int i = 0; i < listsize; i++) {
				version.setSystemId(list.get(i).getBitId());
				version.setVersionCode("154");
				version.setSystemType("3");
				version.setVersionValue(list.get(i).getApplyDate());
				bisItSendsystemversionService.add(version);
			}
			
			for (int i = 0; i < listsize; i++) {
				String code = list.get(i).getScheduleCode();
				if (code.equals("0")) {
					Map<String, Object> parameterMap = new HashMap();
					parameterMap.put("Select", "scheduleGroupId");
					parameterMap.put("scheduleGroupId", list.get(i).getScheduleGroupId());
					parameterMap.put("useYn", "Y");
					List<BisItSchedulegroup> grouplist = bisItSchedulegroupService.findAll(parameterMap);
					JSONObject json = new JSONObject();
					JSONArray array = new JSONArray();
					
					json.put("applyDate", list.get(i).getApplyDate());
					json.put("deviceId", list.get(i).getBitId());
					json.put("count", grouplist.size());
					for (int j = 0; j < grouplist.size(); j++) {
						JSONObject item = new JSONObject();
						item.put("startDate", grouplist.get(j).getStartDate());
						item.put("endDate", grouplist.get(j).getEndDate());
						item.put("startTime", grouplist.get(j).getStartTime());
						item.put("endTime", grouplist.get(j).getEndTime());
						array.add(item);
					}
					json.put("items", array);
					Map sendMap = send(json, url);
					if (sendMap == null) {
			
						sendMap = new HashMap();
						sendMap.put("ret_message", "Unable to connect");
						sendMap.put("ret_code", "0");
						
						check++;
						sendMap.put("id",list.get(i).getBitId());
						receiveList.add(sendMap);
						//return sendMap;
					} else {
						int ret_code = (int) sendMap.get("ret_code");
						if (ret_code == 0) {

							check++;
							sendMap.put("id",list.get(i).getBitId());
							receiveList.add(sendMap);
							//return sendMap;
						}
					}
				}
			}
		}
		if( 0 < check)
		{
			Map parameterMap = new HashMap();
			parameterMap.put("list", receiveList);
			parameterMap.put("ret_code", "111");
			return parameterMap;
		}
		Map parameterMap = new HashMap();
		parameterMap.put("ret_message", "Success");
		parameterMap.put("ret_code", "1");
		return parameterMap;
	/*	String str = "";
		JSONObject jsondata = new JSONObject();

	
		List<BisItBitschedulegroup> list = bisItBitschedulegroupService.findAll(senddata);
		String url = communicationurl + "/bis/bit/monitor";
		BisItSendsystemversion version = new BisItSendsystemversion();
		int listsize = list.size();
		for (int i = 0; i < listsize; i++) {
			version.setSystemId(list.get(i).getBitId());
			version.setVersionCode("154");
			version.setSystemType("3");
			version.setVersionValue(list.get(i).getApplyDate());
			bisItSendsystemversionService.add(version);
		}
		
		List<Map<String, Object>> receiveList = new ArrayList<>();
		int check = 0;
		
		for (int i = 0; i < listsize; i++) {
			String code = list.get(i).getScheduleCode();
			if (code.equals("0")) {
				Map<String, Object> parameterMap = new HashMap();
				parameterMap.put("Select", "scheduleGroupId");
				parameterMap.put("scheduleGroupId", list.get(i).getScheduleGroupId());
				parameterMap.put("useYn", "Y");
				List<BisItSchedulegroup> grouplist = bisItSchedulegroupService.findAll(parameterMap);
				JSONObject json = new JSONObject();
				JSONArray array = new JSONArray();
				
				json.put("applyDate", list.get(i).getApplyDate());
				json.put("deviceId", list.get(i).getBitId());
				json.put("count", grouplist.size());
				for (int j = 0; j < grouplist.size(); j++) {
					JSONObject item = new JSONObject();
					item.put("startDate", grouplist.get(j).getStartDate());
					item.put("endDate", grouplist.get(j).getEndDate());
					item.put("startTime", grouplist.get(j).getStartTime());
					item.put("endTime", grouplist.get(j).getEndTime());
					array.add(item);
				}
				json.put("items", array);
				Map sendMap = send(json, url);
				if (sendMap == null) {
		
					sendMap = new HashMap();
					sendMap.put("ret_message", "Unable to connect");
					sendMap.put("ret_code", "0");
					
					check++;
					sendMap.put("id",list.get(i).getBitId());
					receiveList.add(sendMap);
					//return sendMap;
				} else {
					int ret_code = (int) sendMap.get("ret_code");
					if (ret_code == 0) {

						check++;
						sendMap.put("id",list.get(i).getBitId());
						receiveList.add(sendMap);
						//return sendMap;
					}
				}
			}
		}
		if( 0 < check)
		{
			Map parameterMap = new HashMap();
			parameterMap.put("list", receiveList);
			parameterMap.put("ret_code", "111");
			return parameterMap;
		}
		Map parameterMap = new HashMap();
		parameterMap.put("ret_message", "Success");
		parameterMap.put("ret_code", "1");
		return parameterMap;*/
		/*
		 * try{ JSONObject json = new JSONObject(); for( Map.Entry<String,
		 * Object> entry : senddata.entrySet() ) { String key = entry.getKey();
		 * Object value = entry.getValue(); json.put(key, value); }
		 * 
		 * 
		 * URL object=new URL(url);
		 * 
		 * HttpURLConnection con = (HttpURLConnection) object.openConnection();
		 * con.setDoOutput(true); con.setDoInput(true);
		 * con.setRequestProperty("Content-Type", "application/json");
		 * con.setRequestProperty("Accept", "application/json");
		 * con.setRequestMethod("POST");
		 * 
		 * OutputStreamWriter wr = new
		 * OutputStreamWriter(con.getOutputStream()); wr.write(json.toString());
		 * wr.flush(); //display what returns the POST request
		 * 
		 * StringBuilder sb = new StringBuilder(); int HttpResult =
		 * con.getResponseCode(); if (HttpResult == HttpURLConnection.HTTP_OK) {
		 * BufferedReader br = new BufferedReader( new
		 * InputStreamReader(con.getInputStream(), "utf-8")); String line =
		 * null; while ((line = br.readLine()) != null) { sb.append(line +
		 * "\n"); } br.close();
		 * 
		 * Map parameterMap = new HashMap(); JSONObject jsonObj= new
		 * JSONObject(sb.toString()); parameterMap = new
		 * ObjectMapper().readValue(jsonObj.toString(), Map.class) ;
		 * 
		 * return parameterMap;
		 * 
		 * } else { System.out.println(con.getResponseMessage()); }
		 * }catch(MalformedURLException e) {
		 * System.out.println("The URL address is incorrect");
		 * e.printStackTrace(); }catch(IOException e) {
		 * System.out.println("It can't connect to the web page");
		 * e.printStackTrace(); } Map parameterMap = new HashMap();
		 * parameterMap.put( "ret_message", "error");
		 * parameterMap.put("ret_code", "");
		 * 
		 * 
		 * return parameterMap;
		 */
	}

	@RequestMapping(value = "/illumination", method = RequestMethod.POST, produces = APPLICATION_JSON)
	public Map<String, Object> illumination(@RequestBody List<Map<String, Object>> sendList)
			throws JSONException, ParseException {
		
		int size = sendList.size();
		List<Map<String, Object>> receiveList = new ArrayList<>();
		int check = 0;
		for(int s = 0 ;s < size;s++)
		{
			Map<String,Object> senddata = sendList.get(s);
			List<BisItBitschedulegroup> list = bisItBitschedulegroupService.findAll(senddata);
			String url = communicationurl + "/bis/bit/illumination";
			BisItSendsystemversion version = new BisItSendsystemversion();
			for (int i = 0; i < list.size(); i++) {
				version.setSystemId(list.get(i).getBitId());
				version.setVersionCode("155");
				version.setSystemType("3");
				version.setVersionValue(list.get(i).getApplyDate());
				bisItSendsystemversionService.add(version);
			}
			
			for (int i = 0; i < list.size(); i++) {
				String code = list.get(i).getScheduleCode();
				if (code.equals("1")) {
					Map<String, Object> parameterMap = new HashMap();
					parameterMap.put("Select", "scheduleGroupId");
					parameterMap.put("scheduleGroupId", list.get(i).getScheduleGroupId());
					parameterMap.put("useYn", "Y");
					List<BisItSchedulegroup> grouplist = bisItSchedulegroupService.findAll(parameterMap);
					JSONObject json = new JSONObject();
					JSONArray array = new JSONArray();

					json.put("applyDate", list.get(i).getApplyDate());
					json.put("deviceId", list.get(i).getBitId());
					json.put("count", grouplist.size());
					for (int j = 0; j < grouplist.size(); j++) {
						JSONObject item = new JSONObject();
						item.put("startDate", grouplist.get(j).getStartDate());
						item.put("endDate", grouplist.get(j).getEndDate());
						item.put("startTime", grouplist.get(j).getStartTime());
						item.put("endTime", grouplist.get(j).getEndTime());
						item.put("value", grouplist.get(j).getScheduleValue());
						array.add(item);
					}
					json.put("items", array);
					Map sendMap = send(json, url);
					if (sendMap == null) {
						sendMap = new HashMap();
						sendMap.put("ret_message", "Unable to connect");
						sendMap.put("ret_code", "0");
						check++;
						sendMap.put("id",list.get(i).getBitId());
						receiveList.add(sendMap);
						
						//return sendMap;
					} else {
						int ret_code = (int) sendMap.get("ret_code");
						if (ret_code != 1) {
							check++;
							sendMap.put("id",list.get(i).getBitId());
							receiveList.add(sendMap);
						//	return sendMap;
						}
					}
				}
			}
		}
		if( 0 < check)
		{
			Map parameterMap = new HashMap();
			parameterMap.put("list", receiveList);
			parameterMap.put("ret_code", "111");
			return parameterMap;
		}
		Map parameterMap = new HashMap();
		parameterMap.put("ret_message", "Success");
		parameterMap.put("ret_code", "1");
		return parameterMap;
		/*JSONObject jsondata = new JSONObject();

		bisMtBitService.findId();
		List<BisItBitschedulegroup> list = bisItBitschedulegroupService.findAll(senddata);
		String url = communicationurl + "/bis/bit/illumination";

		BisItSendsystemversion version = new BisItSendsystemversion();
		for (int i = 0; i < list.size(); i++) {
			version.setSystemId(list.get(i).getBitId());
			version.setVersionCode("155");
			version.setSystemType("3");
			version.setVersionValue(list.get(i).getApplyDate());
			bisItSendsystemversionService.add(version);
		}

		List<Map<String, Object>> receiveList = new ArrayList<>();
		int check = 0;
		for (int i = 0; i < list.size(); i++) {
			String code = list.get(i).getScheduleCode();
			if (code.equals("1")) {
				Map<String, Object> parameterMap = new HashMap();
				parameterMap.put("Select", "scheduleGroupId");
				parameterMap.put("scheduleGroupId", list.get(i).getScheduleGroupId());
				parameterMap.put("useYn", "Y");
				List<BisItSchedulegroup> grouplist = bisItSchedulegroupService.findAll(parameterMap);
				JSONObject json = new JSONObject();
				JSONArray array = new JSONArray();

				json.put("applyDate", list.get(i).getApplyDate());
				json.put("deviceId", list.get(i).getBitId());
				json.put("count", grouplist.size());
				for (int j = 0; j < grouplist.size(); j++) {
					JSONObject item = new JSONObject();
					item.put("startDate", grouplist.get(j).getStartDate());
					item.put("endDate", grouplist.get(j).getEndDate());
					item.put("startTime", grouplist.get(j).getStartTime());
					item.put("endTime", grouplist.get(j).getEndTime());
					item.put("value", grouplist.get(j).getScheduleValue());
					array.add(item);

				}
				json.put("items", array);
				Map sendMap = send(json, url);
				if (sendMap == null) {
					sendMap = new HashMap();
					sendMap.put("ret_message", "Unable to connect");
					sendMap.put("ret_code", "0");
					check++;
					sendMap.put("id",list.get(i).getBitId());
					receiveList.add(sendMap);
					
					//return sendMap;
				} else {
					int ret_code = (int) sendMap.get("ret_code");
					if (ret_code != 1) {
						
						check++;
						sendMap.put("id",list.get(i).getBitId());
						receiveList.add(sendMap);
					//	return sendMap;
						
					}
				}
			}

		}
		if( 0 < check)
		{
			Map parameterMap = new HashMap();
			parameterMap.put("list", receiveList);
			parameterMap.put("ret_code", "111");
			return parameterMap;
		}
		
		Map parameterMap = new HashMap();
		parameterMap.put("ret_message", "Success");
		parameterMap.put("ret_code", "");
		return parameterMap;*/
	}

	@RequestMapping(value = "/ftp", method = RequestMethod.POST, produces = APPLICATION_JSON)
	public Map<String, Object> ftp(@RequestBody List<Map<String, Object>> sendList) throws JSONException, ParseException {
		int size = sendList.size();
		List<Map<String, Object>> receiveList = new ArrayList<>();
		int check = 0;
		for(int s = 0 ;s < size;s++)
		{
			Map<String,Object> senddata = sendList.get(s);
			String str = "";
			JSONObject jsondata = new JSONObject();
			
				JSONObject json = new JSONObject();
				for (Map.Entry<String, Object> entry : senddata.entrySet()) {
					String key = entry.getKey();
					Object value = entry.getValue();
					json.put(key, value);
				}
				String url = communicationurl + "/bis/ftp";
				List<BisMtBit> bitlist = null;
				List<BisMtTerminal> terminallist = null;
				if(((String)senddata.get("deviceId")).equals("0000000000"))
				{
					BisItSendsystemversion version = new BisItSendsystemversion();
					if(3 == (int)senddata.get("deviceType")) //BIT, BIT는 Master Information 사용안함
					{
						bitlist = bisMtBitService.findId();
						for (int i = 0; i < bitlist.size(); i++) {
							version.setSystemId(bitlist.get(i).getBitId());
							version.setVersionCode("151");
							version.setSystemType("3");
							version.setVersionValue((String) senddata.get("applyDate"));
							bisItSendsystemversionService.add(version);
						}
					}
					else if(2 == (int)senddata.get("deviceType"))
					{
						terminallist = bisMtTerminalService.findId();
						for (int i = 0; i < terminallist.size(); i++) {
							version.setSystemId(terminallist.get(i).getTerminalId());
							version.setVersionCode("102");
							version.setSystemType("2");
							version.setVersionValue((String) senddata.get("applyDate"));
							bisItSendsystemversionService.add(version);
						}
					}
				}
				else
				{
						
					String versionCode ="";
					if(2 == (int)senddata.get("deviceType"))
					{
						 versionCode="102";
					}
					else if(3 == (int)senddata.get("deviceType"))
					{
						 versionCode="151";
					}
					BisItSendsystemversion version = new BisItSendsystemversion();
					version.setSystemId((String) senddata.get("deviceId"));
					version.setVersionCode(versionCode);
					version.setSystemType(String.valueOf((int)senddata.get("deviceType")));
					version.setVersionValue((String) senddata.get("applyDate"));
					bisItSendsystemversionService.add(version);
				}
				
				Map sendMap = send(json, url);
				if (sendMap == null) {
					sendMap = new HashMap();
					sendMap.put("ret_message", "Unable to connect");
					sendMap.put("ret_code", "0");
					check++;
					sendMap.put("id",(String)senddata.get("deviceId"));
					receiveList.add(sendMap);
					
					//return sendMap;
				} else {
					int ret_code = (int) sendMap.get("ret_code");
					if (ret_code != 1) {
						
						check++;
						sendMap.put("id",(String)senddata.get("deviceId"));
						receiveList.add(sendMap);
					//	return sendMap;
						
					}
				}
			}
		if( 0 < check)
		{
			Map parameterMap = new HashMap();
			parameterMap.put("list", receiveList);
			parameterMap.put("ret_code", "111");
			return parameterMap;
		}
		
		Map parameterMap = new HashMap();
		parameterMap.put("ret_message", "Success");
		parameterMap.put("ret_code", "1");
		return parameterMap;
		
		/*String str = "";
		JSONObject jsondata = new JSONObject();

		try {
			JSONObject json = new JSONObject();
			for (Map.Entry<String, Object> entry : senddata.entrySet()) {
				String key = entry.getKey();
				Object value = entry.getValue();
				json.put(key, value);
			}
			String url = communicationurl + "/bis/ftp";
			List<BisMtBit> bitlist = null;
			List<BisMtTerminal> terminallist = null;
			if(((String) senddata.get("deviceId")).equals("0000000000"))
			{
				bitlist = bisMtBitService.findId();
				BisItSendsystemversion version = new BisItSendsystemversion();
				for (int i = 0; i < bitlist.size(); i++) {
					version.setSystemId(bitlist.get(i).getBitId());
					version.setVersionCode("151");
					version.setSystemType("3");
					version.setVersionValue((String) senddata.get("applyDate"));
					bisItSendsystemversionService.add(version);
				}
				terminallist = bisMtTerminalService.findId();
				for (int i = 0; i < terminallist.size(); i++) {
					version.setSystemId(terminallist.get(i).getTerminalId());
					version.setVersionCode("102");
					version.setSystemType("2");
					version.setVersionValue((String) senddata.get("applyDate"));
					bisItSendsystemversionService.add(version);
				}
			}
			else
			{
				String versionCode ="";
				if(2 == (int)senddata.get("deviceType"))
				{

					 versionCode="102";
				}
				else if(3 == (int)senddata.get("deviceType"))
				{
					 versionCode="151";
				}
				BisItSendsystemversion version = new BisItSendsystemversion();
				version.setSystemId((String) senddata.get("deviceId"));
				version.setVersionCode(versionCode);
				version.setSystemType(String.valueOf((int)senddata.get("deviceType")));
				version.setVersionValue((String) senddata.get("applyDate"));
				bisItSendsystemversionService.add(version);
			}
		
			URL object = new URL(url);
			HttpURLConnection con = (HttpURLConnection) object.openConnection();
			con.setDoOutput(true);
			con.setDoInput(true);
			con.setRequestProperty("Content-Type", "application/json");
			con.setRequestProperty("Accept", "application/json");
			con.setRequestMethod("POST");

			OutputStreamWriter wr = new OutputStreamWriter(con.getOutputStream());
			wr.write(json.toString());
			wr.flush();


			StringBuilder sb = new StringBuilder();
			int HttpResult = con.getResponseCode();
			if (HttpResult == HttpURLConnection.HTTP_OK) {
				BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
				String line = null;
				while ((line = br.readLine()) != null) {
					sb.append(line + "\n");
				}
				br.close();

				Map parameterMap = new HashMap();
				JSONParser parser = new JSONParser();
				Object obj = parser.parse(sb.toString());
				JSONObject jsonObj = (JSONObject) obj;
				parameterMap = new ObjectMapper().readValue(jsonObj.toString(), Map.class);

				return parameterMap;

			} else {
				System.out.println(con.getResponseMessage());
			}
		} catch (MalformedURLException e) {
			System.out.println("The URL address is incorrect");
			e.printStackTrace();
		} catch (IOException e) {
			System.out.println("It can't connect to the web page");
			e.printStackTrace();
		}
		Map parameterMap = new HashMap();
		parameterMap.put("ret_message", "Unable to connect");
		parameterMap.put("ret_code", "0");

		return parameterMap;*/
	}

	// /, @RequestParam Map<String, Object> searchData
	@RequestMapping(value = "/test", method = RequestMethod.POST, produces = APPLICATION_JSON)
	public Map<String, Object> test(@RequestBody Map<String, Object> searchData) {
		System.out.println(searchData);
		return searchData;
	}
	@RequestMapping(value = "/firmware", method = RequestMethod.POST, produces = APPLICATION_JSON)
	public Map<String, Object> firmware(@RequestBody List<Map<String, Object>> sendList)
			throws JSONException, ParseException {
		int size = sendList.size();
		List<Map<String, Object>> receiveList = new ArrayList<>();
		int check = 0;
		for(int s = 0 ;s < size;s++)
		{
			Map<String,Object> senddata = sendList.get(s);
			String str = "";
			JSONObject jsondata = new JSONObject();
			
				JSONObject json = new JSONObject();
				for (Map.Entry<String, Object> entry : senddata.entrySet()) {
					String key = entry.getKey();
					Object value = entry.getValue();
					json.put(key, value);
				}
				String url = communicationurl + "/bis/ftp";
				List<BisMtBit> bitlist = null;
				List<BisMtTerminal> terminallist = null;
				if(((String)senddata.get("deviceId")).equals("0000000000"))
				{
					
					BisItSendsystemversion version = new BisItSendsystemversion();
					if(3 == (int)senddata.get("deviceType"))
					{
						bitlist = bisMtBitService.findId();
						for (int i = 0; i < bitlist.size(); i++) {
							version.setSystemId(bitlist.get(i).getBitId());
							version.setVersionCode("150");
							version.setSystemType("3");
							version.setVersionValue((String) senddata.get("applyDate"));
							bisItSendsystemversionService.add(version);
						}
					}
					else if(2 == (int)senddata.get("deviceType"))
					{
						terminallist = bisMtTerminalService.findId();
						for (int i = 0; i < terminallist.size(); i++) {
							version.setSystemId(terminallist.get(i).getTerminalId());
							version.setVersionCode((String) senddata.get("fileCode"));
							version.setSystemType("2");
							version.setVersionValue((String) senddata.get("applyDate"));
							bisItSendsystemversionService.add(version);
						}
					}
				}
				else
				{
					BisItSendsystemversion version = new BisItSendsystemversion();
					version.setSystemId((String) senddata.get("deviceId"));
					version.setVersionCode((String) senddata.get("fileCode"));
					version.setSystemType(String.valueOf((int)senddata.get("deviceType")));
					version.setVersionValue((String) senddata.get("applyDate"));
					bisItSendsystemversionService.add(version);
				}
				
				Map sendMap = send(json, url);
				if (sendMap == null) {
					sendMap = new HashMap();
					sendMap.put("ret_message", "Unable to connect");
					sendMap.put("ret_code", "0");
					check++;
					sendMap.put("id",(String)senddata.get("deviceId"));
					receiveList.add(sendMap);
					
					//return sendMap;
				} else {
					int ret_code = (int) sendMap.get("ret_code");
					if (ret_code != 1) {
						
						check++;
						sendMap.put("id",(String)senddata.get("deviceId"));
						receiveList.add(sendMap);
					//	return sendMap;
						
					}
				}
			}
		if( 0 < check)
		{
			Map parameterMap = new HashMap();
			parameterMap.put("list", receiveList);
			parameterMap.put("ret_code", "111");
			return parameterMap;
		}
		
		Map parameterMap = new HashMap();
		parameterMap.put("ret_message", "Success");
		parameterMap.put("ret_code", "1");
		return parameterMap;
	
		/*	String str = "";
		JSONObject jsondata = new JSONObject();

		JSONObject json = new JSONObject();
		for (Map.Entry<String, Object> entry : senddata.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			json.put(key, value);
		}
		String url = communicationurl + "/bis/ftp";
		List<BisMtBit> bitlist = null;
		List<BisMtTerminal> terminallist = null;
		if (senddata.get("deviceId").equals("0000000000")) {
			int type = (int) senddata.get("deviceType");
			if (3 == type) {
				bitlist = bisMtBitService.findId();
				BisItSendsystemversion version = new BisItSendsystemversion();
				for (int i = 0; i < bitlist.size(); i++) {
					version.setSystemId(bitlist.get(i).getBitId());
					version.setVersionCode("150");
					version.setSystemType("3");
					version.setVersionValue((String) senddata.get("applyDate"));
					bisItSendsystemversionService.add(version);
				}

				for (int i = 0; i < bitlist.size(); i++) {

					JSONObject jsontemp = json;
					String deviceId = bitlist.get(i).getBitId();
					jsontemp.put("deviceId", deviceId);
					Map sendMap = send(jsontemp, url);
					if (sendMap == null) {
						Map parameterMap = new HashMap();
						parameterMap.put("ret_message", "error");
						parameterMap.put("ret_code", "");
						return parameterMap;
					} else {
						int ret_code = (int) sendMap.get("ret_code");
						if (ret_code == 0) {
							return sendMap;
						}
					}
				}
			} else if (2 == type) {
				terminallist = bisMtTerminalService.findId();
				BisItSendsystemversion version = new BisItSendsystemversion();
				for (int i = 0; i < terminallist.size(); i++) {
					version.setSystemId(terminallist.get(i).getTerminalId());
					version.setVersionCode((String) senddata.get("fileCode"));
					version.setSystemType("2");
					version.setVersionValue((String) senddata.get("applyDate"));
					bisItSendsystemversionService.add(version);
				}

				for (int i = 0; i < terminallist.size(); i++) {
					JSONObject jsontemp = json;
					String deviceId = terminallist.get(i).getTerminalId();
					jsontemp.put("deviceId", deviceId);
					Map sendMap = send(jsontemp, url);
					if (sendMap == null) {
						Map parameterMap = new HashMap();
						parameterMap.put("ret_message", "Unable to connect");
						parameterMap.put("ret_code", "0");
						return parameterMap;
					} else {
						int ret_code = (int) sendMap.get("ret_code");
						if (ret_code == 0) {
							return sendMap;
						}
					}
				}
			}
			Map parameterMap = new HashMap();
			parameterMap.put("ret_message", "Success");
			parameterMap.put("ret_code", "1");
			return parameterMap;
		}
		BisItSendsystemversion version = new BisItSendsystemversion();
			version.setSystemId((String) senddata.get("deviceId"));
			version.setVersionCode((String) senddata.get("fileCode"));
			int deviceType = (int) senddata.get("deviceType");
			version.setSystemType(String.valueOf(deviceType));
			version.setVersionValue((String) senddata.get("applyDate"));
			bisItSendsystemversionService.add(version);
			
		Map sendMap = send(json, url);
		if (sendMap != null) {
			return sendMap;
		}
		Map parameterMap = new HashMap();
		parameterMap.put("ret_message", "Unable to connect");
		parameterMap.put("ret_code", "0");
		return parameterMap;
		*/
	}

	@RequestMapping(value = "/control", method = RequestMethod.POST, produces = APPLICATION_JSON)
	public Map<String, Object> control(@RequestBody List<Map<String, Object>> sendList) throws JSONException, ParseException {
		int size = sendList.size();
		List<Map<String, Object>> receiveList = new ArrayList<>();
		int check = 0;
		for(int i = 0 ;i < size;i++)
		{
			Map<String,Object> senddata = sendList.get(i);
			JSONObject json = new JSONObject();
			for (Map.Entry<String, Object> entry : senddata.entrySet()) {
				String key = entry.getKey();
				Object value = entry.getValue();
				json.put(key, value);
			}
			String url = communicationurl + "/bis/control";
			List<BisMtBit> bitlist = null;
			List<BisMtTerminal> terminallist = null;

			
			
			if (null == senddata.get("deviceId")) {
				int type = (int) senddata.get("deviceType");
				
				//BIT장비
				if (3 == type) 
				{
					bitlist = bisMtBitService.findId();
					for (int j = 0; j < bitlist.size(); j++) {
						JSONObject jsontemp = json;
						String deviceId = bitlist.get(j).getBitId();
						jsontemp.put("deviceId", deviceId);
						Map sendMap = send(jsontemp, url);
						if (sendMap == null) {
							Map parameterMap = new HashMap();
							parameterMap.put("ret_message", "Unable to connect");
							parameterMap.put("ret_code", "0");
							check++;
							parameterMap.put("id", bitlist.get(j).getBitId());
							receiveList.add(parameterMap);
							//return parameterMap;
						} else {
							int ret_code = (int) sendMap.get("ret_code");
							if (ret_code != 1) {

							check++;
							sendMap.put("id", bitlist.get(j).getBitId());
							receiveList.add(sendMap);	
							//return sendMap;
							
							
							}
						}
					}
					if(0 < check)
					{
						Map parameterMap = new HashMap();
						parameterMap.put("list", receiveList);
						parameterMap.put("ret_code", "111");
						return parameterMap;
					}
				} else if (2 == type) {
					
					terminallist = bisMtTerminalService.findId();
					for (int j = 0; j < terminallist.size(); j++) {
						JSONObject jsontemp = json;
						String deviceId = terminallist.get(j).getTerminalId();
						jsontemp.put("deviceId", deviceId);
						Map sendMap = send(jsontemp, url);
						if (sendMap == null) {
							Map parameterMap = new HashMap();
							parameterMap.put("ret_message", "Unable to connect");
							parameterMap.put("ret_code", "0");
							//return parameterMap;
							
							check++;
							parameterMap.put("id", terminallist.get(j).getTerminalId());
							receiveList.add(parameterMap);
						} else {
							int ret_code = (int) sendMap.get("ret_code");
							if (ret_code != 1) {
								check++;
								sendMap.put("id", terminallist.get(j).getTerminalId());
								receiveList.add(sendMap);	
								//return sendMap;
							}
						}
					}
					if(0 < check)
					{
						Map parameterMap = new HashMap();
						parameterMap.put("list", receiveList);
						parameterMap.put("ret_code", "111");
						return parameterMap;
					}
				}

				Map parameterMap = new HashMap();
				parameterMap.put("ret_message", "Success");
				parameterMap.put("ret_code", "1");
				return parameterMap;

			}
			Map sendMap = send(json, url);
			if (sendMap == null) {
				Map parameterMap = new HashMap();
				parameterMap.put("ret_message", "Unable to connect");
				parameterMap.put("ret_code", "0");
				//return parameterMap;
				
				check++;
				parameterMap.put("id",senddata.get("deviceId"));
				receiveList.add(parameterMap);
			} else {
				int ret_code = (int) sendMap.get("ret_code");
				if (ret_code != 1) {
					check++;
					sendMap.put("id",senddata.get("deviceId") );
					receiveList.add(sendMap);	
					//return sendMap;
				}
			}
			
		}
		if(0 < check)
		{
			Map parameterMap = new HashMap();
			parameterMap.put("list", receiveList);
			parameterMap.put("ret_code", "111");
			return parameterMap;
		}
		Map parameterMap = new HashMap();
		parameterMap.put("ret_message", "Success");
		parameterMap.put("ret_code", "1");
		return parameterMap;


	}

	public Map send(JSONObject json, String url) throws ParseException {
		try {
			URL object = new URL(url);

			HttpURLConnection con = (HttpURLConnection) object.openConnection();
			con.setDoOutput(true);
			con.setDoInput(true);
			con.setRequestProperty("Content-Type", "application/json");
			con.setRequestProperty("Accept", "application/json");
			con.setRequestMethod("POST");

			OutputStreamWriter wr = new OutputStreamWriter(con.getOutputStream());
			wr.write(json.toString());
			wr.flush();
			// display what returns the POST request

			StringBuilder sb = new StringBuilder();
			int HttpResult = con.getResponseCode();
			if (HttpResult == HttpURLConnection.HTTP_OK) {
				BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
				String line = null;
				while ((line = br.readLine()) != null) {
					sb.append(line + "\n");
				}
				br.close();

				Map parameterMap = new HashMap();
				JSONParser parser = new JSONParser();
				Object obj = parser.parse(sb.toString());
				JSONObject jsonObj = (JSONObject) obj;
				parameterMap = new ObjectMapper().readValue(jsonObj.toString(), Map.class);
				return parameterMap;

			} else {
				System.out.println(con.getResponseMessage());
			}
		} catch (MalformedURLException e) {
			System.out.println("The URL address is incorrect");
			e.printStackTrace();
		} catch (IOException e) {
			System.out.println("It can't connect to the web page");
			e.printStackTrace();
		}
		return null;
	}
}
