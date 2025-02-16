package org.microservice.userservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users") // Tránh trùng với từ khóa "user" trong PostgreSQL
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private String userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fullName;

    @ManyToOne
    @JoinColumn(name = "claim_id", referencedColumnName = "claimId")
    private Claim claim;
}
