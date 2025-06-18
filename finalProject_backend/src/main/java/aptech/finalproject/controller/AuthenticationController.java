package aptech.finalproject.controller;

import aptech.finalproject.dto.request.AuthenticationRequest;
import aptech.finalproject.dto.request.IntrospectRequest;
import aptech.finalproject.dto.request.ResetPasswordRequest;
import aptech.finalproject.dto.response.ApiResponse;
import aptech.finalproject.dto.response.AuthenticationResponse;
import aptech.finalproject.dto.response.IntrospectResponse;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.service.AuthenticationService;
import aptech.finalproject.service.PasswordResetTokenService;
import aptech.finalproject.service.UserService;
import com.nimbusds.jose.JOSEException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;


    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest request,
            @RequestHeader("X-Device-Type") String deviceType,
            HttpServletRequest httpRequest) throws JOSEException, ParseException {
        return ApiResponse.ok(authenticationService.authenticated(request, deviceType, httpRequest));
    }

    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> introspectToken(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        return ApiResponse.ok(authenticationService.introspect(request));
    }

    @PostMapping("/logout")
    public ApiResponse<?> logout(@RequestBody String token) throws ParseException, JOSEException {
        authenticationService.logout(token);
        return ApiResponse.ok();
    }

    @PostMapping("/refresh-token")
    public ApiResponse<?> refreshToken(@RequestParam String refreshToken) {
        return ApiResponse.ok(authenticationService.refreshAccessToken(refreshToken));
    }

    @PostMapping("/forgot-password")
    public ApiResponse<?> forgotPassword(@RequestParam String email)  {
        passwordResetTokenService.sendResetPasswordLink(email);
        return ApiResponse.ok();
    }

    @PostMapping("/reset-password")
    public ApiResponse<?> resetPassword(@RequestBody ResetPasswordRequest request)  {
        passwordResetTokenService.resetPassword(request);
        return ApiResponse.ok();
    }

}
