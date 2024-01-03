# books-to-read

## Steps to Run the Program Locally:

### 1. Allow Docker to access files in the working environment

- Download the repository locally.
- Click on the settings button on the top-right corner.
- Click "Resrouces".
- Click "File sharing".
- Click the "+" button and add the directory to the api/src folder.

### 2. Build the API docker image:

```bash
docker build -t books-to-read-api .
```

### 3. Run the API image:

```bash
docker run -v /Users/kylee/Documents/Code/books-to-read/api/src:/src -p 8000:8000 books-to-read-api
```

```bash
docker run -v D:\Users\Heather\Documents\Kylee\books-to-read\api\src:/src -p 8000:8000 books-to-read-api
```

#### What the API Docker container executes:

- Activates Poetry environment in api/src folder

  ```bash
  poetry shell
  ```

- Adds uvicorn to Poetry environment

  ```bash
  poetry add uvicorn
  ```

- Starts FastAPI

  ```bash
  uvicorn src.main:app
  ```

### 4. Build the UI docker image:

```bash
docker build -t books-to-read-ui .
```

### 5. Run the UI image:

```bash
docker run -p 3000:3000 books-to-read-ui
```
