package kr.tracom.bis.domain.bisMaParam;

import org.apache.ibatis.type.Alias;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data

@Alias("bisMaParam")
public class BisMaDTO {
	private String paramId;
	private String paramName;
	private String data1;
	private String data2;
	private String data3;
	private String remark;
	private String useYn;
	private String searchData;
}
