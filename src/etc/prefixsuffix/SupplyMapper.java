package com.example.mapper;

import com.example.model.ColumnFilter;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

@Mapper
public interface SupplyMapper {
    
    List<Map<String, Object>> selectSupplyData(
        @Param("filter") ColumnFilter filter, 
        @Param("id") Long id
    );
}