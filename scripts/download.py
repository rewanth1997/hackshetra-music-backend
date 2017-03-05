import re
import urllib
from bs4 import BeautifulSoup
import requests
import os
import sys
from time import sleep

rootUrl = "https://youtube.com"
name = sys.argv[1]
url="https://youtube.com/results?search_query="+name

res = requests.get(url)
soup = BeautifulSoup(res.text)
data = []
regex = r'href="(.*?)"'

try:
	for ans in soup.find_all('h3', attrs={'class':'yt-lockup-title'}):
		for i in ans.find_all('a'):
			#print i
			i = re.findall(regex,str(i))
			data.append(rootUrl+i[0])
			#data.append(i)
except Exception as e:
	print e
	pass

print data[0]

baseUrl = data[0]
#baseUrl = "https://www.youtube.com/watch?v=vDaWzNw6hZ4";
url = "http://www.youtubeinmp3.com/download/?video="+baseUrl;

res = requests.get(url);
resSoup = BeautifulSoup(res.text, "html.parser");

ans = resSoup.find_all('a',attrs={'class':'button fullWidth'});
ans = ans[0]
#print ans

regex = r'<a class="button fullWidth" href="(.*)" id="download"><i class="fa fa-cloud-download"></i> Download MP3</a>>?'
partUrl = re.findall(regex,str(ans));

#print partUrl

fullUrl = "http://www.youtubeinmp3.com"+partUrl[0]
print fullUrl

os.system('wget ' + fullUrl)
sleep(0.2)
os.system('mv index.html* "~/Downloads/' + name + '"')

print name
