package aptech.finalproject.service;

import aptech.finalproject.dto.request.AuthenticationRequest;
import aptech.finalproject.dto.request.IntrospectRequest;
import aptech.finalproject.dto.response.AuthenticationResponse;
import aptech.finalproject.dto.response.IntrospectResponse;
import com.nimbusds.jose.JOSEException;
import org.springframework.stereotype.Service;

import java.text.ParseException;


public interface AuthenticationService {
    AuthenticationResponse authenticated(AuthenticationRequest request);

    IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException;
}
