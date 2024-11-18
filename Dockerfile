# Build stage: Install dependencies and set up the environment
FROM php:8.2-apache AS build

# Install dependencies
RUN apt-get update && \
    apt-get install -y libzip-dev zip curl && \
    docker-php-ext-install pdo_mysql zip && \
    a2enmod rewrite && \
    rm -rf /var/lib/apt/lists/*  # Clean up APT cache to reduce image size

# Set Apache document root to Laravel's public directory
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# Copy application code into the container (from your local filesystem)
COPY ./backend /var/www/html

# Set the working directory
WORKDIR /var/www/html

# Install Composer and project dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    composer install --no-dev --optimize-autoloader

# Production stage: Apache image
FROM php:8.2-apache AS production

# Install necessary Apache modules and extensions
RUN apt-get update && \
    apt-get install -y libzip-dev zip && \
    docker-php-ext-install pdo_mysql zip && \
    a2enmod rewrite && \
    rm -rf /var/lib/apt/lists/*  # Clean up APT cache

# Set Apache document root to Laravel's public directory
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# Copy the vendor directory and other needed assets from the build stage
COPY --from=build /var/www/html /var/www/html

# Set permissions for storage and bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose Apache's port
EXPOSE 80

# Set the working directory
WORKDIR /var/www/html

# Ensure the container runs with the proper permissions
USER www-data

# Run Apache in the foreground
CMD ["apache2-foreground"]
