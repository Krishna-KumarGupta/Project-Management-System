package com.krishna.repository;

import com.krishna.modal.Project;
import com.krishna.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByNameContainingAndTeamContains(String partialName, User user);

    List<Project> findByTeamContainingOrOwner(User user, User owner);
}
