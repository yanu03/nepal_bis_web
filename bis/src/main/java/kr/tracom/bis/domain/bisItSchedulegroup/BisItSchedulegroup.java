package kr.tracom.bis.domain.bisItSchedulegroup;

import lombok.Data;

@Data
public class BisItSchedulegroup {

	private String scheduleGroupId="";
 
	private String scheduleId="";
 
	private String startDate="";
	 
	private String endDate="";
 
	private String startTime="";
 
	private String endTime="";
 
	private Integer scheduleValue=0;
	
	private String userId="";
 
	private String updateDate="";
 
	private String useYn;
 
	private String state;
}
