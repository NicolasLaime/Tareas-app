package com.tareas.Service;


import com.tareas.Model.Tarea;
import com.tareas.dto.TareaDTO;
import com.tareas.dto.TareaRequest;
import com.tareas.repository.TareaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TareaService {

    @Autowired
    private TareaRepository tareaRepository;


    public Page<TareaDTO> listarPorTitulo(String titulo, int page, int size){
        Pageable pageable = PageRequest.of(page,size);
        Page<Tarea> tareas = tareaRepository.findByTituloContainingIgnoreCase(titulo,pageable);
        return  tareas.map(tarea -> new TareaDTO(tarea));
    }


    public Page<TareaDTO> listarPorCompletado(Boolean completado, int page , int size){
        Pageable pageable = PageRequest.of(page,size);
        Page<Tarea> tareas = tareaRepository.findByCompletado(completado,pageable);
        return tareas.map(tarea -> new TareaDTO(tarea));

    }

    public Page<TareaDTO> listarTodas(int page, int size){
        Pageable pageable = PageRequest.of(page,size);
        Page<Tarea> tareas = tareaRepository.findAll(pageable);
        return tareas.map(TareaDTO::new);
    }


    public Page<TareaDTO> listarPorTituloYCompletado(String titulo, Boolean completado, int page , int size){
        Pageable pageable = PageRequest.of(page,size);
        Page<Tarea> tareas = tareaRepository.findByTituloContainingIgnoreCaseAndCompletado(titulo,completado,pageable);
        return tareas.map(tarea -> new TareaDTO(tarea));

    }




    public TareaDTO crearTarea(TareaRequest request) {
        Tarea tarea = new Tarea();
        tarea.setTitulo(request.getTitulo());
        tarea.setCompletado(request.isCompletado());
        tarea = tareaRepository.save(tarea);
        return new TareaDTO(tarea);
    }

    public TareaDTO obtenerPorId(Long id){
        Tarea tarea = tareaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("tare con el id: " + id + "no encontrada"));
        return new TareaDTO(tarea);
    }

    public TareaDTO actualizarTarea(Long id, TareaRequest request) {
        Tarea tarea = tareaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tarea con id: " + id + " no encontrada"));
        tarea.setTitulo(request.getTitulo());
        tarea.setCompletado(request.isCompletado());
        return new TareaDTO(tareaRepository.save(tarea));
    }


    public void eliminarTarea(Long id){
        if (!tareaRepository.existsById(id)){
            throw new EntityNotFoundException("Tarea con el Id: " + id + "No encontrada");
        }
        tareaRepository.deleteById(id);
    }

    public TareaDTO completarTarea(Long id) {
        Tarea tarea = tareaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tarea con id: " + id + " no encontrada"));
        tarea.setCompletado(true);  // Marcamos la tarea como completada
        return new TareaDTO(tareaRepository.save(tarea));
    }



}
