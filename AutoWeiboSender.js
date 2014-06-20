  var request,response,token;
  var code = getParam("code");
  var text = "#实力无价# @新浪NBA,@NBAstore,@切换台,@安踏篮球";
  var encodeText = encodeURIComponent(text);
  var setCookie,getCookie,list;
//https://api.weibo.com/oauth2/authorize?client_id=123050457758183&redirect_uri=http://www.example.com/response&response_type=code
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
	    request.open("POST", "https://api.weibo.com/oauth2/access_token?client_id=3872251999&client_secret=3b94cd16bef7e236629bf8a0e670fe9b&grant_type=authorization_code&redirect_uri=http://www.test.com/Chrome%20Plugin/files/AutoWeiboSender.html&code="+requestCode);
	    request.send();

	     if(request.readyState === 4 && request.status === 200){
		     response = JSON.parse(request.responseText);
		     token = response.access_token;
	      }
  }

  
  if(code){
               getToken(code);
	       setCookie = "code" + "=" + encodeURICompnent(code);    //利用cookie储存code的值
	       setCookie = setCookie + ";max-age=" + (30*60*60*24);
	       document.cookie=setCookie;
          }
	else{   
		getCookie=document.cookie;
		list = getCookie.split(";");
		for(var i = 0; i<list.length; i++){
			var p = list[i].indexOf("=");            //从cookie中取出code的值
			var name = list[i].substring(0,p);
			var value = list[i].substring(p+1);
			code = decodeURIComponent(value);
		}
			getToken(code);
	}

  WB2.anyWhere(function(W){
                   W.parseCMD(
                              "/statuses/update.json", 
                               function(sResult, bStatus){console.log(sResult, bStatus)},
                               {access_token:token,
                                status:encodeText,
                                visible:2		   
                               },
                               {method: 'post'}
                               );
                                                        
                           }
);

   console.log(encodeText);

