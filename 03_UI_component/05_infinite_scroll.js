function Infinite(selector) {
	this.pagination = null;
	this.fullContent = null;

	//화면 크기
	this.screenHeight = 0;
	this.oneTime = false; //일회용 글로별 변수
	this.init(selector);
	this.yesScroll();
}

//요소 초기화
Infinite.prototype.init = function (selector) {
	this.pagination = document.querySelector(".pagination"); //페이지네이션
	this.nextLink = this.pagination.querySelector(".nextPage");
	this.nextURL = this.nextLink.getAttribute("href"); //nextPage에서 href를 얻어내면 다음페이지의 주소를 알게되는 셈이다.
	this.fullContent = document.querySelector(".infinite");
	this.screenHeight = screen.height; //화면 크기
};
Infinite.prototype.yesScroll = function () {
	const objThis = this;
	document.addEventListener("scroll", onScroll);
	//스크롤 이벤트 함수
	function onScroll() {
		//fulHeight는 스크롤을 감지해주는 함수 내에 적어야한다. 그렇지 않는다면 fullContent의 초기 높이 + 추가된 컨텐츠의 높이가 업데이트가 되지 않아서 첫번째로 바닥에 닿으면 컨텐츠를 무한대로 불러오는 불상사가 벌어진다.
		let fullHeight = objThis.fullContent.clientHeight; //.infinite 클래스의 높이
		console.log("스크롤롤");
		const scrollPosition = pageYOffset; //문서가 수직으로 얼마나 스크롤됐는지 픽셀 단위로 반환합니다.
		console.log(fullHeight - objThis.screenHeight / 2);
		console.log(scrollPosition);
		// 만약 전체높이-화면높이/2가 스크롤포지션보다 작아진다면, 그리고 oneTime 변수가 거짓이라면
		// oneTime변수를 사용하는 이유는 바닥에 닿고 나서 madeBox함수를 딱 한번만 호출하기 위해서(바닥에 닿으면 oneTime을 true로 변경하여 여러번 호출하는 일 방지)
		if (
			fullHeight - objThis.screenHeight / 2 <= scrollPosition &&
			!objThis.oneTime
		) {
			console.log("madeBox불러와");
			objThis.oneTime = true;
			objThis.madeBox(); //컨텐츠를 추가하는 함수를 불러온다.
		}
	}
};

//nextURL에 담긴 다음페이지의 주소를 매개로 xmlhttprequest로 열었습니다.
//data로 지정한 변수를 통해서 페이지의 정보를 담았고, 이제 내용물인 list를 얻어낸 후 이것을 infinite에 appendChild로 더해주면 끝
// Infinite.prototype.madeBox = function () {
	// const xhr = new XMLHttpRequest();
	// xhr.onreadystatechange = function () {
	// 	if (xhr.readyState === xhr.DONE) {
	// 		if (xhr.status === 200 || xhr.status === 201) {
	// 			const data = xhr.response; // 다음페이지의 정보
	// 			const addList = data.querySelector(".list"); // 다음페이지에서 list아이템을 획득

	// 			this.fullContent.appendChild(addList); // infinite에 list를 더해주기
	// 			this.oneTime = false; // oneTime을 다시 false로 돌려서 madeBox를 불러올 수 있게 해주기
	// 		} else {
	// 			console.error(xhr.response);
	// 		}
	// 	}
	// };
	// xhr.open("GET", nextURL); // 다음페이지의 정보를 get
	// xhr.send();
	// xhr.responseType = "document";
// };

Infinite.prototype.madeBox = function () {
	const list = document.createElement('div');

	const listTitle = this.fullContent.querySelector('.list h3');
	const img = document.createElement('img');
    img.className = "img";
	img.src = 'https://via.placeholder.com/300x600';//임의의 이미지 넣어줌

	const listChild = list.cloneNode('false');
	listChild.className = "list";
	listChild.appendChild(listTitle);
	listChild.appendChild(img);

    this.fullContent.appendChild(listChild);// infinite에 list를 더해주기
    this.oneTime = false;// oneTime을 다시 false로 돌려서 madeBox를 불러올 수 있게 해주기
}