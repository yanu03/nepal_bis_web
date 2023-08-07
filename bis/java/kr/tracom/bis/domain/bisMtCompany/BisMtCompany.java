package kr.tracom.bis.domain.bisMtCompany;

import lombok.Data;

@Data
public class BisMtCompany {
	private String companyId;
	private String companyName;
	private String companyEname;
	private String telephoneNumber;
	private String faxNumber;
	private String address;
	private String ceoName;
	private String companyType;
	private Integer busCount;
	private Integer registCount;
	private Integer spareCount;
	private String countryCode;
	private String areaCode;
	private String updateDate;
	private String remark;
	private String userId;
	private String useYn;
	
	private String adminName1;
	private Integer count;
}
