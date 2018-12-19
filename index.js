var YoutubeMp3Downloader = require("youtube-mp3-downloader");
var search = require('youtube-search');
var fs = require("fs");

let pwd = process.cwd()

var opts = {
  maxResults: 1,
  key: 'AIzaSyB6-w_xp6cU3dFjhNMxwdwqomlH1I6sMsY'
};

let dir = pwd + '/' + Date.now()

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

var YD = new YoutubeMp3Downloader({
    "ffmpegPath": "/Applications/ffmpeg",        // Where is the FFmpeg binary located?
    "outputPath": dir,    // Where should the downloaded and encoded files be stored?
    "youtubeVideoQuality": "highest",       // What video quality should be used?
    "queueParallelism": 4,                  // How many parallel downloads/encodes should be started?
    "progressTimeout": 5000                 // How long should be the interval of the progress reports
});

fs.readFile("src.txt", (err, data) => {
    if (err) console.log(err);
    data.toString().split(',').forEach((song) => {
        search(song + 'audio', opts, (err, results) => {
          if(err) return console.log(err);
          let id = results[0].id
          //Download video and save as MP3 file
          console.log("Downloading: ", results[0].title);
          YD.download(id);
        });
    })
});

YD.on("finished", function(err, data) {
    console.log("Finished: ", JSON.stringify(data.file));
});

YD.on("error", function(error) {
    console.log(error);
});

YD.on("progress", function(progress) {
    // console.log(JSON.stringify(progress));
});
