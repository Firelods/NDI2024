# Étape : Serveur Nginx pour servir l'application Angular
FROM nginx:alpine
LABEL maintainer="contact@clement-lefevre.fr"

# Supprimer les fichiers de configuration par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers Angular construits dans le conteneur
COPY dist/ndi2024/browser /usr/share/nginx/html

# Copier le fichier de configuration Nginx si nécessaire
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Commande de démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]
