package backend.api.oauth2;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.u2ware.common.oauth2.webmvc.AuthenticationContext;


@BasePathAwareController
@RestController
public class OAuth2Endpoints {
    
    protected Log logger = LogFactory.getLog(getClass());

    protected @Autowired ObjectMapper objectMapper;

    @GetMapping(value = "/oauth2/userinfo")
    public @ResponseBody ResponseEntity<Object> oauth2UserInfo(Authentication authentication) {

        logger.info("oauth2UserInfo : "+authentication);
        try {
            Jwt jwt = AuthenticationContext.authenticationToken(authentication);

            Collection<GrantedAuthority> securityAuthorities = AuthenticationContext.authorities(authentication);
            logger.info("securityAuthorities : "+securityAuthorities);

            Collection<GrantedAuthority> jwtAuthorities = AuthenticationContext.authorities(jwt);
            logger.info("jwtAuthorities : "+jwtAuthorities);

            Set<String> responseAuthorities = new HashSet<>();
            if(securityAuthorities != null) {
                responseAuthorities.addAll(securityAuthorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet()));
            }
            if(jwtAuthorities != null) {
                responseAuthorities.addAll(jwtAuthorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet()));
            }
            logger.info("responseAuthorities : "+responseAuthorities);

            Map<String,Object> claims = jwt.getClaims();
            Map<String,Object> responseClaims = new HashMap<>(claims);
            responseClaims.put("authorities", responseAuthorities);

            @SuppressWarnings("unchecked")
            Map<String,Object> responseJwt = objectMapper.convertValue(jwt, Map.class);
            responseJwt.put("claims", responseClaims);

            return ResponseEntity.ok(responseJwt);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(e.getMessage());
        }
    }
}
