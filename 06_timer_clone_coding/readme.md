## 타이머 todo 웹 사이트 만들기

### 로컬 스토리지(localStorage)

localStorage.setItem("nico",true)

localStorage.getItem("nico")

로컬 스토리지(JS api to save stuff on the browser)는 url을 기초로 한다.

자바스크립트는 local storage에 있는 모든 데이터를 string으로 저장하려고 한다.

localStorage.getItem("hello")

→ "true" //boolean값이 아닌 string 값

---

### 이벤트 버블링

이벤트가 버블이 되어 root까지 올라가서 페이지가 새로고침이 된다.

그 새로 고침을 막고싶다 → preventDefault() ⇒ 페이지가 새로고침 안됨(인풋창에 입력해도 텍스트가 그대로 있다.)

---

JSON.stringify() // **object**를 **문자열**로 바꿔준다.

JSON.parse() // **문자열**을 **object**로 변경해준다.

---

API로 이미지를 로드해 줄 경우

image.addEventListener("loadend",handleImgLoad);

---

자바스크립트는 새로고침 없이 계속 데이터를 가져온다.

데이터를 얻는 방법은 간단해 → fetch를 이용

fetch.then //fetch가 완료되기를 기다린다.

### fetch

- `fetch()` 함수는 첫번째 인자로 URL, 두번째 인자로 옵션 객체를 받고, Promise 타입의 객체를 반환합니다. 반환된 객체는, API 호출이 성공했을 경우에는 응답(response) 객체를 resolve하고, 실패했을 경우에는 예외(error) 객체를 reject합니다.

```jsx
fetch(url, options)
  .then((response) => console.log("response:", response))
  .catch((error) => console.log("error:", error))
```

옵션(options) 객체에는 HTTP 방식(method), HTTP 요청 헤더(headers), HTTP 요청 전문(body) 등을 설정해줄 수 있습니다. 응답(response) 객체로 부터는 HTTP 응답 상태(status), HTTP 응답 헤더(headers), HTTP 응답 전문(body) 등을 읽어올 수 있습니다.

참고로 `fetch()` 함수는 엄밀히 말해, 브라우저의 `window` 객체에 소속되어 있기 때문에 `window.fetch()`로 사용되기도 합니다.

### **GET 호출**

먼저 단순히 원격 API에 있는 데이터를 가져올 때 쓰이는 GET 방식의 HTTP 통신을 살펴볼까요?

[JSON Placeholder](https://jsonplaceholder.typicode.com/)라는 인터넷에 공개된 API를 사용해서 예제 코드를 작성해보겠습니다. (브라우저 콘솔을 열고 같이 코드를 작성하고 실행하시면서 따라오시면 더 이해가 쉬우실 겁니다.)

`fetch()` 함수는 디폴트로 GET 방식으로 작동하고 GET 방식은 요청 전문을 받지 않기 때문에 옵션 인자가 필요가 없습니다.

```jsx
fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) =>
  console.log(response)
)```

응답 객체를 통해 응답 상태가 `200 OK`인 것을 금방 알 수 있습니다.

`Response {status: 200, ok: true, redirected: false, type: "cors", url: "https://jsonplaceholder.typicode.com/posts/1", …}`

대부분의 REST API들은 JSON 형태의 데이터를 응답하기 때문에, 응답(response) 객체는 `json()` 메서드를 제공합니다.

```jsx
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => console.log(data))
```

이 메서드를 호출하면, 응답(response) 객체로 부터 JSON 포멧의 응답 전문을 자바스크립트 객체로 변환하여 얻을 수 있습니다.

```jsx
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit↵suscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto"
}
```

단순히 특정 API에 저장된 데이터를 보여주는 웹페이지나 애플리케이션에서는 GET 방식의 HTTP 통신으로 충분할 것입니다.

### **POST 호출**

원격 API에서 관리하고 있는 데이터를 생성해야 한다면 요청 전문을 포함할 수 있는 POST 방식의 HTTP 통신이 필요할 것입니다.

동일한 API를 대상으로 이번에는 새로운 포스트를 생성하기 위해서 `fetch()` 함수를 사용해보겠습니다. `method` 옵션을 `POST`로 지정해주고, `headers` 옵션을 통해 JSON 포멧을 사용한다고 알려줘야 하며, 요청 전문을 JSON 포멧으로 직렬화화여 가장 중요한 `data` 옵션에 설정해줍니다.

```jsx
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  data: JSON.stringify({
    title: "Test",
    body: "I am testing!",
    userId: 1,
  }),
}).then((response) => console.log(response))
```

이번에는 응답 객체를 통해 응답 코드가 `201 Created`인 것을 알 수 있습니다.

```jsx
Response {status: 201, ok: true, redirected: false, type: "cors", url: "https://jsonplaceholder.typicode.com/posts", …}
```

```jsx
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  data: JSON.stringify({
    title: "Test",
    body: "I am testing!",
    userId: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
```

마찬가지 방법으로 응답 객체의 `json()` 메서드를 호출하면 응답 전문을 객체 형태로 얻을 수 있습니다.

`{
  "id": 101
}`

참고 : [https://www.daleseo.com/js-window-fetch/](https://www.daleseo.com/js-window-fetch/)
