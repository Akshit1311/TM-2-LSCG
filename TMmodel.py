#!/usr/bin/env python
# coding: utf-8

# In[1]:


from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import sys
import numpy as np
import pickle
from sklearn.utils import shuffle


# In[2]:


dummy_data = pd.read_excel('DataSets\Dummy_data_testing.xlsx')
dummy_data_cleaned = dummy_data.drop(
    ['nameOrig', 'nameDest', 'OrigCountry', 'DestCountry'], axis=1)
dummy_data_cleaned = pd.get_dummies(dummy_data_cleaned)


# In[3]:


y_dummy = dummy_data_cleaned.loc[:, 'isFraud']
X_dummy = dummy_data_cleaned.drop(['isFraud'], axis=1)


# In[4]:


classifier = RandomForestClassifier(n_estimators=50)
filename = 'TM_Model_Kushagra.h5'
loaded_model = pickle.load(open(filename, 'rb'))
y_pred = loaded_model.predict(X_dummy)


# In[5]:


y_predected_dummy = y_pred
y_predected_dummy = list(y_predected_dummy)
dummy_data = dummy_data.drop('isFraud', axis=1)
dummy_data['isFraud'] = y_predected_dummy


# In[6]:


df_red = dummy_data[dummy_data['isFraud'] == 1]
df_red = df_red.drop('isFraud', axis=1)
df_red['Flag'] = 'Red'
# Saving the Red File To The CSV Format --------
df_red.to_csv('Generated_Csv\Red_Flagged.csv')


# In[7]:


df2 = pd.DataFrame(pd.read_excel('DataSets\Contries_score.xlsx'))
df2 = df2.rename(columns={'Overall score': 'score'})
df2 = df2[df2['score'] >= 6]
country_score = pd.Series(df2.score.values, index=df2.Country).to_dict()


# In[8]:


dummy_data = dummy_data[dummy_data['isFraud'] == 0]
dummy_data.drop('isFraud', axis=1)


# In[9]:


orange_flag = {}
green_flag = {}
for i in dummy_data.index:
    if dummy_data['OrigCountry'][i] in country_score.keys() or dummy_data['DestCountry'][i] in country_score.keys():
        if ((dummy_data['amount'][i] > 100000)):
            orange_flag.update({dummy_data['nameOrig'][i]: 'orange'})
    else:
        green_flag.update({dummy_data['nameOrig'][i]: 'green'})


# In[10]:


orange = pd.DataFrame(orange_flag.items(), columns=['nameOrig', 'Flag'])
green = pd.DataFrame(green_flag.items(), columns=['nameOrig', 'Flag'])
df_orange = dummy_data.merge(orange, how="inner")
df_orange.to_csv('Generated_Csv\ORANGE_FLAGGED.csv')
df_green = dummy_data.merge(green, how="inner")
df_green.to_csv('Generated_Csv\Green_Flagged.csv')


# In[15]:


orange=df_orange.to_json(orient='records')
red = df_red.to_json(orient='records')
green= df_green.to_json(orient='records')


# In[16]:


send_back1 =orange
send_back2=green
send_back3=red
print('Orange\n\n {} \n\n Green \n\n {} \n\n Red \n\n {} '.format(send_back1,send_back2,send_back3),flush=True)
sys.stdout.flush()


# In[ ]:


from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
import base64
from email import encoders
import smtplib
red_file="Generated_Csv\Red_Flagged.csv"
sender_address = 'amlteam.lscg@gmail.com'
sender_pass = 'lscg2020'                                                         
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
image.add_header('Content-ID', '<Fraudimage>')
message.attach(image)
                                                                                                 
session = smtplib.SMTP('smtp.gmail.com', 587)                                   
session.starttls()                                                               
session.login(sender_address, sender_pass)                                       
text = message.as_string()
session.sendmail(sender_address, recipients, text)
session.quit()
print('The Mail Has Been Send Successfully')

orange_file="Generated_Csv\ORANGE_FLAGGED.csv"
sender_address = 'amlteam.lscg@gmail.com'
sender_pass = 'lscg2020'                                                         
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
image.add_header('Content-ID', '<Fraudimage>')
message.attach(image)                                                                                  
session = smtplib.SMTP('smtp.gmail.com', 587)                                   
session.starttls()                                                               
session.login(sender_address, sender_pass)                                       
text = message.as_string()
session.sendmail(sender_address, recipients, text)
session.quit()

