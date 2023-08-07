package kr.tracom.bis.domain.bisItBitscenario;
 
import org.apache.ibatis.type.Alias;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Alias("bisItBitscenario")
public class BisItBitscenario {
 
	private String bitId;

	private String bitName;

	private String scenarioName;
	
	private String scenarioId;
	
	private String applyDate;
 
}