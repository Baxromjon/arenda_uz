package io.fl.water_delivery.controller;

import io.fl.water_delivery.entity.User;
import io.fl.water_delivery.payload.*;
import io.fl.water_delivery.projection.UserProjection;
import io.fl.water_delivery.security.CurrentUser;
import io.fl.water_delivery.service.UserService;
import io.fl.water_delivery.utils.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * created by Baxromjon
 * 11.04.2022
 **/

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/me")
    public HttpEntity<?> getUser(@CurrentUser User user) {
        return ResponseEntity.ok(new ApiResponce(true, "Success", user));
    }

    @GetMapping("/allUser")
    public ResPagination getAllUser(@RequestParam(defaultValue = "") String search, @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                    @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return userService.getAllUsers(search, page, size);
    }

    @GetMapping("/getTotalPrice/{id}")
    public double getTotalPrice(@PathVariable UUID id){
        return userService.getTotalPrice(id);
    }

    @PostMapping("/saveUser")
    public HttpEntity<?> addUser(@RequestBody UserDTO userDTO) {
        ApiResponce apiResponce = userService.addUser(userDTO);
        return ResponseEntity.status(apiResponce.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponce);
    }

    @PutMapping("/edit/{id}")
    public HttpEntity<?> editUser(@PathVariable UUID id, @RequestBody UserDTO userDTO) {
        ApiResponce edit = userService.edit(id, userDTO);
        return ResponseEntity.status(edit.isSuccess() ? HttpStatus.OK : HttpStatus.CONFLICT).body(edit);
    }

    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> delete(@PathVariable UUID id) {
        ApiResponce delete = userService.delete(id);
        return ResponseEntity.status(delete.isSuccess() ? HttpStatus.OK : HttpStatus.CONFLICT).body(delete);
    }

    @PutMapping("/editAdmin/{id}")
    public HttpEntity<?> editAdmin(@CurrentUser User user, @RequestBody AdminDTO adminDTO) {
        ApiResponce apiResponce = userService.editAdmin(user, adminDTO);
        return ResponseEntity.status(apiResponce.isSuccess() ? HttpStatus.OK : HttpStatus.CONFLICT).body(apiResponce);
    }

    @PutMapping("/editPassword/{id}")
    public HttpEntity<?> editPassword(@CurrentUser User user, @RequestBody PasswordDTO passwordDTO) {
        ApiResponce apiResponce = userService.editPassword(user, passwordDTO);
        return ResponseEntity.status(apiResponce.isSuccess() ? HttpStatus.OK : HttpStatus.CONFLICT).body(apiResponce);
    }
}
