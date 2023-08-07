package kr.tracom.bis.domain.bisMaHistory;

import org.apache.ibatis.type.Alias;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Alias("bisHtServiceVehicle")
public class BisHtVehicleProvision {
	private String vehicleId;
	private String vehicleName;
	private String systemDate;
	private String preplateNumber;
	private String nextplateNumber;
	private String predistanceGap;
	private String nextdistanceGap;
	private String prelocationNumber;
	private String pretimeGap;
	private String nexttimeGap;
}
