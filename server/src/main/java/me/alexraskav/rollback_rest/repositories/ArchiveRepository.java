package me.alexraskav.rollback_rest.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import me.alexraskav.rollback_rest.models.Archive;

public interface ArchiveRepository extends MongoRepository<Archive, String> {
    @Query("SELECT archive FROM Archives archive WHERE archive.userId = :userId")
    List<Archive> findArchivesByUserId(@Param("userId") String userId);

    @Query("SELECT archive FROM Archives archive WHERE archive.folderId = :folderId")
    List<Archive> findArchivesByFolderId(@Param("folderId") String folderId);

    @Query("SELECT archive FROM Archives archive WHERE archive.folderId = :folderId AND archive.userId = :userId")
    List<Archive> findArchivesByFolderIdAndUserId(@Param("folderId") String folderId, @Param("userId") String userId);
}
