package com.krishna.service;

import com.krishna.modal.Invitation;
import jakarta.mail.MessagingException;

public interface InvitaionService {

    public void sendInvitation(String email, Long projectId) throws MessagingException;
    public Invitation acceptInvitation(String token, Long userId) throws Exception;

    public String getTokenByUserMail(String userEmail);

    void deleteToken(String token);
}
