package org.example.movieservice.kafka;

import org.example.movieservice.entity.dto.EmailMessageKafkaDto;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final NewTopic newTopic;

    @Autowired
    public KafkaProducer(KafkaTemplate<String, String> kafkaTemplate, NewTopic newTopic) {
        this.kafkaTemplate = kafkaTemplate;
        this.newTopic = newTopic;
    }

    public void sendMessage(EmailMessageKafkaDto emailMessageKafkaDto){
        Message<EmailMessageKafkaDto> message = MessageBuilder
                .withPayload(emailMessageKafkaDto)
                .setHeader(KafkaHeaders.TOPIC, newTopic.name())  // Header KafkaHeaders.TOPIC được đặt bằng tên của newTopic, để Kafka biết cần gửi tin nhắn đến topic nào.
                .build();

        kafkaTemplate.send(message);
    }
}
