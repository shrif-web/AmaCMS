FROM golang:latest AS builder


RUN mkdir -p /go-app
WORKDIR /go-app

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .
RUN go build -o ./app ./src/app.go

FROM golang:latest AS starter
ENV GIN_MODE=release

RUN mkdir -p /go-app
WORKDIR /go-app
COPY --from=builder /go-app/app .

ENTRYPOINT ["./app"]