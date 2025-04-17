package com.tareas.dto;

import com.tareas.Model.Tarea;

import java.time.LocalDateTime;

public class TareaDTO {

    private Long id;
    private String titulo;
    private boolean compleatado;
    private LocalDateTime createdAt;

    public TareaDTO(Tarea tarea) {
        this.id = tarea.getId();
        this.titulo = tarea.getTitulo();
        this.compleatado = tarea.isCompletado();
        this.createdAt = tarea.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public boolean isCompleado() {
        return compleatado;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setCompleado(boolean compleado) {
        this.compleatado = compleado;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
