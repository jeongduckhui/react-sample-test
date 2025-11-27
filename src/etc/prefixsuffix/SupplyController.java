package com.example.controller;

import com.example.service.SupplyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/supply")
public class SupplyController {

    private final SupplyService supplyService;

    public SupplyController(SupplyService supplyService) {
        this.supplyService = supplyService;
    }

    /**
     * POST /api/supply/data
     * 요청 JSON 예시: { "columns": ["supplyId", "supplyDate", "productName"], "id": 100 }
     */
    @PostMapping("/data")
    public ResponseEntity<List<Map<String, Object>>> getSupplyData(
            @RequestBody Map<String, Object> params) {
        
        // Controller는 요청을 Map으로 받아 Service로 전달
        List<Map<String, Object>> result = supplyService.getSupplyDataFromMap(params);
        return ResponseEntity.ok(result);
    }
}