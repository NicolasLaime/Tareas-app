package com.tareas.Model;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
public class Tarea {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El titulo es obligatorio")
    private String titulo;


    private boolean completado;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    /*------------GETTER AND SETTER ---------- */
    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }


    public boolean isCompletado() {
        return completado;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }


    public void setCompletado(boolean completado) {
        this.completado = completado;
    }

     /*------------------------------------------------------------ */



}
