package kr.tracom.bis.domain.bisMaHistory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HistoryUtils {
	
	public Map<String, Object> getHistoryInfo(List<Map<String,Object>> datas){
		Map<String,Object> map=new HashMap<String,Object>();
    	List<Object> listMap=new ArrayList<Object>();
    	int calc=datas.size();
    	
    	for(int i=0; i<calc-2;i++){
    		listMap.add(datas.get(i));
    	}
    	map.put("itemList", listMap);
    	map.put("startDate", datas.get(calc-2).get("startDate"));
    	map.put("endDate", datas.get(calc-2).get("endDate"));
    	map.put("Select", datas.get(calc-1).get("Select"));
    	return map;
	}

}
