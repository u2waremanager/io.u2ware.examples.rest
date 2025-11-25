package backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

import lombok.NoArgsConstructor;

@Entity
@Table(name = "examples_foos")
@Data
@NoArgsConstructor @AllArgsConstructor
public class Foo {

    @Id
    private String id;

    private String name;
    private Integer age;
}