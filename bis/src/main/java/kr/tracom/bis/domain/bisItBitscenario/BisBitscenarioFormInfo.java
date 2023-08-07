package kr.tracom.bis.domain.bisItBitscenario;
 
import org.apache.ibatis.type.Alias;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Alias("bisBitFormInfo")
public class BisBitscenarioFormInfo {
 
	private String scenarioId;

	private int formType;

	private String fileName;
	
	private int displayTime;
	
	private int formCount;
 
}