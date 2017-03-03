---
layout: post
title: Fledgling board game collection
category: misc
tags: ['board games']
extra_js:
  - jquery-3.1.1.min.js
  - jquery.imagemapster.min.js
extra_css:
  - bgg.css
---

As a child, Scrabble was our family's board game of choice.
We were all well-read and had a sufficiently diverse vocabulary that games
could go down to the wire despite substantial differences in age.
Monopoly was a painful and frustrating experience, replayed so infrequently
that the memories were dulled by time and the agony was rediscovered all over
again (I've since learnt that this may have been due to an all-too-common
relaxation of the official rules, but that is scant comfort for the hours
lost).
Snakes and Ladders, stripped of its karmic lessons, was unbearably nihilistic.
In my adolescence I became (loosely) aware to tabletop wargames and Dungeons &
Dragons, but primarily through video games that borrowed from these genres.
Through my own failings, it took a relocation to Paris in my late twenties to
become exposed to the much richer variety of board games that are available,
populating entire bookshelves in friends' apartments and forming the primary
focus of entire afternoons and evenings.
They even made frequent appearances during working hours, thanks to the
seriousness with which the French treat the lunch break.
Julien, Thibault, and colleagues, you know who you are!

Having remained in the same country (heck, the same city!)
for more two years now, we've begun enjoying minor luxuries such as buying the
occasional book (much too heavy and cumbersome to accumulate when relocating
to a new continent every other year).
And some of our closest friends (figuratively *and* literally) have a keen
interest in board games, with shelves groaning under the weight (be it
metaphoric or, indeed, physical) of numerous games.
Partly out of a guilt stimulated by no such abundance on our part, but
predominantly out of a desire to sate our own appetites, we are slowly
addressing this imbalance.
For now, the carpeted floor serves as a shelf of sorts to this, our fledgling
board game collection ...

<noscript>
Please enable JavaScript and reload this page.
</noscript>

<div class="bgg">
  <div class="map">
    <map name="map">
      <area shape="poly" coords="40,210,190,208,200,550,50,550"
            href="#" id="172081"
            class="map-area" />
      <area shape="poly" coords="188,175,277,175,290,550,200,550"
            href="#" id="163412"
            class="map-area" />
      <area shape="poly" coords="280,155,355,155,365,550,290,550"
            href="#" id="131835"
            class="map-area" />
      <area shape="poly" coords="350,45,440,45,445,550,365,550"
            href="#" id="320"
            class="map-area" />
      <area shape="poly" coords="440,35,575,35,570,558,445,555"
            href="#" id="822"
            class="map-area" />
      <area shape="poly" coords="575,35,685,35,680,550,570,545"
            href="#" id="39856"
            class="map-area" />
      <area shape="poly" coords="685,35,840,40,825,550,680,550"
            href="#" id="155821"
            class="map-area" />
      <area shape="poly"
            coords="845,2,990,2,955,550,825,550,840,40,800,40"
            href="#" id="42215"
            class="map-area" />
    </map>
    {% capture img %}{{ page.date | date: "%Y-%m-%d-collection.jpg" }}{% endcapture %}
    <img usemap="#map" id="img-map" src="{{ site.baseurl }}{{ site.url_img }}/{{ img }}" alt="">
  </div>
</div>

<script type="text/javascript" src="{{ site.baseurl }}{{ site.url_js }}/bgg.js"></script>
<script type="text/javascript">
    BGG.load({
        img_map: "#img-map",
        username: "2bago",
        userid: 1451771,
        show_on_hover: false,
    });
</script>
