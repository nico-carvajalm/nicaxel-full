# Imagen base con Java 17
FROM eclipse-temurin:17-jdk

# Crear carpeta dentro del contenedor
WORKDIR /app

# Copiar todo el microservicio al contenedor
COPY . .

# Compilar el proyecto con Maven (usa el mvnw incluido)
RUN ./mvnw clean package -DskipTests

# Ejecutar el archivo .jar que se genera en target/
CMD ["java", "-jar", "target/product-0.0.1-SNAPSHOT.jar"]
