package kr.tracom.bis.controllers;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.chequer.axboot.core.controllers.BaseController;

import kr.tracom.bis.domain.bisMaHistory.BisHtFileTransfer;
import kr.tracom.bis.domain.bisMaHistory.BisHtBitProvision;
import kr.tracom.bis.domain.bisMaHistory.BisHtSystemControl;
import kr.tracom.bis.domain.bisMaHistory.BisHtSystemState;
import kr.tracom.bis.domain.bisMaHistory.BisMaBusEvent;
import kr.tracom.bis.domain.bisMaHistory.BisMaHistoryService;
import kr.tracom.bis.domain.bisMaHistory.HistoryUtils;
 
@Controller
@RequestMapping(value = "/api/v1/bisMaHistory")
public class BisMaHistoryController extends BaseController {
 
    @Inject
    private BisMaHistoryService bisMaHistoryService;
    private HistoryUtils historyUtils=new HistoryUtils();
    
    @RequestMapping(method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public List<BisMaBusEvent> list(@RequestBody List<Map<String,Object>> datas) {
    	Map<String,Object> map=historyUtils.getHistoryInfo(datas);
    	return bisMaHistoryService.operationHistory(map);
    }
    
    @RequestMapping(value="/systemState", method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public List<BisHtSystemState> systemStateList(@RequestBody List<Map<String,Object>> datas) {
    	Map<String,Object> map=historyUtils.getHistoryInfo(datas);
    	return bisMaHistoryService.systemStateHistory(map);
    }
    
    @RequestMapping(value="/systemControl", method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public List<BisHtSystemControl> systemControl(@RequestBody List<Map<String,Object>> datas) {
    	Map<String,Object> map=historyUtils.getHistoryInfo(datas);
    	return bisMaHistoryService.systemControlHistory(map);
    }
    
    @RequestMapping(value="/fileSend", method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public List<BisHtFileTransfer> fileSendHistory(@RequestBody List<Map<String,Object>> datas) {
    	Map<String,Object> map=historyUtils.getHistoryInfo(datas);
    	return bisMaHistoryService.fileSendHistory(map);
    }
    
    @RequestMapping(value="/serviceBit", method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public List<BisHtBitProvision> serviceBitHistory(@RequestBody List<Map<String,Object>> datas) {
    	Map<String,Object> map=historyUtils.getHistoryInfo(datas);
    	return bisMaHistoryService.serviceBitHistory(map);
    }
    
    @RequestMapping(value="/serviceVehicle", method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public List<BisHtBitProvision> serviceVehicleHistory(@RequestBody List<Map<String,Object>> datas) {
    	Map<String,Object> map=historyUtils.getHistoryInfo(datas);
    	return bisMaHistoryService.serviceVehicleHistory(map);
    }
}