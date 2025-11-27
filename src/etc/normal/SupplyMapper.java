package com.example.mapper;

import com.example.model.ColumnFilter;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

@Mapper
public interface SupplyMapper {
    
    /**
     * 동적 컬럼 목록을 포함하여 공급 데이터를 조회합니다.
     */
    List<Map<String, Object>> selectSupplyData(
        @Param("filter") ColumnFilter filter, 
        @Param("id") Long id
    );
}