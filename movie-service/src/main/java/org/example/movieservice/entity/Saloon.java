package org.example.movieservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "saloon")
@Builder
public class Saloon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int saloonId;

    private String saloonName;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "city_id")
    private City city;
}
