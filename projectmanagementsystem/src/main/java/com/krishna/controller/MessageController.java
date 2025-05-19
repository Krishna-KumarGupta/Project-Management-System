package com.krishna.controller;

import com.krishna.modal.Chat;
import com.krishna.modal.Message;
import com.krishna.modal.User;
import com.krishna.request.CreateMessageRequest;
import com.krishna.service.MessageService;
import com.krishna.service.ProjectService;
import com.krishna.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody CreateMessageRequest request) throws Exception{

        User user = userService.findUserById(request.getSenderId());
        if(user==null) throw new Exception("User not found with id: "+request.getSenderId());

        Chat chats = projectService.getProjectById(request.getProjectId()).getChat(); // This method should throw ChatException if the Chat is not found

        if(chats==null) throw new Exception("Chat not found with id: "+request.getProjectId());

        Message sentMessage = messageService.sendMessage(request.getSenderId(),
                request.getProjectId(), request.getContent());
        return ResponseEntity.ok(sentMessage);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessageByChatId(@PathVariable Long projectId) throws Exception{
        List<Message> messages = messageService.getMessagesByProjectId(projectId);
        return ResponseEntity.ok(messages);
    }
}