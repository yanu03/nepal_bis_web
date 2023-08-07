package kr.tracom.bis.domain.bisMaHistory;

import org.apache.ibatis.type.Alias;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Alias("bisHtServiceBit")
public class BisHtBitProvision {
	private String bitId;
	private String bitName;
	private String vehicleId;
	private String vehicleName;
	private String systemDate;
	private String routeId;
	private String routeName;
	private String routeType;
	private String busType;
	private String arriveType;
	private String runCode;
	private String locationNo;
}
