package utils

import "net/http"

//ReadUserIP function for reading ip-address from request
func ReadUserIP(r *http.Request) string {
	IPAddress := r.Header.Get("X-Real-Ip")
	if IPAddress == "" {
		IPAddress = r.Header.Get("X-Forwarded-For")
	}
	if IPAddress == "" {
		IPAddress = r.RemoteAddr
	}
	if IPAddress[0] == byte('[') {
		IPAddress = "localhost"
	}
	return IPAddress
}
