package me.alexraskav.rollback_rest.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.alexraskav.rollback_rest.models.Archive;
import me.alexraskav.rollback_rest.repositories.ArchiveRepository;

@Service
public class ArchiveService {
    
    @Autowired
    private ArchiveRepository archiveRepository;

    public List<Archive> getAllArchives() {
        return archiveRepository.findAll();
    }

    public List<Archive> getArchivesByUserId(String userId) {
        return archiveRepository.findArchivesByUserId(userId);
    }
    
    public List<Archive> getArchivesByFolderId(String folderId) {
        return archiveRepository.findArchivesByFolderId(folderId);
    }

    public List<Archive> getSourceFolderByUserId(String userId) {
        return archiveRepository.findArchivesByFolderIdAndUserId("source", userId);
    }

    public Optional<Archive> getArchiveById(String id) {
        return archiveRepository.findById(id);
    }

    public Archive createArchive(Archive archive) {
        return archiveRepository.save(archive);
    }

    public void deleteArchive(String id) {
        archiveRepository.deleteById(id);
    }
    

}
