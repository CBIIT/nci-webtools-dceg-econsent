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
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
# Load Env variables
import smtplib
from PropertyUtil import PropertyUtil
from stompest.async import Stomp
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
	timestamp=data['timestamp']
	page=data["page"].encode('utf-8').strip()
	token_id=random.randrange(1, 1000000)
	
	file='./content/consent_form'+str(token_id)+'.pdf'
	HTML(string=page).write_pdf('./content/consent_form'+str(token_id)+'.pdf',
    	stylesheets=[CSS('./css/style.css')])

	product_name = "eConsent"

	print "making message"

	#    rSource('./JPSurvWrapper.R')
	#    getFittedResultWrapper = robjects.globalenv['getFittedResultWrapper']
	# print parameters['data']
	#http://analysistools-dev.nci.nih.gov/jpsurv/?file_control_filename=Breast_RelativeSurvival.dic&file_data_filename=Breast_RelativeSurvival.txt&output_filename=form-766756.json&status=uploaded&tokenId=766756
	#print data(['queue']['url'])
	header = """<h2>"""+product_name+"""</h2>"""
	body = """
	      <div style="background-color:white;border-top:25px solid #142830;border-left:2px solid #142830;border-right:2px solid #142830;border-bottom:2px solid #142830;padding:20px">
	        Hello,<br>
+	        <p>Thank you for participating in this study. Attached is your copy of the agremeent form that you consented on """+data['timestamp']+""" using the """+product_name+"""  web application tool.</p>

	      """
	footer = """
	      <div>
	        <p>
	          (Note:  Please do not reply to this email. If you need assistance, please contact xxxxx@mail.nih.gov)
	        </p>
	      </div>

	        <div style="background-color:#ffffff;color:#888888;font-size:13px;line-height:17px;font-family:sans-serif;text-align:left">
	              <p>
	                  <strong>About <em>"""+product_name+"""</em></strong></em><br>
	                  The eConsent software tool is a web-based tool that provides an electronic informed consent (eConsent) platform for consenting participants either on site or at home (or other remote location) using a computer based consent form rather than traditional paper documentation.
	                  <strong>For more information, visit
	                    <a target="_blank" style="color:#888888" href="http://analysistools.nci.nih.gov">analysistools.nci.nih.gov/jpsurv</a>
	                  </strong>
	              </p>
	              <p style="font-size:11px;color:#b0b0b0">If you did not request a calculation please ignore this email.
	Your privacy is important to us.  Please review our <a target="_blank" style="color:#b0b0b0" href="http://www.cancer.gov/policies/privacy-security">Privacy and Security Policy</a>.
	</p>
	              <p align="center"><a href="http://cancercontrol.cancer.gov/">Division of Cancer Control & Population Sciences</a>, 
	              <span style="white-space:nowrap">a Division of <a href="www.cancer.gov">National Cancer Institute</a></span><br>
	              BG 9609 MSC 9760 | 9609 Medical Center Drive | Bethesda, MD 20892-9760 | <span style="white-space:nowrap"><a target="_blank" value="+18004006916" href="tel:1-800-422-6237">1-800-4-CANCER</a></span>
	              </p>
	            </div>
	            """
	message = """
	  <head>
	    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	    <title>html title</title>
	  </head>
	  <body>"""+header+body+footer+"""</body>"""

	      #    "\r\n\r\n - JPSurv Team\r\n(Note:  Please do not reply to this email. If you need assistance, please contact xxxx@mail.nih.gov)"+
	      #    "\n\n")
	print "sending"
	composeMail(email,message,file)
	return str("")

def composeMail(recipient,message,file):
 	config = PropertyUtil(r"config.ini")
	recipient = recipient
	packet = MIMEMultipart()
	packet['Subject'] = "eConsent Agreement Form"
	packet['From'] = "eConsent <do.not.reply@nih.gov>"
	packet['To'] = recipient
	packet.attach(MIMEText(message,'html'))
	with open(file,"rb") as openfile:
		packet.attach(MIMEApplication(
		  openfile.read(),
		  Content_Disposition='attachment; filename="%s"' % os.path.basename(file),
		  Name=os.path.basename(file)
	))
	MAIL_HOST=config.getAsString('mail.host')
	print MAIL_HOST
	smtp = smtplib.SMTP(MAIL_HOST)
	smtp.sendmail("do.not.reply@nih.gov",recipient,packet.as_string())
	print "sent email"


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


if __name__ == "__main__":
  app.run(host = '0.0.0.0', port = 1111, debug = True)
