## Run the System
We can easily run the whole with only a single command:
```bash
docker compose up
```

Docker will pull the MongoDB and Node.js images (if our machine does not have it before).

The services can be run on the background with command:
```bash
docker compose up -d
```

Open frontend:
```bash
localhost:8888
```

## Stop the System
Stopping all the running containers is also simple with a single command:
```bash
docker compose down
```