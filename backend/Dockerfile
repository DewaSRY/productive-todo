# Stage 1: Build application
FROM composer:2.7 as builder

WORKDIR /app

# Copy application files
COPY . /app

# Install dependencies and optimize autoloader
RUN composer install --no-dev --optimize-autoloader

# Stage 2: Production runtime
FROM php:8.2-fpm

# Install required PHP extensions and dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    zip unzip curl libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /var/www

# Copy built application from builder stage
COPY --from=builder /app /var/www

# Set permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Copy Nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose HTTP port
EXPOSE 80

# Start PHP-FPM and Nginx
CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;'"]
