var LoaderUrl = '';
var php_url = LoaderUrl+"/php/";
var root_url = window.location.href;

/*
crop参数设置
 */
var aRatio = 1; //crop比例，默认为1:1,修改格式为 X/Y,比如16/9
var VM = 0;	//类型:number；默认：0；可以使用0,1,2,3；;
//0：没有限制，3可以移动到2外。 
//1 : 3只能在2内移动。 
//2：2图片 不全部铺满1 （即缩小时可以有一边出现空隙） 
//3：2图片填充整个1
var canvasWidth=160; //上传图片的宽度
var canvasHeight=160; //上传图片的高度
var canvasQuality='low';//设置图像的质量，一个“low”(默认)、“medium”或“high”。