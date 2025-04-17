package com.tareas.Controller;


import com.tareas.Model.Tarea;
import com.tareas.Service.TareaService;
import com.tareas.dto.TareaDTO;
import com.tareas.dto.TareaRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tareas")
public class TareasController {

    @Autowired
    private TareaService tareaService;

    @GetMapping
    public Page<TareaDTO> listarTodas(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        return tareaService.listarTodas(page,size);
    }

    @GetMapping("/buscar")
    public Page<TareaDTO> listarPorTitulo( @RequestParam String titulo, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size
    ){
        return tareaService.listarPorTitulo(titulo,page,size);
    }

    @GetMapping("/estado")
    public Page<TareaDTO> listarPorCompletado(@RequestParam boolean completado, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        return tareaService.listarPorCompletado(completado,page,size);
    }

    @GetMapping("/filtro")
    public Page<TareaDTO> listarPorTituloYCompletado(@RequestParam String titulo, @RequestParam boolean completado, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        return tareaService.listarPorTituloYCompletado(titulo,completado,page,size);
    }



    @GetMapping("/{id}")
    public ResponseEntity<TareaDTO> obtenerTareaPorId(@PathVariable Long id){
        TareaDTO tareaDTO = tareaService.obtenerPorId(id);
        return ResponseEntity.ok(tareaDTO);
    }

    @PostMapping
    public ResponseEntity<TareaDTO> crearTarea(@RequestBody TareaRequest request) {
        TareaDTO tareaDTO = tareaService.crearTarea(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(tareaDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TareaDTO> actualizarTarea(@PathVariable Long id, @RequestBody TareaRequest request){
        TareaDTO tareaDTO = tareaService.actualizarTarea(id,request);
        return ResponseEntity.ok(tareaDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTarea(@PathVariable Long id){
        tareaService.eliminarTarea(id);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/completar/{id}")
    public ResponseEntity<TareaDTO> completarTarea(@PathVariable Long id){
        TareaDTO tareaDTO = tareaService.completarTarea(id);
        return ResponseEntity.ok(tareaDTO);
    }









}
