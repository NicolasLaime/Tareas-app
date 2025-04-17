package com.tareas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173", "https://tareas-app-nu.vercel.app")  // Permite estos orígenes
                        .allowedMethods("GET", "POST", "PUT", "DELETE")  // Permite estos métodos
                        .allowCredentials(true)  // Permite el envío de credenciales (cookies, headers personalizados)
                        .allowedHeaders("*")  // Permite cualquier encabezado
                        .exposedHeaders("Authorization")  // Expone encabezados específicos como "Authorization" (si es necesario)
                        .maxAge(3600);  // Cachea las respuestas CORS durante 1 hora
            }
        };
    }
}
