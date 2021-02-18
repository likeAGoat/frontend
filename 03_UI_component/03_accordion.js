function FolderAccordionMenu(selector) {
	//내부에서 사용하는 변수는 반드시 생성자에 선언
	this.$accordionMenu = null;
    this.$mainMenuItems = null;
    this.$selectSubItem = null;//선택 서브 메뉴아이템

	this.init(selector);
    this.initSubMenuPanel();
    this.initEvent();
}

//요소 초기화
FolderAccordionMenu.prototype.init = function (selector) {
	this.$accordionMenu = document.querySelector(selector);
    this.$mainMenuItems = this.$accordionMenu.children;
};

//이벤트 초기화
FolderAccordionMenu.prototype.initEvent = function(){
    const objThis = this;
    // const title = this.$mainMenuItems.querySelector('.main-title');
    //array로 변경하려고 콜을 썼는데, 이렇게 써도 되는건지 확인하기
    const args = Array.prototype.slice.call(this.$mainMenuItems);
    args.forEach(function(element){
        const title = element.querySelector('.main-title');
        title.addEventListener("click",function(){
            objThis.toggleSubMenuPanel(element);
        })
    })

    console.log(this.$mainMenuItems);
    const sub = document.querySelectorAll('.sub li');
    const subArgs = Array.prototype.slice.call(sub);
    subArgs.forEach(function(element){
        element.addEventListener("click",function(){
            objThis.selectSubItem(this);
        })
    })

}
//폴더 상태 설정
FolderAccordionMenu.prototype.setFolderState = function(item,state){
    const $folder = item.querySelectorAll('.main-title .folder');
    //기존 클래스 모두 제거
    Array.prototype.forEach.call($folder, function(element){
        element.className = "";//element.classList.remove(...element.classList);
        element.classList.add("folder",state);
    })
}
//서브 패널 초기화 - 초기 시작 시 닫힌 상태로 만들기
FolderAccordionMenu.prototype.initSubMenuPanel = function () {
	const objThis = this;
	Array.prototype.forEach.call(
		this.$mainMenuItems, function (element, index) {
            const $subMenu = element.querySelector('.sub');//공통으로 만들어도 될듯 (1)

            // 서브메뉴가 없는 경우 ... 이건 왜 null로 표현을 안하지 ??!!!
            if($subMenu == null){
                element.setAttribute('data-extension','empty');
                objThis.setFolderState(element,"empty");
            }else{
                if(element.getAttribute('data-extension') == 'open'){
                    objThis.openSubMenu(element);
                }else{
                    objThis.closeSubMenu(element);
                }
            }
		}
	);
};

//index 메뉴의 서브 메뉴패널 열기
FolderAccordionMenu.prototype.openSubMenuAt = function(index){
    const $item = this.$mainMenuItems[index];
    this.openSubMenu($item);
}

//서브 메뉴 패널 열기
FolderAccordionMenu.prototype.openSubMenu = function($item){
    const $subMenu = $item.querySelector('.sub');//공통으로 만들어도 될듯 (2)
    if($item != null){
        $item.setAttribute('data-extension','open');
        $subMenu.style.marginTop = "0px";

        //폴더 상태를 open상태로 만들기
        this.setFolderState($item,"open");

        //open 이벤트 발생
        this.dispatchOpenCloseEvent($item,"open");
    }
}

//index 메뉴의 서브 메뉴패널 닫기
FolderAccordionMenu.prototype.closeSubMenuAt = function(index){
    const $item = this.$mainMenuItems[index];
    this.closeSubMenu($item);
}

//서브 메뉴 패널 닫기
FolderAccordionMenu.prototype.closeSubMenu = function($item){
    if($item != null){
        $item.setAttribute('data-extension','close');
        const $subMenu = $item.querySelector('.sub');//공통으로 만들어도 될듯 (3)
        const styled = window.getComputedStyle($subMenu);
        //템플릿 리터럴로 고쳐보기
        $subMenu.style.marginTop = `-${$subMenu.offsetHeight + parseInt(styled.marginTop,10) + parseInt(styled.marginBottom,10)}px`;

        //폴더 상태를 close상태로 만들기
        this.setFolderState($item,"close");
        //close 이벤트 발생
        this.dispatchOpenCloseEvent($item,"close");

    }
}

//메뉴,서브메뉴 각각 선택 기능
FolderAccordionMenu.prototype.selectMenu = function(mainIndex,subIndex){
    //메인 메뉴 아이템
    const $item = this.$mainMenuItems[mainIndex];
    //서브 메뉴 아이템
    const $subitem = $item.querySelectorAll('.sub li')[subIndex];
    //서브 메뉴아이템이 존재하는 경우에만 처리
    if($subitem){
        //서브 메뉴패널 열기
        this.openSubMenu($item);
        //서브 메뉴아이템 선택
        this.selectSubItem($subitem);
    }
}

//서브 메뉴패널 열고 닫기
FolderAccordionMenu.prototype.toggleSubMenuPanel = function($item){
    const extension = $item.getAttribute('data-extension');

    //서브가 없는 경우 취소
    if(extension == "empty"){
        return;
    }
    if(extension == "open"){
        this.closeSubMenu($item);
    }else{
        this.openSubMenu($item);
    }
}
//서브 메뉴아이템 선택
FolderAccordionMenu.prototype.selectSubItem=function($item){
    if(this.$selectSubItem != null){
        this.$selectSubItem.classList.remove('select');
    }

    this.$selectSubItem = $item;
    this.$selectSubItem.classList.add('select');
}

//[D]이건 다시 수정하쟈 !!!
//이벤트 발생
FolderAccordionMenu.prototype.dispatchOpenCloseEvent = function($item,eventName){
    $item.dispatchEvent(new Event("eventName"));
}