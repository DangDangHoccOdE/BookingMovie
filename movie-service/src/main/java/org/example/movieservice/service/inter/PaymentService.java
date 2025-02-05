package org.example.movieservice.service.inter;

import org.example.movieservice.entity.dto.TicketInformationDto;

public interface PaymentService {
    void sendTicketDetail(TicketInformationDto ticketInformationDto);
}
