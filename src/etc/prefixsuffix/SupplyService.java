package com.example.service;

import com.example.mapper.SupplyMapper;
import com.example.model.ColumnFilter;
import org.springframework.stereotype.Service;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Collection;

@Service
public class SupplyService {

    private final SupplyMapper supplyMapper;

    public SupplyService(SupplyMapper supplyMapper) {
        this.supplyMapper = supplyMapper;
    }

    public List<Map<String, Object>> getSupplyDataFromMap(Map<String, Object> params) {
        
        // 1. Map에서 필요한 데이터 추출 및 검증
        Object columnsObj = params.get("columns");
        Long targetId = ((Number) params.get("id")).longValue();
        
        if (columnsObj == null || !(columnsObj instanceof Collection)) {
             throw new IllegalArgumentException("요청 파라미터에 유효한 'columns' 배열이 필요합니다.");
        }
        
        @SuppressWarnings("unchecked")
        List<String> requestedColumns = ((Collection<String>) columnsObj).stream()
                                            .filter(s -> s != null)
                                            .toList();
        
        // 2. ColumnFilter 동적 생성
        ColumnFilter filter = createColumnFilter(requestedColumns);

        // 3. Mapper 호출
        return supplyMapper.selectSupplyData(filter, targetId);
    }
    
    /** Reflection을 사용하여 ColumnFilter 객체의 필드를 동적으로 설정 */
    private ColumnFilter createColumnFilter(List<String> requestedColumns) {
        ColumnFilter filter = new ColumnFilter();
        
        for (String colName : requestedColumns) {
            try {
                // 문자열 컬럼명과 일치하는 필드를 찾아 true로 설정
                Field field = ColumnFilter.class.getDeclaredField(colName);
                field.setAccessible(true); 
                field.set(filter, true);
                
            } catch (NoSuchFieldException e) {
                System.err.println("경고: 무시된 유효하지 않은 컬럼명: " + colName);
            } catch (Exception e) {
                throw new RuntimeException("컬럼 필터 설정 중 오류 발생: " + colName, e);
            }
        }
        return filter;
    }
}