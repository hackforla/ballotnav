""" manage """

from datetime import datetime
import os

from ballotnav import create_app

app = create_app()
cli = app.cli
PORT = os.getenv("PORT", 5000)


@cli.command()
def hello():
    """ why, hello there! """
    print(f"hello: it's now {datetime.utcnow()} 🗳️ 📍 at ballotnav")


@cli.command()
def routes():
    """ list the registered API routes """
    for route in app.url_map.iter_rules():
        print(f"{route}")


@cli.command()
def devserver():
    print("Running Main app dev server")
    app = create_app()
    app.run(host="127.0.0.1", port=PORT, debug=True)


if __name__ == "__main__":
    cli()
