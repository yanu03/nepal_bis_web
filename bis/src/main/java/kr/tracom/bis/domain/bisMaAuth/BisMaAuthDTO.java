package kr.tracom.bis.domain.bisMaAuth;

import org.apache.ibatis.type.Alias;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data

@Alias("bisMaAuth")
public class BisMaAuthDTO {
	private String groupCd;
	private String groupNm;
	private String code;
	private String name;
	private Integer sort;
	private String data1;
	private String data2;
	private String data3;
	private String data4;
	private String data5;
	private String remark;
	private String useYn;
	private String searchData;
	private String __created__;
	private String __modified__;
	private String __selected__;
	private String __deleted__;
}
