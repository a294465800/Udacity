/*
This is empty on purpose! Your code to build the resume will go here.
 */
$(function () {

  //save the globalData here that I can use everywhere
  var globalData = {

    //my data
    bio: {
      name: 'SHINING',
      role: 'font-end engineer',
      contacts: {
        mobile: 18142883149,
        email: 'jack7770126@gmail.com',
        github: 'https://github.com/a294465800',
        blog: 'none',
        twitter: 'none',
        location: 'Shiqiao, Guangzhou, Guangdong, China'
      },
      welcomeMessage: 'This is my resume!',
      skills: ['HTML', 'CSS', 'JavaScript'],
      biopic: 'https://avatars1.githubusercontent.com/u/25625618?v=4&u=67b1230b9108bf2371fa2e270510c1802912165a&s=400',
      display: function () {}
    },
    education: {
      schools: [{
        name: 'GuangDong University of Technology',
        location: 'Guangdong University of Technology (South Gate 1), Daxuecheng Outer Ring West Road, Guangzhou, Guangdong, China',
        degree: 'Undergraduate',
        major: 'network engineering',
        dates: '2013-09-01-2017-07-31',
        url: 'gdut.edu.cn'
      }],
      onlineCourses: [{
        title: 'How to Use Git and Github in work',
        school: 'Udacity',
        dates: 'July 20, 2017 - July 26, 2017',
        url: 'https://cn.udacity.com/course/how-to-use-git-and-github--ud775'
      }],
      display: function () {}
    },
    work: {
      jobs: [{
        employer: 'Guangzhou Company of Sennki Infomation Technology',
        title: 'Sennki',
        location: 'Shiqiao, Guangzhou, Guangdong, China',
        dates: 'from 2017-05-01 till now',
        description: "It's a very funny company!",
      }],
      display: function () {}
    },

    projects: {
      projects: [{
        title: 'Pet APP',
        dates: 'Jun 18,2017 - Aug 9, 2017',
        description: "It's a WeChat's application, it provides services about pets,like Booking service and grouping buy.",
        images: [
          'http://www.tanews.org.tw/sites/default/files/0207-1.jpg',
          'http://www.feerie.com.tw/ezfiles/50/1050/img/261/edm02.jpg',
          'http://img6.faloo.com/Picture/0x0/0/449/449787.jpg'
        ]
      }],
      display: function () {}
    },

    //template
    template: {
      bio: {
        HTMLheaderName: '<h1 id="name">%data%</h1>',
        HTMLheaderRole: '<span>%data%</span><hr>',
        HTMLcontactGeneric: '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>',
        HTMLmobile: '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>',
        HTMLemail: '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>',
        HTMLtwitter: '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>',
        HTMLgithub: '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>',
        HTMLblog: '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>',
        HTMLlocation: '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>',
        HTMLbioPic: '<img src="%data%" class="biopic">',
        HTMLwelcomeMsg: '<span class="welcome-message">%data%</span>',
        HTMLskillsStart: '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-column"></ul>',
        HTMLskills: '<li class="flex-item"><span class="white-text">%data%</span></li>',
      },
      work: {
        HTMLworkStart: '<div class="work-entry">%data%</div>',
        HTMLworkEmployer: '<a href="#">%data%',
        HTMLworkTitle: ' - %data%</a>',
        HTMLworkDates: '<div class="date-text">%data%</div>',
        HTMLworkLocation: '<div class="location-text">%data%</div>',
        HTMLworkDescription: '<p><br>%data%</p>',
      },
      project: {
        HTMLprojectStart: '<div class="project-entry">%data%</div>',
        HTMLprojectTitle: '<a href="#">%data%</a>',
        HTMLprojectDates: '<div class="date-text">%data%</div>',
        HTMLprojectDescription: '<p><br>%data%</p>',
        HTMLprojectImage: '<img src="%data%">',
      },
      education: {
        HTMLschoolStart: '<div class="education-entry">%data%</div>',
        HTMLschoolName: '<a href="#">%data%',
        HTMLschoolDegree: ' -- %data%</a>',
        HTMLschoolDates: '<div class="date-text">%data%</div>',
        HTMLschoolLocation: '<div class="location-text">%data%</div>',
        HTMLschoolMajor: '<em><br>Major: %data%</em>',

        HTMLonlineClasses: '<h3>Online Classes</h3>',
        HTMLonlineTitle: '<a href="#">%data%',
        HTMLonlineSchool: ' - %data%</a>',
        HTMLonlineDates: '<div class="date-text">%data%</div>',
        HTMLonlineURL: '<br><a href="#">%data%</a>',
      }
    },

    //about google map
    googleMap: '<div id="map"></div>',
    map: null
  }

  var bioFunc = {
    init: function () {
      this.template = globalData.template
      this.bioData = globalData.bio

      this.$header = $('#header')
      this.$topContacts = $('#topContacts')
      this.$workExperience = $('#workExperience')
      this.$projects = $('#projects')
      this.$education = $('#education')
      this.$footerContacts = $('#footerContacts')

      this.render()
    },

    //set header block
    setHeader: function () {
      var template = this.template.bio,
        HTMLName = template.HTMLheaderName.replace(/%data%/, this.bioData.name),
        HTMLRole = template.HTMLheaderRole.replace(/%data%/, this.bioData.role)
      $(HTMLName + HTMLRole).insertBefore(this.$topContacts)
    },

    //set contact block
    setContact: function () {
      var template = this.template.bio,
        re = /%data%/,
        contacts = this.bioData.contacts,
        HTML = template.HTMLmobile.replace(re, contacts.mobile) +
        template.HTMLemail.replace(re, contacts.email) +
        template.HTMLtwitter.replace(re, contacts.twitter) +
        template.HTMLgithub.replace(re, contacts.github) +
        template.HTMLblog.replace(re, contacts.blog) +
        template.HTMLlocation.replace(re, contacts.location)

      this.$topContacts.html(HTML)
    },

    //set skills block
    setSkills: function () {
      var template = this.template.bio,
        re = /%data%/,
        HTML = template.HTMLbioPic.replace(re, this.bioData.biopic) +
        template.HTMLwelcomeMsg.replace(re, this.bioData.welcomeMessage) +
        template.HTMLskillsStart,
        tmp = ''
      this.$header.append($(HTML))
      this.bioData.skills.forEach(function (item) {
        tmp += template.HTMLskills.replace(re, item)
      })
      var $skills = $('#skills')
      $skills.html(tmp)
    },

    //set work experience block
    setWork: function () {
      var template = this.template.work,
        re = /%data%/,
        data = globalData.work,
        HTMLWrap = template.HTMLworkStart
      HTML = ''
      data.jobs.forEach(function (item) {
        HTML += template.HTMLworkEmployer.replace(re, item.employer) +
          template.HTMLworkTitle.replace(re, item.title) +
          template.HTMLworkDates.replace(re, item.dates) +
          template.HTMLworkLocation.replace(re, item.location) +
          template.HTMLworkDescription.replace(re, item.description)
      })

      this.$workExperience.append($(HTMLWrap.replace(re, HTML)))
    },

    //set project block
    setProject: function () {
      var data = globalData.projects.projects,
        template = this.template.project,
        re = /%data%/,
        HTMLWrap = template.HTMLprojectStart,
        HTML = ''
      data.forEach(function (item) {
        HTML += template.HTMLprojectTitle.replace(re, item.title) +
          template.HTMLprojectDates.replace(re, item.dates) +
          template.HTMLprojectDescription.replace(re, item.description)
        item.images.forEach(function (img) {
          HTML += template.HTMLprojectImage.replace(re, img)
        })
      })

      this.$projects.append($(HTMLWrap.replace(re, HTML)))
    },

    //set education block
    setEducation: function () {
      var template = this.template.education,
        re = /%data%/,
        data = globalData.education,
        HTMLWrap = template.HTMLschoolStart
      HTML = ''

      data.schools.forEach(function (school) {
        HTML += template.HTMLschoolName.replace(re, school.name).replace('#', school.url) +
          template.HTMLschoolDegree.replace(re, school.degree) +
          template.HTMLschoolDates.replace(re, school.dates) +
          template.HTMLschoolLocation.replace(re, school.location) +
          template.HTMLschoolMajor.replace(re, school.major)
      })
      HTML += template.HTMLonlineClasses
      data.onlineCourses.forEach(function (course) {
        HTML += template.HTMLonlineTitle.replace(re, course.title).replace('#', course.url) +
          template.HTMLonlineSchool.replace(re, course.school) +
          template.HTMLonlineDates.replace(re, course.dates) +
          template.HTMLonlineURL.replace(re, course.url).replace('#', course.url)
      })

      this.$education.append($(HTMLWrap.replace(re, HTML)))
    },

    //set footer
    setFooter: function () {
      var template = this.template.bio,
        re = /%data%/,
        contacts = this.bioData.contacts,
        HTML = template.HTMLmobile.replace(re, contacts.mobile) +
        template.HTMLemail.replace(re, contacts.email) +
        template.HTMLtwitter.replace(re, contacts.twitter) +
        template.HTMLgithub.replace(re, contacts.github) +
        template.HTMLlocation.replace(re, contacts.location)

      this.$footerContacts.html(HTML)
    },

    render: function () {
      this.setHeader()
      this.setContact()
      this.setSkills()
      this.setWork()
      this.setProject()
      this.setEducation()
      this.setFooter()
    }
  }

  //init the Google Map
  var GoogleMap = {
    init: function () {
      var $mapBody = globalData.googleMap,
        $mapDiv = $('#mapDiv')

      $mapDiv.append($mapBody)
      this.initializeMap()
    },

    initializeMap: function () {

      var locations;
      var mapOptions = {
        disableDefaultUI: true,
        zoom: 4,
        center: {
          lat: -25.363,
          lng: 131.044
        }
      };

      /*
      For the map to be displayed, the googleMap var must be
      appended to #mapDiv in resumeBuilder.js.
      */
      globalData.map = new google.maps.Map(document.querySelector('#map'), mapOptions);

      /*
      locationFinder() returns an array of every location string from the JSONs
      written for bio, education, and work.
      */
      function locationFinder() {

        // initializes an empty array
        var locations = [];

        // adds the single location property from bio to the locations array
        locations.push(globalData.bio.contacts.location);

        // iterates through school locations and appends each location to
        // the locations array. Note that forEach is used for array iteration
        // as described in the Udacity FEND Style Guide:
        // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
        globalData.education.schools.forEach(function (school) {
          locations.push(school.location);
        });

        // iterates through work locations and appends each location to
        // the locations array. Note that forEach is used for array iteration
        // as described in the Udacity FEND Style Guide:
        // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
        globalData.work.jobs.forEach(function (job) {
          locations.push(job.location);
        });

        return locations;
      }

      /*
      createMapMarker(placeData) reads Google Places search results to create map pins.
      placeData is the object returned from search results containing information
      about a single location.
      */
      function createMapMarker(placeData) {

        // The next lines save location data from the search result object to local variables
        var lat = placeData.geometry.location.lat(); // latitude from the place service
        var lon = placeData.geometry.location.lng(); // longitude from the place service
        var name = placeData.formatted_address; // name of the place from the place service
        var bounds = window.mapBounds; // current boundaries of the map window

        // marker is an object with additional data about the pin for a single location
        var marker = new google.maps.Marker({
          map: globalData.map,
          position: placeData.geometry.location,
          title: name
        });


        // infoWindows are the little helper windows that open when you click
        // or hover over a pin on a map. They usually contain more information
        // about a location.
        var infoWindow = new google.maps.InfoWindow({
          content: name
        });

        // hmmmm, I wonder what this is about...
        google.maps.event.addListener(marker, 'click', function () {
          // your code goes here!
        });

        // this is where the pin actually gets added to the map.
        // bounds.extend() takes in a map location object
        bounds.extend(new google.maps.LatLng(lat, lon));
        // fit the map to the new marker
        globalData.map.fitBounds(bounds);
        // center the map
        globalData.map.setCenter(bounds.getCenter());
      }

      /*
      callback(results, status) makes sure the search returned results for a location.
      If so, it creates a new map marker for that location.
      */
      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          createMapMarker(results[0]);
        }
      }

      /*
      pinPoster(locations) takes in the array of locations created by locationFinder()
      and fires off Google place searches for each location
      */
      function pinPoster(locations) {

        // creates a Google place search service object. PlacesService does the work of
        // actually searching for location data.
        var service = new google.maps.places.PlacesService(globalData.map);

        // Iterates through the array of locations, creates a search object for each location
        locations.forEach(function (place) {
          // the search request object
          var request = {
            query: place
          };

          // Actually searches the Google Maps API for location data and runs the callback
          // function with the search results after each search.
          service.textSearch(request, callback);
        });
      }

      // Sets the boundaries of the map based on pin locations
      window.mapBounds = new google.maps.LatLngBounds();

      // locations is an array of location strings returned from locationFinder()
      locations = locationFinder();

      // pinPoster(locations) creates pins on the map for each location in
      // the locations array
      pinPoster(locations);

    }
  }

  var app = {
    init: function () {
      bioFunc.init()
      GoogleMap.init()
    }
  }

  app.init()
})