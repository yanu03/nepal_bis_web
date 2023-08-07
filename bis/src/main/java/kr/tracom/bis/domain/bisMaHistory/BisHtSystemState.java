package kr.tracom.bis.domain.bisMaHistory;

import org.apache.ibatis.type.Alias;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Alias("bisHtSystemState")
public class BisHtSystemState {
	private String systemId;
	private String systemName;
	private String systemType;
	private String systemDate;
	private String stateCode;
	private String stateValue;
}
