package kr.tracom.bis.domain.bisItLocation;

import lombok.Data;

@Data
public class BisItLocation {
	private String vehicleId;
	private String routeId;
	private Integer nodeSequence;
	private String nodeId;
	private Integer stationSequence;
	private String stationId;
	private String collectDate;
	private String runCode;
	private String alarmCode;
	private Double gpsX;
	private Double gpsY;
	private String systemDate;
	
	private String plateNumber;
	private String busType;
	private String updowndir;
	
}
