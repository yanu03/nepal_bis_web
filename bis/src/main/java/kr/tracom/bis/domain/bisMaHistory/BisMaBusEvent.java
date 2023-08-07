package kr.tracom.bis.domain.bisMaHistory;

import org.apache.ibatis.type.Alias;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Alias("bisMaHistory")
public class BisMaBusEvent {
	private String vehicleId;
	private String plateNumber;
	private String collectDate;
	private String eventCode;
	private String eventName;
	private String eventData;
	private String spotName;
	private String eventNumber;
	private String terminalId;
	private String routeId;
	private String routeName;
	private String runCode;
	private String runName;
	private double gpsX;
	private double gpsY;
	private String heading;
	private String speed;
	private String stopTime;
	private String systemDate;
}
