package com.tareas.repository;


import com.tareas.Model.Tarea;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea,Long> {


    Page<Tarea> findByTituloContainingIgnoreCase(String titulo, Pageable pageable);

    Page<Tarea> findByCompletado(Boolean completado, Pageable pageable);

    Page<Tarea> findByTituloContainingIgnoreCaseAndCompletado(String titulo, Boolean completado, Pageable pageable);


}
