package com.example.account_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Account {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long accountId;
	    private String accountType;
	    private Double accountBalance;
	    private Long userId; 
	    private String secretPassword;
		public Long getAccountId() {
			return accountId;
		}
		public void setAccountId(Long accountId) {
			this.accountId = accountId;
		}
		public String getAccountType() {
			return accountType;
		}
		public void setAccountType(String accountType) {
			this.accountType = accountType;
		}
		public Double getAccountBalance() {
			return accountBalance;
		}
		public void setAccountBalance(Double accountBalance) {
			this.accountBalance = accountBalance;
		}
		public Long getUserId() {
			return userId;
		}
		public void setUserId(Long userId) {
			this.userId = userId;
		}
		public String getSecretPassword() {
			return secretPassword;
		}
		public void setSecretPassword(String secretPassword) {
			this.secretPassword = secretPassword;
		}
		    
	
}
