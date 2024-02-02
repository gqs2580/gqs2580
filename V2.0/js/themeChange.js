//全国背景色
var allProvinceGradientColor = [
	"#d3eca1",
	"#d3eca1"

]
//对比城市列表背景色
var compareCityBgc = "#b0e356"

//大屏显示省份模块背景色
var lookBigProvinceBgc = "#d1fca1"
//市区域颜色
var lookAreaBgc = "#97fa47"
var lookBorderColor = "#5ed433"
var lookAreaShadow = "#8efb79"
var lookAreaHoverBgc = "#61ec46"

var bigLookRightBgc = "#93e674"


//右下角柱状图背景色
var bigLookRightBottomBgc = "#71db40"
//右下角柱状图渐变
var bigLookRightLine1 = "#f3b548"
var bigLookRightLine2 = "#f3b548"

//右下角x轴 y轴 y轴文字颜色
var bigLookRightXYFontColor = "red"
//大屏右边菜单背景

//点击前的颜色
var bigLookMenuBefore = "#5ed433"
// 点击后的颜色
var bigLookMenuAfter = "#9ff467"

var themeList = [

	//绿色主题
	{
		backgroundColor: "#a3d48b",
		color: "#FFFFF3",
		mainBackGroundColor: "#dff5c7",

		menuFontColor: "#fffff3",
		menuHoverFontColor: "#3c3530",
		menuBackGroundColor: "#8abb57",
		menuHoverBackGroundColor: "#b4dc71",

		changePronvinceColor: () => {
			allProvinceGradientColor[0] = "#d3eca1"
			allProvinceGradientColor[1] = "#d3eca1"
		},
		// 动态修改对比城市列表颜色方法
		compareCityListBgcChange: () => {
			compareCityBgc = "#b0e356"
		},
		compareCityBottomBackGroundColor: "#c3f498",
		compareCityTopBackGroundColor: "#d8fbb9",
		compareBtn1Bgc: "#7fbe26",
		compareBtn2Bgc: "#7fbe26",
		compareBtnHoverBorder: "#adff2f",

		//自定义模块给表格图例颜色
		compareCityTableLegendColor: "#000",
		//温度颜色 
		compareCityTableTempBgc: "#f9b505",
		// 湿度颜色
		compareCityTableHumBgc: "#72ed4b",


		//本省本市上面的表
		selfTableTopHigestColor: "#ffa600",
		selfTableTopLowestColor: "#42a5f5",
		//下面的表
		selfTableBottomColor: "#a6e35f",

		//大屏整个省份模块

		bigLookProvinceBgc: () => {

			bigLookOption.backgroundColor = "#d1fca1"
			lookBigProvinceBgc = "#d1fca1"
			console.log("修改市背景");
			lookAreaBgc = "#97fa47"
			lookBorderColor = "#5ed433"
			//阴影颜色
			lookAreaShadow = "#8efb79"
			lookAreaHoverBgc = "#61ec46"
			
			bigLookOption.geo.itemStyle.normal.areaColor = "#97fa47"
			bigLookOption.geo.itemStyle.normal.borderColor = "#5ed433"
			//阴影颜色
			bigLookOption.geo.itemStyle.normal.shadowColor = "#8efb79"
			//鼠标划过颜色
			bigLookOption.geo.itemStyle.emphasis.areaColor = "#61ec46"
			

			bigLookChat.setOption(bigLookOption)
		},
		//地图右边颜色
		bigLookRightBgc: "#93e674",
		//右下角柱状图
		bigLookSmall: function() {
			
			//柱状图颜色
			bigLookRightLine1 = "#f3b548"
			bigLookRightLine2 = "#f3b548"
			//柱状图文字颜色
			pieLookBigOption.xAxis.axisLabel.color = "red"
			pieLookBigOption.yAxis.axisLabel.color = "red"
			pieLookBigOption.yAxis.nameTextStyle.color = "red"
			bigLookRightXYFontColor = "red"


			pieLookBigOption.series[0].itemStyle.normal.color.colorStops[0].color = "#f3b548"
			pieLookBigOption.series[0].itemStyle.normal.color.colorStops[1].color = "#f3b548"


			pieLookBigOption.backgroundColor = "#71db40"
			bigLookRightBottomBgc = "#71db40"


			pieChart.resize()
			pieChart.setOption(pieLookBigOption)
		},
		//大屏右边菜单背景切换
		bigLookRightMenu: () => {


			bigLookMenuBefore = "#5ed433"
			bigLookMenuAfter = "#9ff467"
		},
		///大屏菜单上面的按钮
		bigLookBtn: "#5ed433",
		//大屏标题 
		// bigLookTitleColor: "#6396cf",
		//游戏背景
		gameBgc: "#a9f988",
		
		//游戏开始的样式
		gameStartStyle:function(){
			const gameP = document.querySelector(".game_menu p")
			const h2 = document.querySelector(".game_menu h2")
			h2.style.borderBottomColor = "#54d837",
			gameP.style.backgroundColor = "#78e64e"
		}
	},
	//蓝色主题
	{
		backgroundColor: "#c3e7ff",
		color: "#FFFFF3",
		mainBackGroundColor: "#d9fcff",

		menuFontColor: "#fffff3",
		menuHoverFontColor: "#3c3530",
		menuBackGroundColor: "#60aeff",
		menuHoverBackGroundColor: "#bfdeff",

		changePronvinceColor: () => {

			allProvinceGradientColor[0] = "#b2e4ff"
			allProvinceGradientColor[1] = "#b2e4ff"
		},

		// 动态修改对比城市列表颜色方法
		compareCityListBgcChange: () => {
			compareCityBgc = "#bde2fd"
		},
		compareCityBottomBackGroundColor: "#f5fbfe",
		compareCityTopBackGroundColor: "#e2f4ff",
		compareBtn1Bgc: "#bae4fc",
		compareBtn2Bgc: "#bae4fc",
		compareBtnHoverBorder: "#f2e9ec",

		//自定义模块给表格图例颜色
		compareCityTableLegendColor: "#000",
		//温度颜色 
		compareCityTableTempBgc: "skyblue",
		// 湿度颜色
		compareCityTableHumBgc: "rgb(187,225,245)",


		//本省本市上面的表
		selfTableTopHigestColor: "green",
		selfTableTopLowestColor: "blue",
		//下面的表
		selfTableBottomColor: "blue",

		//大屏整个省份模块

		bigLookProvinceBgc: () => {
			lookBigProvinceBgc = "#daf5ff"
		},
		bigLookRightBgc: "#daf5ff",
		//大屏地图区域调整
		bigLookProvinceBgc: () => {
			bigLookOption.backgroundColor = "#c6e3f9"
			lookBigProvinceBgc = "#c6e3f9"
			lookAreaBgc = "#7abaff"
			lookBorderColor = "#41a7f5"
			//阴影颜色
			lookAreaShadow = "#90cbf9"
			lookAreaHoverBgc = "#8ad8ff"


			bigLookOption.geo.itemStyle.normal.areaColor = "#7abaff"
			bigLookOption.geo.itemStyle.normal.borderColor = "#41a7f5"
			//阴影颜色
			bigLookOption.geo.itemStyle.normal.shadowColor = "#90cbf9"
			//鼠标划过颜色
			bigLookOption.geo.itemStyle.emphasis.areaColor = "#8ad8ff"

			bigLookChat.setOption(bigLookOption)
		},
		//右下角柱状图
		bigLookSmall: function() {
			// //柱状图颜色
			bigLookRightLine1 = "#76bdff"
			bigLookRightLine2 = "#76bdff"
			pieLookBigOption.series[0].itemStyle.normal.color.colorStops[0].color = "#76bdff"
			pieLookBigOption.series[0].itemStyle.normal.color.colorStops[1].color = "#76bdff"
			//柱状图文字颜色
			pieLookBigOption.xAxis.axisLabel.color = "#000"
			pieLookBigOption.yAxis.axisLabel.color = "#000"
			pieLookBigOption.yAxis.nameTextStyle.color = "#000"
			bigLookRightXYFontColor = "#000"
			

			pieLookBigOption.backgroundColor = "#aee2ff"
			bigLookRightBottomBgc = "#aee2ff"
			pieChart.resize()
			pieChart.setOption(pieLookBigOption)
		},
		//大屏右边菜单背景切换
		bigLookRightMenu: () => {


			bigLookMenuBefore = "#96daff "
			bigLookMenuAfter = "rgb(209, 255, 255)"
		},
		///大屏菜单上面的按钮
		bigLookBtn: "#92cef0",
		//大屏标题 
		// bigLookTitleColor: "#6396cf",
		//游戏背景
		gameBgc: "#d1e9f4",
		//游戏开始的样式
		gameStartStyle:function(){
			const gameP = document.querySelector(".game_menu p")
			const h2 = document.querySelector(".game_menu h2")
			h2.style.borderBottomColor = "#b9e9fc",
			gameP.style.backgroundColor = "#c5ecfc"
		}
	
	},

	//粉色主题
	{
		backgroundColor: "#ffd5d9",
		color: "#FFFFF3",
		mainBackGroundColor: "#fbe3e6",

		menuFontColor: "#fffff3",
		menuHoverFontColor: "#3c3530",
		menuBackGroundColor: "#ff97a5",
		menuHoverBackGroundColor: "#ffc5ce",

		changePronvinceColor: () => {

			allProvinceGradientColor[0] = "#fadee1"
			allProvinceGradientColor[1] = "#fadee1"
		},

		// 动态修改对比城市列表颜色方法
		compareCityListBgcChange: () => {
			compareCityBgc = "#fbc7d9"
		},
		compareCityBottomBackGroundColor: "#fdecee",
		compareCityTopBackGroundColor: "#fdece6",
		compareBtn1Bgc: "#ffd6db",
		compareBtn2Bgc: "#ffd6db",
		compareBtnHoverBorder: "#f8c7cb",

		//自定义模块给表格图例颜色
		compareCityTableLegendColor: "#000",
		//温度颜色 
		compareCityTableTempBgc: "#ffafc9",
		// 湿度颜色
		compareCityTableHumBgc: "#ff85b1",


		//本省本市上面的表
		selfTableTopHigestColor: "rgb(240,145,160)",
		selfTableTopLowestColor: "#7abaff",
		//下面的表
		selfTableBottomColor: "#9fd1ff",

		//大屏整个省份模块

		bigLookProvinceBgc: () => {

			bigLookOption.backgroundColor = "#fadee1"
			lookBigProvinceBgc = "#fadee1"
			lookAreaBgc = "#fda6b8"
			lookBorderColor = "#ffcdcd"
			//阴影颜色
			lookAreaShadow = "#e690aa"
			lookAreaHoverBgc = "#ffc1ce"


			bigLookOption.geo.itemStyle.normal.areaColor = "#fda6b8"
			bigLookOption.geo.itemStyle.normal.borderColor = "#ffcdcd"
			//阴影颜色
			bigLookOption.geo.itemStyle.normal.shadowColor = "#e690aa"
			//鼠标划过颜色
			bigLookOption.geo.itemStyle.emphasis.areaColor = "#ffc1ce"
			

			bigLookChat.setOption(bigLookOption)
		},
		//地图右边颜色
		bigLookRightBgc: "#ffd9e5",
		//右下角柱状图
		bigLookSmall: function() {
			// //柱状图颜色

			bigLookRightLine1 = "#ff9dab"
			bigLookRightLine2 = "#ff9dab"
			//柱状图文字颜色
			pieLookBigOption.xAxis.axisLabel.color = "#fb7591"
			pieLookBigOption.yAxis.axisLabel.color = "#fb7591"
			pieLookBigOption.yAxis.nameTextStyle.color = "#fb7591"
			bigLookRightXYFontColor = "#fb7591"


			pieLookBigOption.series[0].itemStyle.normal.color.colorStops[0].color = "#ff9dab"
			pieLookBigOption.series[0].itemStyle.normal.color.colorStops[1].color = "#ff9dab"


			pieLookBigOption.backgroundColor = "#ffe7e4"
			bigLookRightBottomBgc = "#ffe7e4"


			pieChart.resize()
			pieChart.setOption(pieLookBigOption)
		},
		//大屏右边菜单背景切换
		bigLookRightMenu: () => {


			bigLookMenuBefore = "rgb(255,196,213)"
			bigLookMenuAfter = "rgb(248,168,192)"
		},
		///大屏菜单上面的按钮
		bigLookBtn: "#ffa6b2",
		//大屏标题 
		// bigLookTitleColor: "#6396cf",
		//游戏背景
		gameBgc: "#fbe3e6",
		//游戏开始的样式
		gameStartStyle:function(){
			const gameP = document.querySelector(".game_menu p")
			const h2 = document.querySelector(".game_menu h2")
			h2.style.borderBottomColor = "#e4b9c3",
			gameP.style.backgroundColor = "#f3c8d2"
		}
	},
]



function themeChangeFunction(index) {
	console.log("主题切换");
	

	//所有要切换背景的对象
	let themeTop = document.querySelector(".top")
	let themeMenuLeft = document.querySelector(".left")
	let mainRight = document.querySelector(".right")
	let themmeCompareCityBottom = document.querySelector(".compare_city_bottom_son")
	let themeCompareCityTop = document.querySelector(".compare_city_top")
	let themeCompareBtn1 = document.querySelector(".compare_city_top button:nth-of-type(1)")
	let themeCompareBtn2 = document.querySelector(".compare_city_top button:nth-of-type(2)")
	// 大屏右侧
	let themeBigLookRight = document.querySelector(".bigLookRight")
	//右侧饼图
	let lookBigPie = document.querySelector(".bingPic")
	// 右侧菜单栏

	////////////////////////////////////////
	//顶部和侧边栏 
	themeTop.style.backgroundColor = themeList[index].backgroundColor
	themeMenuLeft.style.backgroundColor = themeList[index].backgroundColor
	// 本市右边主要背景
	mainRight.style.backgroundColor = themeList[index].mainBackGroundColor
	//对比模块顶部和底部
	themmeCompareCityBottom.style.backgroundColor = themeList[index].compareCityBottomBackGroundColor
	themeCompareCityTop.style.backgroundColor = themeList[index].compareCityTopBackGroundColor
	//大屏模块右侧背景
	themeBigLookRight.style.backgroundColor = themeList[index].bigLookRightBgc

	//游戏背景
	weatherGame.style.backgroundColor = themeList[index].gameBgc
	//游戏菜单
	themeList[index].gameStartStyle()
	//大屏右侧菜单栏和背景
	themeList[index].bigLookRightMenu()
	for (let i = 0; i < bigLookMenu.length; i++) {
		bigLookMenu[i].style.backgroundColor = bigLookMenuBefore
	}

	//对比模块城市列表背景
	themeList[index].compareCityListBgcChange()

	for (let i = 0; i < compareSelectList.children.length; i++) {
		compareSelectList.children[i].style.backgroundColor = compareCityBgc
	}

	//对比模块按钮背景颜色
	themeCompareBtn1.style.backgroundColor = themeList[index].compareBtn1Bgc
	themeCompareBtn2.style.backgroundColor = themeList[index].compareBtn2Bgc
	// 对比模块按钮边框颜色
	themeCompareBtn1.style.borderColor = themeList[index].compareBtn1Border
	themeCompareBtn2.style.borderColor = themeList[index].compareBtn1Border
	// 对比模块按钮边框 hover效果

	themeCompareBtn1.addEventListener("mouseout", function() {
		themeCompareBtn1.style.borderColor = themeList[index].compareBtn1Bgc
	})


	themeCompareBtn1.addEventListener("mouseover", function() {
		themeCompareBtn1.style.borderColor = themeList[index].compareBtnHoverBorder
	})
	
	themeCompareBtn2.addEventListener("mouseout", function() {
		themeCompareBtn2.style.borderColor = themeList[index].compareBtn2Bgc
	})
	
	
	themeCompareBtn2.addEventListener("mouseover", function() {
		themeCompareBtn2.style.borderColor = themeList[index].compareBtnHoverBorder
	})
	
	





	// //侧边切换菜单主题
	let allMenuItem = document.querySelectorAll(".menu>li")
	for (let i = 0; i < allMenuItem.length; i++) {
		allMenuItem[i].style.backgroundColor = themeList[index].menuBackGroundColor
		allMenuItem[i].style.color = themeList[index].menuFontColor

		allMenuItem[i].addEventListener("mouseout", function() {
			allMenuItem[i].style.color = themeList[index].menuFontColor
		})
		allMenuItem[i].addEventListener("mouseover", function() {
			allMenuItem[i].style.color = themeList[index].menuHoverFontColor
		})
	}
		
	

	//对比城市模块的主题：
	let themeCityList = document.querySelectorAll(".select_city_list li")
	for (let i = 0; i < themeCityList.length; i++) {
		themeCityList[i].style.backgroundColor = themeList[index].compareCityListBackGroundColor
	}






	// 所有要切换背景图表

	//全国地图图表背景颜色
	themeList[index].changePronvinceColor()
	if  (provinceData.children.length){
		option.baseOption.backgroundColor.colorStops[0].color = allProvinceGradientColor[0]
		option.baseOption.backgroundColor.colorStops[1].color = allProvinceGradientColor[1]
		allProvinceMap.clear()
		allProvinceMap.setOption(option);
	}
	
	//自定义城市表格
	compareCityOption.legend.textStyle.color = themeList[index].compareCityTableLegendColor
	compareCityOption.series[0].itemStyle.normal.color = themeList[index].compareCityTableHumBgc
	compareCityOption.series[1].itemStyle.normal.color = themeList[index].compareCityTableTempBgc

	//有就重新刷新图标表
	if (compareTableContainer.children.length) {
		compareCityChart.clear()
		compareCityChart.setOption(compareCityOption)
	}




	//大屏省份模块表 如果存在在渲染
	if (bigLookContainer.children.length) {
		//市地区样式
		themeList[index].bigLookProvinceBgc()
		// 大屏背景字体样式
		bigLookOption.backgroundColor = lookBigProvinceBgc
		// bigLookOption.title.textStyle.color = themeList[index].bigLookTitleColor

	}

	//右下角柱状图
	themeList[index].bigLookSmall()

	if (lookBigPie.children.length) {
		pieLookBigOption.backgroundColor = bigLookRightBottomBgc

		pieChart.clear()
		pieChart.setOption(pieLookBigOption, true)
	}
	//仪表盘
	
		yibiaopan.style.backgroundColor = bigLookRightBottomBgc
	//大屏菜单背景

	for (let i = 0; i < bigLookMenu.length; i++) {
		bigLookMenu[i].style.backgroundColor = themeList[index].bigLookMenuBefore

	}

}
