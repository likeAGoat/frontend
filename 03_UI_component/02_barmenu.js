//어색한 애니메이션 수정하기
function BarMenu(selector) {
    //프로퍼티 생성하기
    this.$barMenu = null;
    this.$menuBody = null;
    this.$menuItems = null;
    this.$overItem = null;
    this.$bar = null;
    this.$selectItem = null; //선택 메뉴 아이템

    this.init(selector); //공통적인 정보 및 DOM요소 초기화
    this.initEvent();
}

//요소 초기화
BarMenu.prototype.init = function(selector) {
    this.$barMenu = document.getElementById(selector);
    this.$menuBody = document.querySelector(".menu-body");
    this.$menuItems = this.$menuBody.getElementsByTagName("li");
    console.log(this.$menuItems);
    this.$bar = document.querySelector(".bar-menu .bar");
};

//이벤트 초기화
BarMenu.prototype.initEvent = function() {
    const objThis = this;

    for (const item of this.$menuItems) {
        //오버 메뉴 효과 처리
        item.addEventListener("mouseenter", function(event) {
            objThis.setOverMenuItem(this);
        });
        //메뉴 영역을 나간 경우
        item.addEventListener("mouseleave", function(event) {
            objThis.removeOverItem();
            objThis.reSelectMenuItem();
        });
        //선택 메뉴 아이템 처리
        item.addEventListener("click", function(event) {
            objThis.removeOverItem(); //기존 오버 메뉴 아이템 제거
            objThis.setSelectMenuItem(this); //선택 메뉴 아이템 처리
        });
    }
};

//마우스 오버 메뉴 아이템 처리
BarMenu.prototype.setOverMenuItem = function($item) {
    const liTag = document.querySelectorAll("li");
    //기존 오버 메뉴아이템에서 over 스타일 제거
    if (this.$overItem) {
        this.$overItem.classList.remove("over");
    }
    // this.$overItem = $item;
    // this.$overItem.classList.add("over");

    let selectIndex = -1;
    if (this.$selectItem != null) {
        selectIndex = Array.prototype.indexOf.call(
            liTag,
            document.querySelector(".select")
        );
    }
    //신규 오버 메뉴 아이템의 인덱스 값과 선택 메뉴아이템 인덱스 값을 비교
    overIndex = Array.prototype.indexOf.call(liTag, $item);
    if (overIndex != selectIndex) {
        //오버효과 처리
        this.$overItem = $item;
        this.$overItem.classList.add("over");
    } else {
        this.$overItem = null;
    }

    //메뉴 바 이동
    this.moveBar($item);
};

//마우스 오버 메뉴 아이템 제거
BarMenu.prototype.removeOverItem = function() {
    if (this.$overItem) {
        this.$overItem.classList.remove("over");
    }
    this.$overItem = null;

    //메뉴 바 이동
    this.moveBar(null);
};

//이동 메뉴 아이템
BarMenu.prototype.moveBar = function($item,animation) {
    let left = -100;
    let width = 0;
    const bar = this.$bar;

    if ($item != null) {
        const styled = window.getComputedStyle($item, null);
        const position = {
            width: $item.offsetWidth,
            left: $item.offsetLeft,
            marginleft: styled.marginLeft,
        };
        width = position.width;
        bar.style.width = `${width}px`;
        //animation이 없을 경우
        if(animation==false){
            bar.style.left = `${position.left}px`;
        }else{
            // prototype안에 함수가 이렇게 들어가도 되는건가 ...?메소드가 들어가는건?
            function frame() {
                left++;
                bar.style.left = `${left}px`;
                if(left == position.left){
                    clearInterval(id)
                }
            }
            var id = setInterval(frame);
        }
    }

};

//선택 메뉴 아이템 처리
BarMenu.prototype.setSelectMenuItem = function($item,animation) {
    //선택 메뉴아이템 스타일 처리
    if (this.$selectItem) {
        this.$selectItem.classList.remove("select");
    }
    this.$selectItem = $item;
    this.$selectItem.classList.add("select");
    //메뉴 바 이동
    this.moveBar($item,animation);
};

//기존 선택 메뉴아이템이 있는 경우 선택 처리
BarMenu.prototype.reSelectMenuItem = function() {
    if (this.$selectItem) {
        this.moveBar(this.$selectItem);
    }
};

//animation이동 여부
BarMenu.prototype.setSelectMenuItemAt = function(index,animation){
    console.log(this.$menuItems[index]);
    this.setSelectMenuItem(this.$menuItems[index],animation);
}