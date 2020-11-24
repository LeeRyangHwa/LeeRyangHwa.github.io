---
title: "4.엔티티 매핑"
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

    유일한 값을 순서대로 생성하는 특별한 데이터베이스 오브젝트

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

    시퀀스 사용 코드 

    ```java
    private static void logic(EntityManager em){
     Board board = new Board();
     em.persist(board);
     System.out.println("board.id = " + board.getId());
    }
    ```

    ### Table 전략

    Table전략은 키 생성 전용 테이블을 하나 만들고 여기에 이름과 값으로 사용할 컬럼을 만들어 데이터베이스 시퀀스를 흉내내는 전략이다.

    Table 전략을 사용하려면 키 생성 용도로 사용할 테이블을 만들어야한다. 

    ```sql
    //테이블 전략 키 생성 DDL
    create table MY_SEQUENCES(
     sequence_name varchar(255) not null,
     next_val bigint,
     primary key(sequence_name)
    )
    ```

    sequence_name 컬럼을 시퀀스 이름으로 사용하고 next_val컬럼을 시퀀스 값으로 사용한다.

    ```java
    @Entity
    @TableCenerator(
     name = "BOARD_SEQ_GENERATOR",
     talbe = "MY_SEQUENCES",
     pkColumValue = "BOARD_SEQ", allocationSize=1)
    public class Board{
     @Id
     @GeneratedValue(strategy= GenerationType.TABLE,
    		generator = "BOARD_SEQ_GENERATOR")
    private Long id;
    ```

    Table 전략 매핑 순서 

    - @TalbeGenerator를 사용해서 테이블 키 생성기를 등록
    - 그후 생성한 테이블 MY_SEQUENCES 테이블을 키 생성용 테이블로 매핑
    - GenerationType.TABLE을 선택
    - @GeneratedValue.generator에 방금 만든 테이블 키 생성기를 지정

    ⇒ 이제부터 id 식별자 값은 BORAD_SEQ_GENERATOR 테이블 키 생성기가 할당

    ```java
    private static void logic(EntityManager em){
     Board board = new Board();
     em.persist(board);
     System.out.println("board.id = " + board.getId());
    }
    ```

    ### AUTO 전략

    ```java
    @Entity
    public class Board{
     @Id
     @GeneratedValue(strategy = GenerationType.AUTO)
     private Long id;
    //,,,,,,
    }
    ```

    @GeneratedValue.strategy의 기본값은 AUTO다 . 따라서 다음과 같이 사용해도 결과는 값다.

    ```java
    @Id
    @GeneratedValue
    private Long id;
    ```

    AUTO 전략의 장점은 데이터베이스를 변경해도 코드를 수정할 필요가 없다는 것이다. 

    ## 필드와 컬럼 매핑: 레퍼런스

    JPA가 제공하는 필드와 컬럼 매핑용 어노테이션들을 레퍼런스 형식으로 정리해보았다.

    - 필드와 컬럼 매핑
        - @Column : 컬럼을 매핑한다.
        - @Enumerated : 자바의 enum 타입을 매핑한다.
        - @Temporal : 날짜 타입을 매핑한다.
        - @Lob : BLOB, CLOB 타입을 매핑한다.
        - @Transient : 특정 필드를 데이터베이스에 매핑하지 않는다.
    - 기타
        - @Access : JPA가 엔티티에 접근하는 방식을 지정한다.