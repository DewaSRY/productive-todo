# Stage 1: Dependencies
FROM composer:lts as deps

WORKDIR /app

# Install dependencies using cached composer downloads for efficiency
RUN --mount=type=bind,source=composer.json,target=/app/composer.json \
    --mount=type=bind,source=composer.lock,target=/app/composer.lock \
    --mount=type=cache,target=/tmp/cache \
    composer install --no-dev --no-interaction --optimize-autoloader

# Stage 2: Final image
FROM php:8.2-apache as final

# Use production PHP configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Copy application files and dependencies
COPY --from=deps /app/vendor /var/www/html/vendor
COPY ./app/Models /var/www/html/Models

# Set permissions for the Apache user
RUN chown -R www-data:www-data /var/www/html

# Switch to non-root user for better security
USER www-data
