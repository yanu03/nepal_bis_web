package kr.tracom.bis.domain.bisMtBit;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("bisMtBit")
public class BisMtBit {
	private String bitId = "";
	private String bitType = "";
	private String bitName = "";
	private String bitEname = "";
	private String terminalVersion = "";
	private String ipAddress = "";
	private String cameraIpAddress = "";
	private String installDate = "";
	private String countryCode = "";
	private String areaCode = "";
	private String updateDate = "";
	private String userId = "";
	private String useYn = "";
	private String serialNo="";
	private String adminName1 = "";
}
