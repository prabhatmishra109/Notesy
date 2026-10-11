



package com.notesy.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	    http
	        .cors(cors -> {})
	        .csrf(csrf -> csrf.disable())

	        .authorizeHttpRequests(auth -> auth

	            // ✅ PUBLIC ROUTES
	            .requestMatchers(
	                "/",
	                "/addContact",
	                "/fetchFeedback",
	                "/error",
	                "/admin/login",
	                "/user/**",
	                "/oauth2/**",
	                "/login/**"
	            ).permitAll()

	            // ❌ ADMIN PROTECTED (optional later)
	            .requestMatchers("/admin/**").permitAll()

	            .anyRequest().authenticated()
	        )

	        // ✅ ONLY USER GOOGLE LOGIN
	        .oauth2Login(oauth -> oauth
	            .successHandler((request, response, authentication) -> {

	                OAuth2User user = (OAuth2User) authentication.getPrincipal();
	                String email = user.getAttribute("email");

	                response.sendRedirect(
	                    "http://localhost:5173/userdashboard?email=" + email
	                );
	            })
	        );

	    return http.build();
	}

    

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}

