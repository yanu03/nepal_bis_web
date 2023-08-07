<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags"%>

<ax:set key="title" value="DASH BOARD" />
<ax:set key="page_desc" value="${pageRemark}" />
<ax:set key="axbody_class" value="dashboard" />

<ax:layout name="base">
	<jsp:attribute name="css">
        <link rel="stylesheet" type="text/css"
			href="<c:url value='/assets/plugins-fix/light-bootstrap-dashboard/css/light-bootstrap-dashboard.css'/>" />
    </jsp:attribute>
	<jsp:attribute name="script">
    	<ax:script-lang key="bis" var="COL" />
    	
        <script
			src="<c:url value='/assets/Chart.min.js'/>"></script>
        <script
			src="<c:url value='/assets/plugins-fix/light-bootstrap-dashboard/js/chartist.min.js'/>"></script>
        <script
			src="<c:url value='/assets/plugins-fix/light-bootstrap-dashboard/js/bootstrap-checkbox-radio-switch.js'/>"></script>
        <script
			src="<c:url value='/assets/plugins-fix/light-bootstrap-dashboard/js/light-bootstrap-dashboard.js'/>"></script>
        <script
			src="<c:url value='/assets/plugins-fix/light-bootstrap-dashboard/js/demo.js'/>"></script>
		
        <script type="text/javascript">
									$(document).ready(function() {
										busRun();
										packetUse();
										bitStatus();
										busCollection(); 
										getCpuRamUsage();
									});

									function busRun() {
										var url = COL("bis.apiserverip")
												+ "busStatus?key=bisKey";
										var data = "";
										ajaxCall(
												function(result, res) {
													if (result == true) {
														
														var busInfo = [
															res.Information[0].run,
															res.Information[0].etc 
														];
														var ctx = document.getElementById('ct-bus');
														var chart = new Chart(ctx, {
														    // The type of chart we want to create
														    type: 'doughnut',

														    // The data for our dataset
														    data:{
														    	 labels: ["RUN","WAIT"],
														         datasets: [{
														        	 backgroundColor: ['rgba(051, 153, 000, 0.8)','rgba(255, 204, 000,0.8)'],
														             borderColor: ['rgba(051, 153, 000, 0.8)','rgba(255, 204, 000,0.8)'],
														             data: busInfo
														         }]
														    }
														});
														
														$(".apiTrueMessage1")
																.css("display",
																		"block");
														$(".apiLoadingMessage1")
																.css("display",
																		"none");
														$(".apiErrorMessage1")
																.css("display",
																		"none");
													} else {
														$(".apiErrorMessage1")
																.css("display",
																		"block");
														$(".apiLoadingMessage1")
																.css("display",
																		"none");
														$(".apiTrueMessage1")
																.css("display",
																		"none");

													}
													setTimeout("busRun()",
															refreshTime);
												}, url, data); 

									};

									function packetUse() {
										var url = COL("bis.apiserverip")
												+ "packetUse?key=bisKey&plfId=TP-2017-01";
										var data = "";
										ajaxCall(
												function(result, res) {
													if (result == true) {
														
														var chartTypes = [];
														var chartInPacket = [];
														var chartOutPacket = [];

														for (var i = 0; i < 2; i++) {
															chartTypes
																	.push(res.Information[i].remoteType);
															chartInPacket
																	.push(res.Information[i].inPacket);
															chartOutPacket
																	.push(res.Information[i].outPacket);
														}
														
													 	var options = {
													 			yAxes: [{
													 	            ticks: {
													 	                beginAtZero:true
													 	            }
													 	        }]
															};		
													 	
													 	var bitInPacket=(res.Information[0].inPacket/1024).toFixed(0);
													 	var bitOutPacket=(res.Information[0].outPacket/1024).toFixed(0);
													 	
													 	var busInPacket=(res.Information[1].inPacket/1024).toFixed(0);
													 	var busOutPacket=(res.Information[1].outPacket/1024).toFixed(0);
													 	
														var ctx = document.getElementById('ct-chart');
														//ctx.height=40;
														var chart = new Chart(ctx, {
														    // The type of chart we want to create
														    type: 'horizontalBar',

														    // The data for our dataset
														    data:{
														    	 labels: ["BIT","BUS"],
														         datasets: [
														        	 {
														        		 label:'IN PACKET',
															        	 backgroundColor: 'rgba(051, 255, 255, 0.8)',
															             borderColor: 'rgba(051, 255, 255,0.8)',
															             data: [bitInPacket,bitOutPacket]
														         	 }, 
														         	 {
														         		 label:'OUT PACKET',
															        	 backgroundColor: 'rgba(051, 204, 204,0.8)',
															             borderColor: 'rgba(051, 204, 204,0.8)',
															             data: [busInPacket,busOutPacket]
														         	 },
														         ],
														    },
														    options:{
														    	scales:{
														    		xAxes:[{
														    			ticks:{
														    				callback:function(value,index,values){
														    					return value+' KB';
														    				}
														    			}
														    		}]
														    	}
														    }
														}); 
														$(".apiTrueMessage2")
																.css("display",
																		"block");
														$(".apiLoadingMessage2")
																.css("display",
																		"none");
														$(".apiErrorMessage2")
																.css("display",
																		"none");
													} else {
														$(".apiErrorMessage2")
																.css("display",
																		"block");
														$(".apiLoadingMessage2")
																.css("display",
																		"none");
														$(".apiTrueMessage2")
																.css("display",
																		"none");
													}
													setTimeout("packetUse()",
															refreshTime);
												}, url, data);

									};

									function bitStatus() {
										var url = COL("bis.apiserverip")
												+ "bitStatus?key=bisKey&plfId=TP-2017-01";
										var data = "";
										ajaxCall(
												function(result, res) {
													if (result == true) {
														var busInfo = [
															res.Information[0].etc,
															res.Information[0].run
														];
														var ctx = document.getElementById('ct-bit');
														var chart = new Chart(ctx, {
														    // The type of chart we want to create
														    type: 'doughnut',

														    // The data for our dataset
														    data:{
														    	 labels: ["RUN","WAIT"],
														         datasets: [{
														        	 backgroundColor: ['rgba(051, 153, 000, 0.8)','rgba(255, 204, 000,0.8)'],
														             borderColor: ['rgba(051, 153, 000, 0.8)','rgba(255, 204, 000,0.8)'],
														             data: busInfo
														         }]
														    },
														});
														$(".apiTrueMessage3")
																.css("display",
																		"block");
														$(".apiLoadingMessage3")
																.css("display",
																		"none");

														$(".apiErrorMessage3")
																.css("display",
																		"none");

													} else {
														$(".apiErrorMessage3")
																.css("display",
																		"block");
														$(".apiLoadingMessage3")
																.css("display",
																		"none");
														$(".apiTrueMessage3")
																.css("display",
																		"none");
													}
													setTimeout("bitStatus()",
															refreshTime);
												}, url, data);

									};

									function busCollection() {
										var nowDate = new Date(); 
										var today = leadingZeros(nowDate.getFullYear(), 4)  +
								    	leadingZeros(nowDate.getMonth() + 1, 2) + 
								    	leadingZeros(nowDate.getDate(), 2);
										var yesterDate = nowDate.getTime() - (1*24*60*60*1000);
										nowDate.setTime(yesterDate);
										var yesterday = leadingZeros(nowDate.getFullYear(), 4)  +
								    	leadingZeros(nowDate.getMonth() + 1, 2) + 
								    	leadingZeros(nowDate.getDate(), 2);
										var todayStartDate = today + "000000";
										var todayEndDate = today + "235959";
										var yesterdayStartDate = yesterday + "000000";
										var yesterdayEndDate = yesterday + "235959";
										
										var url = COL("bis.apiserverip")
												+ "busAvgSpeed?startDate="
												+ yesterdayStartDate + "&endDate="
												+ yesterdayEndDate;
										var data = [];
										var label= [];
										ajaxCall(function(result, res) {
													if (result == true) {
														for(var i=0; i<res.length; i++){
															label[i]=res[i].HH+' H';
															data[i]=res[i].AVG_SPD;
														};
														
														var ctx = document.getElementById('ct-busAvgSpeed');
														var chart = new Chart(ctx, {
														    // The type of chart we want to create
														    type: 'line',

														    // The data for our dataset
														    data:{
														    	 labels: label,
														         datasets: [{
														        	 label:'SPEED',
														        	 backgroundColor: 'rgba(051, 153, 000, 0.8)',
														             borderColor: 'rgba(051, 153, 000, 0.8)',
														             data: [0, 0, 0, 0, 0, 0, 0, 14.4, 16.2, 21.7, 20.2, 10.6, 21.9, 23.3, 16.6, 22.1, 23, 22.2, 24.1, 0, 0, 0, 0, 0]
														         }/* ,{
														        	 label:'today',
														        	 backgroundColor: 'rgba(151, 153, 000, 0.8)',
														             borderColor: 'rgba(151, 153, 000, 0.8)',
														             data: data
														         } */]
														    },
														    options:{
														    	scales:{
														    	   yAxes: [{
											                            display: true,
											                            ticks: {
											                                beginAtZero: false,
											                                steps: 10,
											                                //stepValue: 5,
											                                max: 50,
											                                callback:function(value,index,values){
														    					return value+' km/h';
														    				}
											                            }
											                        }]
														    	}
														    }
														});
															
														$(".apiTrueMessage4")
																.css("display",
																		"block");
														$(".apiLoadingMessage4")
																.css("display",
																		"none");

														$(".apiErrorMessage4")
																.css("display",
																		"none");
													} else {
														$(".apiErrorMessage4")
																.css("display",
																		"block");
														$(".apiLoadingMessage4")
																.css("display",
																		"none");
														$(".apiTrueMessage4")
																.css("display",
																		"none");
													}
													setTimeout(
															"busCollection()",
															refreshTime);
												}, url, data);
									};
									
									function byteCalculation(bytes) {
								        var bytes = parseInt(bytes);
								        var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
								        var e = Math.floor(Math.log(bytes)/Math.log(1024));
								       
								        if(e == "-Infinity") return "0 "+s[0]; 
								        else 
								        //return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
								        return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2);
								}
								
								function getCpuRamUsage(){
									var url=COL("bis.apiserverip")+"/cpuRamGet";
									var data="";
									ajaxCall(function(result,res){
										if(result==true){
										var cpu=res.cpuUsage;
										var ramUsage=res.ramUsage.split('/');
										
										var ctx1 = document.getElementById('ct-cpu');
										var ctx2 = document.getElementById('ct-ram');
										
										var chart = new Chart(ctx1, {
										    // The type of chart we want to create
										    type: 'pie',

										    // The data for our dataset
										    data:{
										    	 labels: ["USE","UNUSED"],
										         datasets: [{
										        	 backgroundColor: ['rgba(051, 153, 000, 0.8)','rgba(255, 204, 000,0.8)'],
										             borderColor: ['rgba(051, 153, 000, 0.8)','rgba(255, 204, 000,0.8)'],
										             data: [cpu,100-cpu]
										         }]
										    }
										});
										
										var chart2 = new Chart(ctx2, {
										    // The type of chart we want to create
										    type: 'pie',

										    // The data for our dataset
										    data:{
										    	 labels: ["USE","UNUSED"],
										         datasets: [{
										        	 backgroundColor: ['rgba(051, 153, 000, 0.8)','rgba(255, 204, 000,0.8)'],
										             borderColor: ['rgba(051, 153, 000, 0.8)','rgba(255, 204, 000,0.8)'],
										             data: [ramUsage[0],ramUsage[1]]
										         }]
										    }
										});
										
										$(".apiTrueMessage5")
												.css("display",
														"block");
										$(".apiLoadingMessage5")
												.css("display",
														"none");
										$(".apiErrorMessage5")
												.css("display",
														"none");
										
										$(".apiTrueMessage6")
												.css("display",
														"block");
										$(".apiLoadingMessage6")
												.css("display",
														"none");
										$(".apiErrorMessage6")
												.css("display",
														"none");
									} else {
										$(".apiErrorMessage5")
												.css("display",
														"block");
										$(".apiLoadingMessage5")
												.css("display",
														"none");
										$(".apiTrueMessage5")
												.css("display",
														"none");
										
										$(".apiErrorMessage6")
												.css("display",
														"block");
										$(".apiLoadingMessage6")
												.css("display",
														"none");
										$(".apiTrueMessage6")
												.css("display",
														"none");

									}
									setTimeout("getCpuRamUsage()",
											refreshTime);
										
									},url,data);
								}
								</script>
    </jsp:attribute>
	<jsp:attribute name="header">
        <h1 class="title">
			<i class='cqc-gauge'></i> ${title}</h1>
        <p class="desc">${page_desc}</p>
    </jsp:attribute>
	<jsp:body>
        <div class="main-panel">
            <div class="content" >
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card" >
                                <div class="header">
                                    <h4 class="title">
										<ax:lang id="bis.dashboard.busrun.title" />
									</h4>
                                </div>
                                 <div id="busRun" class="content">
                                 	    <div class="apiTrueMessage1"
										style="display: none;">
                                 			<div id="busTotal"
											style="float: right; padding-left: 10px;"></div>
		                                 </div>
                                 		<div class="apiLoadingMessage1">
                                 			<h4>Loading...</h4>
                                 		</div>
                                 		<div class="apiErrorMessage1"
										style="display: none;">
                                 			<h4>API Server is not responding.</h4>
                                 		</div>
                                 		<div class="apiTrueMessage1"
										style="display: none; ">
											<canvas id="ct-bus" height="140"></canvas>
	                                 	</div>
                                 </div>
                            </div>
                        </div>
                	 <div class="col-md-4">
	                	  <div class="card " >
	                            <div class="header">
	                                <h4 class="title">
										<ax:lang id="bis.dashboard.bitstatus" />
									</h4>
	                            </div>
		                        <div id="bitStatus" class="content">
		                        	<div class="apiTrueMessage3"
										style="display: none;">
			                        	<div id="bitTotal"
											style="float: right; padding-left: 10px;"></div>
	                               	</div>
	                               	<div class="apiLoadingMessage3">
                                			<h4>Loading...</h4>
                                		</div>
		                        	<div class="apiErrorMessage3"
										style="display: none;">
                                 		<h4>API Server is not responding.</h4>
		                            </div>
		                            <div class="apiTrueMessage3"
										style="display: none;">
										<canvas id="ct-bit" height="140"></canvas>
		                            </div>
	                            </div>
	                        </div>
                        </div>
                        
	                	<div class="col-md-4">
	                	  <div class="card" >
	                            <div class="header">
	                                <h4 class="title">
										<ax:lang id="bis.dashboard.busAvgSpeed" />
									</h4>
	                            </div>
		                        
	                            <div id="bitStatus" class="content">
									<div class="apiTrueMessage3"
									style="display: none;">
                               	</div>
		                            <div class="apiLoadingMessage4">
	                                			<h4>Loading...</h4>
	                                	</div>
		                        	<div class="apiErrorMessage4"
										style="display: none;">
	                                			<h4>API Server is not responding.</h4>
		                            </div>
		                            <div class="apiTrueMessage4"
										style="display: none;">
				                        	<canvas id="ct-busAvgSpeed" height="140"></canvas>
	                            </div>
	                       </div>
                        </div>
                </div>
                    </div>
                    <div class="row">
                    <div class="col-md-4">
                            <div class="card">
                                <div class="header">
                                    <h4 class="title">
										<ax:lang id="bis.dashboard.packet.title" />
									</h4>
                                </div>
                                <div id="packetStatus" class="content">
                                	<div class="apiTrueMessage2"
										style="display: none;">
                                 	</div>
                                 	<div class="apiLoadingMessage2">
                                 			<h4>Loading...</h4>
                                 		</div>
                               		<div class="apiErrorMessage2"
										style="display: none;">
                                		<h4>API Server is not responding.</h4>
                                	</div>
                                	<div class="apiTrueMessage2"
										style="display: none;">
											<canvas id="ct-chart" height="140"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div class="col-md-4">
                            <div class="card">
                                <div class="header">
                                    <h4 class="title">
										<ax:lang id="bis.dashboard.cpu.title" />
									</h4>
                                </div>
                                <div id="packetStatus" class="content">
                                	<div class="apiTrueMessage5"
										style="display: none;">
                                 	</div>
                                 	<div class="apiLoadingMessage5">
                                 			<h4>Loading...</h4>
                                 		</div>
                               		<div class="apiErrorMessage5" style="display: none;">
                                		<h4>API Server is not responding.</h4>
                                	</div>
                                	<div class="apiTrueMessage5"
										style="display: none;">
											<canvas id="ct-cpu" height="140"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div class="col-md-4">
                            <div class="card">
                                <div class="header">
                                    <h4 class="title">
										<ax:lang id="bis.dashboard.ram.title" />
									</h4>
                                </div>
                                <div id="packetStatus" class="content">
                                	<div class="apiTrueMessage6" style="display: none;">
                                 	</div>
                                 	<div class="apiLoadingMessage6">
                                 			<h4>Loading...</h4>
                                 		</div>
                               		<div class="apiErrorMessage6" style="display: none;">
                                		<h4>API Server is not responding.</h4>
                                	</div>
                                	<div class="apiTrueMessage6" style="display: none;">
											<canvas id="ct-ram" height="140"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>

    
	
	
	
	</jsp:body>
</ax:layout>