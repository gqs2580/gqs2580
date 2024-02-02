//发送天气请求
function fetchCW(name, callback) {
	fetch(`https://restapi.amap.com/v3/weather/weatherInfo?city=${name}&key=${key}`).then(
		response => response.json()).then(function (data) {
			// 湿度
			var humidity = data.lives[0].humidity
			// 温度
			var temperature = data.lives[0].temperature
			// 城市
			var city = data.lives[0].city


			//回调函数写入数据
			callback(city, temperature, humidity)
			// callback(city, humidity)
			var compareCityTableDom = document.querySelector('.compare_city_bottom>div');
			var compareCityChart = echarts.init(compareCityTableDom);
			compareCityChart.setOption(compareCityOption);

			window.compareCityChart = compareCityChart

			window.addEventListener("resize", function () {
				compareCityChart.resize()
			})
			check.addEventListener("click", function () {
				compareCityChart.resize()
			})

		}).catch(error => console.log(error))

}

//给对比下拉框添加改变事件
var compareProvice = document.querySelector('.compareProvinve')
compareProvice.onchange = function () {
	var clearSelectCity = document.querySelectorAll('.compareSelectCity option')
	for (var i = 0; i < clearSelectCity.length; i++) {
		if (clearSelectCity) {
			clearSelectCity[i].remove()
		}
	}
	sendAllCity(compareProvice.value, renderCompareCity)

}




//加载下拉城市
function renderCompareCity(city) {

	var option = document.createElement('Option')
	option.innerHTML = city
	option.value = city
	compareSelectCity.appendChild(option)

}

//删除城市
compareSelectList.onclick = function (e) {
	var spanList = document.querySelectorAll(".select_city_list ul li")
	console.log(e.target.tagName);
	if (e.target.tagName == "SPAN") {
		//添加删除动画
		e.target.parentNode.style.animation = "test1 0.3s normal linear"
		var timer = setTimeout(function () {
			e.target.parentNode.remove()

		}, 300)
		if (spanList.length == 10) {
			compareCityButton.innerHTML = "选择此城市"


		}
	}

}

// 给选择按钮添加点击事件 并且在列表中添加城市
compareCityButton.addEventListener("click", function () {
	compareCityTen()
})
compareCityButton2.addEventListener("click", function () {
	const compareSelectLi = document.querySelectorAll(".select_city_list ul>li")
	//选择完毕以后获取所有已经选择的城市
	var ctrl = 1;
	// 首先清除之前数据
	compareCityOption.xAxis[0].data = []
	compareCityOption.series[0].data = []
	compareCityOption.series[1].data = []
	for (var i = 0; i < compareSelectLi.length; i++) {
		//10个城市的名字 拿到以后掉发送请求
		var ten_city_One = compareSelectLi[i].childNodes[0].data

		//请求完数据并写入data
		//判断
		ctrl++
		if (i <= 10) {
			fetchCW(ten_city_One, handleCompareCityTable)

		}

	}

})

function compareCityTen() {

	const compareSelectLi = document.querySelectorAll(".select_city_list ul>li")
	//判断不为空再进行添加
	if (compareSelectCity.value) {

		var li = document.createElement("li")
		var spanX = document.createElement("span")
		spanX.style.backgroundImage = "url(./img/关闭2.png)"
		spanX.style.backgroundSize = "20px 20px"
		li.innerHTML = compareSelectCity.value
		li.style.backgroundColor = compareCityBgc
		li.appendChild(spanX)
	}

	if (compareSelectLi.length < 10) {
		compareCityButton.innerHTML = "选择此城市"
		compareSelectList.appendChild(li)

	}
	if (compareSelectLi.length == 9) {
		compareCityButton.innerHTML = "选择完毕"


	}

	//选择完毕以后获取所有已经选择的城市
	if (compareSelectLi.length == 10) {
		var ctrl = 1;
		// 首先清除之前数据
		compareCityOption.xAxis[0].data = []
		compareCityOption.series[0].data = []
		compareCityOption.series[1].data = []
		for (var i = 0; i < compareSelectLi.length; i++) {
			//10个城市的名字 拿到以后掉发送请求
			var ten_city_One = compareSelectLi[i].childNodes[0].data

			//请求完数据并写入data
			//判断
			ctrl++
			if (i <= 10) {
				fetchCW(ten_city_One, handleCompareCityTable)

			}

		}

	}


}

function handleCompareCityTable(name, temperature, humidity) {
	// console.log(name);
	compareCityOption.xAxis[0].data.push(name)
	compareCityOption.series[0].data.push(Number(humidity))
	compareCityOption.series[1].data.push(Number(temperature))


}



var compareCityOption;
compareCityOption = {
	title: {
		text: "温度 & 湿度 折线柱状表",
		textStyle: {
			color: "#000"
		}
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross',
			crossStyle: {
				color: '#d8fbb9'
			}
		}
	},
	toolbox: {
		feature: {
			dataView: {
				show: true,
				readOnly: false
			},
			magicType: {
				show: true,
				type: ['line', 'bar']
			},
			restore: {
				show: true
			},
			saveAsImage: {
				show: true
			}
		}
	},
	legend: {
		data: ['湿度', '温度'],
		textStyle: {
			color: "#fff"
		},
	},
	xAxis: [{


		type: 'category',
		data: [],
		axisPointer: {
			type: 'shadow'
		}
	}],
	yAxis: [{

		type: 'value',
		name: '湿度',
		min: 0,
		max: 100,
		interval: 50,
		axisLabel: {
			formatter: '{value} %'
		}
	},
	{
		textStyle: {
			color: "#fff"
		},
		type: 'value',
		name: '温度',
		min: -30,
		max: 30,
		interval: 5,
		axisLabel: {
			formatter: '{value} °C'
		}
	}
	],
	series: [{
		itemStyle: {
			normal: {
				color: "#72ed4b"
			}
		},
		name: '湿度',
		type: 'bar',

		tooltip: {
			valueFormatter: function (value) {
				return value + '%';
			}
		},
		data: [

		],

	},
	{
		itemStyle: {
			normal: {
				color: "#f9b505"
			}
		},
		name: '温度',
		type: 'line',
		yAxisIndex: 1,
		tooltip: {
			valueFormatter: function (value) {
				return value + ' °C';
			}
		},
		data: []
	}
	]
};

window.compareCityOption = compareCityOption
var initCompareCityList = ["宝鸡市", "安康市", "汉中市", "西安市", "沈阳市", "石家庄市", "成都市", "杭州市", "南京市", "深圳市"]
for (let i = 0; i < 10; i++) {
	var li = document.createElement("li")
	var spanX = document.createElement("span")
	spanX.style.backgroundImage = "url(./img/关闭2.png)"
	spanX.style.backgroundSize = "20px 20px"
	li.innerHTML = initCompareCityList[i]
	li.style.backgroundColor = compareCityBgc
	li.appendChild(spanX)
	compareSelectList.appendChild(li)
	fetchCW(initCompareCityList[i], handleCompareCityTable)
}