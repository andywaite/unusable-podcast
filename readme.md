Directory of the Unusable podcast website, including audio assets and podcast feed.
Podcast website https://podcast.theunusable.com/
Podcast feed: https://podcast.theunusable.com/podcast.rss

Hugo theme is "Sam": https://themes.gohugo.io/hugo-theme-sam/

Run this to get theme files:
git submodule update --init --recursive

To add a new episode:
- Add the mp3 file to static/podcasts - Commit and push, then get url to show Andy
- hugo new podcasts/004-whatever.md
- Remove draft:true from new page in content/podcasts
- Make sure the new page is in git
- Add: description: "lorem ipsum"
- Write a description of the episode in the file, and link to the MP3 file
- Create a video version in iMovie & upload to Youtube
- Edit static/podcasts/podcast.rss - add new item
- Run command "hugo" to build the site.
- Commit and push
- Check feed is valid with http://castfeedvalidator.com/ & https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fpodcast.theunusable.com%2Fpodcast.rss
- On Youtube add the end links