var store = [{
        "title": "github.io 블로그 시작하기",
        "excerpt":"GitHub Blog 서비스 테스트 GitHub Blog 시작  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/first-post/",
        "teaser": "http://localhost:4000/assets/images/logo.png"
      },{
        "title": "2020.11.16",
        "excerpt":"vuejs 체크 박스 전체 선택 &lt;th&gt; &lt;label class=\"fa-ckbox\"&gt; &lt;input type=\"checkbox\" v-model=\"checkAll\"&gt;&lt;span&gt;&lt;/span&gt; &lt;/label&gt; &lt;/th&gt; &lt;td&gt; &lt;label class=\"fa-ckbox\" v-for=\"item in list\"&gt; &lt;input type=\"checkbox\" :value=\"item.seq\" v-model=\"cklist\"&gt;&lt;span&gt;&lt;/span&gt; &lt;/label&gt; &lt;/td&gt; Data:{ all:['1','2','3'], selectList:[] }, computed : { checkAll : { //getter get: function(){ if((this.selectList.length != this..length) || this.all.length == 0) return false; else return true;...","categories": ["2020"],
        "tags": ["Vuejs"],
        "url": "http://localhost:4000/2020/post-20201116/",
        "teaser": "http://localhost:4000/assets/images/logo.png"
      },{
        "title": "JPA에 대한 소개",
        "excerpt":"JPA에 대한 소개 객체와 관계형 데이터 베이스 간의 차이를 중간에서 해결해 주는 ORM 프레임워크가 있다. JPA는 이러한 자바 진영의 ORM 기술 표준이다. JPA를 사용해서 얻는 가장 큰 성과는 SQL이 아닌 객체 중심으로 개발하니 생산성과 유지보수가 확연히 좋아졌고 테스트를 작성하기도 편해진 점이다. SQL을 직접 다룰 때 발생하는 문제점 진정한 의미의 계층...","categories": ["Spring"],
        "tags": ["JPA"],
        "url": "http://localhost:4000/spring/spring-jpa-chapter1/",
        "teaser": "http://localhost:4000/assets/images/logo.png"
      },{
        "title": "JPA 시작",
        "excerpt":"객체 매핑 시작 Jpa를 사용하려면 가장 먼저 매핑을 해야한다. 회원 테이블 CREATE TABLE MEMBER( ID VARCHAR(255) NOT NULL, NAME VARCHAR(255), AGE INTEGER NOT NULL, PRIMARY KEY(ID) ); 회원 클래스 import lombok.Getter; import lombok.Setter; import javax.persistence.*; @Getter @Setter @Entity @Table(name=\"MEMBER\") public class Member { @Id @Column(name = \"ID\") private String id;...","categories": ["Spring"],
        "tags": ["JPA"],
        "url": "http://localhost:4000/spring/spring-jpa-chapter2/",
        "teaser": "http://localhost:4000/assets/images/logo.png"
      }]
