package org.microservice.userservice.dao;

import org.microservice.userservice.entity.Claim;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClaimDao extends JpaRepository<Claim, String> {
    Claim getClaimByClaimName(String claimName);
}
