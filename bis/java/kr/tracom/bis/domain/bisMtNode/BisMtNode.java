package kr.tracom.bis.domain.bisMtNode;

import lombok.Data;

@Data
public class BisMtNode {
	private String nodeId;
 
	private String nodeType;
 
	private String nodeName;
 
	private String nodeEname;
 
	private String turnRestType;
 
	private Double gpsX;
 
	private Double gpsY;
 
	private Double tmX;
 
	private Double tmY;
 
	private Integer entryRecogRads;
 
	private Integer advncRecogRads;
 
	private String countryCode;
 
	private String areaCode;
 
	private String updateDate;
 
	private String userId;
 
	private String useYn;
}
