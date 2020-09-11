import os
from ballotnav import create_app

if __name__ == "__main__":
    print("Running Main app dev server")
    app = create_app()
    app.run(host="127.0.0.1", port=os.getenv("PORT", 5000), debug=True)
