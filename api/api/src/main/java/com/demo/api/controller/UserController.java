package com.demo.api.controller;

import com.demo.api.db.entity.UserEntity;
import com.demo.api.db.repository.UserRepository;
import com.demo.api.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import org.springframework.data.domain.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @RequestMapping(value="/get-all-users")
    public Page<UserEntity> getAllUsers(Pageable pageable){

        int requestedPage = pageable.getPageNumber() -1;
        int recordPerPage = 5;

        Pageable paginationData = PageRequest.of(requestedPage, recordPerPage);

        Page<UserEntity> userEntities = userRepository.findAll(paginationData);

        return userEntities;
    }

    @RequestMapping(value="/get-users")
    public List<User> getUsers(){
        List<UserEntity> userEntities = userRepository.findAll();
        List<User> users=transformEntityIntoDto(userEntities);
        return users;
    }

    private List<User> transformEntityIntoDto(List<UserEntity> userEntities) {
        List<User> users=new ArrayList<>();
        userEntities.forEach(userEntity -> {
            User user=new User();
            user.setId(userEntity.getId());
            user.setFirstName(userEntity.getFirstName());
            user.setLastName(userEntity.getLastName());
            user.setEmailId(userEntity.getEmailId());
            user.setContactNo(userEntity.getContactNo());
            users.add(user);
        });
        return users;
    }

    @RequestMapping(value="/users/{id}")
    public UserEntity getUser(@PathVariable(value = "id") Integer id){
        return userRepository.findById(id).get();
    }


    @RequestMapping(value  = "/add-user", produces = MediaType.APPLICATION_JSON_VALUE ,method = RequestMethod.POST)

    //public UserEntity addUser(@RequestBody User userdetails){
    public List<User> addUser(@Valid @RequestBody User userdetails){

        UserEntity userEntity=new UserEntity();
        userEntity.setFirstName(userdetails.getFirstName());
        userEntity.setLastName(userdetails.getLastName());
        userEntity.setEmailId(userdetails.getEmailId());
        userEntity.setContactNo(userdetails.getContactNo());
        //return userRepository.save(userEntity);
        userRepository.save(userEntity);

        List<UserEntity> userEntities = userRepository.findAll();
        List<User> users=transformEntityIntoDto(userEntities);
        return users;
    }



    @PutMapping("/update-user/{id}")
    public UserEntity updateUser(@PathVariable(value = "id") int id,@Valid @RequestBody User userdetails){

        Optional<UserEntity> optionUserEntity= userRepository.findById(id);
        UserEntity userEntity=optionUserEntity.get();
        userEntity.setFirstName(userdetails.getFirstName());
        userEntity.setLastName(userdetails.getLastName());
        userEntity.setEmailId(userdetails.getEmailId());
        userEntity.setContactNo(userdetails.getContactNo());
        userRepository.save(userEntity);
        return userEntity;

    }

    @DeleteMapping("/delete-user/{id}")
    public List<User> deleteUser(@PathVariable(value = "id") int id){
        Optional<UserEntity> optionalUserEntity = userRepository.findById(id);
        UserEntity userEntity = optionalUserEntity.get();
        userRepository.delete(userEntity);

        List<UserEntity> userEntities = userRepository.findAll();
        List<User> users=transformEntityIntoDto(userEntities);
        return users;

    }

}
