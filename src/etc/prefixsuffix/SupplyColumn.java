package com.example.model;

public enum SupplyColumn {
    
    // 파라미터명은 ColumnFilter의 필드명과 일치해야 합니다.
    SUPPLY_ID("supplyId", "SUPPLY_ID"),
    SUPPLY_DATE("supplyDate", "SUPPLY_DATE"),
    SUPPLIER_NAME("supplierName", "SUPPLIER_NAME"),
    PRODUCT_NAME("productName", "PRODUCT_NAME"),
    SPEC_MODEL("specModel", "SPECIFICATION_MODEL"),
    SUPPLY_QTY("supplyQty", "SUPPLY_QUANTITY"),
    UNIT_PRICE("unitPrice", "UNIT_PRICE"),
    SUPPLY_AMOUNT("supplyAmount", "SUPPLY_AMOUNT"),
    VAT("vat", "VAT");

    private final String paramName;
    private final String columnName;

    SupplyColumn(String paramName, String columnName) {
        this.paramName = paramName;
        this.columnName = columnName;
    }

    public String getColumnName() {
        return columnName;
    }
}