package com.codeinloop.hms.dto;

import com.codeinloop.hms.enums.InquiryStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class InquiryResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String message;
    private InquiryStatus status;
    private LocalDateTime createdAt;
}
