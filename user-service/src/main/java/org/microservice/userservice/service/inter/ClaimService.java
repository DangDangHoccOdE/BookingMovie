package org.microservice.userservice.service.inter;

import org.microservice.userservice.entity.Claim;

public interface ClaimService {
    Claim getClaimByClaimName(String claimName);
}
