package kr.tracom.bis.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.chequer.axboot.core.controllers.BaseController;


@Controller
@RequestMapping(value = "/communication")
public class CommunicationController extends BaseController  {
	 @RequestMapping(value="/control",method = RequestMethod.POST, produces = APPLICATION_JSON)
	 public Map<String, Object> list(@RequestParam Map<String, Object> data)  {
		 String str="";
		 try{
	/*		String starttime = (String) data.get("starttime");
			 String durationtime =(String)data.get("durationtime");
			 String alram =(String)data.get("alramcode");
			 String alramcode[] = alram.split(",");
			 Timestamp t = Timestamp.valueOf(starttime);
			 
			  JSONObject jsondata   = new JSONObject();
			  JSONObject json   = new JSONObject();
			  for(int  i = 0 ;i < alramcode.length;i++)
			  {
				  jsondata.put("starttime",starttime);
				  
				  jsondata.put("durationtime",durationtime);
				  jsondata.put("alram",alramcode[i]);
				  json.put(String.valueOf(i), jsondata);
			  }
			 */
			 
				/*  Set key = data.keySet();
			  for (Iterator iterator = key.iterator(); iterator.hasNext();) {
			                   String keyName = (String) iterator.next();
			                   String valueName = (String) data.get(keyName);
			                   param+='"'+keyName+'"'+'='+valueName+'"';
			  }
			 */
			 Set key = data.keySet();
			 JSONObject json = new JSONObject();
			  for (Iterator iterator = key.iterator(); iterator.hasNext();) {
			                   String keyName = (String) iterator.next();
			                   String valueName = (String) data.get(keyName);
			                   json.put(keyName, valueName);
			  }
			
			  String url="http://192.168.34.250:8085/bis/control/B000000001/1/2";
			  URL object=new URL(url);

			  HttpURLConnection con = (HttpURLConnection) object.openConnection();
			  con.setDoOutput(true);
			  con.setDoInput(true);
			  con.setRequestProperty("Content-Type", "application/json");
			  con.setRequestProperty("Accept", "application/json");
			  con.setRequestMethod("GET");
			
			/*  OutputStreamWriter wr = new OutputStreamWriter(con.getOutputStream());
			  wr.write(json.toString());
			  wr.flush();
*/
			  //display what returns the POST request

			  StringBuilder sb = new StringBuilder();  
			  int HttpResult = con.getResponseCode(); 
			  if (HttpResult == HttpURLConnection.HTTP_OK) {
			      BufferedReader br = new BufferedReader(
			      new InputStreamReader(con.getInputStream(), "utf-8"));
			      String line = null;
			      while ((line = br.readLine()) != null) {  
			          sb.append(line + "\n");  
			      }
			      br.close();

			    Map parameterMap = new HashMap();
				parameterMap.put(	"str", sb.toString());
				parameterMap.put("remark", "");
					 
				 return parameterMap; 
					 
			  } else {
			      System.out.println(con.getResponseMessage());  
			  }  
		 }catch(MalformedURLException e)
		 {
			 System.out.println("The URL address is incorrect");
			 e.printStackTrace();
		 }catch(IOException e)
		 {
			 System.out.println("It can't connect to the web page");
			 e.printStackTrace();
		 }catch(JSONException e)
		 {
			 e.printStackTrace();
		 }catch(Exception e)
		 {
			 e.printStackTrace();
		 }
		 Map parameterMap = new HashMap();
	
		 parameterMap.put(	"error", "Communication failure");
		 parameterMap.put("remark", "");
		 
		 return parameterMap;
	    }
	 
//	 /, @RequestParam Map<String, Object> searchData
	 @RequestMapping(value="/test",method = RequestMethod.POST, produces = APPLICATION_JSON)
	 public Map<String, Object> test(@RequestBody Map<String, Object> searchData) {
		 System.out.println(searchData);
		 return searchData;
	 }
	 
}
