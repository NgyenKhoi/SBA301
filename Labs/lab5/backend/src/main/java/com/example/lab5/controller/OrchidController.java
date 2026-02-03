package com.example.lab5.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.example.lab5.dto.ApiResponse;
import com.example.lab5.dto.OrchidDTO;
import com.example.lab5.entities.Orchid;
import com.example.lab5.mapper.OrchidMapper;
import com.example.lab5.service.IOrchidService;

import java.util.List;

@RestController
@RequestMapping("/orchids")
public class OrchidController {

    private final IOrchidService iOrchidService;
    private final OrchidMapper orchidMapper;

    public OrchidController(IOrchidService iOrchidService, OrchidMapper orchidMapper) {
        this.iOrchidService = iOrchidService;
        this.orchidMapper = orchidMapper;
    }

    // GET all
    @GetMapping
    public ApiResponse<List<OrchidDTO>> getAll() {
        List<Orchid> orchids = iOrchidService.getAllOrchids();
        List<OrchidDTO> orchidDTOs = orchidMapper.toDTOList(orchids);
        return ApiResponse.success(orchidDTOs);
    }

    // GET by id
    @GetMapping("/{id}")
    public ApiResponse<OrchidDTO> getById(@PathVariable int id) {
        Orchid orchid = iOrchidService.getOrchidByID(id);
        OrchidDTO orchidDTO = orchidMapper.toDTO(orchid);
        return ApiResponse.success(orchidDTO);
    }

    // CREATE
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<OrchidDTO> create(@RequestBody OrchidDTO orchidDTO) {
        Orchid orchid = orchidMapper.toEntity(orchidDTO);
        Orchid savedOrchid = iOrchidService.insertOrchid(orchid);
        OrchidDTO savedOrchidDTO = orchidMapper.toDTO(savedOrchid);
        return ApiResponse.success(savedOrchidDTO, "Created successfully");
    }

    // UPDATE
    @PutMapping("/{id}")
    public ApiResponse<OrchidDTO> update(
            @PathVariable int id,
            @RequestBody OrchidDTO orchidDTO) {

        Orchid orchid = orchidMapper.toEntity(orchidDTO);
        Orchid updatedOrchid = iOrchidService.updateOrchid(id, orchid);
        OrchidDTO updatedOrchidDTO = orchidMapper.toDTO(updatedOrchid);
        return ApiResponse.success(updatedOrchidDTO, "Updated successfully");
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable int id) {
        iOrchidService.deleteOrchid(id);
        return ApiResponse.success("Deleted successfully");
    }
}
