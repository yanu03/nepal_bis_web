package kr.tracom.bis.domain.bisItNotice;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("bisItNotice")
public class BisItNotice {
	String noticeId;
	String noticeName;
	String noticeContent;
	String userId;
	String updateDate;
}
