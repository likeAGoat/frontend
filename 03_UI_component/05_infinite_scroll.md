### 무한 스크롤 만들기
- [참고 url](https://swimfm.tistory.com/entry/%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-Infinite-Scroll-%ED%8E%98%EC%9D%B4%EC%A7%95-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EA%B8%B0-%EC%98%88%EC%A0%9C)

#### XMLHttpRequest
- XMLHttpRequest객체는 서버와 상호작용하기 위하여 사용됩니다. 전체 페이지의 새로고침없이도 URL로부터 데이터를 받아올 수 있습니다. 이는 웹페이지가 사용자가 하고 있는 것을 방해하지 않으면서 페이지의 일부를 업데이트할 수 있도록 해줍니다. =
- XMLHttpRequest는 AJAX프로그래밍에 주로 사용됩니다.
- XMLHttpRequest 는 이름으로만 봐서는 XML 만 받아올 수 있을 것 같아 보이지만, 모든 종류의 데이터를 받아오는데 사용할 수 있습니다. 또한 HTTP 이외의 프로토콜도 지원합니다(file 과 ftp 포함).
- 참고 : https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest

#### Node.cloneNode()
```
var dupNode = node.cloneNode(deep);
```

node
- 복제되어야 할 node.

dupNode
- 복제된 새로운 node.

deep Optional
- 해당 node의 children 까지 복제하려면 true, 해당 node 만 복제하려면 false