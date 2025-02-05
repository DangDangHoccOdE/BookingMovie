package org.example.movieservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.movieservice.entity.dto.TicketInformationDto;
import org.example.movieservice.service.inter.PaymentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movie/payment")
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("sendTicketDetail")
    public void sendTicketDetail(@RequestBody TicketInformationDto ticketInformationDto){
        paymentService.sendTicketDetail(ticketInformationDto);
    }
}
