package com.krishna.service;

import com.krishna.modal.Issue;
import com.krishna.modal.User;
import com.krishna.request.IssueRequest;
import java.util.List;

public interface IssueService {

    Issue getIssueById(Long issueId)throws Exception;

    List<Issue> getIssueByProjectId(Long projectId) throws Exception;

    Issue createIssue(IssueRequest issueRequest, User user) throws Exception;

    void deleteIssue(Long issueId, Long userid) throws Exception;

    Issue addUserToIssue(Long issueId, Long userId) throws Exception;

    Issue updateStatus(Long issueId, String userid) throws Exception;

}