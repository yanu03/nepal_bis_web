<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <script type="text/javascript" src="<c:url value='/assets/js/view/systemoperation/manage-frimware.js' />"></script>
         <ax:script-lang key="bis" var="COL" />
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>


        <ax:split-layout name="ax1" orientation="horizontal">
            <ax:split-panel width="*" style="">
				<ax:form name="firmware">
					<div id="" class="ax-form-tbl" style="" data-ax-tbl="controll">
			<div data-ax-tr="" id="" class="" style="">
				<div  style="width:100%;" data-ax-td="">
				    <div style="width:100%; " data-ax-td-label="" >Firmware</div>
				</div>
			</div>
			<div data-ax-tr="" id="" class="" style="">
				<div  style="width:300px;" data-ax-td="">
				    <div style="width:120px; " data-ax-td-label="" >Type</div>
					 <div data-ax-td-wrap="">
					 <div class="form-inline">
							<div class="form-group">
								<select id="filecode" data-ax-path="fileCode" style="vertical-align: middle;" class="form-control" >
	                       			<option value="100">Terminal frimware1</option>
	                       			<option value="101">Terminal frimware2</option>
	                       			<option value="150">BIT frimware1</option>
	                       		<!-- 	<option value="151">BIT frimware2</option> -->
                      			</select>
							</div>
						</div>	
			   		 </div>
				</div>
				<div  style="width:420px;" data-ax-td="">
				    <div style="width:120px; " data-ax-td-label="" >Application Time</div>
					 <div data-ax-td-wrap="">
					 	<div class="form-inline">
							<div class="form-group">
								<div class="input-group" >
	                                <input type="text" class="form-control"  data-ax-validate="required"  id="datepicker2" placeholder="yyyy-mm-dd" data-ax-path="startdate" readonly/>
	                                <span class="input-group-addon " id="datepickerbutton2"><i class="cqc-calendar"></i></span>
	                           	  	<select class="form-control" style="width:50px; float:left;" id="" name="" data-ax-path="starthour" >
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
								<select class="form-control" style="width:50px; float:left;" id="" name="" data-ax-path="startmin" >
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
				</div>
				<div  style="width:400px;" data-ax-td="">
				    <div style="width:120px; " data-ax-td-label="" >File</div>
					 <div data-ax-td-wrap="">
							 	<div class="input-group">
							 	<div style="float:left">
							 		<input type="text" id="filename" name="filename" title="" class="form-control" size="30" value="" readonly/>
							 	  	</div>
							 	  	  	<button id="fileButton" class="btn btn-primary">Search</button>
                                </div>
			                        <input style="display:none;" type="file" accept="image/*" data-ax-path="upFile" id="upFile" name="upFile" onchange="javascript:getCmaFileView(this,'stype');"/>
				   		 </div>
					</div>
					<div  style="width:180px;" data-ax-td="">
					    <div style="width:120px; " data-ax-td-label="" >Send</div>
						 <div data-ax-td-wrap="">
						 <button class="btn btn-primary"  data-firmware-btn="send">Send</button>

						 
				   		 </div>
					</div>
			</div>
			</div>
			</ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>