---
title: "JPA시작"
excerpt: "JPA시작"

categories:
  - Spring
tags:
  - JPA

last_modified_at: 2020-11-18T22:00:00-00:00
---
## 객체 매핑 시작

Jpa를 사용하려면 가장 먼저 매핑을 해야한다. 

- 회원 테이블

```sql
CREATE TABLE MEMBER(
  ID VARCHAR(255) NOT NULL,
  NAME VARCHAR(255),
  AGE INTEGER NOT NULL,
  PRIMARY KEY(ID)
);
```

- 회원 클래스

```java
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name="MEMBER")
public class Member {
    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "NAME")
    private String username;
    
    private Integer age;

}
```

회원 클래스에 매핑 정보를 표시하는 어노테이션을 몇 개 추가했다.

- @Entity

    이 클래스를 테이블과 매핑한다고 JPA에게 알려준다. 

    엔티티 클래스라고 한다.

- @Table
- @ Id
- @Column
- 매핑 정보가 없는 필드

JPA는 persistence.xml을 사용해서 필요한 설정 정보를 관리한다. 이 설정 파일이 META-INF/persistence.xml 클래스 패스 경로에 있으면 별도의 설정 없이 JPA가 인식할 수 있다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="http://xmlns.jcp.org/xml/ns/persistence"
             version="2.1">
    <persistence-unit name="jpabook">
        <properties>
<!--             속성 설정 -->
                    <property name="javax.persistence.jdbc.driver" value="org.h2.Driver"></property>
                    <property name="javax.persistence.jdbc.user" value="sa"></property>
                    <property name="javax.persistence.jdbc.password" value=""></property>
                    <property name="javax.persistence.jdbc.url" value="jdbc:h2:tcp://localhost/~/test"></property>
                    <property name="hibernate.dialect" value="org.hibernate.dialect.H2Dialect"></property>

                    <property name="hibernate.show_sql" value="true"/>
                    <property name="hibernate.format_sql" value="true"/>
                    <property name="hibernate.use_sql_comments" value="true"/>
                    <property name="hibernate.id.new_generator_mappings" value="true"/>

        </properties>
    </persistence-unit>
</persistence>
```

JPA 애플리케이션 시작하는 코드

```java
import javax.persistence.*;

public class JpaMain {
    public static void main(String[] args) {
        //엔티티 매니저 팩토리 생성
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("jpabook");
        // 엔티티 매니저 생성
        EntityManager em = emf.createEntityManager();
        //트랜잭션 획득
        EntityTransaction tx = em.getTransaction();

        try{
            tx.begin();
            logic(em);
            tx.commit();
        }catch(Exception e){
            tx.rollback();
        } finally {
            em.close();
        }
        emf.close();
    }
}
```

- 엔티티 매니저 설정
- 트랜잭션 관리
- 비즈니스 로직

### 엔티티 매니저 설정

- 엔티티 매니저 팩토리 생성

- 엔티티 매니저 생성

- 종료

### 트랜잭션 관리

JPA를 사용하면 항상 트랜잭션 안에서 데이터를 변경해야 한다. 트랜잭션 없이 데이터를 변경하면 예외가 발생한다.

```java
//트랜잭션 획득
EntityTransaction tx = em.getTransaction();

try{
	tx.begin();//트랜젝션 시작
	logic(em); // 비즈니스 로직 실행
	tx.commit();//트랜젝션 커밋
}catch(Exception e){
	tx.rollback(); //예외 발생시 트랜젝션 롤백
}
```

### 비즈니스 로직

회원 엔티티를 하나 생성후 엔티티 매니저를 통해 데이터베이스에 등록, 수정, 삭제, 조회

- 등록

    ```java
    String id="id1";
    Member member = new Member();
    member.setId(id);
    member.setUsername("지한");
    member.setAge(2);

    //등록
    em.persist(member);
    ```

- 수정
- 삭제

- 한 건 조회
- 목록 조회

```java
public static void logic(EntityManager em){
        String id="id1";
        Member member = new Member();
        member.setId(id);
        member.setUsername("지한");
        member.setAge(2);

        //등록
        em.persist(member);
        //수정
        member.setAge(20);

        //한건 조회
        Member findMember= em.find(Member.class, id);
        System.out.println("findMember =" + findMember.getUsername() + ", age="+findMember.getAge());

        String listq = "select m from Member m";
        //목록 조회
        List<Member> members = em.createQuery(listq, Member.class).getResultList();
        System.out.println("members.size="+ members.size());

        em.remove(member);
}
```