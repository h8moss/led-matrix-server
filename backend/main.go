package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"syscall"
)

type Config struct {
	LedMatrixPath string
	FifoPath      string
	Backendport   int
}

func main() {
	fmt.Println("Reading config...")
	content, err := os.ReadFile("../config.json")
	if err != nil {
		panic(err)
	}

	fmt.Println("Unpacking config...")
	var config Config
	err = json.Unmarshal(content, &config)
	if err != nil {
		panic(err)
	}

	fmt.Println("---Config found! starting server---")

	fmt.Println("Creating communication pipe...")
	os.Remove(config.FifoPath)
	err = syscall.Mknod(config.FifoPath, syscall.S_IFIFO|0666, 0)
	if err != nil {
		panic(err)
	}
	fmt.Println("Starting led matrix manager")
	matrixManagerPath := config.LedMatrixPath + "/led-matrix-manager"
	cmd := exec.Command("sudo", matrixManagerPath, config.FifoPath)
	err = cmd.Start()
	if err != nil {
		panic(err)
	}

	fmt.Println("Opening communication pipe")
	f, err := os.OpenFile(config.FifoPath, os.O_WRONLY, 0666)

	if err != nil {
		panic(err)
	}

	http.HandleFunc("/set/", func(w http.ResponseWriter, r *http.Request) {
		var slug string
		if strings.HasPrefix(r.URL.Path, "/set/") {
			slug = r.URL.Path[5:]
		}
		if slug == "" {
			// Error, no slug
			w.WriteHeader(http.StatusNotFound)
			fmt.Fprint(w, `{"error": "Missing function", "success": false}`)
			return
		}
		if slug == "off" {
			// Error, should be handled by /off
			w.WriteHeader(http.StatusNotFound)
			fmt.Fprint(w, `{"error": "No off function, to turn off, visit /off", "success": false}`)
		}

		if r.Method != "POST" {
			// Error, must be POST
			w.WriteHeader(http.StatusMethodNotAllowed)
			fmt.Fprint(w, `{"error": "All request should be POST", "success": false}`)
			return
		}

		message := slug + " "
		splitParams := strings.Split(r.Form.Encode(), "&")
		for _, param := range splitParams {
			message += strings.Replace(param, "=", ":", 1) + " "
		}

		f.WriteString(message)

		fmt.Fprintln(w, `{"error": "", "success": true}`)
	})

	fmt.Printf("Listening on port %d\n", config.Backendport)

	http.ListenAndServe(":"+strconv.Itoa(config.Backendport), nil)
	fmt.Println("Server closed!")

	f.Close()
}
