FROM gradle:7.2.0-jdk17 AS stage1
WORKDIR /opt/app
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew dependencies --no-daemon
RUN ./gradlew clean build -x test --no-daemon

FROM eclipse-temurin:17-jre-alpine
WORKDIR /opt/app
COPY --from=stage1 /opt/app/build/libs/*.jar /opt/app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/opt/app/app.jar"]
