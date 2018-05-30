FROM nginx:1.14.0-alpine

# Remueve pagina por default de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia el publicado generado a la ruta de nginx
COPY /dist /usr/share/nginx/html

# Copia configuración nginx para angular apps
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Inicia servidor nginx
CMD ["nginx", "-g", "daemon off;"]