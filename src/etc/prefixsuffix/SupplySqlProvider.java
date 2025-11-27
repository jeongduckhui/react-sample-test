package com.example.provider;

import com.example.model.ColumnFilter;
import com.example.model.SupplyColumn;
import org.apache.ibatis.jdbc.SQL;
import java.util.Map;

public class SupplySqlProvider {

    /**
     * XML의 <trim prefix="'" suffix="'" suffixOverrides=","> 로직을 구현합니다.
     * @return 'COL1, COL2, COL3' 형태의 문자열을 작은따옴표로 감싼 형태 ('COL1, COL2, COL3')
     */
    public String getDynamicSupplyColumns(Map<String, Object> params) {
        
        ColumnFilter filter = (ColumnFilter) params.get("filter");
        
        if (filter == null) {
            // 필터가 없으면 '*'를 반환하고, 여기에 prefix/suffix를 추가
            return "'*'";
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
                SELECT(SupplyColumn.SUPPLY_QUANTITY.getColumnName());
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
        
        // "SELECT COL1, COL2, ..." 에서 "SELECT " (7글자)를 제거
        if (columns.startsWith("SELECT ")) {
            String columnList = columns.substring(7);
            
            // 요청된 XML 구문의 핵심: prefix="'" 와 suffix="'" 추가
            return "'" + columnList + "'"; 
        }
        
        // 선택된 컬럼이 없으면 빈 문자열 리스트로 처리 (요구사항에 따라 변경 가능)
        return "''"; // 빈 컬럼 리스트를 문자열로
    }
}