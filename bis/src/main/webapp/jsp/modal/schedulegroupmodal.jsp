<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%

%>
<ax:set key="pageName" value="File Browser"/>
<ax:set key="page_auto_height" value="true"/>
<ax:set key="axbody_class" value="baseStyle"/>

<ax:layout name="modal">
<jsp:attribute name="css">
 <link rel="stylesheet" href="<c:url value='/assets/css/jquery-ui.min.css' />" type="text/css"/>
		<style type="text/css">
               #datepickerbutton1 {cursor:pointer; }
        </style>
  </jsp:attribute>
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="bis" var="COL" />
         <ax:script-lang key="ax.promotion" var="COLA" />
          
        <script src="<c:url value='/assets/js/jquery-ui.min.js' />" type="text/javascript"></script>
      <script type="text/javascript" src="<c:url value='/assets/js/common/detail.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/modal/schedulegroupmodal.js' />"></script>
    </jsp:attribute>
    <jsp:attribute name="header">
        <h1 class="title">
            <i class="cqc-browser"></i>
        </h1>
    </jsp:attribute>
    <jsp:body> 
        <ax:page-buttons>
            <button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
           <button type="button" class="btn btn-fn1" data-page-btn="choice"><ax:lang id="ax.admin.sample.modal.button.choice"/></button>
           <button type="button" class="btn btn-primary" data-page-btn="modal"><i class="cqc-magnifier"></i><ax:lang id="ax.admin.search"/></button>
        </ax:page-buttons>

         <div role="page-header">
          <ax:form name="searchView0">
              <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='bis.division' width="250px" labelWidth="80px">
  							<div data-ax5select="select1"></div> 
                        </ax:td>
                        <ax:td label='bis.search' width="300px" labelWidth="80px">
                        	  <input type="text" name="Keyword"id="Keyword" class="form-control W120"/>      
                        </ax:td>
                    </ax:tr>
         	    </ax:tbl>
            </ax:form>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 0px;">

                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
            </ax:split-panel>
          <%--   <ax:split-panel width="*" style="padding-right: 0px;">

                      <ax:form name="formView01">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr labelWidth="120px">
                               <ax:td label="bis.systemschedulegroup.schedulegroupid" width="300px" >
                                <input type="text" data-ax-path="scheduleGroupId" class="form-control" style="margin-top:3px;" readonly="readonly"  value=""/>
                            </ax:td>
                   </ax:tr>
                   <ax:tr>
                       	<div  style="width:425px;" data-ax-td="">
				    <div style="width:120px; " data-ax-td-label="" >APPLY Date</div>
				    
					 <div data-ax-td-wrap="">
					 	<div class="form-inline">
							<div class="form-group">
								<div class="input-group" >
	                                <input type="text" class="form-control" data-ax-validate="required"  id="datepicker1" placeholder="yyyymmdd" data-ax-path="applyDate" readonly/>
	                                <span class="input-group-addon " id="datepickerbutton1"><i class="cqc-calendar"></i></span>
	                            </div>
					   		  	<select class="form-control" style="width:50px" id="" name="" data-ax-path="applyhour" >
					   		  			 <option value="00">00</option>
										 <option value="01">01</option>
										 <option value="02">02</option>
										 <option value="03">03</option>
										 <option value="04">04</option>
										 <option value="05">05</option>
										 <option value="06">06</option>
										 <option value="07">07</option>
										 <option value="08">08</option>
										 <option value="09">09</option>
										 <option value="10">10</option>
										 <option value="11">11</option>
										 <option value="12">12</option>
										 <option value="13">13</option>
										 <option value="14">14</option>
										 <option value="15">15</option>
										 <option value="16">16</option>
										 <option value="17">17</option>
										 <option value="18">18</option>
										 <option value="19">19</option>
										 <option value="20">20</option>
										 <option value="21">21</option>
										 <option value="22">22</option>
										 <option value="23">23</option>
								</select>
								<select class="form-control" style="width:50px" id="" name="" data-ax-path="applymin" >
					   		  			 <option value="00">00</option>
										 <option value="01">01</option>
										 <option value="02">02</option>
										 <option value="03">03</option>
										 <option value="04">04</option>
										 <option value="05">05</option>
										 <option value="06">06</option>
										 <option value="07">07</option>
										 <option value="08">08</option>
										 <option value="09">09</option>
										 <option value="10">10</option>
										 <option value="11">11</option>
										 <option value="12">12</option>
										 <option value="13">13</option>
										 <option value="14">14</option>
										 <option value="15">15</option>
										 <option value="16">16</option>
										 <option value="17">17</option>
										 <option value="18">18</option>
										 <option value="19">19</option>
										 <option value="20">20</option>
										 <option value="21">21</option>
										 <option value="22">22</option>
										 <option value="23">23</option>
										 <option value="24">24</option>
										 <option value="25">25</option>
										 <option value="26">26</option>
										 <option value="27">27</option>
										 <option value="28">28</option>
										 <option value="29">29</option>
										 <option value="30">30</option>
										 <option value="31">31</option>
										 <option value="32">32</option>
										 <option value="33">33</option>
										 <option value="34">34</option>
										 <option value="35">35</option>
										 <option value="36">36</option>
										 <option value="37">37</option>
										 <option value="38">38</option>
										 <option value="39">39</option>
										 <option value="40">40</option>
										 <option value="41">41</option>
										 <option value="42">42</option>
										 <option value="43">43</option>
										 <option value="44">44</option>
										 <option value="45">45</option>
										 <option value="46">46</option>
										 <option value="47">47</option>
										 <option value="48">48</option>
										 <option value="49">49</option>
										 <option value="50">50</option>
										 <option value="51">51</option>
										 <option value="52">52</option>
										 <option value="53">53</option>
										 <option value="54">54</option>
										 <option value="55">55</option>
										 <option value="56">56</option>
										 <option value="57">57</option>
										 <option value="58">58</option>
										 <option value="59">59</option>
								</select>
								
							</div>
						</div>
			   		 </div>
				</div>
                        </ax:tr>
                   
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
     --%>    </ax:split-layout>

    </jsp:body>
</ax:layout>