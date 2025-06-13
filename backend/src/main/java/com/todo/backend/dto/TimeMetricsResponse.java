package com.todo.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TimeMetricsResponse {
    private String overall;
    private String low;
    private String medium;
    private String high;
}
