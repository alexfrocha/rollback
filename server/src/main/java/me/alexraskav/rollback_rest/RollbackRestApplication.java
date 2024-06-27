package me.alexraskav.rollback_rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class RollbackRestApplication {

	public static void main(String[] args) {
		SpringApplication.run(RollbackRestApplication.class, args);
	}

}
