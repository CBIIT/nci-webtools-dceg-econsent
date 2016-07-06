import os
import re
import string
from flask import Flask, render_template, request, jsonify, make_response, send_from_directory
import json
import urllib

# Load Env variables


app = Flask(__name__)

@app.route('/')
def index():
    return return_template('index.html')

@app.route('/eConsentRest/', methods = ['POST'])
def store():
	
	return str("")

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


if __name__ == "__main__":
  app.run(host = '0.0.0.0', port = 1111, debug = True)