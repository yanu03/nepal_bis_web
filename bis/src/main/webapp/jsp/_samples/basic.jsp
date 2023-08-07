<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/_samples/basic.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.sample.search.condition1' width="300px">
                            <input type="text" class="form-control" />
                        </ax:td>
                        <ax:td label='ax.admin.sample.search.condition2' width="300px">
                            <input type="text" class="form-control" />
                        </ax:td>
                        <ax:td label='ax.admin.sample.search.condition3' width="300px">
                            <input type="text" class="form-control" />
                        </ax:td>
                    </ax:tr>
                    <ax:tr>
                        <ax:td label='ax.admin.sample.search.condition1' width="300px">
                            <input type="text" class="form-control" />
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="horizontal">
            <ax:split-panel height="*" style="">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.sample.grid.title"/> </h2>
                    </div>
                    <div class="right">
                        <button type="button" class="btn btn-default" data-grid-view-01-btn="add"><i class="cqc-circle-with-plus"></i> <ax:lang id="ax.admin.add"/></button>
                        <button type="button" class="btn btn-default" data-grid-view-01-btn="delete"><i class="cqc-circle-with-plus"></i> <ax:lang id="ax.admin.delete"/></button>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>
             <ax:splitter></ax:splitter>
            
                        <ax:split-panel height="500" style="">

         <ax:tab-layout name="ax2" data_fit_height_content="layout-view-01" style="height:100%;">
    <ax:tab-panel label="기본정보" scroll="scroll">
      <div data-ax-tbl="" id="" class="ax-form-tbl" style="">
                                        <div data-ax-tr="" id="" class="" style="">
                                            <div data-ax-td="" id="" class="" style=";width:300px">
                                                <div data-ax-td-label="" class="" style="">키(KEY)*</div>
                                                <div data-ax-td-wrap="">
                                                    <input type="text" data-ax-path="key" title="key" class="form-control" data-ax-validate="required"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div data-ax-tr="" id="" class="" style="">

                                            <div data-ax-td="" id="" class="" style=";width:300px">
                                                <div data-ax-td-label="" class="" style="">값(Value)</div>
                                                <div data-ax-td-wrap="">

                                                    <input type="text" data-ax-path="value" class="form-control"/>

                                                </div>
                                            </div>
                                        </div>

                                        <div data-ax-tr="" id="" class="" style="">
                                            <div data-ax-td="" id="" class="" style=";width:300px">
                                                <div data-ax-td-label="" class="" style="">ETC1</div>
                                                <div data-ax-td-wrap="">
                                                    <input type="text" data-ax-path="etc1" class="form-control"/>
                                                </div>
                                            </div>

                                            <div data-ax-td="" id="" class="" style=";width:300px">
                                                <div data-ax-td-label="" class="" style="">ETC2</div>
                                                <div data-ax-td-wrap="">

                                                    <select data-ax-path="etc2" class="form-control W100">
                                                        <option value="ko_KR">한글</option>
                                                        <option value="en_US">영어</option>
                                                    </select>

                                                </div>
                                            </div>
                                        </div>

                                        <div data-ax-tr="" id="" class="" style="">
                                            <div data-ax-td="" id="" class="" style=";width:300px">
                                                <div data-ax-td-label="" class="" style="">사용여부</div>
                                                <div data-ax-td-wrap="">

                                                    <select data-ax-path="etc3" class="form-control W100">
                                                        <option value="Y">사용</option>
                                                        <option value="N">사용안함</option>
                                                    </select>

                                                </div>
                                            </div>


                                            <div data-ax-td="" id="" class="" style=";width:220px">
                                                <div data-ax-td-label="" class="" style="">계정상태</div>
                                                <div data-ax-td-wrap="">


                                                    <select class="form-control null " data-ax-path="userStatus">
                                                        <option value="NORMAL">Enabled</option>
                                                        <option value="ACCOUNT_LOCK">Locked</option>
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                        
     
    </ax:tab-panel>
    <ax:tab-panel label="일반정보" scroll="scroll" active="true">
   1
    </ax:tab-panel>
    <ax:tab-panel label="상세정보" scroll="scroll">
    1
    </ax:tab-panel>
 
</ax:tab-layout>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>