package kr.tracom.bis.domain.bisMtRoute;
 
 
import lombok.*;
import java.time.LocalDateTime;

import org.apache.ibatis.type.Alias;

import kr.tracom.bis.domain.bisMtRoutestation.BisMtRoutestation;
@Data
@Alias("bisMtRoute")
public class BisMtRoute{
	private String routeId;
	private String routeType;
	private String routeName;
	private String routeEname;
	private String fromStationId;
	
	private String toStationId;
	private String turnStationId;
	private Integer permissionCount;
	private String beginDate;
	private String closeDate;
	private String routeEx;
	private Integer routeDistance;
	private String countryCode;
	private String areaCode;
	private Integer requestTime;
	private Integer charge;
	private String runType;
	private String updateDate;
	private String remark;
	private String userId;
	private String useYn;
	
	private String fromStationName;
	private String toStationName;
	private String turnStationName;
	
	private String adminName1;
	private Integer count;
	
	private boolean __created__;
	private boolean  __modified__;
	private boolean __selected__;
	private boolean __deleted__;
}