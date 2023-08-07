package kr.tracom.bis.domain.bisCtDetailCode;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("bisCtDetailCode")
public class BisCtDetailCode {
	private String parentKey;
	private String commonCode;
	private String detailCode;
	private String detailCodeName;
	private String detailCodeEname;
	private int sequence;
	private String value1;
	private String value2;
	private String value3;
	private String remark;
	private String userId;
	private String updateDate;
	private String useYn;

}
