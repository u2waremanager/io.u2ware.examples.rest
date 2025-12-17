package backend;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.IntStream;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.Jwt;

import com.nimbusds.jose.jwk.RSAKey;

import io.u2ware.common.oauth2.crypto.CryptoKeyFiles;
import io.u2ware.common.oauth2.crypto.JoseKeyEncryptor;
import io.u2ware.common.oauth2.crypto.JoseKeyGenerator;

@Configuration
public class ApplicationSecurityTestConfig {
    


    @Bean
    public RSAKey joseRsaKey(){

        RSAKey key = JoseKeyGenerator.generateRsa();

        Path p1 = Path.of("target/public.pem");
        Path p2 = Path.of("target/private.pem");
        Path p3 = Path.of("target/tokens.txt");


        try {
            CryptoKeyFiles.writeRSAPublicKey(p1, key.toKeyPair());
            CryptoKeyFiles.writeRSAPrivateKey(p2, key.toKeyPair());

            StringBuilder b = new StringBuilder();
            IntStream.range(1, 6).forEach(i->{

                String name = "user"+i;

                Jwt jwt = JoseKeyEncryptor.encrypt(key, claims->{
                    claims.put("sub", name);
                    claims.put("email", name);
                    claims.put("name", name);
                });
                b.append(name);
                b.append("=\n");
                b.append(jwt.getTokenValue());
                b.append("\n");                
            });
            Files.writeString(p3, b);

            System.err.println(Files.readString(p1));
            System.err.println(Files.readString(p2));
            System.err.println(Files.readString(p3));

        } catch (Exception e) {
            // e.printStackTrace();
        }


        return key;
    }

}
