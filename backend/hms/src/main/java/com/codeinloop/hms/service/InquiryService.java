package com.codeinloop.hms.service;

import com.codeinloop.hms.dto.InquiryRequest;
import com.codeinloop.hms.dto.InquiryResponse;
import com.codeinloop.hms.entity.Inquiry;
import com.codeinloop.hms.enums.InquiryStatus;
import com.codeinloop.hms.mapper.InquiryMapper;
import com.codeinloop.hms.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final InquiryMapper inquiryMapper;

    public InquiryResponse saveInquiry(InquiryRequest request){
        Inquiry inquiry = Inquiry.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .message(request.getMessage())
                .status(InquiryStatus.NEW)
                .createdAt(LocalDateTime.now())
                .build();
        Inquiry saved = inquiryRepository.save(inquiry);
        return inquiryMapper.mapToResponse(saved);
    }

    public List<InquiryResponse> getAllInquiries(){
        return inquiryRepository
                .findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(inquiryMapper::mapToResponse)
                .toList();
    }

    public InquiryResponse updateStatus (Long id , String status){
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inquiry not found"));
        inquiry.setStatus(InquiryStatus.valueOf(status));
        return inquiryMapper.mapToResponse(inquiryRepository.save(inquiry));
    }
}
