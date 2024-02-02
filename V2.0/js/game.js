startGame.onclick = function() {
	//点击时将菜单隐藏
	gameMenu.style.display = "none"
	gameMain.style.display = "block"
	divGrade.style.display = "block"
	gameOuterMenu.style.display = "block"
	mainGame()



}
//游戏内菜单逻辑
gameOuterMenu.onclick = function(e) {
	const gameLi = document.querySelectorAll('#game li')
	if (e.target.innerHTML == "重新开始游戏") {
		imgList = normlImglist
		newGame()
	}
	if (e.target.className == "easy"){
		imgList = eaysImgList
		newGame()
	}else if (e.target.className == "difficulty"){
		imgList = difficultyImgList
		newGame()
	}else if  (e.target.className == "middle"){
		imgList = normlImglist
		newGame()
	}else if(e.target.innerHTML == "粉色"){

		for (let i = 0;i<gameLi.length;i++){
			gameLi[i].style.backgroundColor = "#fcd2ff"
			gameLi[i].style.border = "2px solid #c0d392"

		}
		
		
	}else if(e.target.innerHTML == "奶酪色"){
		for (let i = 0;i<gameLi.length;i++){
			gameLi[i].style.backgroundColor = "#fbf1d7"
			gameLi[i].style.border = "2px solid #73ae52"
		
		}
	}else if(e.target.innerHTML == "淡紫色"){
		for (let i = 0;i<gameLi.length;i++){
			gameLi[i].style.backgroundColor = "#bbadff"
			gameLi[i].style.border = "2px solid #d0d99e"
		
		}
	}
}
//创建一个二维数组作为棋盘的基本
var board = []
var container = document.querySelector("#game")

var difficultyImgList = ["./gameimg/1.png", "./gameimg/2.png", "./gameimg/3.png", "./gameimg/4.png", "./gameimg/5.png","./gameimg/6.png","./gameimg/7.png","./gameimg/8.png","./gameimg/9.png"]

var normlImglist = ["./gameimg/1.png", "./gameimg/2.png", "./gameimg/3.png", "./gameimg/4.png", "./gameimg/5.png"]
var eaysImgList = ["./gameimg/1.png", "./gameimg/2.png", "./gameimg/3.png"]
var imgList = normlImglist
//定义存放点击两个位置的坐标
var swapTemp = []
//游戏分数
var gameGrade = 0

function mainGame() {
	//判断当前所放容器能放几个图标
	var container = document.querySelector("#game")
	var containerWidth = container.offsetWidth
	var containerHeight = container.offsetHeight
	var countLine = containerHeight / 50
	var countCol = containerWidth / 50


	//初始化数组 建立结构
	for (let i = 0; i < countLine; i++) {
		var temp = []
		board.push(temp)
		for (var j = 0; j < countCol; j++) {
			board[i][j] = 0
		}
	}


	// ul的个数等于容器宽度等于二维数组的行
	//先创建ul
	for (let i = 0; i < board.length; i++) {
		var ul = document.createElement("ul")
		ul.setAttribute("index", i)
		for (let j = 0; j < board[0].length; j++) {
			var li = document.createElement("li")
			li.setAttribute("index", j)
			var img = document.createElement("img")
			var ramdom = Math.floor(Math.random() * imgList.length)
			board[i][j] = ramdom

			li.appendChild(img)

			ul.appendChild(li)
		}
		container.appendChild(ul)
	}
	updateBoard()
}

function click(e){
	if (e.target.tagName != "IMG") {
		return 0;
	}
	var swapLine = e.target.parentNode.parentNode.getAttribute("index")
	var swapCol = e.target.parentNode.getAttribute("index")
	var x = Number(swapLine)
	var y = Number(swapCol)
	var top = x - 1
	var bottom = x + 1
	var left = y - 1
	var right = y + 1
	//重复点击以后取消高亮样式
	if (document.querySelectorAll("#game ul")[x].children[y].className == "heightLight") {
		document.querySelectorAll("#game ul")[x].children[y].className = "none"
	}
	
	//点击时判断上下左右是否有一样 有一样交给消除函数 没有就交给交换位置函数
	var m = judgeX(x, y)
	var n = judgeY(x, y)
	
	if (m || n) {
		if (swapTemp.length) document.querySelectorAll("#game ul")[swapTemp[0][0]].children[swapTemp[0][1]]
			.className = "none"
		judgeY(x, y)
		judgeX(x, y)
		swapTemp = []
	
	} else {
		var temp = [x, y]
		swapTemp.push(temp)
		var indexLi = document.querySelectorAll("#game ul")[x].children[y]
		if (swapTemp.length == 1) {
			indexLi.className = "heightLight"
		}
	
	}
	
	if (swapTemp.length == 1) {
		//标记第一个的上下左右
		markAround(x, y, top, bottom, left, right)
	} else if (swapTemp.length == 2) {
		//判断是否有上下左右属性如果有的话交换
		var res = document.querySelectorAll("#game ul")[swapTemp[1][0]].children[swapTemp[1][1]].getAttribute(
			"v-brother")
	
		if (res) {
			//再交换之前判断交换后是否能消除 如果交换后不能消除则不交换
			var one = [swapTemp[0][0], swapTemp[0][1]]
			var two = [swapTemp[1][0], swapTemp[1][1]]
			var temp = 0
	
			temp = board[one[0]][one[1]]
			board[one[0]][one[1]] = board[two[0]][two[1]]
			board[two[0]][two[1]] = temp
	
			change = true
			if (!(judgeX(one[0], one[1]) || judgeY(one[0], one[1]) || judgeX(two[0], two[1]) || judgeY(two[0], two[
					1]))) {
				// 不能交换 清除高亮
	
				document.querySelectorAll("#game ul")[swapTemp[0][0]].children[swapTemp[0][1]].className = "none"
				document.querySelectorAll("#game ul")[swapTemp[1][0]].children[swapTemp[1][1]].className = "none"
				//不能交换就把交换的数组交换回来
				temp = board[one[0]][one[1]]
				board[one[0]][one[1]] = board[two[0]][two[1]]
				board[two[0]][two[1]] = temp
	
				swapTemp = []
				return 0;
	
			}
	
		}
	
		if (res) {
			//判断是上下还是左右
			if (swapTemp[0][0] == swapTemp[1][0]) {
	
	
				var imgLeft = document.querySelectorAll("#game ul")[swapTemp[0][0]].children[swapTemp[0][1]]
					.children[0]
				var imgRight = document.querySelectorAll("#game ul")[swapTemp[1][0]].children[swapTemp[1][1]]
					.children[0]
				imgLeft.style.animation = "none"
				imgRight.style.animation = "none"
	
				var tempSrc = imgLeft.src
				imgLeft.src = imgRight.src
				imgRight.src = tempSrc
	
				//同时二维数组中的数也要进行交换
				var re = /\d.png/
				var imgLeftSrc = "./gameimg/" + imgLeft.src.match(re)[0]
				var imgRightSrc = "./gameimg/" + imgRight.src.match(re)[0]
				var indexL = imgList.indexOf(imgLeftSrc)
				var indexR = imgList.indexOf(imgRightSrc)
	
	
				//左右交换动画 并标记是左右动画 底下不在执行消除动画
				imgRight.setAttribute("animateType", "line")
				imgLeft.setAttribute("animateType", "line")
				//判断哪个是左
				var animateLeft;
				var animateRight;
				if (swapTemp[0][1] < swapTemp[1][1]) {
					animateRight = imgRight
					animateLeft = imgLeft
	
				} else {
					animateRight = imgLeft
					animateLeft = imgRight
	
				}
				animateLeft.style.animation = "lineLeft 0.5s normal linear"
				animateRight.style.animation = "lineRight 0.5s normal linear"
	
	
	
	
				board[swapTemp[0][0]][swapTemp[0][1]] = indexL
				board[swapTemp[1][0]][swapTemp[1][1]] = indexR
	
				console.log("左右交换");
				//交换完成以后送去消除
				judgeX(swapTemp[1][0], swapTemp[1][1])
				judgeX(swapTemp[0][0], swapTemp[0][1])
				judgeY(swapTemp[0][0], swapTemp[0][1])
	
				judgeY(swapTemp[1][0], swapTemp[1][1])
	
			} else {
				var imgTop = document.querySelectorAll("#game ul")[swapTemp[0][0]].children[swapTemp[0][1]]
					.children[0]
				var imgBottom = document.querySelectorAll("#game ul")[swapTemp[1][0]].children[swapTemp[1][1]]
					.children[0]
				imgTop.style.animation = "none"
				imgBottom.style.animation = "none"
				var tempSrc = imgTop.src
				imgTop.src = imgBottom.src
				imgBottom.src = tempSrc
	
	
				var re = /\d.png/
				var imgTopSrc = "./gameimg/" + imgTop.src.match(re)[0]
				var imgBottomSrc = "./gameimg/" + imgBottom.src.match(re)[0]
				var indexT = imgList.indexOf(imgTopSrc)
				var indexB = imgList.indexOf(imgBottomSrc)
	
	
				//列交换动画
				var animateTop;
				var animateBottom;
				if (swapTemp[0][0] < swapTemp[1][0]) {
					animateTop = imgTop
					animateBottom = imgBottom
	
	
				} else {
					animateTop = imgBottom
					animateBottom = imgTop
	
	
				}
				animateTop.style.animation = "colTop 0.5s normal linear"
				animateBottom.style.animation = "colBottom 0.5s normal linear"
	
	
	
	
				board[swapTemp[0][0]][swapTemp[0][1]] = indexT
				board[swapTemp[1][0]][swapTemp[1][1]] = indexB
				judgeX(swapTemp[1][0], swapTemp[1][1])
				judgeX(swapTemp[0][0], swapTemp[0][1])
				judgeY(swapTemp[0][0], swapTemp[0][1])
				judgeY(swapTemp[1][0], swapTemp[1][1])
	
			}
		}
		//交换完把高亮样式删除
		document.querySelectorAll("#game ul")[swapTemp[0][0]].children[swapTemp[0][1]].className = "none"
		document.querySelectorAll("#game ul")[swapTemp[1][0]].children[swapTemp[1][1]].className = "none"
		//删除所有标记
		removeAroundMark()
		swapTemp = []
	}
	return 0;
	
	
}
container.onclick = (e)=>{
	click(e)
}

//判断点击天气上下是否为3个以及3个以上
function judgeY(x, y) {
	var top = x - 1
	var bottom = x + 1
	var countTop = 0
	var countBottom = 0
	// 寻找上面一共有几个并计数
	if (top >= 0) {
		while (board[x][y] == board[top][y]) {
			countTop++
			top--
			if (top < 0) {
				break
			}


		}
	}

	//寻找下面有几个并计数
	if (bottom < board.length) {
		while (board[x][y] == board[bottom][y]) {
			countBottom++
			bottom++
			if (bottom > board.length - 1) {
				break
			}
		}
	}
	//如果上面加上面相同的超过3个 则执行消除操作
	if (countBottom + countTop >= 2) {
		//消除
		removeItem("x", x, y, countTop, countBottom)
		return 1;
	}
}

//判断点击左右是否为3个或者三个以上
function judgeX(x, y) {

	var left = y - 1
	var right = y + 1
	var countLeft = 0
	var countRight = 0

	if (left >= 0) {
		while (board[x][y] == board[x][left]) {
			left--
			countLeft++
			if (left < 0) {
				break
			}

		}
	}
	if (right <= board[0].length) {
		while (board[x][y] == board[x][right]) {
			right++
			countRight++
			if (right > board[0].length) {
				break
			}
		}
	}
	if (countLeft + countRight >= 2) {
		//消除
		removeItem("y", x, y, countLeft, countRight)
		return 1;

	}

}
//消除函数
//判断消除的是横向还是纵向 

function removeItem(direction, x, y, min, max) {
	//纵向消除逻辑
	if (direction == "x") {
		console.log(x, y, min, max);
		for (let i = x - min; i <= x + max; i++) {
			var img = document.querySelectorAll("#game ul")[i].children[y].children[0]

			if (img.className == "alreadySet") {
				continue
			} else {
				img.className = "alreadySet"

				changeSrc(i, y)
				//使用重写后的消除逻辑
				rewriteYX(i, y)
			}



		}

	}
	//横向消除逻辑 ok
	if (direction == "y") {
		for (let i = y - min; i <= y + max; i++) {
			judgeY(x, i)
			var img = document.querySelectorAll("#game ul")[x].children[i].children[0]
			if (img.className == "alreadySet") {
				continue
			}
			img.className = "alreadySet"
			changeSrc(x, i)




		}
	}
}
//重写再次判断纵向消除时 左右消除的逻辑
function rewriteYX(x, y) {


	var left = y - 1
	var right = y + 1
	var countLeft = 0
	var countRight = 0

	if (left >= 0) {
		while (board[x][y] == board[x][left]) {
			left--
			countLeft++
			if (left < 0) {
				break
			}

		}
	}
	if (right <= board[0].length) {
		while (board[x][y] == board[x][right]) {
			right++
			countRight++
			if (right > board[0].length) {
				break
			}
		}
	}

	if (countLeft + countRight >= 2) {
		//消除
		for (let i = y - countLeft; i <= y + countRight; i++) {

			var img = document.querySelectorAll("#game ul")[x].children[i].children[0]
			if (img.className == "alreadySet") {
				continue
			} else {
				img.className = "alreadySet"
				changeSrc(x, i)

			}




		}

	}
}


var changeSrc = (x, y) => {
	changGrade()
	var img = document.querySelectorAll("#game ul")[x].children[y].children[0]
	console.log("当前正在执行的index", x, y);
	if (img.getAttribute("animatetype") != "line" || img.getAttribute("animatetype") != "col") {

		img.style.animation = "explode 2 0.3s linear alternate"
	} else {
		img.style.animation = "none"
	}
	//判断什么时候更新
	var timer = setTimeout(function() {
		updateBoard()
		img.style.animation = "none"
	}, 500)
}

//更新棋盘逻辑
function updateBoard() {
	removeAroundMark()
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			var img = document.querySelectorAll("#game ul")[i].children[j].children[0]
			img.style.animation = "none"
			if (img.className == "alreadySet") {
				var randomIndex = Math.floor(Math.random() * imgList.length)
				board[i][j] = randomIndex
				img.className = "notSet"
			}
			img.src = imgList[board[i][j]]
		}
	}
}


function markAround(x, y, top, bottom, left, right) {
	document.querySelectorAll("#game ul")[x].children[y].setAttribute("v-brother", "brother")
	if (top >= 0) {
		document.querySelectorAll("#game ul")[top].children[y].setAttribute("v-brother", "brother")

	}
	if (bottom < board.length) {
		document.querySelectorAll("#game ul")[bottom].children[y].setAttribute("v-brother", "brother")
	}
	if (left >= 0) {
		document.querySelectorAll("#game ul")[x].children[left].setAttribute("v-brother", "brother")
	}
	if (right < board.length) {
		document.querySelectorAll("#game ul")[x].children[right].setAttribute("v-brother", "brother")
	}
}

function removeAroundMark() {
	for (let i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			document.querySelectorAll("#game ul")[i].children[j].removeAttribute("v-brother")
		}
	}
}


// 游戏分数逻辑

function changGrade() {
	gameGrade++
	var grade = document.querySelector('.grade span')
	grade.innerHTML = gameGrade

}

function newGame(){
	container.onclick = null
	// 删除棋盘并更新
	board = []
	
	var thisBoard = document.querySelector("#game")
	thisBoard.remove()
	var div = document.createElement("div")
	div.id = "game"
	div.style.display = "block"
	
	weatherGame.appendChild(div)
	mainGame()
	//删除棋盘以后需要重新绑定点击事件
	container = document.querySelector("#game")
	container.onclick = (e)=>{
		click(e)
	}
	
	gameGrade = -1
	changGrade()
}