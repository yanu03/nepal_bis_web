package kr.tracom.bis.domain.bisMtRouteplan;

import lombok.Data;

@Data
public class BisMtRouteplan {
	private String routeId="";
	private String routeName="";
	private String dayType="";
	private Integer serviceCount=0;
	private String stFirstTime="";
	private String stLastTime="";
	private String edFirstTime="";
	private String edLastTime="";
	private Integer minInterval=0;
	private Integer maxInterval=0;
	private String updateDate="";
	private String remark="";
	private String userId="";
	private String useYn;
}
