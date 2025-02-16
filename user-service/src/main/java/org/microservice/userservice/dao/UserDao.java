package org.microservice.userservice.dao;

import org.microservice.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, String> {
    User findByEmail(String email);
    User findUsersByUserId(String id);
}
