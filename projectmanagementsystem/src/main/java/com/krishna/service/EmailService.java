package com.krishna.service;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmailWithToken(String userEmail, String token) throws MessagingException;

}
