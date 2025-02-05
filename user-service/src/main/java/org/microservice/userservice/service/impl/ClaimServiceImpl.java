package org.microservice.userservice.service.impl;

import org.microservice.userservice.dao.ClaimDao;
import org.microservice.userservice.entity.Claim;
import org.microservice.userservice.service.inter.ClaimService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClaimServiceImpl implements ClaimService {
    private ClaimDao claimDao;

    @Override
    public Claim getClaimByClaimName(String claimName) {
        return claimDao.getClaimByClaimName(claimName);
    }
}
