FROM python:3.9-slim

# Install minimal system dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements from current directory (backend/)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Playwright and let it handle ALL system dependencies automatically
RUN playwright install chromium
RUN playwright install-deps chromium

# Copy everything from current directory (backend/)
COPY . .

# Expose port
EXPOSE 8001

# Command to run the app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
