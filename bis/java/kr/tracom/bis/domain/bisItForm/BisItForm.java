package kr.tracom.bis.domain.bisItForm;
 
import org.apache.ibatis.type.Alias;

import lombok.Data;
 
@Data
@Alias("bisItForm")
public class BisItForm{
 
	private String formId;
 
	private String formType;
 
	private String formName;
 
	private String formEname;
 
	private String fileName;
 
	private String remark;
 
	private String userId;
 
	private String updateDate;
 
	private String useYn;
 

}