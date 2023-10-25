package kr.tracom.bis.domain.bisFirmware;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BisFirmwareMapper extends MyBatisMapper {
String obeFormPath();
		String formPath();
	   String ftpId();
	   String ftpPw();
	   String ftpIp();
	   String ftpPort();
}
