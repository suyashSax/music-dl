#!/usr/bin/env python

import os
import time
import youtube_dl
from youtube_api import YouTubeDataAPI

api_key = 'YOUR_KEY'
yt = YouTubeDataAPI(api_key)

ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '320',}],
    }

def main():
    pwd = os.getcwd()
    f = open("src.txt", "r")
    ts = str(time.time()).split('.')[0]
    path = os.getcwd() + '/' + ts
    os.mkdir(path)
    os.chdir(path)

    for track in f:
        url = yt.search(track + "audio")[0]["video_id"]
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

if __name__== "__main__":
  main()


