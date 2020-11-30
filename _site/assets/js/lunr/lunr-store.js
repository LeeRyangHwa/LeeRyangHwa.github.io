var store = [{
        "title": "github.io 블로그 시작하기",
        "excerpt":"GitHub Blog 서비스 테스트 GitHub Blog 시작  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/first-post/",
        "teaser": "http://localhost:4000/assets/images/logo.png"
      },{
        "title": "Vuejs 소개",
        "excerpt":"VueJs 소개 vuejs는 프론트엔드 자바스크립트 프레임 워크다. Angular, Backbone, React에 비해 매우 작고 가벼우며 복잡도도 낮다. React와의 비교 공통점 가상 DOM을 사용 컴포넌트를 제공 뷰에만 집중을 하고, 라우터, 상태관리를 위해선 써드파티 라이브러리를 사용 JSX vs Template React에서는 JSX를 사용 Vue에서는 Template를 사용 ⇒ 하지만 Vue에서도 원한다면 JSX를 사용할 수 있다....","categories": ["JavaScript"],
        "tags": ["Vuejs"],
        "url": "http://localhost:4000/javascript/vuejs/",
        "teaser": "http://localhost:4000/assets/images/logo.png"
      },{
        "title": "Vuejs 체크 박스 전체 선택",
        "excerpt":"vuejs 체크 박스 전체 선택 &lt;th&gt; &lt;label class=\"fa-ckbox\"&gt; &lt;input type=\"checkbox\" v-model=\"checkAll\"&gt;&lt;span&gt;&lt;/span&gt; &lt;/label&gt; &lt;/th&gt; &lt;td&gt; &lt;label class=\"fa-ckbox\" v-for=\"item in list\"&gt; &lt;input type=\"checkbox\" :value=\"item.seq\" v-model=\"cklist\"&gt;&lt;span&gt;&lt;/span&gt; &lt;/label&gt; &lt;/td&gt; Data:{ all:['1','2','3'], selectList:[] }, computed : { checkAll : { //getter get: function(){ if((this.selectList.length != this..length) || this.all.length == 0) return false; else return true;...","categories": ["JavaScript"],
        "tags": ["Vuejs"],
        "url": "http://localhost:4000/javascript/post-20201116/",
        "teaser": "http://localhost:4000/assets/images/logo.png"
      },{
        "title": "1.JPA에 대한 소개",
        "excerpt":"JPA에 대한 소개 객체와 관계형 데이터 베이스 간의 차이를 중간에서 해결해 주는 ORM 프레임워크가 있다. JPA는 이러한 자바 진영의 ORM 기술 표준이다. JPA를 사용해서 얻는 가장 큰 성과는 SQL이 아닌 객체 중심으로 개발하니 생산성과 유지보수가 확연히 좋아졌고 테스트를 작성하기도 편해진 점이다. SQL을 직접 다룰 때 발생하는 문제점 진정한 의미의 계층...","categories": ["Spring"],
        "tags": ["JPA"],
        "url": "http://localhost:4000/spring/spring-jpa-chapter1/",
        "teaser": "http://localhost:4000/assets/images/logo.png"
      },{
        "title": "2.JPA 시작",
        "excerpt":"객체 매핑 시작 Jpa를 사용하려면 가장 먼저 매핑을 해야한다. 회원 테이블 CREATE TABLE MEMBER( ID VARCHAR(255) NOT NULL, NAME VARCHAR(255), AGE INTEGER NOT NULL, PRIMARY KEY(ID) ); 회원 클래스 import lombok.Getter; import lombok.Setter; import javax.persistence.*; @Getter @Setter @Entity @Table(name=\"MEMBER\") public class Member { @Id @Column(name = \"ID\") private String id;...","categories": ["Spring"],
        "tags": ["JPA"],
        "url": "http://localhost:4000/spring/spring-jpa-chapter2/",
        "teaser": "http://localhost:4000/assets/images/logo.png"
      },{
        "title": "3.영속성관리",
        "excerpt":"JPA가 제공하는 기능은 크게 엔티티와 테이블을 매핑하는 설계 부분과 매핑한 엔티티를 실제 사용하는 부분으로 나뉜다. 엔티티 매니저: 엔티티를 저장,수정, 삭제, 조회 등 엔티티와 관련된 모든 일을 처리 엔티티 매니저 팩토리와 엔티티 매니저 엔티티 매니저 팩토리 데이터 베이스를 하나만 사용하는 애플리케이션은 일반적으로 EntityManagerFactroy를 하나만 생성한다. ⇒ 비용이 많이 든다.(공장 만들기) ⇒...","categories": ["Spring"],
        "tags": ["JPA"],
        "url": "http://localhost:4000/spring/spring-jpa-chapter3/",
        "teaser": "http://localhost:4000/assets/images/logo.png"
      },{
        "title": "4.엔티티 매핑",
        "excerpt":"JPA를 사용하는데 가장 중요한 일은 엔티티와 테이블을 정확히 매핑하는 것이다. 객체와 테이블 매핑 : @Entity, @Table 기본 키 매핑 : @Id 필드와 컬럼 매핑: @Column 연관관계 매핑 : @ManyToOne, @JoinColumn @Entity JPA를 사용해서 테이블과 매핑할 클래스는 @Entity 어노테이션을 필수로 붙여야한다. 엔티티라고 부른다. 주의해야할 점 기본 생성자는 필수 final클래스, enum, interface,...","categories": ["Spring"],
        "tags": ["JPA"],
        "url": "http://localhost:4000/spring/spring-jpa-chapter4/",
        "teaser": "http://localhost:4000/assets/images/logo.png"
      },{
        "title": "5.연관관계 매핑 기초",
        "excerpt":"객체의 참조와 테이블의 외래 키를 매핑하는 것이 이 장이 목표이다. 단방향 연관관계 연관관계 중에선 다대일(N:1) 단방향 관계를 가장 먼저 이해해야 한다. 회원과 팀이 있다. 회원은 하나의 팀에만 소속될 수 있다. 회원과 팀은 다대일 관계다. 객체 연관 관계 테이블 연관관계 회원 테이블은 TEAM_ID 외래키로 팀 테이블과 연관관계를 맺는다. 회원 테이블과 팀...","categories": ["Spring"],
        "tags": ["JPA"],
        "url": "http://localhost:4000/spring/spring-jpa-chapter5/",
        "teaser": "http://localhost:4000/assets/images/logo.png"
      }]
