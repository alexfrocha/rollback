package me.alexraskav.rollback_rest.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "archives")
public class Archive {
    
    @Id
    private String id;
    private String name;
    private String folderId;
    private String userId;
    private String content;

    public Archive() {}

    public Archive(String id, String name, String folderId, String userId) {
        super();
        this.id = id;
        this.name = name;
        this.folderId = folderId;
        this.userId = userId;
    }

    public Archive(String id, String name, String content, String folderId, String userId) {
        super();
        this.id = id;
        this.name = name;
        this.content = content;
        this.folderId = folderId;
        this.userId = userId;
    }


    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFolderId() {
        return this.folderId;
    }

    public void setFolderId(String folderId) {
        this.folderId = folderId;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }


}
