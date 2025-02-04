FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy requirements file
COPY ./requirements.txt ./app.py /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the Flask port
EXPOSE 5050

# Set environment variables
ENV FLASK_ENV=development

# Command to run the application
CMD ["python", "app.py"]
