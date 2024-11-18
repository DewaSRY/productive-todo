# Stage 1: Builder
FROM composer:2.7 AS composer

WORKDIR /app

# Copy composer files and install dependencies
COPY composer.json composer.lock /app/
RUN composer install --no-dev --no-scripts --prefer-dist --no-progress --optimize-autoloader

# Copy the rest of the application
COPY . /app

# Generate optimized autoload files
RUN composer dump-autoload --optimize

# Stage 2: Application
FROM php:8.2-fpm

# Install required PHP extensions and dependencies
RUN apt-get update && apt-get install -y \
    zip unzip curl libpng-dev libjpeg-dev libfreetype6-dev libonig-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring gd

# Set working directory
WORKDIR /var/www

# Copy files from the builder stage
COPY --from=composer /app /var/www

# Set permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Expose the default port
EXPOSE 9000

CMD ["php-fpm"]
