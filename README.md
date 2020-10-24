# GitFetch

GitFetch is GitOps solution which can keep logs of your git repository.

## How To

### Run

```
yarn install
yarn server
```

### Add repository

You can set the time in minutes.

```
curl --location --request POST 'http://localhost:8088/api/git/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "repo": "https://github.com/username/reponame",
    "time": 3
}'
```

### Get server status

```
curl --location --request GET 'http://localhost:8088/api/git/status'
```

### Get repository list

```
curl --location --request GET 'http://localhost:8088/api/git/list'
```

### Get repository log

```
curl --location --request GET 'http://localhost:8088/api/git/repo/reponame'
```
