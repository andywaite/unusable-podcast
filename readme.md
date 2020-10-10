Directory of the Unusable podcast website, including audio assets and podcast feed.
Podcast website https://podcast.theunusable.com/
Podcast feed: https://podcast.theunusable.com/podcast.rss

## Unfinished 2020 version

This is the new 2020 version, now using Eleventy. There is plenty still to do:

 - ~~Make SCSS generation happen on build rather than using a watcher in IDE~~
 - ~~Finish adding schema data / ld+json~~
 - ~~Add og tags~~
 - ~~Add date to podcast episode & episodes page~~
 - Fix styling on mobile
 - Explained section link on homepage is invisible
 - Explained section doesn't work
 - Explained section doesn't have content
 - Check link hover states
 - Shop page
 - Videos page
 - Live video feed from Youtube (?)
 - ~~Make sure static files get copied over, and make sense (e.g. favicon)~~
 - ~~Sitemap generation~~
 - ~~Podcast feed generation~~
 - Optimise / check in Lighthouse etc



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
- Commit & push
- Wait for site to go live
- Check it's legit
- Check feed is valid with http://castfeedvalidator.com/ & https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fpodcast.theunusable.com%2Fpodcast.rss