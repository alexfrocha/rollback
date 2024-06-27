package me.alexraskav.rollback_rest.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import me.alexraskav.rollback_rest.models.Archive;
import me.alexraskav.rollback_rest.services.ArchiveService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/archives")
public class ArchiveController {
    
    @Autowired
    private ArchiveService service;

    @GetMapping("/")
    public List<Archive> getAllArchives() {
        return service.getAllArchives();
    }

    @GetMapping("/user/{id}")
    public List<Archive> getArchivesByUserId(@PathVariable String id) {
        return service.getArchivesByUserId(id);
    }

    @GetMapping("/folder/{id}")
    public List<Archive> getArchivesByFolderId(@PathVariable String id) {
        return service.getArchivesByFolderId(id);
    }

    @GetMapping("/folder/source/{id}")
    public List<Archive> getSourceFolderByUserId(@PathVariable String id) {
        return service.getSourceFolderByUserId(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Archive> getArchiveById(@PathVariable String id) {
        Optional<Archive> archive  = service.getArchiveById(id);
        return archive.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/")
    public Archive createArchive(@RequestBody Archive archive) {
        return service.createArchive(archive);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Archive> updateArchive(@PathVariable String id, @RequestBody Archive archiveDetails) {
        Optional<Archive> archiveOptional = service.getArchiveById(id);
        if(!archiveOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Archive archive = archiveOptional.get();
        if(!archiveDetails.getName().isEmpty()) {
            archive.setName(archiveDetails.getName());
        }
        if(!archiveDetails.getContent().isEmpty()) {
            archive.setContent(archiveDetails.getContent());
        }
        return ResponseEntity.ok(service.createArchive(archive));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArchive(@PathVariable String id) {
        if(!service.getArchiveById(id).isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        service.deleteArchive(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
