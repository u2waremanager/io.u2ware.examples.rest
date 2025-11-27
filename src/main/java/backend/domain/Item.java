package backend.domain;



import java.util.Set;
import java.util.UUID;

import org.springframework.hateoas.Link;

import com.fasterxml.jackson.annotation.JsonProperty;

import backend.domain.auditing.AuditedEntity;
import backend.domain.properties.Attributes;
import backend.domain.properties.AttributesSet;
import backend.domain.properties.Crypto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "examples_items")
@Data @EqualsAndHashCode(callSuper = true)
public class Item extends AuditedEntity{
    
    @Id
    @GeneratedValue
    private UUID id;

    private String title;

    private Integer size;

    // private Crypto cryptoValue;

    @Column(length = 1024*100)
    private Attributes jsonValue;


    @Column(length = 1024*100)
    private AttributesSet arrayValue;

    @Column(length = 1024*100)
    private Link linkValue;

    @Column(length = 1024*100)
    private Set<Link> linksValue;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String searchKeyword;

}

