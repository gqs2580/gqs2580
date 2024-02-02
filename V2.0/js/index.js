//这里输入你在高德获取的key
var key = ""

//定义所有省份
const province = ["北京市", "山西省", "上海市", "重庆市", "河北省", "吉林省", "辽宁省", "黑龙江省", "甘肃省", "青海省", "山东省", "福建省", "浙江省", "台湾省",
	"河南省", "湖北省", "湖南省", "江西省", "江苏省", "安徽省", "广东省", "广西壮族自治区", "云南省", "西藏自治区", "宁夏回族自治区", "内蒙古自治区", "海南省", "四川省",
	"贵州省", "香港", "澳门", "新疆"
]
console.log(province)

const select_province = document.getElementById("province_list")
const select_city = document.getElementById("city_list")
const select_region = document.getElementById("region_list")

for (var i = 0; i < province.length; i++) {
	var item = document.createElement("Option")

	item.innerHTML = province[i]
	item.setAttribute("value", province[i])
	select_province.appendChild(item)

}

//封装一个渲染城市列表的函数作为回调函数
function render_city(city_name, be_change) {

	// console.log(city_name,be_change);
	var city_option = document.createElement("option")
	city_option.innerHTML = city_name
	city_option.setAttribute("value", city_name)
	be_change.appendChild(city_option)
}

//封装一个发送请求的函数
function send_info(address, key, render_city, be_change) {
	while (be_change.firstChild) {
		be_change.removeChild(be_change.firstChild)
	}
	const xhr = new XMLHttpRequest()
	xhr.open("GET", `https://restapi.amap.com/v3/config/district?keywords=${address}&subdistrict=2&key=${key}`, true)
	xhr.send()
	// 接受再返回
	xhr.onload = function() {
		var all_address = []
		if (xhr.status === 200 && xhr.readyState === 4) {
			var city_list = JSON.parse(xhr.responseText).districts[0].districts
			console.log(JSON.parse(xhr.responseText).districts[0].districts[0].name);
			if (be_change.name == "city_list") {
				select_region.innerHTML = ''
				let allRegion = JSON.parse(xhr.responseText).districts[0].districts[0].districts
				for (let x = 0; x < allRegion.length; x++) {
					render_city(allRegion[x].name, select_region)
				}
			}


			for (var i = 0; i < city_list.length; i++) {
				//获得所有数据 并返回渲染到页面
				be_change.value = city_list[0].name
				render_city(city_list[i].name, be_change)
			}
		} else {
			console.error(xhr.statusText)
		}
	}


}

//当下拉菜单被改变时获得里面的省份 并发送ajax请求
select_province.onclick = function() {
	send_info(select_province.value, key, render_city, select_city)

}

select_city.onchange = function() {
	send_info(select_city.value, key, render_city, select_region)
}
//点击后获得当前位置返回数据
const submit = document.getElementById("submit")
submit.onclick = function() {
	sessionStorage.clear()
	sessionStorage.setItem("city", select_city.value == "北京城区" ? "北京市" : select_city.value)
	sessionStorage.setItem("region", select_region.value)
	sessionStorage.setItem("province", select_province.value)
	window.location.replace("./user.html")


}

//枫叶落下的效果
var body = document.querySelector("body")
var timer = setInterval(function() {
	//浏览器窗口宽度和高度
	var window_height = window.innerHeight
	var window_width = window.innerWidth
	var top = Math.random() * window_height
	var left = Math.random() * window_width
	var fengye = document.createElement("img")
	fengye.className = "fengye"
	fengye.src = "./img/xh.png"
	fengye.style.position = "fixed"
	fengye.style.width = "20px"
	fengye.style.top = top + "px"
	fengye.style.left = left + "px"
	//判定枫叶往左还是右的标志
	var decide_left_right = Math.floor(Math.random() * 100)
	if (decide_left_right % 2 == 0) {
		fengye.classList.add("left")
	} else if (decide_left_right % 2 != 0) {
		fengye.classList.add("right")
	}
	body.appendChild(fengye)

}, 200)
var leaves_fall = setInterval(function() {
	var leaves_list = document.querySelectorAll(".fengye")
	for (var i = 0; i < leaves_list.length; i++) {
		var window_height = window.innerHeight
		var window_width = window.innerWidth
		//提取字符串中的数字
		var leaves_top = Math.floor(leaves_list[i].style.top.match(/\d+(.\d+)?/g, ''))
		var leaves_left = Math.floor(leaves_list[i].style.left.match(/\d+(.\d+)?/g, ''))
		//如果枫叶超出了则删除
		if (leaves_left > window_width - 10) {
			body.removeChild(leaves_list[i])
		}
		if (leaves_top > window_height - 10) {
			body.removeChild(leaves_list[i])
		}
		//判断标志是左飘还是右飘
		var m = leaves_list[i].className.indexOf("right")
		if (m > 0) {
			leaves_left += 1
			leaves_list[i].style.left = leaves_left + "px"
		} else {
			leaves_left -= 0.5
			leaves_list[i].style.left = leaves_left + "px"
		}
		leaves_top += 1
		//随机给枫叶加top和left

		leaves_list[i].style.top = leaves_top + "px"


	}
}, 1)


//按钮样式
const submitButton = document.querySelector("#submit")
const submitDiv = document.querySelector("#submit div")
submitButton.onmouseenter = function(e) {
	submitDiv.style.top = e.offsetY + 'px'
	submitDiv.style.left = e.offsetX + 'px'

}