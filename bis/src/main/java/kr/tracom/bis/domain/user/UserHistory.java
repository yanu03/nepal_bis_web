package kr.tracom.bis.domain.user;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("userHistory")
public class UserHistory {
	private String userCode;
	private String userName;
	private String collectDate;
	private String locale;
}
