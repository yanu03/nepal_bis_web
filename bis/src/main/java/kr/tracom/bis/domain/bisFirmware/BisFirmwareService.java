package kr.tracom.bis.domain.bisFirmware;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

@Service
public class BisFirmwareService {

	@Inject
	private BisFirmwareMapper bisFirmwareMapper;

	public String formPath(){
		return bisFirmwareMapper.formPath();
	}
	public String obeFormPath()
	{
		return bisFirmwareMapper.obeFormPath();
	}
	public String ftpId(){
		return bisFirmwareMapper.ftpId();
	}
	
	public String ftpIp(){
		return bisFirmwareMapper.ftpIp();
	}
	
	public String ftpPw(){
		return bisFirmwareMapper.ftpPw();
	}
	
	public String ftpPort(){
		return bisFirmwareMapper.ftpPort();
	}
}
