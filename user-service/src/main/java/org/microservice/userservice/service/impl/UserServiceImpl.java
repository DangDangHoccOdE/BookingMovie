package org.microservice.userservice.service.impl;

import org.microservice.userservice.dao.UserDao;
import org.microservice.userservice.entity.Claim;
import org.microservice.userservice.entity.User;
import org.microservice.userservice.entity.dto.UserRegisterRequestDto;
import org.microservice.userservice.service.inter.ClaimService;
import org.microservice.userservice.service.inter.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserDao userDao;
    private final ClaimService claimService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Boolean isUserExist(String userId) {
        User user = userDao.findUsersByUserId(userId);

        return user != null;
    }

    @Override
    public void addUser(UserRegisterRequestDto userRegisterRequestDto) {
        Claim claim = claimService.getClaimByClaimName("CUSTOMER");

        User user = User.builder()
                .email(userRegisterRequestDto.getEmail())
                .password(userRegisterRequestDto.getPassword())
                .fullName(userRegisterRequestDto.getCustomerName())
                .claim(claim)
                .build();
        userDao.insert(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return null;
    }

    @Override
    public boolean isUserCustomer() {
        return false;
    }

    @Override
    public boolean isUserAdmin() {
        return false;
    }
}
