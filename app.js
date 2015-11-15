    //Callback functions
    var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
    };
    var success = function (data) {
        console.log('Data [%s]', data);
    };

    var Twitter = require('twitter-node-client').Twitter;
    //Get this data from your twitter apps dashboard
    
    var Firebase = require("firebase");
    var tweets = new Firebase("https://sweltering-fire-9217.firebaseio.com/");
    var tasks = new Firebase("https://hackharvard.firebaseio.com/");



/*
    tweets.child('firstTweet').set({
        tweet: "Hello World Sam!",
        author: "Sam"
    });

    tweets.child('secondTweet').set({
        tweet: "Hello World Ralph!",
        author: "Ralph",
    });

*/
/*

    myFirebaseRef.child("location/city").on("value", function(snapshot) {
        console.log(snapshot.val());  // Alerts "San Francisco"
    });

*/




    var config = {
        "consumerKey": "LbF3lTF6JoqhTv736yW5Wh4vk",
        "consumerSecret": "pFV4f39VNweVDKPviogx3o6I5jvplc8eCsdJ2Mmc9QQSeAMiaY",
        "accessToken": "230279928-NXf6E1RlBwZUY80MHDImo4Yb7kM14qnZ8Sp8mJmR",
        "accessTokenSecret": "C63R5JUHE6YzvDla8la9auDVei7zNyPtODOLHAlc2Y2pv",
        "callBackUrl": "XXX"
    }

    var twitter = new Twitter(config);
    var currentTime= "Sun Nov 15 00:00:00 +0000 2015";

    //ossama's part

  // do your stuff here
  
    var tasksList= [];
    tasks.on('child_added', function(snapshot) {
         var tasky = snapshot.val();
         console.log("CHILD ADDED TRIGERRED "+ tasky.task);

            var regex = tasky.task.split(" ");
            regex.shift();
            regex= regex.join();
            tasksList.push(regex);
        console.log("FINAL keyword to search "+ regex);


        var news_source = "bousamraralph";
        console.log("---------------------------");
        console.log("bousamraralph: \n");
        params = {screen_name: news_source, count: '50', exclude_replies: 'true'};
        twitter.getUserTimeline(params, error, function(timeline){
        timeline = JSON.parse(timeline);
        var number_of_users = 0;
        timeline.forEach(function(entry){
            number_of_users++;
        })

        var i = 0;
        for(i = 0; i<number_of_users; i++){
            var tweet_lower_case = timeline[i].text.toLowerCase();
            var number_match = tweet_lower_case.search(regex);
            
            if(number_match <= 0){
                continue;
            }
            var j=0;
            for(j=0;j<100000;j++){

            }
            tweets.push({
                tweet: tweet_lower_case,
                author: news_source,
                date_creation: timeline[i].created_at
            });
            if(compareTimes(timeline[i].created_at,currentTime)==0){
                            currentTime= timeline[i].created_at;
            }
            console.log(tweet_lower_case);
            }
        });

        console.log("Database populated by bousamraralph news");

        //   var news_source = "Reuters";
        // console.log("---------------------------");
        // console.log("Reuters news: \n");
        // params = {screen_name: news_source, count: '50', exclude_replies: 'true'};
        // twitter.getUserTimeline(params, error, function(timeline){
        // timeline = JSON.parse(timeline);
        // var number_of_users = 0;
        // timeline.forEach(function(entry){
        //     number_of_users++;
        // })

        // var i = 0;
        // for(i = 0; i<number_of_users; i++){
        //     var tweet_lower_case = timeline[i].text.toLowerCase();
        //     var number_match = tweet_lower_case.search(regex);
            
        //     if(number_match <= 0){
        //         continue;
        //     }
        //     var j=0;
        //     for(j=0;j<100000;j++){

        //     }
        //     tweets.push({
        //         tweet: tweet_lower_case,
        //         author: news_source,
        //         date_creation: timeline[i].created_at
        //     });
        //     console.log(tweet_lower_case);
        //     }
        // });

        // console.log("Database populated by Reuters news");
    });
    //Example calls
        setInterval(function(){
            console.log(tasksList);

        for(k=0;k<tasksList.length;k++){
            var currentElement= tasksList[k];
               var news_source = "bousamraralph";
        console.log("---------------------------");
        console.log("bousamraralph: \n");
        params = {screen_name: news_source, count: '50', exclude_replies: 'true'};
        twitter.getUserTimeline(params, error, function(timeline){
        timeline = JSON.parse(timeline);
        var number_of_users = 0;
        timeline.forEach(function(entry){
            number_of_users++;
        })

        var i = 0;
        for(i = 0; i<number_of_users; i++){
            var tweet_lower_case = timeline[i].text.toLowerCase();
            var number_match = tweet_lower_case.search(currentElement);
            
            if(number_match <= 0){
                continue;
            }
            var j=0;
            for(j=0;j<100000;j++){

            }
             var result =compareTimes(timeline[i].created_at,currentTime );
             console.log("Result of comapring times "+result);
            if(result==0){
                tweets.push({
                tweet: tweet_lower_case,
                author: news_source,
                date_creation: timeline[i].created_at
                 });
             currentTime= timeline[i].created_at;
        
             }

            // console.log(tweet_lower_case);
            }
             });
        }
     
       

        console.log("Database populated by bousamraralph news");
        }, 5000); // this will log 'hi' in a half second ONCE 

//     function userExistsCallback(tweet, exists) {
//   if (exists) {
//     console.log('user ' + tweet + ' exists!');
//   } else {
//     console.log('tweet :  ' + tweet + ' does not exist!');
//   }
// }

//     function checkIfTweetExists(tweet) {
//   tweets.child("tweet").once('value', function(snapshot) {
//     if()
//     var exists = (snapshot.val() !== null);
//     userExistsCallback(tweet, exists);
//   });
// }

function compareTimes(time1,time2) {

    console.log("Comparing times now");
       console.log(time1);
    console.log(time2);
    var t1 = time1.split(" ");
    t1.shift();
    t1.shift();
    t1.shift();
    t1= t1[0];
    t1= t1.split(":");
    var t2 = time2.split(" ");
    t2.shift();
    t2.shift();
    t2.shift();
    t2= t2[0];
    t2= t2.split(":");
    if(parseInt(t1[0],10)>parseInt(t2[0],10)){
        console.log("hour first time is greater");
        return 0;

    }
    else if(parseInt(t2[0],10)>parseInt(t1[0],10)){
         console.log("hour second time is greater");
         return 1;
    }
    else if(parseInt(t1[1],10)>parseInt(t2[1],10)){
        console.log("min first time is greater");
        return 0;
    }
    else if(parseInt(t2[1],10)>parseInt(t1[1],10)){
         console.log("min second time is greater");

         return 1;
    }
    return 2;
 

}


 

/*

        news_source = "BBCNews";
        console.log("---------------------------");
        console.log("BBC Breaking news: \n");
        params = {screen_name: news_source, count: '10', exclude_replies: 'true'};
        twitter.getUserTimeline(params, error, function(timeline){
        timeline = JSON.parse(timeline);
        var number_of_users = 0;
        timeline.forEach(function(entry){
            number_of_users++;
        })
        var i = 0;
        for(i = 0; i<number_of_users; i++){
            var tweet_lower_case = timeline[i].text.toLowerCase();
            var number_match = tweet_lower_case.search(regex);
            if(number_match <= 0){
                continue;
            }
            tweets.child("BBC" + i).set({
                tweet: tweet_lower_case,
                author: news_source,
                date_creation: timeline[i].created_at
            });
            }
        });


        console.log("Database populated by BBC news");

*/

/*
    setTimeout(function(){
    console.log("Reuters: \n");
    params = {screen_name: 'Reuters', count: '10', exclude_replies: 'true'};
    twitter.getUserTimeline(params, error, function(timeline){
        timeline = JSON.parse(timeline);
        var i = 0;
        for(i = 0; i<10; i++){
            var tweet_lower_case = timeline[i].text.toLowerCase();
            var number_match = tweet_lower_case.search(regex);
             console.log(number_match);
            if(number_match <= 0){
                continue;
            }
            console.log(tweet_lower_case);
            console.log();
        }
    });
}, 5000);
    

    setTimeout(function(){
    console.log("BBCNews: \n");
    params = {screen_name: 'BBCNews', count: '10', exclude_replies: 'true'};
    twitter.getUserTimeline(params, error, function(timeline){
        timeline = JSON.parse(timeline);
        var i = 0;
        for(i = 0; i<10; i++){
            var tweet_lower_case = timeline[i].text.toLowerCase();
            var number_match = tweet_lower_case.search(regex);
             console.log(number_match);
            if(number_match <= 0){
                continue;
            }
            console.log(tweet_lower_case);
            console.log();
        }
    });
    }, 6000);



   */ 

    

    //console.log(x['statuses']);

    // twitter.getMentionsTimeline({ count: '10'}, error, success);

    // twitter.getHomeTimeline({ count: '10'}, error, success);

    // twitter.getReTweetsOfMe({ count: '10'}, error, success);

    // twitter.getTweet({ id: '1111111111'}, error, success);


    //
    // Get 10 tweets containing the hashtag haiku
    //

    //twitter.getSearch({'q':'#parisattacks','count': 10}, error, success);

    //console.log(test);

    //
    // Get 10 popular tweets with a positive attitude about a movie that is not scary 
    //

     //twitter.getSearch({'q':' movie -scary :) since:2013-12-27', 'count': 10, 'result\_type':'popular'}, error, success);
