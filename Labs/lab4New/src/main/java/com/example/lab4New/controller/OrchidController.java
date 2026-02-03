package com.example.lab4New.controller;

import com.example.lab4New.entities.Orchid;
import com.example.lab4New.service.IOrchidService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orchids")
public class OrchidController {

    private final IOrchidService iOrchidService;

    public OrchidController(IOrchidService iOrchidService) {
        this.iOrchidService = iOrchidService;
    }

    // GET all orchids
    @GetMapping()
    public ResponseEntity<List<Orchid>> fetchAll() {
        return ResponseEntity.ok(iOrchidService.getAllOrchids()); // 200 OK
    }

    // GET orchid by id
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Orchid>> getById(@PathVariable int id) {
        Optional<Orchid> o = iOrchidService.getOrchidByID(id);
        return ResponseEntity.ok(o); // 200 OK
    }

    // CREATE orchid
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public Orchid saveOrchid(@RequestBody Orchid orchid) {
        return iOrchidService.insertOrchid(orchid); // 201 Created
    }

    // UPDATE orchid
    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid(
            @PathVariable int id,
            @RequestBody Orchid orchid) {

        Orchid updatedOrchid = iOrchidService.updateOrchid(id, orchid);
        return ResponseEntity.ok(updatedOrchid); // 200 OK
    }

    // DELETE orchid
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrchid(@PathVariable int id) {
        iOrchidService.deleteOrchid(id);
        return ResponseEntity.ok("Deleted!!");
    }
}

