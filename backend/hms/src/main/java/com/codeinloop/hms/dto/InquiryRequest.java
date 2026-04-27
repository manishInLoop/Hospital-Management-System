package com.codeinloop.hms.dto;

import lombok.Data;

@Data
public class InquiryRequest {
    private String name;
    private String email;
    private String phone;
    private String message;

}
