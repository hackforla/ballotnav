from flask import Flask 
app = Flask(__name__) 

@app.route('/') 
def hello(): 
	return "Welcome to the BallotNav backend team!"

@app.route('/status') 
def hello(): 
	return "Operational"

@app.route('/test')
def test():
	return "This is for my test PR"


if __name__ == "__main__": 
	app.run(host ='0.0.0.0', port = 80, debug = True) 
