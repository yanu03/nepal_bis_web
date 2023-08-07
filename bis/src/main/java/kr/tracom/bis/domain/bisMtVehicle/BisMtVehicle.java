package kr.tracom.bis.domain.bisMtVehicle;

import kr.tracom.bis.vo.baseVO;
import lombok.Data;

@Data
public class BisMtVehicle extends baseVO {
	private String vehicleId="";
	private String vehicleType="";
	private String plateNumber="";
	private String companyId="";
	private String busType="";
	private Integer vehicleCapa=0;
	private String countryCode="";
	private String areaCode="";
	private String updateDate="";
	private String remark="";
	private String userId="";
	private String useYn;
	
	private String adminName1="";
	private String companyName="";
	private Integer count;
}
