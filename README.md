# Automatically Reveal Mastodon CW posts

(This is a WIP, and currently needs a way to toggle that isn't going into the code and switching the "show" value.)


This is an add-on that reveals all mastodon tweets hidden by content warnings.

Mastodon posts all have the class "status__content__text". Those hidden by a Content Warning don't have the class "status__content__text--visible".

This add-on applies "status__content__text--visible" to all with class "status__content__text" without "status__content__text--visible". It adds a class to these elements so when they need to be hidden, they can be found by their class.
