package org.example.emailservice.kafka;

import lombok.RequiredArgsConstructor;
import org.example.emailservice.dto.EmailMessageKafkaDto;
import org.example.emailservice.service.inter.EmailService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class KafkaConsumer {
    private final EmailService emailService;

    @KafkaListener(topics = "${spring.kafka.consumer.topic.name}", groupId = "${spring.kafka.consumer.group-id}")
    public void listen(EmailMessageKafkaDto emailMessageKafkaDto) {
        // send email
        Map<String, String> model = new HashMap<>();
        model.put("fullName", emailMessageKafkaDto.getFullName());
        model.put("movieName", emailMessageKafkaDto.getMovieName());
        model.put("movieDay", emailMessageKafkaDto.getMovieDay());
        model.put("saloonName", emailMessageKafkaDto.getSaloonName());
        model.put("movieStartTime", emailMessageKafkaDto.getMovieStartTime());
        model.put("chairNumbers",emailMessageKafkaDto.getChairNumbers());

        emailService.sendEmail(emailMessageKafkaDto.getSender(), emailMessageKafkaDto.getRecipient(), emailMessageKafkaDto.getSubtitle(), model);
    }
}
