package com.example.lab5.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    INVALID_REQUEST(1001, "Invalid request", HttpStatus.BAD_REQUEST),
    ORCHID_NOT_FOUND(1002, "Orchid not found", HttpStatus.NOT_FOUND),
    CATEGORY_NOT_FOUND(1003, "category not found", HttpStatus.NOT_FOUND),
    UNEXPECTED_EXCEPTION(9999, "undefined exception", HttpStatus.INTERNAL_SERVER_ERROR);

    private int code;
    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}