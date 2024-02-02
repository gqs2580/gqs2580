//您的key
var key = ""




var thisTime = document.querySelector(".top_right span")

var timer = setInterval(() => {
	//获得当前时间
	const now = new Date();

	const year = now.getFullYear();
	const month = ('0' + (now.getMonth() + 1)).slice(-2);
	const day = ('0' + now.getDate()).slice(-2);
	const hours = ('0' + now.getHours()).slice(-2);
	const minutes = ('0' + now.getMinutes()).slice(-2);
	const seconds = ('0' + now.getSeconds()).slice(-2);


	thisTime.innerHTML = ''
	thisTime.innerHTML = `现在时间是${year}年${month}月${day}日${hours}时${minutes}分${seconds}秒`
}, 1000)
//自适应高度

function startHeight() {
	
	let height = window.innerHeight
	const main = document.querySelector('.main')
	const right = document.querySelector(".right")
	const top = document.querySelector(".top")
	const left = document.querySelector(".left")
	if (height > 1000) {
		top.style.height = 100 + 'px'
		main.style.height = height-100 + 'px'
		right.style.height = height-100 + 'px'
		left.style.height = height-100 + 'px'


	}
}



startHeight()
window.addEventListener("resize", () => {
	selfWidth()
	// startHeight()
})

//判断是否选择
var selfregion = sessionStorage.getItem("region")
var selfcity = sessionStorage.getItem("city")
var selfprovince = sessionStorage.getItem("province")

function ifChecked() {
	if (!selfregion) {
		alert("请先从主界面选择区县")
		document.body.style.display = "none"
		window.location.replace("./index.html")
	}
}
ifChecked()

//发送数据jsonp请求
let url =
	`https://wis.qq.com/weather/common?source=pc&weather_type=observe%7Cforecast_1h%7Cforecast_24h%7Cindex%7Calarm%7Climit%7Ctips%7Crise&province=${selfprovince}&city=${selfcity}&county=${selfregion}&callback=hander`

const script = document.createElement("script")
script.src = url
document.body.appendChild(script)

function hander(res) {
	console.log(res);
	changeUserWeather(res)

}

function changeUserWeather(res) {
	console.log(res);
	faultRateOption.series[0].data = []
	faultRateOption.series[1].data = []
	addressCity.innerHTML = selfcity
	addressRegion.innerHTML = selfregion
	if (!res?.data?.observe?.update_time){
		let faultRateEchart = echarts.init(weatherXian);
		faultRateEchart.setOption(faultRateOption)
		window.faultRateEchart = faultRateEchart
		window.addEventListener("resize", () => {
		
			faultRateEchart.resize()
		})
		return
	}
	let time = res.data.observe.update_time.substring(8, 12)
	var updateTimeInner = `中央气象台${time.substring(0,2)}:${time.substring(2,4)}发布`
	updateTime.innerHTML = updateTimeInner
	temptu.innerHTML = res.data.observe.degree + '℃'
	tempState.innerHTML = res.data.observe.weather
	//顶部天气图标

	var weatherImgUrl = `./weatherIcon/${res.data.observe.weather}.png`
	weatherIcon.src = weatherImgUrl
	windPower.innerHTML = `${res.data.forecast_24h[1].day_wind_direction} ${res.data.forecast_24h[1].day_wind_power}级`
	hum.innerHTML = `湿度${res.data.observe.humidity}%`
	qiya.innerHTML = `气压${res.data.observe.pressure} hPa`
 	if (Object.keys(res.data.tips).length!=0){
		weatherTip.innerHTML = res.data.tips.observe[0]

	}

	//七天天气数据
	let sevenDayData = Object.values(res.data.forecast_24h)
	for (let i = 0; i < sevenDayData.length; i++) {
		// 图表数据

		faultRateOption.series[0].data.push(sevenDayData[i].max_degree)
		faultRateOption.series[1].data.push(sevenDayData[i].min_degree)
		date[i].innerHTML = `${sevenDayData[i].time.substring(5,7)}月${sevenDayData[i].time.substring(8,10)}日`
		degreeDayState[i].innerHTML = sevenDayData[i].day_weather
		//白天天气图标
		if ((sevenDayData[i].day_weather.indexOf("雨")) == -1) {
			dayIcon[i].src = `./weatherCardIconDay/${sevenDayData[i].day_weather}.png`
		} else {
			dayIcon[i].src = `./weatherCardIconDay/小雨.png`
		}
		if (sevenDayData[i].day_weather.indexOf("雨") == -1) {
			nightIcon[i].src = `./weatherCardIconNight/${sevenDayData[i].night_weather}.png`
		} else {
			nightIcon[i].src = `./weatherCardIconNight/小雨.png`
		}
		// nightIcon[i].src = `./weatherCardIconNight/${sevenDayData[i].night_weather}.png`
		degreeNightState[i].innerHTML = sevenDayData[i].night_weather
		windyPower[i].innerHTML = `${sevenDayData[i].night_wind_direction+sevenDayData[i].night_wind_power}级`

	}
	let faultRateEchart = echarts.init(weatherXian);
	faultRateEchart.setOption(faultRateOption)
	window.faultRateEchart = faultRateEchart
	window.addEventListener("resize", () => {

		faultRateEchart.resize()
	})
	//右边天气提示
	tipsTitleColthes.innerHTML = `${res.data.index.clothes.name} ${res.data.index.clothes.info}`
	moreInfoColthes.innerHTML = `${res.data.index.clothes.detail}`

	tipsTitleUmbrella.innerHTML = `${res.data.index.umbrella.name} ${res.data.index.umbrella.info}`
	moreInfoUmbrella.innerHTML = `${res.data.index.umbrella.detail}`

	tipsTitleCold.innerHTML = `${res.data.index.cold.name} ${res.data.index.cold.info}`
	moreInfoCold.innerHTML = `${res.data.index.cold.detail}`

	tipsTitleSport.innerHTML = `${res.data.index.sports.name} ${res.data.index.sports.info}`
	moreInfoSport.innerHTML = `${res.data.index.sports.detail}`

	tipsTitleSmile.innerHTML = `${res.data.index.comfort.name} ${res.data.index.comfort.info}`
	moreInfoSmile.innerHTML = `${res.data.index.comfort.detail}`

	tipsTitleSun.innerHTML = `${res.data.index.sunscreen.name} ${res.data.index.sunscreen.info}`
	moreInfoSun.innerHTML = `${res.data.index.sunscreen.detail}`
}

var category = [];



// option

let faultRateOption = {

	grid: {
		x: '0%',
		width: '100%',
		y: '15%',
		bottom: 20
	},
	xAxis: {
		data: category,

		axisLine: {
			show: false, //隐藏y轴
		},
		axisTick: {
			show: false, //刻度线
		},
	},
	yAxis: [{
		splitLine: {
			show: false
		},


		axisTick: {
			show: false, //刻度线
		},
		axisLine: {
			show: false, //隐藏y轴
		},
		axisLabel: {
			show: false, //隐藏刻度值
		},


	}],

	series: [{
			symbol: "circle",
			symbolSize: 7,
			name: '白天气温',
			type: 'line',
			smooth: true,
			label: {
				show: true,
				position: 'top',
				formatter: function(params) {
					return params.data + '­°C'

				}
			},
			itemStyle: {
				normal: {
					color: "#ffaa00"

				},
			},

			data: [10,5,-5,1,5,4,1,5]
		},

		{
			symbol: "circle",
			symbolSize: 7,
			name: '夜间气温',
			type: 'line',
			smooth: true,
			label: {
				show: true,
				position: 'bottom',
				formatter: function(params) {
					return params.data + '­°C'

				}
			},
			itemStyle: {
				normal: {
					color: "#00e2e2"
				},
			},
			data: [-1,-3,1,-2,-3,4,-5,2]
		},

	]
};

//自适应宽度
function selfWidth() {
	let windowWidth =document.body.clientWidth
	//全省地图自适应
	let widthLeft = left.offsetWidth
	let width = windowWidth -1-widthLeft + "px"
	right.style.width = width
	bigLook.style.width = width
	weatherGame.style.width = width
	if (document.querySelector(".menu li:nth-child(4)").getAttribute("v-self") == "self"){
		console.log(yibiaopan.offsetWidth);
		yibiaopan.style.height = yibiaopan.offsetWidth+"px"
		// bigZhu.style.height = bigZhu.offsetWidth+"px"
	}
	bigLookChat.resize()
	pieChart.resize()	
	if (yibiaopan.children.length != 0){
		DashboardChart.resize()
	}
	if (document.querySelector(".provinceData").children.length) {
		document.querySelector(".provinceData").style.width = width
		allProvinceMap.resize()
	}
	//对比页的调整
	compareCity.style.width = width
	if (compareTableContainer.children.length !=0)
		compareCityChart.resize()



}

//菜单栏收起功能
const menuShow = document.querySelector(".fold")
var isShow = true

menuShow.addEventListener("click", (e) => {
	if (isShow) {
		
		//隐藏底下菜单
		for (let i = 0;i<checkLi.length;i++){
			checkLi[i].style.display = "none"
		}
	
		document.querySelector("h1").style.display = "none"
		menuShow.style.transform = "rotateY(-180deg)"
		menuShow.style.right = "2px"
		left.style.width = "40px"
		topLogo.style.width = "40px"
		topLogoImg.src = "./img/logo2.png"
		topLogoImg.className = "after"
		isShow = false
		selfWidth()
	} else {
		// 展示
		for (let i = 0;i<checkLi.length;i++){
			checkLi[i].style.display = "block"
		}
		document.querySelector("h1").style.display = "block"
		menuShow.style.transform = "rotateY(0deg)"
		menuShow.style.right = "21px"

		topLogoImg.src = "./img/logo.png"
		topLogoImg.className = "before"
		
		left.style.width = "20%"
		topLogo.style.width = "20%"
		isShow = true
		selfWidth()
	}
	faultRateEchart.resize()
	if (document.querySelector(".yibiaopan").children.length != 0){
		DashboardChart.resize()
	}
	e.preventDefault()
}, true)

