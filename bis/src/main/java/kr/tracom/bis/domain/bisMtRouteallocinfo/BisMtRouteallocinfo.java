package kr.tracom.bis.domain.bisMtRouteallocinfo;

import lombok.Data;

@Data
public class BisMtRouteallocinfo {

	private String routeId="";
 
	private String dayType="";
 
	private Integer allocSequence=0;
 
	private String allocTime="";
 
	private String fromStationId="";
 
	private String toStationId="";
 
	private String updateDate="";
 
	private String remark="";
 
	private String userId="";
 
	private String useYn;
}
