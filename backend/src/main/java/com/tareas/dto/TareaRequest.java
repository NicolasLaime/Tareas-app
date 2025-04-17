package com.tareas.dto;

import javax.validation.constraints.NotBlank;

public class TareaRequest {

    @NotBlank(message = "El título es obligatorio")
    private String titulo;

    private boolean completado;

    public String getTitulo() {
        return titulo;
    }

    public boolean isCompletado() {
        return completado;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setCompletado(boolean completado) {
        this.completado = completado;
    }
}
