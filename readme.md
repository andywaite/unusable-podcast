Directory of the Unusable podcast website, including audio assets and podcast feed.
Podcast website https://podcast.theunusable.com/
Podcast feed: https://podcast.theunusable.com/podcast.rss

## Local development

To dev this site locally, you need to have yarn installed.

Install dependencies:
```
yarn
```

Start local dev server:
```
yarn dev
```

## To add a new episode
- Add the mp3 file to `/podcasts` - Commit and push, then get url to show Andy
- Add a new markdown file to `/podcasts`, matching the format of existing
- Edit text and make sure it makes sense
- Make sure to include the link to the MP3 file
- Find an image using unsplash and add it to `/podcasts`. Make sure it's a jpg, and named the same as the podcast number - e.g. 018.jpg
- Note that images get optimised automatically, no need to worry about its size
- Commit & push 'main'
- Wait for site to go live
- Check it's legit (should update on the homepage https://podcast.theunusable.com/)
- Check feed is valid with http://castfeedvalidator.com/ & https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fpodcast.theunusable.com%2Fpodcast.rss


## To add a new video
- Open _data/videos.json
- Add video, keeping to the same format
- Commit & push master