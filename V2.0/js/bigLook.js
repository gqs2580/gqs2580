var bigLookTemperatureaData = [{
		name: "商洛市",
		value: 4
	},
	{
		name: "咸阳市",
		value: 1
	},
	{
		name: "西安市",
		value: 10
	},
	{
		name: "宝鸡市",
		value: 11
	},
	{
		name: "安康市",
		value: 15
	},
	{
		name: "汉中市",
		value: 10
	},
	{
		name: "渭南市",
		value: 11
	},
	{
		name: "铜川市",
		value: 5
	},
	{
		name: "延安市",
		value: -3
	},
	{
		name: "榆林市",
		value: -8
	},
]
var bigLookHumidityData = [{
		name: "商洛市",
		value: 90
	},
	{
		name: "咸阳市",
		value: 70
	},
	{
		name: "西安市",
		value: 60
	},
	{
		name: "宝鸡市",
		value: 70
	},
	{
		name: "安康市",
		value: 80
	},
	{
		name: "汉中市",
		value: 85
	},
	{
		name: "渭南市",
		value: 60
	},
	{
		name: "铜川市",
		value: 68
	},
	{
		name: "延安市",
		value: 73
	},
	{
		name: "榆林市",
		value: 85
	},

]
var bigLookWindpowerData = [{
		name: "商洛市",
		value: 4
	},
	{
		name: "咸阳市",
		value: 1
	},
	{
		name: "西安市",
		value: 1
	},
	{
		name: "宝鸡市",
		value: 3
	},
	{
		name: "安康市",
		value: 3
	},
	{
		name: "汉中市",
		value: 3
	},
	{
		name: "渭南市",
		value: 1
	},
	{
		name: "铜川市",
		value: 5
	},
	{
		name: "延安市",
		value: 3
	},
	{
		name: "榆林市",
		value: 2
	},
]
var cityLength = 0;
var bigLookCityList = []
//拿到选定省的所有市

function bigLookAllCity(province) {

	fetch(`https://restapi.amap.com/v3/config/district?keywords=${province}&subdistrict=2&key=${key}
`).then(response => response.json()).then(function(data) {
		let dataList = data.districts[0].districts
		for (let i = 0; i < dataList.length; i++) {
			bigLookCityList.push((dataList[i].name).slice(0, -1))
		}
	}).catch(error => console.log(error))

}


function renderBigLook(province, geoCoordMap, data, clear, provinceName, compareType, unit) {
	echarts.registerMap('jiangxi', returnJSON(province));



	var convertData = function(data) {
		var res = [];
		for (var i = 0; i < data.length; i++) {
			var geoCoord = geoCoordMap[data[i].name];
			if (geoCoord) {
				res.push({
					name: data[i].name,
					value: geoCoord.concat(data[i].value)
				});
			}
		}
		return res;
	};


	var bigLookOption = {

		backgroundColor: lookBigProvinceBgc,

		title: {
			top: 20,
			text: `${provinceName}各市实时${compareType}`,
			subtext: '',
			x: 'center',
			textStyle: {
				fontSize:27,
				color: '#666'
			}
		},

		tooltip: {
			trigger: 'item',
			formatter: function(params) {
				if (typeof(params.value)[2] == "undefined") {
					return params.name + ' : ' + params.value + `${unit}`;
				} else {
					return params.name + ' : ' + params.value[2] + `${unit}`;
				}
			}
		},

		legend: {

			orient: 'vertical',
			y: 'bottom',
			x: 'right',
			data: [],
			textStyle: {
				color: '#fff'
			}
		},
		visualMap: {
			show: false,
			min: 0,
			max: 500,
			left: 'left',
			top: 'bottom',
			text: ['高', '低'], // 文本，默认为数值文本
			calculable: true,
			seriesIndex: [1],
			inRange: {

			}
		},

		geo: {
			show: true,
			animationDurationUpdate: 0,
			map: 'jiangxi',
			label: {
				normal: {
					show: false
				},
				emphasis: {
					show: false,
				}
			},
			roam: false,
			itemStyle: {
				normal: {
					areaColor: lookAreaBgc,
					borderColor: lookBorderColor,
					shadowColor: lookAreaShadow,
					borderWidth: 2,
					shadowBlur: 30

				},
				emphasis: {
					areaColor: lookAreaHoverBgc,
				}
			}
		},
		series: [{
				zoom: 2,
				name: 'light',
				type: 'scatter',
				coordinateSystem: 'geo',
				data: convertData(data),
				symbolSize: 7,

				label: {
					normal: {
						formatter: '{b}',
						position: 'right',
						show: true
					},
					emphasis: {
						show: true
					}
				},
				itemStyle: {
					normal: {

						color: '#F4E925'
					}
				}
			},


		]
	};
	const bigLookDom = document.querySelector(".bigLookContainer")
	var bigLookChat;

	if (clear) {
		//如果需要更换 则先清空
		var bigLookChat = echarts.init(bigLookDom);
		bigLookChat.setOption(bigLookOption);
		window.bigLookChat = bigLookChat

	} else {
		var bigLookChat = echarts.init(bigLookDom);
		bigLookChat.setOption(bigLookOption);
		window.bigLookChat = bigLookChat
	}
	window.bigLookOption = bigLookOption
	bigLookChat.on('click', function(params) {

		if (params.componentType == "geo") {
			// 判断是正在哪个比较
			for (let i = 0; i < bigLookMenu.length; i++) {

				if (bigLookMenu[i].className == "target") {
					console.log(bigLookMenu[i]);
					if (bigLookMenu[i].id == "temp") {
						for (let j = 0; j < bigLookTemperatureaData.length; j++) {
							if (bigLookTemperatureaData[j].name == params.region.name) {
								DashboardRender(1, bigLookTemperatureaData[j].value)
								break
							}
						}
					} else if (bigLookMenu[i].id == "wind") {
						for (let j = 0; j < bigLookWindpowerData.length; j++) {
							if (bigLookWindpowerData[j].name == params.region.name) {
								DashboardRender(2, bigLookWindpowerData[j].value)
								break
							}
						}
					} else if (bigLookMenu[i].id == "hum") {
						console.log(1);
						for (let j = 0; j < bigLookHumidityData.length; j++) {
							if (bigLookHumidityData[j].name == params.region.name) {
								DashboardRender(3, bigLookHumidityData[j].value)
								break
							}
						}
					}
				}

			}

		}
		// 鼠标移入事件处理函数
	});

	// 随浏览器窗口大小调整
	window.addEventListener("resize", function() {
		bigLookChat.resize()
	})
	check.addEventListener("click", function() {
		bigLookChat.resize()
	})

}

//大图选择块
const bigLookSelectDiv = document.querySelector(".otherList")
bigLookSelectDiv.onclick = function(e) {
	//清楚所有颜色
	// console.log(e.target);
	var type = 0
	for (let i = 0; i < bigLookSelectDiv.children.length; i++) {
		if (bigLookSelectDiv.children[i].className == "target" || bigLookSelectDiv.children[i].className ==
			"other") {
			bigLookSelectDiv.children[i].style.backgroundColor = bigLookMenuBefore
			bigLookSelectDiv.children[i].className = "other"

		}
	}

	if (e.target.className == "other" || e.target.className == "target") {
		e.target.className = "target"

		e.target.style.backgroundColor = bigLookMenuAfter
	}

	if (e.target.id == "temp") type = "气温对比"
	if (e.target.id == "wind") type = "风力对比"
	if (e.target.id == "hum") type = "湿度对比"
	for (let j = 0; j < 3; j++) {
		if (bigLookMenu[j].className == "target") {
			if (inputProvince == '') {
				inputProvince = "陕西省"
				changeData(inputProvince, type)
				inputProvince = ''

			} else {
				inputProvince = keyValueProince[bigLookInput.value]
				console.log(inputProvince);
				changeData(bigLookInput.value, type)

			}

		}
	}
}


//数据处理
function bigLookSendData(province) {

	bigLookTemperatureaData = []
	bigLookHumidityData = []
	bigLookWindpowerData = []
	let city = Object.keys(province)
	cityLength = city.length
	for (let i = 0; i < city.length; i++) {
		//所有市
		fetch(`https://restapi.amap.com/v3/weather/weatherInfo?city=${city[i]}&key=${key}`)
			.then(response => response.json()).then(function(data) {
				//城市名
				let city = data.lives[0].city
				//湿度
				let humidity = data.lives[0].humidity
				// 温度
				let temperature = data.lives[0].temperature
				// 风向
				let windpower = data.lives[0].windpower
				let objectTemperature = {
					name: city,
					value: Number(temperature)
				}
				bigLookTemperatureaData.push(objectTemperature)

				let objectHumidity = {
					name: city,
					value: Number(humidity)
				}
				bigLookHumidityData.push(objectHumidity)

				let objectwindpower = {
					name: city,
					value: parseInt(windpower.match(/\d+/))
				}
				//追加
				bigLookWindpowerData.push(objectwindpower)

			}).catch(error => console.log(error))
	}

	// console.log("我获取完了数据现在需要渲染", bigLookTemperatureaData);
	//渲染图表
}


function bigLooKPie(dataType, compareType, unit) {
	let all = 0
	let tempArr = []
	for (let i = 0; i < dataType.length; i++) {

		all += Object.values(dataType[i])[1]
		tempArr.push(Object.values(dataType[i])[1])
	}
	//平均
	let average = Math.floor(all / dataType.length)
	//最大
	let max = Math.max(...tempArr)
	//最小
	let min = Math.min(...tempArr)

	//存数据渲染
	var pieLookBigOption = {
		backgroundColor: bigLookRightBottomBgc,
		series: [{
			type: 'bar',
			barWidth: 18,
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: bigLookRightLine1
					}, {
						offset: 0.8,
						color: bigLookRightLine2
					}], false)
				}
			},
			data: [max, average, min]
		}],
		xAxis: {
			data: [`最高${compareType}`, `平均${compareType}`, `最低${compareType}`],
			axisLine: {
				lineStyle: {
					color: '#0177d4'
				}
			},

			axisLabel: {
				color: bigLookRightXYFontColor,
				fontSize: 12
			}
		},
		tooltip: {
			trigger: 'item',
			backgroundColor: '#020933',
			textStyle: {
				color: '#fff'
			},

			formatter: function(params) {
				if (typeof(params.value)[2] == "undefined") {
					return params.name + ' : ' + params.value + unit
				} else {
					return params.name + ' : ' + params.value + unit
				}
			}
		},
		yAxis: {
			name: `${unit}       `,
			nameGap: 25,
			nameTextStyle: {
				color: bigLookRightXYFontColor,
				fontSize: 12
			},
			axisLine: {
				lineStyle: {
					color: '#0177d4'
				}
			},
			axisLabel: {
				color: bigLookRightXYFontColor,
				fontSize: 12
			},
			splitLine: {
				show: false,
				lineStyle: {
					color: '#0177d4'
				}
			},
			type: 'value',
			min: 0, // y轴最小值
			max: max, // y轴最大值
			interval: 3 // 刻度间隔
		},

	};
	if (compareType == "温度" && min<=-10){
		pieLookBigOption.yAxis.min = min
		pieLookBigOption.yAxis.max = 10
	} else{
		pieLookBigOption.yAxis.min = min
		pieLookBigOption.yAxis.max = max
	}
	if (compareType == "湿度") pieLookBigOption.yAxis.interval = max
	const pieBigLookContainer = document.querySelector(".bingPic")
	var pieChart = echarts.init(pieBigLookContainer)
	pieChart.setOption(pieLookBigOption)
	window.pieChart = pieChart
	window.pieLookBigOption = pieLookBigOption
	pieChart.resize()
	window.addEventListener("resize", function() {
		pieChart.resize()
	})
}

var DashboardOption = {
	series: [{
		radius: '60%',
		type: 'gauge',
		center: ['50%', '60%'],
		startAngle: 200,
		endAngle: -20,
		min: -20,
		max: 30,
		splitNumber: 10,
		itemStyle: {
			color: '#FFAB91'
		},
		progress: {
			show: true,
			width: 30
		},
		pointer: {
			show: false
		},
		axisLine: {
			lineStyle: {
				width: 30
			}
		},
		axisTick: {
			distance: -45,
			splitNumber: 5,
			lineStyle: {
				width: 2,
				color: '#fff'
			}
		},
		splitLine: {
			distance: -52,
			length: 14,
			lineStyle: {
				width: 3,
				color: '#fff'
			}
		},
		axisLabel: {
			distance: -20,
			color: '#fff',
			fontSize: 20
		},
		anchor: {
			show: false
		},
		title: {
			show: false
		},
		detail: {
			valueAnimation: true,
			width: '60%',
			lineHeight: 40,
			borderRadius: 8,
			offsetCenter: [0, '-15%'],
			fontSize: 20,
			fontWeight: 'bolder',
			formatter: '{value} °C',
			color: 'inherit'
		},
		data: [{
			value: 15
		}]
	}, ]
};

function DashboardRender(type, value) {
	if (type == 1) {
		var DashboardContaniner = document.querySelector(".yibiaopan")
		var mychart = echarts.init(DashboardContaniner)
		window.DashboardChart = mychart
		window.addEventListener("resize", () => {
			mychart.resize()
		})
		DashboardOption.series[0].data[0].value = value
		DashboardOption.series[0].min = -20
		DashboardOption.series[0].max = 30
		DashboardOption.series[0].splitNumber = 10
		DashboardOption.series[0].detail.formatter = '{value} °C'

		mychart.setOption(DashboardOption)

	} else if (type == 2) {
		var DashboardContaniner = document.querySelector(".yibiaopan")
		var mychart = echarts.init(DashboardContaniner)

		DashboardOption.series[0].data[0].value = value
		DashboardOption.series[0].min = 1
		DashboardOption.series[0].max = 10
		DashboardOption.series[0].detail.formatter = '{value} 级'


		console.log();
		DashboardOption.series[0].splitNumber = 9

		mychart.setOption(DashboardOption)

	} else {
		var DashboardContaniner = document.querySelector(".yibiaopan")
		var mychart = echarts.init(DashboardContaniner)
		DashboardOption.series[0].data[0].value = value
		DashboardOption.series[0].min = 0
		DashboardOption.series[0].max = 100

		DashboardOption.series[0].detail.formatter = '{value} %'
		DashboardOption.series[0].splitNumber = 10


		mychart.setOption(DashboardOption)
	}

}

function changeBigLookContent(inputProvince, geoCoordMap) {
	for (let i = 0; i < bigLookSelectDiv.children.length; i++) {
		if (bigLookSelectDiv.children[i].className == "target") {
			if (bigLookSelectDiv.children[i].id =="temp") {
				// 修改以后渲染数据

				renderBigLook(inputProvince, geoCoordMap, bigLookTemperatureaData, true,
					bigLookInput.value, "温度", "度")
				//修
				bigLooKPie(bigLookTemperatureaData, "温度", "度")

			} else if (bigLookSelectDiv.children[i].id =="hum") {
				renderBigLook(inputProvince, geoCoordMap, bigLookHumidityData, true,
					bigLookInput.value, "湿度", "%")
				console.log("湿度对比");
				bigLooKPie(bigLookHumidityData, "湿度", "%")


			} else {
				renderBigLook(inputProvince, geoCoordMap, bigLookWindpowerData, true,
					bigLookInput.value, "风力", "级")
				bigLooKPie(bigLookWindpowerData, "风力", "级")
				//风向对比
			}

		}
	}
}


//点击按钮更换渲染的数据
function changeData(inputProvince, type) {
	bigLookChat.clear()

	var geoCoordMap = returnProvinceData(keyValueProince[inputProvince])
	if (type == "气温对比") {
		renderBigLook(keyValueProince[inputProvince], geoCoordMap, bigLookTemperatureaData, true,
			inputProvince, "温度", "度")
		bigLooKPie(bigLookTemperatureaData, "温度", "度")

	} else if (type == "湿度对比") {
		renderBigLook(keyValueProince[inputProvince], geoCoordMap, bigLookHumidityData, true,
			inputProvince, "湿度", "%")
		bigLooKPie(bigLookHumidityData, "湿度", "%")

	} else {
		renderBigLook(keyValueProince[inputProvince], geoCoordMap, bigLookWindpowerData, true,
			inputProvince, "风力", "级")
		bigLooKPie(bigLookWindpowerData, "风力", "级")
	}
}

//点击按钮获取 输入框值
const bigLookButton = document.querySelector(".bookLookselect>div:first-child img")

bigLookButton.onclick = () => {

	//判断value的合法性
	if (!keyValueProince[bigLookInput.value]) {
		alert("输入错误 --->正确示范：陕西省");
	} else {
		// contrl = false
		inputProvince = keyValueProince[bigLookInput.value]

		// 拿图表数据
		var geoCoordMap = returnProvinceData(inputProvince)
		bigLookSendData(geoCoordMap)

		//根据当前选项 决定要修改的数据
		let timer = setInterval(() => {

			console.log(bigLookTemperatureaData)
			if (inputProvince != '')
				if (bigLookTemperatureaData.length == cityLength) {
					changeBigLookContent(inputProvince, geoCoordMap)
					clearInterval(timer)
				}

		}, 2000)


	}
}