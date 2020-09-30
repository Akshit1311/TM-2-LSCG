#!/usr/bin/env python
# coding: utf-8

# ## **Explaratory Data Analysis**

# In[1]:


# Importing Libraries
import pandas as pd
import numpy as np
import pickle


# In[2]:


#DISPLAYING OUT DATASET
df = pd.read_excel('DataSets\Transaction Monitoring.xlsx')
df.head()


# In[3]:


#SHUFFING /CLEANING THE DATASET
df = df.drop(['isFlaggedFraud','step','nameOrig','nameDest'], axis =1 )
from sklearn.utils import shuffle
df = shuffle(df)
#df.head()


# ## **Relationship Analysis**

# In[4]:


#CONVERTING THE TYPE PARAMETER INTO THE LABEL ENCODING 
from sklearn.preprocessing import OneHotEncoder 
df=pd.get_dummies(df)


# In[5]:


y = df.loc[:,'isFraud']
X = df.drop(['isFraud'],axis =1)


# In[6]:


from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test=train_test_split(X,y,train_size=0.75,random_state=1231)


# ## **Training The Model**

# In[7]:


from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators = 50)
model.fit(X_train, y_train)
y_pred =model.predict(X_test)
filename = 'TM_Model_Kushagra.h5'
pickle.dump(model, open(filename, 'wb'))


# In[8]:


print('Model File Has Been Generated Successfully')

