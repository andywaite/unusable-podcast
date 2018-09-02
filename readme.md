Directory of the Unusable podcast website, including audio assets and podcast feed.
Podcast website https://podcast.theunusable.com/
Podcast feed: https://podcast.theunusable.com/podcast.rss

Hugo theme is "Sam": https://themes.gohugo.io/hugo-theme-sam/

Run this to get theme files:
git submodule update --init --recursive

To add a new episode:
- hugo new podcasts/004-whatever.md
- Remove draft:true from new page in content/podcasts
- Make sure the new page is in git
- Add: description: "lorem ipsum"
- Write a description of the episode in the file, and link to the MP3 file
- Add the mp3 file to static/podcasts
- Commit just the mp3 file & give Andy the url so he can listen
- Create a video version in iMovie & upload to Youtube
- Edit static/podcasts/podcast.rss - add new item