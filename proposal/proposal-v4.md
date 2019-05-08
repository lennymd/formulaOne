# Thesis Proposal

On May 13, 1950, Giuseppe Farina, Luigi Fagioli, and Reg Parnell took first, second, and third (collectively the podium), in the first World Championship Formula One race at the Silverstone Circuit in England. Sixty-eight years, 11 months, and one day later, on April 14, 2019, five-time world champion Lewis Hamilton took first at the 1000th Formula One race, the 2019 Chinese Grand Prix. Over the course of the 998 races that separate these victories, Formula One has changed significantly. Of the 847 drivers that have raced in Formula One, only 33 have become World Champion. From the initial six races in Europe and the Indy500 in America, drivers have gone on to race on six continents. New materials and the computer have helped push the design of the cars forward, producing machines that go faster, and produce more downforce. The untimely deaths of drivers like Ayrton Senna and Jules Bianchi have brought forth improvements in driver safety. But the drive to be first, to be the fastest, hasn't changed.

For my master's project I want to explore interactive data visualizations. Through my graduate coursework I've had the opportunity to explore different disciplines and media. Of the work I've done, I've most enjoyed synthesizing different media and creating things that allow for learning through exploration and interaction.

For this project, I want to create a visual history of the sport from 1950 to the present day. I'm primarily interested in analyzing and presenting how the design of the cars has changed over time and how that has affected the sport. Design rules for the cars change every few years@@

Design rules for the cars change every few years, making it so that engineers are constantly working to create the best cars possible

Design rules for the car change every few years, but the engineering teams are always focused on creating a car that can be the fastest. This has led to advancements in motoring technology and to some unusual cars, like the [Brabham BT46](https://en.wikipedia.org/wiki/Brabham_BT46) that used a large fan to produce more downforce, 

I'm primarily interested in how the design of the cars has changed, an

I'm interested in documenting and presenting how the design of the cars have evolved, how the sports's popularity has changed over time, and what all the key moments in the 

I had been considering two directions. The first one was to create an annotated timeline of the sport, using race data to indicate where we were in time and then adding links, media, and callouts to highlight the history of the sport. 

Initially I had been interested in creating either a piece about the best Formula One driver, a visual history of the sport told through the cars, or an annotated timeline of every race. As I familiarized myself with the available race data, which I got from the [Ergast Developer API](https://ergast.com/mrd/), and learned more about the sport, I found these two pieces produced by FiveThirtyEight:

* [Who’s The Best Formula One Driver Of All Time?](https://fivethirtyeight.com/features/formula-one-racing/)
* [The Best Formula One Driver Might Be A Guy Who Hasn’t Won Since 2013](https://fivethirtyeight.com/features/the-best-formula-one-driver-might-be-a-guy-who-hasnt-won-since-2013/)

I thought they were well-made and did a wonderful job of analyzing the race data. The piece about the best Formula One driver was especially interesting with the general Elo discussion and the analysis of the rivalries. That said, I thought both pieces could bring forth more emotion and context. It's one thing to read and understand that Ayrton Senna was one of the best racers to get into a Formula One car, it's another thing to see clips and recordings of his races and feel the rush of seeing him overtake a driver or drive in the rain. Through looking at these pieces, I realized the desire to bring that kind of emotion to my own piece.

The goal for my visualization is to create a visual history of the sport from 1950 to present that combines illustrations, statistics, and video & images to show the evolution of the sport with it's highs and lows. To do this, I've considered two different "units of time", the races and the cars.

The idea of using the races as the "unit of time" centered around creating a long line chart using some aspect of the drivers results (position or points earned) and then layering callouts, images, and videos to highlight the results over time. I [prototyped](http://lennymartinez.com/vis-thesis/prototype/line-chart-all.html) this idea by creating a long line chart that includes a line for each driver, plotting their finishing position for every race they entered. It was useful in showing me just how messy such this approach could become. If I were to continue with this direction, I'd want to start by checking a few things:

1. How does the timeline look if I only have the drivers who won champonships?
1. How does the timeline look if I only have the drivers who won champonships and their teammates? (Comparing championship drivers against their teammates is one way to isolate skill since they're driving the same car.)
1. Would adding interactvity like the one in the first visualization in [this piece](https://www.themarshallproject.org/2016/08/18/crime-in-context) from The Marshall Project help in navigating the 847 drivers (everything is greyed out except for one line at a time)?

A bigger question with this direction is whether there is a way to adapt the timeline to mobile so the experience is just as rewarding given the smaller real estate.

The other direction I'm considering is using the cars as the "unit of time". For this idea I wanted to look at the evolution of the sport through the evolution of the cars. As regulations have changed over the last 69 years, different car designs and cars have come to dominate the sport. I want to start with looking at the championship cars ([Here they are from 1950–2016](https://www.foxsports.com/motor/gallery/images-f1-cars-championship-winning-022717)), and then add in other cars that marked turning points or interesting designs in pushing the sport forward. One example is the [Brabham BT46](https://en.wikipedia.org/wiki/Brabham_BT46) that used a large fan to produce more downforce, and only raced once in 1978. I'll be working to build a prototype of this idea over the next two weeks.

## Previous Work

Looking back at my coursework, I think these projects made during and shortly after I left Syracuse highlight my direction and progress:

My [first data-driven project](https://www.dropbox.com/sh/3bp65gt2y2wtbet/AACzRk4bMA22OYy6PSqOuvLpa?dl=0) was a series of prints where I used text-messages I had exchanged with friends as the "pixels" in out photographs: the closer you got to the print, the less of the overall image you could see and the better you could read the messages.

My second data-driven project was an attempt to tell the story of my last relationship through our text messages, looking at the emotional strength of each message and also at our word choices over three different weeks.

My [third data-driven project](https://www.instagram.com/p/BiNgylbgKCq/?utm_source=ig_web_copy_link) was an animation about all the different fire alarms that had gone off on Euclid Street in Syracuse, a popular street for students to live on, during my academic year at Syracuse.

My fourth, and most recent, data-driven project was my work with News21 during our investigation, Hate in America. As part of the investigation I created the interactive piece, [The State of Hate](https://hateinamerica.news21.com/roadtrip/),that summarized and presented our findings from a cross-country road trip I was a part of. I also researched and created an internal database of all the federally prosecuted hate crimes in the last 9 years, which helped others in the newsroom learn and find leads for their stories.

From these projects I have learned different techniques for analyzing data, and how to structure a story that's found in data. For my master's project I want to take everything I've learned working on these projects and produce three interactive data visualizations that are of similar quality to my News21 The State of Hate piece.

## Project Outcomes

The main outcome of the project will be the three individual visualizations and their accompanying write-ups. I want to incorporate them both in a stand-alone website for the master's project and as part of a redesigned portfolio. In addition I want to take the visualizations and the write-ups and create a conference-style talk where I go over the project and what I learned as an outcome. This talk would be what I present on the day of the defense.

## Student Learning

For my master's project I want to explore interactive data visualizations. As a graduate student I've worked to combine my technical background with my studies in communications. I have explored different disciplines and media: virtual reality, augmented reality, 360º videos, graphic design, photography, picture editing, data journalism, product design, and data visualization. Through all these different explorations, I've come to realize how much I enjoy synthesizing different media and creating things (physical and digital) that allow for learning through exploration and interaction. That said I'm not happy with most of the projects I've produced until now and want to use my thesis project as an opportunity to create something that is more reflective of my skills and my growth during my time at Syracuse.
