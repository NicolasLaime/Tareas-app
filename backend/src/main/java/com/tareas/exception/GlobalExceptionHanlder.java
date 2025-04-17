package com.tareas.exception;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHanlder {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String,String>> handleEntityNotFound(EntityNotFoundException exception){
        Map<String,String> respuesta = new HashMap<>();
        respuesta.put("error", exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(respuesta);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String,String>> handleException(Exception exception){
        Map<String,String> respuesta = new HashMap<>();
        respuesta.put("error","Error interno del servidor");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(respuesta);
    }







}
