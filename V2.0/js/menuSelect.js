//给全省天气情况添加点击事件


var data = []
var inputProvince  = ''

const check = document.querySelector('.menu')
const checkLi = document.querySelectorAll(".menu>li")
const main = document.querySelector(".main")
const tooltip = document.querySelector(".tooltip")
const left = document.querySelector(".left")
const topLogo = document.querySelector(".top_logo")
const topLogoImg = document.querySelector(".top_logo img")
const provinceData = document.querySelector(".provinceData")
//所有div
const right = document.querySelector('#right')

//发布位置
const addressCity = document.querySelector(".selfWeatherInfo>div>span:first-child")
const addressRegion = document.querySelector(".selfWeatherInfo>div>span:last-child")
//发布时间
const updateTime = document.querySelector(".update_time")
//温度
const temptu = document.querySelector(".temptu span:first-child")
// 天气情况
const tempState = document.querySelector(".temptu span:last-child")
//风
const windPower = document.querySelector(".temp_info span:nth-child(1) span")
//湿度
const hum = document.querySelector(".temp_info span:nth-child(2) span")
//气压
const qiya = document.querySelector(".temp_info span:nth-child(3) span")
//小贴士
const weatherTip = document.querySelector(".weather_tip")
//天气图标
const weatherIcon = document.querySelector(".img_iocn img")

//日期
const date = document.querySelectorAll(".seven_day_weather li>p:nth-child(2) ")
//周几
var weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
const weekDayP = document.querySelectorAll(".seven_day_weather li:nth-child(n+4)>p:nth-child(1)")
var d = new Date().getDay();
d += 2
for (let i = 0; i < weekDayP.length; i++) {

	if (d >= 7) {
		d = 0
	}
	weekDayP[i].innerHTML = weekDay[d]
	d++
}
// console.log(weekDayP);

//白天天气情况
const degreeDayState = document.querySelectorAll(".li_top p")
//白天天气图标
const dayIcon = document.querySelectorAll(".li_top img")
//晚上天气图标
const nightIcon = document.querySelectorAll(".li_bottom img")
//晚上天气情况
const degreeNightState = document.querySelectorAll(".li_bottom p:nth-child(2)")
//晚上风力
const windyPower = document.querySelectorAll(".li_bottom p:nth-child(3)")

//天气提示信息
const tipsTitleColthes = document.querySelector(".lives li:nth-child(1)>div>div>p")
const moreInfoColthes = document.querySelector(".lives li:nth-child(1) .tips span")


const tipsTitleUmbrella = document.querySelector(".lives li:nth-child(2)>div>div>p")
const moreInfoUmbrella = document.querySelector(".lives li:nth-child(2) .tips span")


const tipsTitleCold = document.querySelector(".lives li:nth-child(3)>div>div>p")
const moreInfoCold = document.querySelector(".lives li:nth-child(3) .tips span")

const tipsTitleSport = document.querySelector(".lives li:nth-child(4)>div>div>p")
const moreInfoSport = document.querySelector(".lives li:nth-child(4) .tips span")


const tipsTitleSmile = document.querySelector(".lives li:nth-child(5)>div>div>p")
const moreInfoSmile = document.querySelector(".lives li:nth-child(5) .tips span")

const tipsTitleSun = document.querySelector(".lives li:nth-child(6)>div>div>p")
const moreInfoSun = document.querySelector(".lives li:nth-child(6) .tips span")


const Myright = document.querySelector(".Myright")
const weatherXian = document.querySelector(".weather_xian")
const compareCity = document.querySelector(".compare_city")
const compareSelectCity = document.querySelector('.compareSelectCity')
//选择10个城市按钮
const compareCityButton = document.querySelector('.compare_city_top button:nth-of-type(1)')
// 提前发送按钮
const compareCityButton2 = document.querySelector('.compare_city_top button:nth-of-type(2)')

const compareSelectList = document.querySelector('.select_city_list ul')
//对比模块下图表容器
const compareTableContainer = document.querySelector(".compare_city_bottom_son")

const weatherGame = document.querySelector(".weather_game")
//开始游戏按钮
const startGame = document.querySelector('.game_menu p')
const gameMenu = document.querySelector('.game_menu')

const gameMain = document.querySelector("#game")
const divGrade = document.querySelector(".grade")
const gameOuterMenu = document.querySelector(".gameOuterMenu")

//天气省份大图
const bigLook = document.querySelector(".bigLook")
const bigLookContainer = document.querySelector(".bigLookContainer")
const bigZhu = document.querySelector(".bingPic")
const yibiaopan = document.querySelector(".bigLook .yibiaopan")

//获取按钮和输入框数据
const bigLookInput = document.querySelector(".bookLookselect input")
//3个选项
const bigLookMenu = document.querySelectorAll(".otherList>div")
var contrl = true
var first = 0
renderBigLook("shanxi", shanxiXY, bigLookTemperatureaData, true, "陕西省", "温度", "度")
bigLooKPie(bigLookTemperatureaData, "温度", "度")
var themeIndex = 1
//清除所有标记
function removeMarkSelf() {
	for (let i = 0; i < checkLi.length; i++) {
		checkLi[i].setAttribute("v-self", "blank")
	}
}
var provinceIf = false
check.onclick = function(e) {

	if (e.target.className == "one") {

		province_data()	
		provinceIf = true
		allProvinceMap.on('click', function (params) {

			//拿到点击以后的经纬度
			let lagLog = allProvinceMap.convertFromPixel('geo', [params.event.offsetX, params.event.offsetY])
			let myDataObj = {
				name: "图标",
				value: lagLog
			}
			window.option.baseOption.series[3].data = []
			window.option.baseOption.series[3].data.push(myDataObj)
			myChart.clear()
			myChart.setOption(option, false);
			let temp = [lagLog[0], lagLog[1]]
	
			provinceClickXY(temp)
		});
		
	

		let allMenuItem = document.querySelectorAll(".menu>li")
		for (let i = 0; i < allMenuItem.length; i++) {
			if (themeIndex == 1) {
				allMenuItem[i].style.backgroundColor = themeList[0].menuBackGroundColor
				e.target.style.backgroundColor = themeList[0].menuHoverBackGroundColor
			}

			if (themeIndex == 2) {
				allMenuItem[i].style.backgroundColor = themeList[1].menuBackGroundColor
				e.target.style.backgroundColor = themeList[1].menuHoverBackGroundColor
			}
			if (themeIndex == 0) {
				allMenuItem[i].style.backgroundColor = themeList[2].menuBackGroundColor
				e.target.style.backgroundColor = themeList[2].menuHoverBackGroundColor
			}
		}

		// 标记正在展示的模块
		removeMarkSelf()
		e.target.setAttribute("v-self", "self")

		display_none_all()
		//切换全省天气的逻辑
		provinceData.style.display = "block"
		allProvinceMap.resize()




	}
	//切换到您的城市主页面
	else if (e.target.className == "four") {
		let allMenuItem = document.querySelectorAll(".menu>li")
		for (let i = 0; i < allMenuItem.length; i++) {
			if (themeIndex == 1) {
				allMenuItem[i].style.backgroundColor = themeList[0].menuBackGroundColor
				e.target.style.backgroundColor = themeList[0].menuHoverBackGroundColor
			}

			if (themeIndex == 2) {
				allMenuItem[i].style.backgroundColor = themeList[1].menuBackGroundColor
				e.target.style.backgroundColor = themeList[1].menuHoverBackGroundColor
			}
			if (themeIndex == 0) {
				allMenuItem[i].style.backgroundColor = themeList[2].menuBackGroundColor
				e.target.style.backgroundColor = themeList[2].menuHoverBackGroundColor
			}
		}

		removeMarkSelf()
		e.target.setAttribute("v-self", "self")

		display_none_all()
		if (document.querySelector(".Myright")) document.querySelector(".Myright").style.display = "none"
		right.style.display = "block"
		faultRateEchart.resize()

	} else if (e.target.className == "two") {
		let allMenuItem = document.querySelectorAll(".menu>li")
		for (let i = 0; i < allMenuItem.length; i++) {
			if (themeIndex == 1) {
				allMenuItem[i].style.backgroundColor = themeList[0].menuBackGroundColor
				e.target.style.backgroundColor = themeList[0].menuHoverBackGroundColor
			}

			if (themeIndex == 2) {
				allMenuItem[i].style.backgroundColor = themeList[1].menuBackGroundColor
				e.target.style.backgroundColor = themeList[1].menuHoverBackGroundColor
			}
			if (themeIndex == 0) {
				allMenuItem[i].style.backgroundColor = themeList[2].menuBackGroundColor
				e.target.style.backgroundColor = themeList[2].menuHoverBackGroundColor
			}
		}


		removeMarkSelf()
		e.target.setAttribute("v-self", "self")


		display_none_all()
		//切换到两个城市之间对比
		compare_city()





	}
	//返回选择页
	else if (e.target.className == "three") {


		window.location.replace("./index.html")


	}
	//主题切换
	else if (e.target.className == "six") {
		themeChangeFunction(themeIndex)
		themeIndex++
		if (themeIndex == 3) themeIndex = 0

	}
	// 游戏
	else if (e.target.className == "seven") {
		let allMenuItem = document.querySelectorAll(".menu>li")
		for (let i = 0; i < allMenuItem.length; i++) {
			if (themeIndex == 1) {
				allMenuItem[i].style.backgroundColor = themeList[0].menuBackGroundColor
				e.target.style.backgroundColor = themeList[0].menuHoverBackGroundColor
			}

			if (themeIndex == 2) {
				allMenuItem[i].style.backgroundColor = themeList[1].menuBackGroundColor
				e.target.style.backgroundColor = themeList[1].menuHoverBackGroundColor
			}
			if (themeIndex == 0) {
				allMenuItem[i].style.backgroundColor = themeList[2].menuBackGroundColor
				e.target.style.backgroundColor = themeList[2].menuHoverBackGroundColor
			}
		}


		removeMarkSelf()
		e.target.setAttribute("v-self", "self")

		display_none_all()
		weather_game()
	} else if (e.target.className == "five") {
		let allMenuItem = document.querySelectorAll(".menu>li")
		for (let i = 0; i < allMenuItem.length; i++) {
			if (themeIndex == 1) {
				allMenuItem[i].style.backgroundColor = themeList[0].menuBackGroundColor
				e.target.style.backgroundColor = themeList[0].menuHoverBackGroundColor
			}

			if (themeIndex == 2) {
				allMenuItem[i].style.backgroundColor = themeList[1].menuBackGroundColor
				e.target.style.backgroundColor = themeList[1].menuHoverBackGroundColor
			}
			if (themeIndex == 0) {
				allMenuItem[i].style.backgroundColor = themeList[2].menuBackGroundColor
				e.target.style.backgroundColor = themeList[2].menuHoverBackGroundColor
			}
		}



		removeMarkSelf()
		e.target.setAttribute("v-self", "self")


		display_none_all()
		big_look()
		// 如果之前存的有数据直接返回
		if (first == 0) {
			renderBigLook("shanxi", shanxiXY, bigLookTemperatureaData, true, "陕西省", "温度", "度")
			bigLooKPie(bigLookTemperatureaData, "温度", "度")
			DashboardRender(1,10)
			first++;
			pieChart.resize()
			DashboardChart.resize()
			bigLookChat.resize()
			return 0;

		}else{
			DashboardRender(1, 10)
			DashboardChart.resize()
			pieChart.resize()
			bigLookChat.resize()
		}
		
		


	}
}