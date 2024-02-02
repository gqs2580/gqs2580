const province = ["山西省", "河北省", "北京市", "陕西省", "吉林省", "辽宁省", "黑龙江省", "甘肃省", "青海省", "山东省", "福建省", "浙江省", "台湾省", "河南省", "湖北省",
	"湖南省", "江西省", "江苏省", "安徽省", "广东省", "广西壮族自治区", "海南省", "四川省", "贵州省", "云南省", "西藏", "新疆维吾尔自治区", "内蒙古自治区"
]

var data = []
//执行函数速度变慢 防止卡住 
const sleep = (time) => {
	return new Promise((resolve) => setTimeout(resolve, time))
}
const get_city = async () => {
	for (var i = 0; i <province.length; i++) {
		await sleep(800)
		//每隔1000毫秒调用发送城市请求
		sendAllCity(province[i], sendWeather)
	}
}
get_city()



//发起天气请求的函数
function sendWeather(region) {

	fetch(`https://restapi.amap.com/v3/weather/weatherInfo?city=${region}&key=${key}`).then(response => response.json())
		.then(function (shuju) {
			//请求完成以后打包成一个对象
			var city = shuju.lives[0].city
			// console.log("空气湿度",shuju.lives[0].humidity);
			var temperature = shuju.lives[0].temperature
			let newStr = city.slice(0, -1)
			// console.log(temperature);
			var object = {
				name: newStr,
				value: Number(temperature)
			}
			data.push(object)
			if (provinceIf) {
				convertData(data)
				option.baseOption.series[0].data = convertedData[0]
				allProvinceMap.setOption(option)
			}


		}).catch(error => console.log(error))

}

//发起请求的函数
function sendAllCity(city, callback) {
	fetch(`https://restapi.amap.com/v3/config/district?keywords=${city}&subdistrict=1&key=${key}`).then(response =>
		response.json()).then(function (data) {
			var city_list = data.districts[0].districts
			for (var i = 0; i < city_list.length; i++) {
				var city_name = city_list[i].name
				// console.log(city_name);
				callback(city_name)

			}

		}).catch(error => console.log(error))
		


}




//获得点击以后的坐标请求数据

function provinceClickXY(addressXy) {
	fetch(
		`https://restapi.amap.com/v3/geocode/regeo?output=json&location=${addressXy[0]},${addressXy[1]}&key=${key}&radius=1000&extensions=all`)
		.then(response =>
			response.json()).then(function (data) {
				//发送数据jsonp请求
				let url = `https://wis.qq.com/weather/common?source=pc&weather_type=observe%7Cforecast_1h%7Cforecast_24h%7Cindex%7Calarm%7Climit%7Ctips%7Crise&province=${data.regeocode.addressComponent.province}&city=${data.regeocode.addressComponent.city}&county=${data.regeocode.addressComponent.district}&callback=handerTooltip`

				const script = document.createElement("script")
				script.src = url
				document.body.appendChild(script)
				document.querySelector(".address span").innerHTML = `${data.regeocode.addressComponent.province}${data.regeocode.addressComponent.city}${data.regeocode.addressComponent.district}`
				tooltip.style.display = "block"

			}).catch(error => console.log(error))




}

function handerTooltip(par) {
	if (par?.data?.forecast_1h[1]?.degree != undefined) {
		document.querySelector(".tooltipWeatherInfo span").innerHTML = `${par.data.forecast_1h[1].degree}℃`

		document.querySelector(".tooltipWeatherInfo>div>div:nth-child(1)").innerHTML = `${par.data.forecast_1h[1].weather}`
		document.querySelector(".tooltipWeatherInfo>div>div:nth-child(2)").innerHTML = `${par.data.forecast_1h[1].wind_power}级 ${par.data.forecast_1h[1].wind_direction}`
	}

}

document.querySelector(".address img:nth-of-type(2)").onclick = function () {
	tooltip.style.display = "none"
}