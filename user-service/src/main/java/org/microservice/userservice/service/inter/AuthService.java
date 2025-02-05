package org.microservice.userservice.service.inter;

import org.microservice.userservice.entity.dto.UserAuthenticationResponseDto;
import org.microservice.userservice.entity.dto.UserLoginRequestDto;

public interface AuthService {
    UserAuthenticationResponseDto login(UserLoginRequestDto userLoginRequestDto);
}
