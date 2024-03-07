package kr.tracom.bis.domain.bisMtTerminal;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;


@Service
public class BisMtTerminalService {

    @Inject
    BisMtTerminalMapper bisNtTerminalMapper;
    
    public List<BisMtTerminal> findAll(Map parameterMap) {
        return bisNtTerminalMapper.findAll(parameterMap);
    }
    public List<BisMtTerminal> findId() {
        return bisNtTerminalMapper.findId();
    }
    public void add(Map<String, Object> bisMtTerminal)
    {
    	bisNtTerminalMapper.add(bisMtTerminal);
    }
    public void delete(Map<String,Object> bisMtTerminal)
    {
    	bisNtTerminalMapper.delete(bisMtTerminal);
    }
    public List<BisMtTerminal> count()
    {
    	return bisNtTerminalMapper.count();
    }
    public String maxPlus()
    {
    	return bisNtTerminalMapper.maxPlus();
    }
}
