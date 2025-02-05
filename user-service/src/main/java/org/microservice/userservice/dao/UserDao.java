package org.microservice.userservice.dao;

import org.microservice.userservice.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserDao extends MongoRepository<User, String> {
    User findByEmail(String email);
    User findUsersByUserId(String id);
}
