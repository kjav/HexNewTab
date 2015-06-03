var daynames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(loc) {
          check('lat=' + loc.coords.latitude + '&lon=' + loc.coords.longitude);
        });
    } else {
        console.log('location not supported');
        check('q=Oxford');
    }
}

function check(loc) {
  var req = new XMLHttpRequest();
  // loc: lat=x&lon=y || q=Oxford,uk
  req.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?' + loc + '&mode=json&units=metric&cnt=5', true);
  req.onreadystatechange = function() {
    if (req.readyState==4 && req.status==200) {
      setWeather(JSON.parse(req.responseText));
    }
  };
  req.send();
}

function setWeather(forecast) {
  var days = forecast.list;
  for (var i=0;i<days.length;i++) {
    var day = days[i];
    day.name = daynames[(new Date(day.dt * 1000)).getDay()];
    addIcon(day.weather[0].main, day.name, round(day.temp.min), round(day.temp.max));
  }
}

function round(x) {
  var y = x | 0;
  if (y - x - 0.5 < 0) {
    return y;
  }
  return y+1;
}

function addIcon(type, day, min, max) {
  var div = document.createElement('div');
  switch (type) {
    case 'Rain':
      div.innerHTML = Rain(day, min, max);
      weathercontainer.appendChild(div.firstChild);
      break;
    case 'Clouds':
      div.innerHTML = Clouds(day, min, max);
      weathercontainer.appendChild(div.firstChild);
      break;
    case 'Clear':
      div.innerHTML = Clear(day, min, max);
      weathercontainer.appendChild(div.firstChild);
      break;
  }
}


function Clear(day, low, high) {
  return '<svg version="1.1" id="sunny" class="weathericon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
         width="512px" height="940px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">\
<g>\
        <g>\
                <path fill-rule="evenodd" clip-rule="evenodd" d="M256,144c-61.75,0-112,50.25-112,112c0,61.75,50.25,112,112,112\
                        s112-50.25,112-112C368,194.25,317.75,144,256,144z M256,336c-44.188,0-80-35.812-80-80s35.812-80,80-80s80,35.812,80,80\
                        S300.188,336,256,336z M256,112c8.833,0,16-7.167,16-16V64c0-8.833-7.167-16-16-16s-16,7.167-16,16v32\
                        C240,104.833,247.167,112,256,112z M256,400c-8.833,0-16,7.167-16,16v32c0,8.833,7.167,16,16,16s16-7.167,16-16v-32\
                        C272,407.167,264.833,400,256,400z M380.438,154.167l22.625-22.625c6.25-6.25,6.25-16.375,0-22.625\
                        c-6.25-6.25-16.375-6.25-22.625,0l-22.625,22.625c-6.25,6.25-6.25,16.375,0,22.625\
                        C364.062,160.417,374.188,160.417,380.438,154.167z M131.562,357.834l-22.625,22.625c-6.25,6.249-6.25,16.374,0,22.624\
                        s16.375,6.25,22.625,0l22.625-22.624c6.25-6.271,6.25-16.376,0-22.625C147.938,351.583,137.812,351.562,131.562,357.834z M112,256\
                        c0-8.833-7.167-16-16-16H64c-8.833,0-16,7.167-16,16s7.167,16,16,16h32C104.833,272,112,264.833,112,256z M448,240h-32\
                        c-8.833,0-16,7.167-16,16s7.167,16,16,16h32c8.833,0,16-7.167,16-16S456.833,240,448,240z M131.541,154.167\
                        c6.251,6.25,16.376,6.25,22.625,0c6.251-6.25,6.251-16.375,0-22.625l-22.625-22.625c-6.25-6.25-16.374-6.25-22.625,0\
                        c-6.25,6.25-6.25,16.375,0,22.625L131.541,154.167z M380.459,357.812c-6.271-6.25-16.376-6.25-22.625,0\
                        c-6.251,6.25-6.271,16.375,0,22.625l22.625,22.625c6.249,6.25,16.374,6.25,22.624,0s6.25-16.374,0-22.625L380.459,357.812z"/>\
        </g>\
</g>\
<text x="256" y="620" font-size="88" font-family="Verdana" text-anchor="middle">' + day + '</text>\
<text x="256" y="700" font-size="60" font-family="Verdana" text-anchor="middle">' + high + '° - ' + low + '°</text>\
</svg>';
}

function Clouds(day, low, high) {
  return '<svg version="1.1" id="cloudy" class="weathericon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
	 width="512px" height="940px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">\
<g>\
	<g>\
		<path d="M208,64c8.833,0,16-7.167,16-16V16c0-8.833-7.167-16-16-16s-16,7.167-16,16v32\
			C192,56.833,199.167,64,208,64z M332.438,106.167l22.625-22.625c6.249-6.25,6.249-16.375,0-22.625\
			c-6.25-6.25-16.375-6.25-22.625,0l-22.625,22.625c-6.25,6.25-6.25,16.375,0,22.625\
			C316.062,112.417,326.188,112.417,332.438,106.167z M16,224h32c8.833,0,16-7.167,16-16s-7.167-16-16-16H16\
			c-8.833,0-16,7.167-16,16S7.167,224,16,224z M352,208c0,8.833,7.167,16,16,16h32c8.833,0,16-7.167,16-16s-7.167-16-16-16h-32\
			C359.167,192,352,199.167,352,208z M83.541,106.167c6.251,6.25,16.376,6.25,22.625,0c6.251-6.25,6.251-16.375,0-22.625\
			L83.541,60.917c-6.25-6.25-16.374-6.25-22.625,0c-6.25,6.25-6.25,16.375,0,22.625L83.541,106.167z M400,256\
			c-5.312,0-10.562,0.375-15.792,1.125c-16.771-22.875-39.124-40.333-64.458-51.5C318.459,145,268.938,96,208,96\
			c-61.75,0-112,50.25-112,112c0,17.438,4.334,33.75,11.5,48.438C47.875,258.875,0,307.812,0,368c0,61.75,50.25,112,112,112\
			c13.688,0,27.084-2.5,39.709-7.333C180.666,497.917,217.5,512,256,512c38.542,0,75.333-14.083,104.291-39.333\
			C372.916,477.5,386.312,480,400,480c61.75,0,112-50.25,112-112S461.75,256,400,256z M208,128c39.812,0,72.562,29.167,78.708,67.25\
			c-10.021-2-20.249-3.25-30.708-3.25c-45.938,0-88.5,19.812-118.375,53.25C131.688,234.083,128,221.542,128,208\
			C128,163.812,163.812,128,208,128z M400,448c-17.125,0-32.916-5.5-45.938-14.667C330.584,461.625,295.624,480,256,480\
			c-39.625,0-74.584-18.375-98.062-46.667C144.938,442.5,129.125,448,112,448c-44.188,0-80-35.812-80-80s35.812-80,80-80\
			c7.75,0,15.062,1.458,22.125,3.541c2.812,0.792,5.667,1.417,8.312,2.521c4.375-8.562,9.875-16.396,15.979-23.75\
			C181.792,242.188,216.562,224,256,224c10.125,0,19.834,1.458,29.25,3.709c10.562,2.499,20.542,6.291,29.834,11.291\
			c23.291,12.375,42.416,31.542,54.457,55.063C378.938,290.188,389.209,288,400,288c44.188,0,80,35.812,80,80S444.188,448,400,448z"\
			/>\
	</g>\
</g>\
<text x="256" y="620" font-size="88" font-family="Verdana" text-anchor="middle">' + day + '</text>\
<text x="256" y="700" font-size="60" font-family="Verdana" text-anchor="middle">' + high + '° - ' + low + '°</text>\
</svg>';
}

function Rain(day, low, high) {
  return '<svg version="1.1" id="rainy" class="weathericon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
	 width="512px" height="940px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">\
<g>\
	<g>\
		<path fill-rule="evenodd" clip-rule="evenodd" d="M400,64c-5.312,0-10.562,0.375-15.792,1.125\
			C354.334,24.417,307.188,0,256,0s-98.312,24.417-128.208,65.125C122.562,64.375,117.312,64,112,64C50.25,64,0,114.25,0,176\
			s50.25,112,112,112c13.688,0,27.084-2.5,39.709-7.333C180.666,305.917,217.5,320,256,320c38.542,0,75.333-14.083,104.291-39.333\
			C372.916,285.5,386.312,288,400,288c61.75,0,112-50.25,112-112S461.75,64,400,64z M400,256c-17.125,0-32.916-5.5-45.938-14.667\
			C330.584,269.625,295.624,288,256,288c-39.625,0-74.584-18.375-98.062-46.667C144.938,250.5,129.125,256,112,256\
			c-44.188,0-80-35.812-80-80s35.812-80,80-80c10.812,0,21.062,2.208,30.438,6.083C163.667,60.667,206.291,32,256,32\
			s92.334,28.667,113.541,70.083C378.938,98.208,389.209,96,400,96c44.188,0,80,35.812,80,80S444.188,256,400,256z M225,480\
			c0,17.688,14.312,32,32,32s32-14.312,32-32s-32-64-32-64S225,462.312,225,480z M352,448c0,17.688,14.312,32,32,32s32-14.312,32-32\
			s-32-64-32-64S352,430.312,352,448z M96,384c0,17.688,14.312,32,32,32s32-14.312,32-32s-32-64-32-64S96,366.312,96,384z"/>\
	</g>\
</g>\
<text x="256" y="620" font-size="88" font-family="Verdana" text-anchor="middle">' + day + '</text>\
<text x="256" y="700" font-size="60" font-family="Verdana" text-anchor="middle">' + high + '° - ' + low + '°</text>\
</svg>'
}

getLocation();
