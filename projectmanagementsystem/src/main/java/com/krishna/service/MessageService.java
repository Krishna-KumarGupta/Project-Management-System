package com.krishna.service;

import com.krishna.modal.Message;

import java.util.List;

public interface MessageService {

    Message sendMessage(Long issueId, Long projectId, String content)throws Exception;

    List<Message> getMessagesByProjectId(Long projectId) throws Exception;
}
