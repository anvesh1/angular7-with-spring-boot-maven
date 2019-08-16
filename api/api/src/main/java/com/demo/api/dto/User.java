package com.demo.api.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class User {

    public int id;

    @NotEmpty(message = "First name is required.")
    public String  firstName;

    @NotEmpty(message = "Second name is required.")
    public String  lastName;

    @Email(message = "Please provide valid email id.")
    public String  emailId;

    @Size(min = 10, max = 10, message
            = "Contact no. must be 10 digit long.")
    public String  contactNo;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }
}
