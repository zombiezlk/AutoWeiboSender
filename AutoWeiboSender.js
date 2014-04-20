
  var request,response,token;
  var code=getParam("code");
  var text = "#实力无价# @新浪NBA,@NBAstore,@切换台,@安踏篮球";
  var encodeText = "%23%e5%ae%9e%e5%8a%9b%e6%97%a0%e4%bb%b7%23+%40%e6%96%b0%e6%b5%aaNBA%2c%40NBAstore%2c%40%e5%88%87%e6%8d%a2%e5%8f%b0%2c%40%e5%ae%89%e8%b8%8f%e7%af%ae%e7%90%83";


function getParam(paramName) {
    paramValue = "";
    isFound = false;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
        i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].split("=")[1];
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}

 function getToken(requestCode) {
	    request = new XMLHttpRequest();
	    request.open("GET", "https://api.weibo.com/oauth2/access_token?client_id=3872251999&client_secret=3b94cd16bef7e236629bf8a0e670fe9b&grant_type=authorization_code&redirect_uri=http://www.test.com/Chrome%20Plugin/files/AutoWeiboSender.html&code="+requestCode);
	    request.send();

	      if(request.readyState === 4 && request.status === 200){
		      response = JSON.parse(request.responseText);
		      token = response.access_token;
	      }
  }

  
  if(code){
               getToken(code);
          }
	else{
		getToken("3055ba56559ffde72035f0ebae873b5f");
	}

  WB2.anyWhere(function(W){
                   W.parseCMD(
                              "/statuses/update.json", 
                               function(sResult, bStatus){console.log(sResult, bStatus)},
                               {access_token:"2.00sswhgC6dZDOE5af9b45d4e01duvj",
                                status:encodeText,
                                visible:2		   
                               },
                               {method: 'post'}
                               );
                                                        
                           }
);

   console.log(encodeText);

