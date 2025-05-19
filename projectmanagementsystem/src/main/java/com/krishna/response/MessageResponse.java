package com.krishna.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MessageResponse {
    public MessageResponse(String message) {
        this.message = message;
    }

    private String message;
}
