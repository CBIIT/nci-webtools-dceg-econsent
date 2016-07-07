import os
import re
import string
from flask import Flask, render_template, request, jsonify, make_response, send_from_directory
import json
import csv
import random
import subprocess
from weasyprint import HTML, CSS
import urllib

# Load Env variables


app = Flask(__name__)

@app.route('/')
def index():
    return return_template('index.html')

@app.route('/eConsentRest/', methods = ['POST'])
def store():
	
	mimetype = 'application/json'
	data = json.loads(request.stream.read())
	name = data["name"]
	email= data["email"]
	page=data["page"].encode('utf-8').strip()
	token_id=random.randrange(1, 1000000)

	HTML(string=page).write_pdf('./content/consent_form'+str(token_id)+'.pdf',
    	stylesheets=[CSS('./css/style.css')])
	return str("")

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


if __name__ == "__main__":
  app.run(host = '0.0.0.0', port = 1111, debug = True)