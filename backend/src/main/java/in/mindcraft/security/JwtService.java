package in.mindcraft.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {
    private static final String SECRET="EmployeeManagementSystemJwtSecretKeyForDevelopmentOnly123456789";
    private final SecretKey key=Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    public String generateToken(UserDetails user){
        String role=user.getAuthorities().iterator().next().getAuthority();
        return Jwts.builder().subject(user.getUsername()).claim("role",role).issuedAt(new Date())
          .expiration(new Date(System.currentTimeMillis()+1000L*60*60)).signWith(key).compact();
    }
    public String extractUsername(String token){return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject();}
    public boolean isValid(String token,UserDetails user){
        try { Claims c=Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload(); return c.getSubject().equals(user.getUsername()) && c.getExpiration().after(new Date()); }
        catch(Exception e){return false;}
    }
}
