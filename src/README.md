
This is my fourth attemp at this App and I think it's working as per feedback given. 

#### Routes and listing page #####
The are two routes implemented '/' for listing page and '/search' for search page. The '/' lists the books according to their shelf and you can move them across into different sections. This page make use of same CurrentlyReading.js inner component 3 times to show three different shelves . Since all three shelves were  identical, thus I made use of single inner component while passing different Props according to their respective shelves. 

##### Search page#######
Search page is making use of component Search which has a search field and an inner component which lists the results. 