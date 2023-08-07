package kr.tracom.bis.domain.bisItSystemschedule;

import org.apache.ibatis.type.Alias;

import kr.tracom.bis.domain.bisMtRoute.BisMtRoute;
import lombok.Data;

@Data
@Alias("bisItSystemschedule")
public class BisItSystemschedule {
	private String scheduleId="";
	 
	private String scheduleCode="";
 
	private String startDate="";
 
	private String endDate="";
 
	private String startTime="";
 
	private String endTime="";
 
	private Integer scheduleValue=0;
 
	private String remark="";
 
	private String userId="";
 
	private String updateDate="";
 
	private String useYn;
 
 
}
