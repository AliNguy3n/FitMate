package aptech.finalproject.security.config;

import aptech.finalproject.dto.response.ApiResponse;
import aptech.finalproject.exception.ApiException;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.security.jwt.JwtToUserAuthenticationConverter;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.spec.SecretKeySpec;
import java.util.Map;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@EnableScheduling
public class SecurityConfig {

    @Value("${jwt.signerKey}")
    private String SIGNER_KEY;

    // Danh sách route AUTH có thể truy cập không cần xác thực hoặc quyền
    private final String[] AUTH_WHITELIST = {"/auth/**"};

    // Danh sách route tạm thời ngưng truy cập
    private final String[] BLACKLIST = {};
    // Danh sách route IDENTITY được truy cập không cần xác thực hoặc quyền
    private final String[] IDENTITY_WHITELIST = {
            "/identity/user/create"
    };

    //Danh sách route public
    private final String[] PUBLIC_ENDPOINT = {};


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, ObjectMapper objectMapper) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        request -> request
                                .requestMatchers(AUTH_WHITELIST).permitAll()
                                .requestMatchers(IDENTITY_WHITELIST).permitAll()
                                .anyRequest().authenticated())
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(new JwtToUserAuthenticationConverter()))
                                .authenticationEntryPoint((request, response, authException) -> {
                                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                                    response.setContentType("application/json");
                                    ApiResponse apiResponse = ApiResponse.builder()
                                            .success(false)
                                            .code(ErrorCode.JWT_TOKEN_INVALID.getCode())
                                            .errors(Map.of("error",ErrorCode.JWT_TOKEN_INVALID.getException()))
                                            .build();
                                    response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
                                }))
        ;

        return http.build();
    }


    @Bean
    public JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(SIGNER_KEY.getBytes(), "HS512");
        return NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

}
