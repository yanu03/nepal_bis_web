package kr.tracom.bis.domain.bisMtTerminal;

import lombok.Data;

@Data
public class BisMtTerminal {

	private String terminalId;
	private String terminalType;
	private String vehicleId;
	private String terminalVersion;
	private String ipAddress;
	private String serialNo;
	private String countryCode;
	private String areaCode;
	private String updateDate;
	private String userId;
	private String useYn;
	
	private String plateNumber;
	private String 	adminName1;
	private Integer count;
}
