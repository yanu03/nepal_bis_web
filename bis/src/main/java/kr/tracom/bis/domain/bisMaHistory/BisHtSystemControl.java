package kr.tracom.bis.domain.bisMaHistory;

import org.apache.ibatis.type.Alias;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Alias("bisHtSystemControl")
public class BisHtSystemControl {
	private String systemId;
	private String systemName;
	private String systemDate;
	private String systemType;
	private String controlCode;
	private String controlValue;
	private String controlResult;
}
