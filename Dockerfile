# Python image
FROM python:3.10-slim

# Set working directory in container
WORKDIR /app

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app/

# Expose a port
EXPOSE 4000

# Run app through gunicorn
# --reload: reloads the app when code changes(only use in development)
# -w: number of workers
# --bind: bind to host:port
# app:app: module:variable
CMD ["gunicorn","--reload", "-w", "4","--bind", "0.0.0.0:4000", "app:app"] 
