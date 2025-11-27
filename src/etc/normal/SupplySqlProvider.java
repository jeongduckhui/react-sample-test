package com.example.provider;

import com.example.model.ColumnFilter;
import com.example.model.SupplyColumn;
import org.apache.ibatis.jdbc.SQL;
import java.util.Map;

public class SupplySqlProvider {

    /**
     * ColumnFilter에 설정된 값에 따라 'COL1, COL2, COL3' 형태의 문자열을 반환합니다.
     */
    public String getDynamicSupplyColumns(Map<String, Object> params) {
        
        // @Param("filter")로 전달된 ColumnFilter 객체를 가져옵니다.
        ColumnFilter filter = (ColumnFilter) params.get("filter");
        
        if (filter == null) {
            // 필터가 없으면 전체 컬럼을 조회하도록 '*' 반환
            return "*"; 
        }
        
        // SQL Builder를 사용하여 SELECT 절 구성
        String columns = new SQL() {{
            if (filter.isSupplyId()) {
                SELECT(SupplyColumn.SUPPLY_ID.getColumnName());
            }
            if (filter.isSupplyDate()) {
                SELECT(SupplyColumn.SUPPLY_DATE.getColumnName());
            }
            if (filter.isSupplierName()) {
                SELECT(SupplyColumn.SUPPLIER_NAME.getColumnName());
            }
            if (filter.isProductName()) {
                SELECT(SupplyColumn.PRODUCT_NAME.getColumnName());
            }
            if (filter.isSpecModel()) {
                SELECT(SupplyColumn.SPEC_MODEL.getColumnName());
            }
            if (filter.isSupplyQty()) {
                SELECT(SupplyColumn.SUPPLY_QTY.getColumnName());
            }
            if (filter.isUnitPrice()) {
                SELECT(SupplyColumn.UNIT_PRICE.getColumnName());
            }
            if (filter.isSupplyAmount()) {
                SELECT(SupplyColumn.SUPPLY_AMOUNT.getColumnName());
            }
            if (filter.isVat()) {
                SELECT(SupplyColumn.VAT.getColumnName());
            }
        }}.toString();
        
        // "SELECT COL1, COL2, ..." 에서 "SELECT " (7글자)를 제거하고 반환합니다.
        if (columns.startsWith("SELECT ")) {
            return columns.substring(7);
        }
        
        // 선택된 컬럼이 없으면 '*' 반환
        return "*";
    }
}