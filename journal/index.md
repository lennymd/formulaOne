---
layout: default
---
## All entries

This isn't very well laid out, but it's good enough as a journal, for now.

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>