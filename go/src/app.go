package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		log.Print("Running Ping")
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	log.Printf("Server is starting...")
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
