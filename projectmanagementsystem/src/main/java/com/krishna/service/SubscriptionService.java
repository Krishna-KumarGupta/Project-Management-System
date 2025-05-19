package com.krishna.service;

import com.krishna.modal.PlanType;
import com.krishna.modal.Subscription;
import com.krishna.modal.User;

public interface SubscriptionService {

    Subscription createSubscription(User user);

    Subscription getUsersSubscription(Long userId);

    Subscription upgradeSubscription(Long userId, PlanType planType);

    boolean isValid(Subscription subscription);
}
