import re
import urllib
from bs4 import BeautifulSoup
import requests
import os

baseUrl = "https://www.youtube.com/watch?v=vDaWzNw6hZ4";
url = "http://www.youtubeinmp3.com/download/?video="+baseUrl;

res = requests.get(url);
resSoup = BeautifulSoup(res.text, "html.parser");

ans = resSoup.find_all('a',attrs={'class':'button fullWidth'});
ans = ans[0]
print ans

regex = r'<a class="button fullWidth" href="(.*)" id="download"><i class="fa fa-cloud-download"></i> Download MP3</a>>?'
partUrl = re.findall(regex,str(ans));

print partUrl
#fullUrl = "http://www.youtubeinmp3.com"+partUrl[0]
#print fullUrl

#os.system('wget ' + fullUrl);