   Keywords=[];
   detailCodes=[];
   areaCodes=[];
	function getDetailCode(Keyword,detailCode)
    		{
				var check = 0;
	   			for(var i = 0;i < Keywords.length;i++)
	   				{
	   					if(Keywords[i] == Keyword)
	   						{
	   						check = 1;
	   							for(var j = 0;j < detailCodes[i].length;j++)
	   								{
	   									if(detailCode == detailCodes[i][j].detailCode)
	   									{
	   											return detailCodes[i][j].detailCodeName;
	   									}
	   								}
	   						
	   						}
	   				}
	   			if(check == 0)
	   			{
	   			  axboot.ajax({
	                    type: "GET",
	                    async: false,
	                    url: '/api/v1/bisMtDetailCodes',
	                    data: {"Keyword":Keyword},
	                    callback: function (res) {
	                    	if( 0 < res.length)
	                    		{
	                    		Keywords.push(Keyword);
	                    		detailCodes.push(res);
	                    		
	                    		for(var j = 0;j < res.length;j++)
   								{
   									if(detailCode == res[j].detailCode)
   									{
   										detailCode = res[j].detailCodeName;
   									}
   								}
	                    			
	                    			
	                    		}
	                    	else{
	                    		detailCode="";
	                    		}
	                      
	                    },
	                    options: {
	                        // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
	                        onError: function (err) {
	                            console.log(err);
	                        }
	                    }
	                });
	   			}
        	  
        	    return detailCode;
    		} 
	function getAreaCode(Keyword,detailCode)
	{
		if(areaCodes.length > 0)
		{
			for(var j = 0;j < areaCodes[0].length;j++)
			{
				if(detailCode == areaCodes[0][j].areaCode)
				{
						return areaCodes[0][j].adminName1;
				}
			}
		}			
			if(areaCodes.length == 0)
			{
			  axboot.ajax({
                type: "GET",
                async: false,
                url: '/api/v1/comMtAreas',
                data:"",
                callback: function (res) {
                	if( 0 < res.length)
                		{
                		
                		areaCodes.push(res);
                		
                		for(var j = 0;j < res.length;j++)
							{
								if(detailCode == res[j].areaCode)
								{
									detailCode = res[j].adminName1;
								}
							}
                			
                			
                		}
                	else{
                		detailCode="";
                		}
                  
                },
                options: {
                    // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                    onError: function (err) {
                        console.log(err);
                    }
                }
            });
			}
	  
	    return detailCode;
	} 







