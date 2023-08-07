package kr.tracom.bis.domain.bisItBitscenario;
 
import com.chequer.axboot.core.utils.ModelMapperUtils;
import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
import lombok.NoArgsConstructor;
 
import java.util.List;
 
import static java.util.stream.Collectors.toList;

@Data
@NoArgsConstructor
public class BisItBitscenario {
 
	private String bitId;
 
	private String scenarioId;
	
	private String scenarioName;
	
	private String scenarioType;
 
	private String applyDate;
 
	private String userId;
 
	private String updateDate;
 
	private String useYn;


 
 
}