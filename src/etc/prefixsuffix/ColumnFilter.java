package com.example.model;

import lombok.Data; // Lombok 사용 가정

@Data // Getter, Setter 자동 생성
public class ColumnFilter {
    
    // MyBatis XML의 test="필드명 == true" 와 매핑되는 boolean 필드
    private boolean supplyId;
    private boolean supplyDate;
    private boolean supplierName;
    private boolean productName;
    private boolean specModel;
    private boolean supplyQty;
    private boolean unitPrice;
    private boolean supplyAmount;
    private boolean vat;
}