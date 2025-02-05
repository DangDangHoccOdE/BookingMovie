package org.microservice.userservice.dao;

import org.microservice.userservice.entity.Claim;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClaimDao extends MongoRepository<Claim, String> {
    Claim getClaimByClaimName(String claimName);
}
