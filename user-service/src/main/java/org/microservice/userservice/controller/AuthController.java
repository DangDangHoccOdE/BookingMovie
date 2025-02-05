package org.microservice.userservice.controller;

import org.microservice.userservice.entity.dto.UserAuthenticationResponseDto;
import org.microservice.userservice.entity.dto.UserLoginRequestDto;
import org.microservice.userservice.service.inter.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public UserAuthenticationResponseDto login(@RequestBody UserLoginRequestDto userLoginRequestDto){
        return authService.login(userLoginRequestDto);
    }
}
