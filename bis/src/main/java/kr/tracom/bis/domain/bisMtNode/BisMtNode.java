package kr.tracom.bis.domain.bisMtNode;

import lombok.Data;

@Data
public class BisMtNode {
	private String nodeId="";
 
	private String nodeType="";
 
	private String nodeName="";
 
	private String nodeEname="";
 
	private String turnRestType="";
 
	private Double gpsX=0.0;
 
	private Double gpsY=0.0;
 
	private Double tmX=0.0;
 
	private Double tmY=0.0;
 
	private Integer entryRecogRads=0;
 
	private Integer advncRecogRads=0;
 
	private String countryCode="";
 
	private String areaCode="";
 
	private String updateDate="";
 
	private String userId="";
 
	private String useYn;
}
