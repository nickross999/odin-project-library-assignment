FROM ubuntu:latest
LABEL application="Library"
RUN apt-get update && apt-get install -y apache2
COPY index.html /var/www/html/
COPY scripts.js /var/www/html/
COPY styles.css /var/www/html/
COPY *.svg /var/www/html/
ENTRYPOINT ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
EXPOSE 80