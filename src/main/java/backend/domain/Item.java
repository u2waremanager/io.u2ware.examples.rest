package backend.domain;



import java.util.UUID;

import backend.domain.auditing.AuditedEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "examples_items")
@Data @EqualsAndHashCode(callSuper = true)
public class Item extends AuditedEntity{
    
    @Id
    @GeneratedValue
    private UUID id;

    private String organization;

    private String stringValue;

    private Integer integerValue;

}
