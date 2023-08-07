package kr.tracom.bis.domain.bisMtRoutestation;

import lombok.Data;

@Data
public class BisMtRoutestation {

	private String routeId;
	private Integer stationSequence;
	private String stationId;
	private String updownDir;
	private Integer sumDistance;
	private Integer remainDistance;
	private Integer statDistance;
	private Integer nextDistance;
	private String statType;
	private Integer linkSequence;
	private String updateDate;
	private String remark;
	private String userId;
	private String useYn;
	
	
	private Double gpsX;
	private Double gpsY;
	private String stationName;
	
	private String vehicleId;
	
	private boolean __created__;
	private boolean  __modified__;
	private boolean __selected__;
	private boolean __deleted__;
	
	
	
	
}
