function ImageSlider(selector){
    this.$imageSlide = null;
    this.$images = null;

    this.currentIndex = -1;

    // 이미지의 너비는 이미지 활성화/비활성화에 사용됨
    this.imageWidth = 0;
    this.$indexItems = null;
    this.init(selector);
    this.initImages(selector);
    this.initEvent();
    this.showImageAt(0);
}

//요소 초기화
ImageSlider.prototype.init = function(selector){
    this.$imageSlider = document.querySelector(selector);
    this.$images = this.$imageSlider.querySelectorAll('.image-list img');

    this.imageWidth = this.$imageSlider.querySelector('.slider-body').offsetWidth;//이미지 슬라이더의 너비 찾기(이미지 너비는 이미지 활성화/비활성화에 사용됨)
    this.$indexItems = this.$imageSlider.querySelectorAll('.index-nav li a');
}
// 이전,다음 이벤트 처리
ImageSlider.prototype.initEvent = function(){
    const objThis = this;
    const prevBtn = document.querySelector('.btn-prev');
    console.log(prevBtn);
    prevBtn.addEventListener('click',function(){
        objThis.prevImage();
    })
    const nextBtn = document.querySelector('.btn-next');
    nextBtn.addEventListener('click',function(){
        objThis.nextImage();
    })

    //페이징
    const indexItemsList = Array.prototype.slice.call( this.$indexItems);//배열로 만들어 주기
    indexItemsList.forEach(function(element){
        element.addEventListener('mouseenter',function(e){
            const index = Array.prototype.indexOf.call(indexItemsList, e.currentTarget);//인덱스 구하기
            //기존 선택과 현재 선택의 비교 방향 알아내기
            if(objThis.currentIndex > index){
                objThis.showImageAt(index,"prev");
            }else{
                objThis.showImageAt(index,"next");
            }
        })
    })
}
//이미지 요소 초기화
ImageSlider.prototype.initImages = function(selector){
    const imagesList = Array.prototype.slice.call(this.$images);//배열로 만들어 주기
    imagesList.forEach(function(element){
        element.style.opacity = "0";
    });
}

//이전 이미지 보이기
ImageSlider.prototype.prevImage = function(){
    this.showImageAt(this.currentIndex - 1,"prev");
}
//다음 이미지 보이기
ImageSlider.prototype.nextImage = function(){
    this.showImageAt(this.currentIndex + 1,"next");
}

//index번째 이미지 보이기
ImageSlider.prototype.showImageAt = function(index,direction){
    console.log("index" + index);
    //인덱스 값 구하기
    if(index<0){
        index = this.$images.length - 1;
    }
    if(index>=this.$images.length){
        index = 0;
    }
    //테스트용
    console.log("currentIndex = "+this.currentIndex+", newIndex = " + index);

    //인텍스 값에 해당하는 이미지 요소 구하기 <- 코드 리팩토링하기
    if(this.currentIndex < 0){
        this.currentIndex = this.$images.length - 1;
    }
    const $currentImage = this.$images[this.currentIndex];
    const $newImage = this.$images[index];

    //이걸 더 예쁘게 넣는 방법이 있을까?? <- 코드 리팩토링하기
    //[D]애니메이션 팍 튀는거 수정하기
    //현재 이미지는 비활성화
    $currentImage.style.opacity = "0";
    //신규 이미지는 활성화
    $newImage.style.opacity = "1";
    $newImage.style.left = 0;

    //direction 값이 prev,next인 경우에만 애니메이션 적용해 이미지를 활성화/비활성화
    if(direction == "prev" || direction =="next"){
        // prev,next에 따른 이동 위치 값 설정(prev)
        // prev(이전)가 기본
        let currentEndLeft = this.imageWidth;
        let nextStarLeft = -this.imageWidth;

        let left = 0;
        let newleft = nextStarLeft;
        if(direction == "next"){
            currentEndLeft = -this.imageWidth;
            nextStarLeft = this.imageWidth;
            left = 0;
            newleft = nextStarLeft;
        }
        //현재 이미지 비활성화 애니메이션
        //애니메이션 엄청 부자연 스럽다 ....
        //[D]코드가 반복됨, 딱보기에도 거지같은 코드가 됨, 리팩토링이 필요 , 투명도 조절 못함...
        function frame(pos){
            if(direction == "prev"){
                left++;
                newleft++;
            }else{
                left--;
                newleft--;
            }
            $currentImage.style.transform = `translateX(${left}px)`;
            $currentImage.style.opacity = "1";
            $newImage.style.transform = `translateX(${newleft}px)`;
            if(left == currentEndLeft || left == 0){
                clearInterval(id);
            }
        }
        const id = setInterval(frame);

    }
    //n번째 인덱스 아이템 선택
    this.selectIndexAt(index);
    //현재 이미지 인덱스값 업데이트
    this.currentIndex = index;
}
ImageSlider.prototype.selectIndexAt = function(index){
    console.log("되는거니?" + this.currentIndex);
    if(this.currentIndex!= -1){
        this.$indexItems[this.currentIndex].classList.remove("select");
    }
    this.$indexItems[index].classList.add("select");
}
