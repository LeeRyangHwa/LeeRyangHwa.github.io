---
title: "5.연관관계 매핑 기초"
excerpt: "연관관계 매핑 기초"

categories:
  - Spring
tags:
  - JPA

date: 2020-11-29

toc: true
toc_label: "연관관계 매핑 기초"
toc_sticky: true
---

객체의 참조와 테이블의 외래 키를 매핑하는 것이 이 장이 목표이다. 

# 단방향 연관관계

연관관계 중에선 다대일(N:1) 단방향 관계를 가장 먼저 이해해야 한다.

- 회원과 팀이 있다.
- 회원은 하나의 팀에만 소속될 수 있다.
- 회원과 팀은 다대일 관계다.

- 객체 연관 관계
- 테이블 연관관계
    - 회원 테이블은 TEAM_ID 외래키로 팀 테이블과 연관관계를 맺는다.
    - 회원 테이블과 팀 테이블은 양방향 관계다.

외래 키 하나로 어떻게 양방향으로 조인

```sql
select *
from member m
join team T on m.team_id = T.team_id
```

- 객체 연관관계와 테이블 연관 관계의 가장 큰 차이

    참조를 통한 연관관계는 언제나 단방향이다. 객체간에 연관 관계를 양방향으로 만들고 싶으면 반대쪽에도 필드를 추가해서 참조를 보관해야 한다. ⇒ 결국 연관관계를 하나 더 만들어야한다.

    - 양방향 관계가 아니라 서로 다른 단방향 관계 2개다.

    반면 테이블은 외래 키 하나로 양방향으로 조인 할 수 있다.

    - 단뱡향 연관관계

    ```java
    class A{
    	B b;
    }
    class B{
    }
    ```

    - 양방향 연관관계

    ```java
    class A{
    	B b;
    }
    class B{
    	A a;
    }
    ```

- 객체 연관 관계 vs 테이블 연관 관계 정리
    - 객체는 참조로 연관관계를 맺는다.
    - 테이블은 외래 키로 연관 관계를 맺는다.
    - 참조를 사용하는 객체의 연관 관계는 단방향이다.
    - 외래 키를 사용하는 테이블의 관계는 양방향이다.
    - 객체를 양방향으로 참조하려면 단방향 연관관계를 2개 만들어야한다.

### 순수한 객체 연관관계

순수하게 객체만 사용한 연관관계 (JPA를 사용하지 않은 순수한 코드 )

```java
public class Member{
	private String id;
	private String username;
	private Team team;
	public void setTeam(Team team){
		this.team = team;
	}
}

public class Team{
	private String id;
	private String name;
}
```

```java
public static void main(String [] args){
	Member member1 = new Member("member1", "회원1");
	Member member2 = new Member("member2", "회원2");
	Team team1 = new Team("team", "팀1");

	member1.setTeam(team1);
	member2.setTeam(team1);
	
	TeamfindTeam = member1.getTeam();
}
```

객체를 참조해서 연관관계를 탐색할 수 있다. 

⇒ 이것을 **객체 그래프 탐색**이라고 한다.

### 객체 관계 매핑

```java
@Entity
@Getter
@Setter
public class Member{
	@Id
	@Colum(name = "MEMBER_ID")
	private String id;

	private String username;

	@ManyToOne
	@JoinColum(name="TEAM_ID")
	private Team team;

	public void setTeam(Team team){
		this.team = team;
	}
}
```

```java
@Entity
@Getter
@Setter
public class Team{
	@Id
	@Column(name="TEAM_ID")
	private String id;
	private String name;
}
```

- 객체 연관관계: 회원 객체의 [Member.team](http://member.team) 필드 사용
- 테이블 연관관계: 회원 테이블의 MEMBER.TEAM_ID 외래 키 컬럼을 사용

연관관계를 매핑하기 위한 새로운 어노테이션이 있다.

- @ManyToOne : 다대일 관계라는 매핑 정보
- @JoinColumn(name="TEAM_ID") : 조인 컬럼은 외래 키를 매핑할 때 사용한다.

### 조회

연관관계가 있는 엔티티를 조회하는 방법

- 객체 그래프 탐색

    member.getTeam()을 사용해서 member와 연관된 team 엔티티를 조회할 수 있다.

    ```java
    Member member = em.find(Member.class, "member1");
    Team team = member.getTeam();
    ```

    이처럼 객체를 통해 연관된 엔티티를 조회하는 것을 객체 그래프 탐색이라 한다.

- 객체지향 쿼리 사용

    객체지향 쿼리인 JPQL에서 연관관계를 어떻게 사용하는지 알아보자

    ex) 회원을 대상으로 조회하는데 팀1에 소속된 회원만 조회하려면 회원과 연관된 팀 엔티티를 검색 조건으로 사용해야한다. SQL은 연관된 테이블을 조인해서 검색조건을 사용하면 된다.

    ```java
    private static void queryLogicJoin(EntityManager em){
    	String jpql = "select m from Member m join m.team t where t.name=:teamName";
    	List<Member> resultList = em.createQuery(jpql, Member.class)
    			.setParameter("teamName", "팀1");
    			.getResultList();

    	for(Member member: resultList){
    		System.out.println("[query] member.username=" + member.getUsername());
    	}
    }
    	
    ```