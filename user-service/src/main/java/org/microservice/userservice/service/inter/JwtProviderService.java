package org.microservice.userservice.service.inter;

import org.springframework.security.core.Authentication;

public interface JwtProviderService {
    String generateToken(Authentication authentication);
}
