package org.microservice.userservice.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "claim")
@Builder
public class Claim {
    @Id
    private String claimId;
    private String claimName;
}
