package main

import (
    "fmt"
    "log"
    "net/http"
    
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    
    r.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "VipChatBot API is running! 🚀",
            "version": "1.0.0",
            "developer": "Vip (Phatra Wongsapsakul)",
        })
    })
    
    port := ":8080"
    fmt.Printf("🚀 VipChatBot API starting on http://localhost%s\n", port)
    log.Fatal(r.Run(port))
}
