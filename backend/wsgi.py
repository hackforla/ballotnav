import os
from ballotnav import create_app

if __name__ == "__main__":
    app = create_app()
    print("Running Main app dev server")
    app.run(host="0.0.0.0", port=os.getenv("PORT", 5000), debug=True)

