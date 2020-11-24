---
title: "엔티티 매핑"
excerpt: "엔티티 매핑"

categories:
  - Spring
tags:
  - JPA

date: 2020-11-19

toc: true
toc_label: "엔티티 매핑"
toc_sticky: true
---
JPA를 사용하는데 가장 중요한 일은 엔티티와 테이블을 정확히 매핑하는 것이다.

- 객체와 테이블 매핑 : @Entity, @Table
- 기본 키 매핑 : @Id
- 필드와 컬럼 매핑: @Column
- 연관관계 매핑 : @ManyToOne, @JoinColumn

### @Entity

JPA를 사용해서 테이블과 매핑할 클래스는 @Entity 어노테이션을 필수로 붙여야한다.

엔티티라고 부른다.

주의해야할 점

- 기본 생성자는 필수
- final클래스, enum, interface, inner 클래스에서는 사용할 수 없다.
- 저장할 필드에 final을 사용하면 안된다.

### @Table

Table 속성

- name : 매핑할 테이블 이름
- catalog : catalog 기능이 있는 데이터베이스에 catalog를 매핑
- schema : schema 기능이 있는 데이터베이스에서 schema를 매핑
- uniqueConstraints : DDL 생성 시에 유니크 제약조건을 만든다. 스키마 자동생성을 이용해서 DDL을 만들때만 사용

### 데이터베이스 스키마 자동 생성

JPA는 데이터베이스 스키마를 자동으로 생성하는 기능을 지원한다.

- 자동생성 사용법

```xml
<property name="hibernate.hbm2ddl.auto" value="create"/>
<property name="hibernate.show_sql" value="true"/> <!-- DDL을 출려할 수 있다. -->
```

이 속성을 추가하면 애플리케이션 실행 시점에 데이터베이스 테이블을 자동으로 생성한다.

[hibernate.hbm2ddl.auto](http://hibernate.hbm2ddl.auto) 속성

- create :  기존 테이블을 삭제하고 새로 생성
- create-drop : create 속성에 추가로 애플리케이션을 종료할 때 생성한 DDL을 제거
- update : 데이터베이스 테이블과 엔티티 매핑정보를 비교해서 변경 사항만 수정
- validate : 데이터 베이스 엔티티 매핑정보 를비교해서 차이가 있으면 경고를 남기고 애플리케이션을 실행하지 않는다
- none : 자동 생성 기능을 사용하지 않으려면 [hibernate.hbm2ddl.auto](http://hibernate.hbm2ddl.auto) 속성 자체를 삭제하거나 유효하지 않은 옵션 값을 주면된다.

### @DDL 생성기능

@Column(name="NAME", nullable = false, length = 10) << 제약을 추가할수 있다.

### 기본 키 매핑

- 직접 할당 : 기본 키를 애플리케이션에서 직접 할당

    @Id(@GeneratedValue : 자동 생성 전략)

- 자동 할당 : 대리 키 사용 방식

    @IDENTITY

    기본 키 생성을 데이터베이스에 위임하는 전략

    ```java
    @Id
    @GenerateValue(Strategy = GenerationType.IDENTITY)
    private Long id;
    ```

    @SEQUENCE 

    시퀀스를 사용해서 기본 키를 생성

    ```sql
    CREATE TABLE BOADE(
     ID BIGINT NOT NULL PRIMARY KEY,
     DATA VARCHAR(255)
    )
    ```

    ```java
    @Entity
    @SequenceGenerator(
    	name = "BOARD_SEQ_GENERATOR", // 식별자 생성기 이름
    	sequenceName = "BOARD_SEQ", //매핑할 데이터베이스 시퀀스 이름
    	initialValue = 1,// DDL을 생성할 때 처음 시작하는 수르 저장
     allocationSize = 1) // 시퀀스 한 번 호출에 증가하는 수
    public class Board{                   
    	@Id
    	@GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "BOARD_SEQ_GENERATOR")
    	private Long id;
    }
    ```