package kr.tracom.bis.domain.bisItScenarioform;
 
import org.apache.ibatis.type.Alias;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
 
@Data
@Alias("bisItScenarioform")
public class BisItScenarioform {
 
	private String scenarioId;
 
	private String formId;
 
	private Integer sequence;
 
	private Integer displayTime;
 
	private String userId;
 
	private String updateDate;
 
	private String useYn;
	
	private String fileName;
 
}