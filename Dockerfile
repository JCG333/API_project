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

# Run Flask
CMD ["flask", "run", "--host=0.0.0.0", "--port=4000"]
