package com.demo.api.db.entity;

import javax.persistence.*;

@Entity
@Table(name="Users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int id;

    @Column(name="firstName")
    public String firstName;

    @Column(name = "lastName")
    public String lastName;

    @Column(name = "emailId")
    public String emailId;

    @Column(name = "contactNo")
    public String contactNo;

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
