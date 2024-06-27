package me.alexraskav.rollback_rest.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import me.alexraskav.rollback_rest.models.Archive;

public interface ArchiveRepository extends MongoRepository<Archive, String> {
    @Query("{ 'userId' : ?0 }")
    List<Archive> findArchivesByUserId(String userId);

    @Query("{ 'folderId' : ?0 }")
    List<Archive> findArchivesByFolderId(String folderId);

    @Query("{ 'folderId' : ?0, 'userId' : ?1 }")
    List<Archive> findArchivesByFolderIdAndUserId(String folderId, String userId);
}
