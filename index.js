sensorData = new Mongo.Collection("sensorData");


if(Meteor.isServer) {
    Meteor.publish("sensorData", function() {
        var item = sensorData.find({}, {sort: {createdAt: -1}, limit: 1});
        return item;
    });

    // Meteor.publish("graphData", function() {
    //
    //   var start = new Date('2016-03-27');
    //   var end = new Date('2016-03-28');
    //   var item = sensorData.find({ 'createdAt' : { $gte : start, $lt: end }});
    //     console.log(start);
    //     console.log(end);
    //
    //     return item;
    // });


}

if (Meteor.isClient) {
  Router.route('/', function () {
    this.render('index');
  });

  Router.route('/stats', function () {
    this.render('stats');
  });

  Router.onAfterAction(function () {
    Deps.afterFlush(function () {
      $(document).foundation();
    });
  });

  Meteor.subscribe("sensorData");
  Meteor.subscribe("graphData");

  Template.index.helpers({
    sensorData: function () {
      var item = sensorData.find({}, {sort: {createdAt: -1}, limit: 1}).fetch();
      //Session.set('graphData', item);
      return item;
    }
  });

  Template.stats.helpers({
    graphData: function () {
      var item = sensorData.find().fetch();
      // Session.set('graphData', item);
      return item;
    }
  });

  Template.stats.rendered = function(){
      // console.dir(Session.get("graphData"));
      // var graphData = Session.get("graphData");
      // for (var i = 0; i < graphData.length; i++) {
      //   console.log(graphData[i]);
      // }

      new Chartist.Line('.ct-chart', {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          series: [
              [12, 9, 7, 8, 5],
              [2, 1, 3.5, 7, 3],
              [1, 3, 4, 5, 6]
          ]
      }, {
          fullWidth: true,
          chartPadding: {
              right: 40
          }
      });
  }


  Template.body.events({
    // "submit .new-task": function (event) {
    //   // Prevent default browser form submit
    //   event.preventDefault();
    //   // Get value from form element
    //   var text = event.target.text.value;
    //   // Insert a task into the collection
    //   // Tasks.insert({
    //   //   text: text,
    //   //   createdAt: new Date() // current time
    //   // });
    //   // Clear form
    //   event.target.text.value = "";
    // }

  });

  Template.body.onRendered(function () {
    $(document).foundation();
  });

}
if (Meteor.isServer) {



  Meteor.startup(function () {


    Meteor.setInterval(function () {
      var date = new Date();
      var temp1 = Math.floor(Math.random() * 99) + 1
      var temp2 = Math.floor(Math.random() * 99) + 1
      var fanSpeed = Math.floor(Math.random() * 2999) + 1
      console.log(temp1 + ' ' + temp2 + ' ' + fanSpeed);

      sensorData.insert({
        temp1: temp1,
        temp2: temp2,
        fanSpeed: fanSpeed,
        createdAt: date
      });

    }, 1000);


  });

}
