package kr.tracom.bis.domain.bisMaHistory;

import org.apache.ibatis.type.Alias;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Alias("bisHtFileSend")
public class BisHtFileTransfer {
	private String plateNumber;
	private String sessionId;
	private String bitName;
	private String sysDt;
	private String plfId;
	private String fileName;
	private String fileCd;
	private String sendType;
	private String filePath;
	private String fileSize;
	private String filePointer;
	private String sendState;
	private String sendStDt;
	private String sendEdDt;
}
