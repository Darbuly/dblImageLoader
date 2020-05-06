	var iddiv;

	function createDblLoader(){
		var dblLoader = new Object;
		//初始化上传器
		dblLoader.getLoader = function(id){
			iddiv = $("#"+id);

			if(!iddiv ){
				//alert("元素不存在！");
				return null;
			}
			paintLoader();

			for(var i=0; i<400000000; i++){
      // 这个同步脚本将延迟DOM的解析。
      // 所以DOMContentLoaded事件稍后将启动。
  			} 

		};
		return dblLoader;
	}
	/*
	绘画上传器
	 */
	function paintLoader(){
		//alert("绘画");
		var root_url = window.location.href;
		MES = {type:'toHtml',data:root_url+"/dblImageLoader/iframe/iframe.html"};
		$.post(LoaderUrl+"php/toData.php",MES,function(retData,status){
			iddiv.append(retData);

		});
	}
