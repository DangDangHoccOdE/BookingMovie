package org.example.movieservice.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Bean
    @LoadBalanced  // bạn có thể gọi theo tên service, mà không cần biết chính xác địa chỉ IP:
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}
