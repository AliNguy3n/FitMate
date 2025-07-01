package aptech.finalproject.security.jwt;

import aptech.finalproject.model.CustomUserPrincipal;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class JwtToUserAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        String userId = jwt.getSubject();
        String preferred_username = jwt.getClaimAsString("preferred_username");

        List<String> authorities;

        Object rawAuthorities = jwt.getClaims().get("authorities");
        if (rawAuthorities instanceof String) {
            authorities = Arrays.asList(((String) rawAuthorities).split("\\s+"));
        } else if (rawAuthorities instanceof Collection<?>) {
            authorities = ((Collection<?>) rawAuthorities).stream()
                    .map(Object::toString)
                    .collect(Collectors.toList());
        } else {
            authorities = new ArrayList<>();
        }

        Collection<SimpleGrantedAuthority> grantedAuthorities = authorities.stream()
                .map(String::trim)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        CustomUserPrincipal principal = new CustomUserPrincipal(userId, preferred_username);
        return new UsernamePasswordAuthenticationToken(principal, null, grantedAuthorities);
    }
}
