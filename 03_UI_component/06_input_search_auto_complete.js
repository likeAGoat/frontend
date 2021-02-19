const searchWrapper = document.querySelector('.search-input');
const inputBox = searchWrapper.querySelector('input');
const suggBox = document.querySelector('.autocom-box');

//사용자가 인풋창에 텍스트를 입력 할 때
inputBox.onkeyup = (e) =>{
    let userData = e.target.value; //사용자가 data를 입력할 때
    let emptyArray = [];
    if(userData){
        emptyArray = suggestions.filter((data) =>{
            //[D]startsWith대신에 다른 것을 써야함(ie 지원 안함)
            //array value값을 lowercas로 필터링하고 오직 사용자가 입력한 시작 단어 및 문장을 리턴한다.
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        // console.log(emptyArray);

        emptyArray = emptyArray.map((data)=>{
            return data = '<li>'+data+'</li>';
        });
        //자동완성 박스 노출
        suggBox.classList.add('active');

        showSuggestion(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for(let i = 0; i<allList.length; i++){
            //adding onclick attribute in all li tag
            allList[i].setAttribute('onclick','select(this)');
        }
    }else{
        suggBox.classList.remove('active');
    }
}

function select(element){
    let selectUserData = element.textContent;
    // console.log(selectUserData);
    inputBox.value = selectUserData; //passing the user selected list
}
function showSuggestion(list){
    console.log(list);
    let listData = null,
        userValue = null;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>'+userValue +'</li>';
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}