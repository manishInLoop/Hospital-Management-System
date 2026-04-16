package com.codeinloop.hms.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AdminStatsResponse {

    private Long totalDoctors;
    private Long activeDoctors;
    private Long totalPatients;
    private Long activePatients;
    private Long totalAppointments;
    private Long pendingAppointments;
    private Long cancelledAppointments;
    private Long confirmedAppointments;
    private Long completedAppointments;
}
