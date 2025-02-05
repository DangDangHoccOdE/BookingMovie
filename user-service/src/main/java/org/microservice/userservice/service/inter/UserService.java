package org.microservice.userservice.service.inter;

import org.microservice.userservice.entity.User;
import org.microservice.userservice.entity.dto.UserRegisterRequestDto;

public interface UserService {
    Boolean isUserExist(String userId);
    void addUser(UserRegisterRequestDto userRegisterRequestDto);
    User getUserByEmail(String email);
    boolean isUserCustomer();
    boolean isUserAdmin();
}
