package com.codeinloop.hms.controller;

import com.codeinloop.hms.dto.InquiryRequest;
import com.codeinloop.hms.dto.InquiryResponse;
import com.codeinloop.hms.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;

    @PostMapping  //user sends inquiry
    public InquiryResponse createInquiry(@RequestBody InquiryRequest request){

        return inquiryService.saveInquiry(request);

    }

    @GetMapping //admin gets the quiry
    public List<InquiryResponse> getAll(){
        return inquiryService.getAllInquiries();
    }

    @PatchMapping("/{id}/status")
    public InquiryResponse updateStatus(@PathVariable Long id, @RequestParam String status){
        return inquiryService.updateStatus(id, status);
    }


}
