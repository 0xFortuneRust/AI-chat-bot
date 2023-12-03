# books-to-read

## Steps to Run Locally:

### 1. Allow Docker access files in working environment

- Download the repository locally.
- Click on the settings button on the top-right corner.
- Click "Resrouces".
- Click "File sharing".
- Click the "+" button and add the directory to the api/src folder.

### 2. Build the docker image:

```bash
docker build -t books-to-read-api .
```

### 3. Run the image:

```bash
docker run -v /Users/kylee/Documents/Code/books-to-read/api/src:/src -p 8000:8000 books-to-read-api
```
