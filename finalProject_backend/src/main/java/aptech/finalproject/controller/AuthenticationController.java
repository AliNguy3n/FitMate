package aptech.finalproject.controller;

import aptech.finalproject.dto.request.AuthenticationRequest;
import aptech.finalproject.dto.request.IntrospectRequest;
import aptech.finalproject.dto.response.ApiResponse;
import aptech.finalproject.dto.response.AuthenticationResponse;
import aptech.finalproject.dto.response.IntrospectResponse;
import aptech.finalproject.service.AuthenticationService;
import aptech.finalproject.service.UserService;
import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        return ApiResponse.ok(authenticationService.authenticated(request));
    }

    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> login(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        return ApiResponse.ok(authenticationService.introspect(request));
    }
}
