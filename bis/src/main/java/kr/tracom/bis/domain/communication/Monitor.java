package kr.tracom.bis.domain.communication;

import java.util.List;

import lombok.Data;

@Data
public class Monitor {
	private String applyDate;
	private String deviceId;
	private int count;
	private List<Monitoritem> items;
}
