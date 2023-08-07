package kr.tracom.bis.domain.bisItScenario;
import org.apache.ibatis.type.Alias;
import com.chequer.axboot.core.vo.BaseVO;
import lombok.Data;
 
@Data
@Alias("bisItScenario")
public class BisItScenario{
	private String scenarioId;
	private String scenarioType;
	private String scenarioName;
	private String scenarioEname;
	private String startDate;
	private String endDate;
	private String startTime;
	private String endTime;
	private String remark;
	private String userId;
	private String updateDate;
	private String useYn;
	private String __created__;
	private String __modified__;
	private String __selected__;
	private String __deleted__;
}