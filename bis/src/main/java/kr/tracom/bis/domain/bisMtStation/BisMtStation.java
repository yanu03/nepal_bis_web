package kr.tracom.bis.domain.bisMtStation;

import lombok.Data;

@Data
public class BisMtStation  {
	private String stationId="";
	private String stationType="";
	private String nodeId="";
	private String linkId="";
	private String stationName="";
	private String stationEname="";
	private String displayName="";
	private String displayEname="";
	private Double gpsX=0.0;
	private Double gpsY=0.0;
	private Double tmX=0.0;
	private Double tmY=0.0;
	private String centerYn="";
	private Integer mobileNo=0;
	private String representationYn="";
	private String countryCode="";
	private String areaCode="";
	private String updateDate="";
	private String userId="";
	private String useYn;
	
	private String adminName1="";
	private Integer count=0;
	
	private boolean __created__;
	private boolean  __modified__;
	private boolean __selected__;
	private boolean __deleted__;
	
	
	
	
}
