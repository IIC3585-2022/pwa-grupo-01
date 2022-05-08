from http.server import HTTPServer, BaseHTTPRequestHandler
import ssl

from http.server import HTTPServer, BaseHTTPRequestHandler


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Hello, world!')


httpd = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)

httpd.socket = ssl.wrap_socket (httpd.socket, 
        keyfile="certificado/key.pem", 
        certfile='certificado/cert.pem', server_side=True)

httpd.serve_forever()
