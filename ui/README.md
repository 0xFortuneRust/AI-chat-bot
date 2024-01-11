# books-to-read UI

## Steps to Run the Program Locally:

### 1. Build the UI docker image:

```bash
docker build -t books-to-read-ui .
```

### 2. Run the UI image:

```bash
docker run -p 3000:3000 books-to-read-ui
```

#### What the UI Docker container executes:

```bash
npm run dev
```
