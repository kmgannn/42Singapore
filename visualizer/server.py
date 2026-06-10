import http.server
import socketserver
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    # Disable logging to avoid cluttered agent streams unless debugging
    def log_message(self, format, *args):
        pass

def main():
    os.chdir(DIRECTORY)
    # Allow port reuse to prevent address-already-in-use errors on restarts
    socketserver.TCPServer.allow_reuse_address = True
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Serving visualizer locally at: http://localhost:{PORT}")
            print("Press Ctrl+C to stop.")
            sys.stdout.flush()
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
    except Exception as e:
        print(f"Server error: {e}")

if __name__ == "__main__":
    main()
