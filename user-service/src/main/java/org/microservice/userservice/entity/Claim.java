package org.microservice.userservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "claim")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Claim {
    @Id
    private String claimId;

    @Column(nullable = false, unique = true)
    private String claimName;
}
