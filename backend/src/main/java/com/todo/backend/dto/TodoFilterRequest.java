package com.todo.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TodoFilterRequest {
    private String search;
    private String priority;
    private Boolean done;
    private String sortBy = "createdAt";
    private String order = "asc";
    private int page = 0;
    private int size = 10;

}
