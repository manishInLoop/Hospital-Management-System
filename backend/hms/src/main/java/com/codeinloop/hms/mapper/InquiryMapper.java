package com.codeinloop.hms.mapper;

import com.codeinloop.hms.dto.InquiryResponse;
import com.codeinloop.hms.entity.Inquiry;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class InquiryMapper {
    public InquiryResponse mapToResponse    (Inquiry inquiry){
        return InquiryResponse.builder()
                .id(inquiry.getId())
                .name(inquiry.getName())
                .email(inquiry.getEmail())
                .phone(inquiry.getPhone())
                .message(inquiry.getMessage())
                .status(inquiry.getStatus())
                .createdAt(inquiry.getCreatedAt())
                .build();
    }
}
