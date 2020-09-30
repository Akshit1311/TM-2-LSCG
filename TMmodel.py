#!/usr/bin/env python
# coding: utf-8

# In[1]:


from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import sys
import numpy as np
import pickle
from sklearn.utils import shuffle


# In[ ]:


# df = pd.read_excel('DataSets\Transaction Monitoring.xlsx')
# df.head()
# df = df.drop(['isFlaggedFraud','step','nameOrig','nameDest'], axis =1 )
# df = shuffle(df)
# #CONVERTING THE TYPE PARAMETER INTO THE LABEL ENCODING
# from sklearn.preprocessing import OneHotEncoder
# df=pd.get_dummies(df)
# y = df.loc[:,'isFraud']
# X = df.drop(['isFraud'],axis =1)
# from sklearn.model_selection import train_test_split
# X_train,X_test,y_train,y_test=train_test_split(X,y,train_size=0.75,random_state=1231)
# from sklearn.ensemble import RandomForestClassifier
# model = RandomForestClassifier(n_estimators = 50)
# model.fit(X_train, y_train)
# y_pred =model.predict(X_test)
# filename = 'TM_Model_Kushagra.h5'
# pickle.dump(model, open(filename, 'wb'))


# In[ ]:


dummy_data = pd.read_excel('DataSets/Dummy_data_testing.xlsx')
dummy_data_cleaned = dummy_data.drop(
    ['nameOrig', 'nameDest', 'OrigCountry', 'DestCountry'], axis=1)
dummy_data_cleaned = pd.get_dummies(dummy_data_cleaned)


# In[ ]:


y_dummy = dummy_data_cleaned.loc[:, 'isFraud']
X_dummy = dummy_data_cleaned.drop(['isFraud'], axis=1)


# In[ ]:


classifier = RandomForestClassifier(n_estimators=50)
filename = 'TM_Model_Kushagra.h5'
loaded_model = pickle.load(open(filename, 'rb'))
y_pred = loaded_model.predict(X_dummy)


# In[ ]:


y_predected_dummy = y_pred
y_predected_dummy = list(y_predected_dummy)
dummy_data = dummy_data.drop('isFraud', axis=1)
dummy_data['isFraud'] = y_predected_dummy


# In[ ]:


df_red = dummy_data[dummy_data['isFraud'] == 1]
df_red = df_red.drop('isFraud', axis=1)
df_red['Flag'] = 'Red'
# Saving the Red File To The CSV Format --------
df_red.to_csv('Generated_Csv\Red_Flagged.csv')


# In[ ]:


df2 = pd.DataFrame(pd.read_excel('DataSets\Contries_score.xlsx'))
df2 = df2.rename(columns={'Overall score': 'score'})
df2 = df2[df2['score'] >= 6]
country_score = pd.Series(df2.score.values, index=df2.Country).to_dict()


# In[ ]:


dummy_data = dummy_data[dummy_data['isFraud'] == 0]
dummy_data.drop('isFraud', axis=1)


# In[ ]:


orange_flag = {}
green_flag = {}
for i in dummy_data.index:
    if dummy_data['OrigCountry'][i] in country_score.keys() or dummy_data['DestCountry'][i] in country_score.keys():
        if ((dummy_data['amount'][i] > 100000)):
            orange_flag.update({dummy_data['nameOrig'][i]: 'orange'})
    else:
        green_flag.update({dummy_data['nameOrig'][i]: 'green'})


# In[ ]:


orange = pd.DataFrame(orange_flag.items(), columns=['nameOrig', 'Flag'])
green = pd.DataFrame(green_flag.items(), columns=['nameOrig', 'Flag'])
df_orange = dummy_data.merge(orange, how="inner")
df_orange.to_csv('Generated_Csv\ORANGE_FLAGGED.csv')
df_green = dummy_data.merge(green, how="inner")
df_green.to_csv('Generated_Csv\Green_Flagged.csv')


# In[ ]:


send = [df_red, df_orange, df_green]
result = pd.concat(send)
result = result.to_json(orient='records')
print('{}'.format(result), flush=True)
