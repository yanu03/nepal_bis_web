package kr.tracom.bis.domain.bisMtRoutestation;

import lombok.Data;

@Data
public class BisMtRoutestation {

	private String routeId="";
	private Integer stationSequence=0;
	private String stationId="";
	private String updownDir="";
	private Integer sumDistance=0;
	private Integer remainDistance=0;
	private Integer statDistance=0;
	private Integer nextDistance=0;
	private String statType="";
	private Integer linkSequence=0;
	private String updateDate="";
	private String remark="";
	private String userId="";
	private String useYn;
	
	
	private Double gpsX=0.0;
	private Double gpsY=0.0;
	private String stationName="";
	
	private String vehicleId="";
	
	private boolean __created__;
	private boolean  __modified__;
	private boolean __selected__;
	private boolean __deleted__;
	
	
	
	
}
