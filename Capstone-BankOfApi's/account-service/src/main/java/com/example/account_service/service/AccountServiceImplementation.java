package com.example.account_service.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.account_service.entity.Account;
import com.example.account_service.repository.AccountRepository;
@Service
public class AccountServiceImplementation implements AccountService {
	
	@Autowired
	private AccountRepository accountRepository;
	
	
	 @Override
	    public Account createAccount(Account account) {
	        return accountRepository.save(account);
	    }

	    @Override
	    public Account updateAccount(Long accountId, Account account) {
	        Optional<Account> existingAccount = accountRepository.findById(accountId);
	        if (existingAccount.isPresent()) {
	            Account acc = existingAccount.get();
	            acc.setAccountType(account.getAccountType());
	            acc.setAccountBalance(account.getAccountBalance());
	            acc.setUserId(account.getUserId());
	            acc.setSecretPassword(account.getSecretPassword());
	            return accountRepository.save(acc);
	        } else {
	            return null; 
	        }
	    }

	    @Override
	    public void deleteAccount(Long accountId) {
	        accountRepository.deleteById(accountId);
	    }

	    @Override
	    public List<Account> getAllAccountsByUser() {
	        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	        System.out.println("Principal from SecurityContext: " + principal);
	        Long userId = (Long) principal;
	        System.out.println("UserId extracted: " + userId);
	        return accountRepository.findByUserId(userId);
	    }
	    
	    @Override
	    public Account getAccountById(Long accountId) {
	        return accountRepository.findById(accountId).orElse(null);
	    }

}
