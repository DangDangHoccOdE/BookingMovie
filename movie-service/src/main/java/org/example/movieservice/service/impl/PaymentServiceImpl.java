package org.example.movieservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.movieservice.entity.dto.EmailMessageKafkaDto;
import org.example.movieservice.entity.dto.TicketInformationDto;
import org.example.movieservice.kafka.KafkaProducer;
import org.example.movieservice.service.inter.PaymentService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final KafkaProducer kafkaProducer;

    @Override
    public void sendTicketDetail(TicketInformationDto ticketInformationDto) {
        EmailMessageKafkaDto emailMessageKafkaDto = EmailMessageKafkaDto.builder()
                .sender("haidangtest1@gmail.com")
                .receiver(ticketInformationDto.getEmail())
                .subtitle("Chi tiết vé BOOKING MOVIE")
                .fullName(ticketInformationDto.getFullName())
                .movieName(ticketInformationDto.getMovieName())
                .movieDay(ticketInformationDto.getMovieDay())
                .movieStartTime(ticketInformationDto.getMovieStartTime())
                .saloonName(ticketInformationDto.getSaloonName())
                .chairNumbers(ticketInformationDto.getChairNumbers())
                .build();

        kafkaProducer.sendMessage(emailMessageKafkaDto);
    }
}
