#!/usr/bin/env python
# coding: utf-8

# In[5]:


import Model_Test
print('Build Successfully')


# In[6]:
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
import base64
from email import encoders
import smtplib
# In[8]:


#Build Part - TARUN TIWARI 
red_file="Generated_Csv\Red_Flagged.csv"
sender_address = 'amlteam.lscg@gmail.com'
sender_pass = 'lscg2020'                                                         
#receiver_address = 'tarun.tiwari2000@zohomail.eu'
recipients=['kushagra.tandon@zohomail.eu','kushagra.25@zohomail.eu','akshit.gupta2001@zohomail.eu','tarun.tiwari2000@zohomail.eu']
message_content="""<!DOCTYPE html>
<html>
    <body>
        <h2 style="color:Red;">ALERT !!! A Fraud Has Been Detected by LS&CG</h2>
        <h5 style="color:SlateGray;">The Money Laundering Cases Has Been Detected.</h5>
        <img src="cid:Fraudimage" width='400' height=200>
        <h5 style="color:Black;">The Data is Being Attached Along With The Email. Please Look Into The Transaction & Notify On Server</h5>
        <h5 style="color:Black;">Update The Final Result On akshit_web_link.com</h5>
        <h6 style="color:Red;">This Is A System Generated Email Please Do Not Reply To This E-Mail. For More Information Contact LS&CG</h6>
        
    </body>
</html>
"""
message = MIMEMultipart()
message['From'] = sender_address
message['To'] = ", ".join(recipients)
message['Subject'] = 'FRAUD DETECTECTION!!!'                                                                                           
                                                                                                
message.attach(MIMEText(message_content, 'html'))
attach_file_name = red_file                                                            
attach_file = open(attach_file_name, 'rb')                                      
payload = MIMEBase('application', 'octate-stream')
payload.set_payload((attach_file).read())
encoders.encode_base64(payload) 
                                                                                                
payload.add_header('Content-Decomposition', 'attachment', filename=attach_file_name)
message.attach(payload)

fp = open('DataSets/fraud.jpg', 'rb')
image = MIMEImage(fp.read())
fp.close()

# Specify the  ID according to the img src in the HTML part
image.add_header('Content-ID', '<Fraudimage>')
message.attach(image)
                                                                                                 
session = smtplib.SMTP('smtp.gmail.com', 587)                                   
session.starttls()                                                               
session.login(sender_address, sender_pass)                                       
text = message.as_string()
session.sendmail(sender_address, recipients, text)
session.quit()


# In[4]:


print('The Mail Has Been Send Successfully')


# In[12]:



orange_file="Generated_Csv\ORANGE_FLAGGED.csv"

sender_address = 'amlteam.lscg@gmail.com'
sender_pass = 'lscg2020'                                                         
#receiver_address = 'kushagra.tandon.124@gmail.com'
recipients=['tarun.tiwari2000@zohomail.eu','kushagra.tandon@zohomail.eu','kushagra.25@zohomail.eu','akshit.gupta2001@zohomail.eu']
message_content="""<!DOCTYPE html>
<html>
    <body>
        <h2 style="color:Red;">ALERT !!! A Potential Fraud Has Been Detected by LS&CG</h2>
        <h5 style="color:SlateGray;">The Money Laundering Cases Has Been Detected.</h5>
        <img src="cid:Fraudimage" width='400' height=200>
        <h5 style="color:Black;">The Data is Being Attached Along With The Email. Please Look Into The Transaction & Notify On Server</h5>
        <h5 style="color:Black;">Update The Final Result On akshit_web_link.com</h5>
        <h6 style="color:Red;">This Is A System Generated Email Please Do Not Reply To This E-Mail. For More Information Contact LS&CG</h6>
    </body>
</html>
"""
message = MIMEMultipart()
message['From'] = sender_address
message['To'] = ", ".join(recipients)
message['Subject'] = 'FRAUD DETECTECTION!!!'                                                                                           
                                                                                                
message.attach(MIMEText(message_content, 'html'))
attach_file_name = red_file                                                            
attach_file = open(attach_file_name, 'rb')                                      
payload = MIMEBase('application', 'octate-stream')
payload.set_payload((attach_file).read())
encoders.encode_base64(payload) 
                                                                                                
payload.add_header('Content-Decomposition', 'attachment', filename=attach_file_name)
message.attach(payload)

fp = open('DataSets/fraud.jpg', 'rb')
image = MIMEImage(fp.read())
fp.close()

# Specify the  ID according to the img src in the HTML part
image.add_header('Content-ID', '<Fraudimage>')
message.attach(image)
                                                                                                 
session = smtplib.SMTP('smtp.gmail.com', 587)                                   
session.starttls()                                                               
session.login(sender_address, sender_pass)                                       
text = message.as_string()
session.sendmail(sender_address, recipients, text)
session.quit()

