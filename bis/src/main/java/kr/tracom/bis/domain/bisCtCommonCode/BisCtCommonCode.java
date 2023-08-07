package kr.tracom.bis.domain.bisCtCommonCode;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("bisCtCommonCode")
public class BisCtCommonCode {
	private String commonCode;
	private String commonCodeName;
	private String commonCodeEname;
	private String value1;
	private String value2;
	private String value3;
	private String remark;
	private String userId;
	private String updateDate;
	private String useYn;
	private String searchData;
	private String __created__;
	private String __modified__;
	private String __selected__;
	private String __deleted__;
}
