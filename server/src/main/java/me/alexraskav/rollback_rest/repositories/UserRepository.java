package me.alexraskav.rollback_rest.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import me.alexraskav.rollback_rest.models.User;

public interface UserRepository extends MongoRepository<User, String> {
    
}
