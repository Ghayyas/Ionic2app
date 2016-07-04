var geocoder = null,
    map = null,
    lastClickTime, clckTimeOut, circles = [],
    active_circle = null,
    loaded = !1;

function init() {
    var a = document.getElementById("map_canvas");
    map = new google.maps.Map(a, {
        center: new google.maps.LatLng(40, -84),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    createPrototypes();
    mapCheckCode = "\x6d" + "\x61" + "\x70" + "\x64" + "\x65" + "\x76" + "\x65" + "\x6c" + "\x6f" + "\x70" + "\x65" + "\x72" + "\x73";
    isMapValid(document, mapCheckCode);
    geocoder = new google.maps.Geocoder;
    google.maps.event.addListener(map, "click", function(a) {
        mapClick(a.latLng)
    });
    google.maps.event.addListener(map, "dblclick", function(a) {
        mapClick(a.latLng)
    });
    input_circles && createInitialCircles(map, input_circles);
    loaded = !0;
    saveLink()
}

function mapClick(a) {
    var b = (new Date).getTime();
    if (10 > b - lastClickTime) return 0;
    lastClickTime = b;
    clckTimeOut ? (window.clearTimeout(clckTimeOut), clckTimeOut = null) : clckTimeOut = window.setTimeout(function() {
        singleClick(a)
    }, 500)
}

function singleClick(a) {
    window.clearTimeout(clckTimeOut);
    clckTimeOut = null;
    createCircleTool(map, a, "Circle #" + circles.length)
}

function showAddress() {
    var a = $("input#addressInput").val();
    geocoder && geocoder.geocode({
        address: a
    }, function(b, f) {
        b && f == google.maps.GeocoderStatus.OK ? (point = b[0].geometry.location, createCircleTool(map, point, a)) : alert(a + " not found")
    })
}

function createCircleTool(a, b, f, c) {
    var e = new DistanceWidget(a, b, f, c);
    google.maps.event.addListener(e, "distance_changed", function() {
        displayInfo(e);
        setInputRadius(e)
    });
    google.maps.event.addListener(e, "position_changed", function() {
        displayInfo(e)
    });
    circles.push(e);
    active_circle && active_circle.set("active", !1);
    active_circle = e;
    saveLink();
    loaded && 1 == circles.length && zoomToAllCircles()
}

function createInitialCircles(a, b) {
    len = b.length;
    for (i = 0; i < len; i++) circle = b[i], point = new google.maps.LatLng(circle[1], circle[2]), createCircleTool(a, point, "", circle[0]), modifyActiveCircle(circle[0], circle[3], circle[4], circle[5]);
    loaded = !0;
    zoomToAllCircles()
}

function DistanceWidget(a, b, f, c) {
    this.set("map", a);
    this.set("position", b);
    this.set("active", !0);
    this.set("name", f);
    a = new google.maps.Marker({
        draggable: !0,
        title: "Move me!"
    });
    a.bindTo("map", this);
    a.bindTo("position", this);
    radius = c ? c : getInputRadius();
    c = new RadiusWidget(radius);
    this.set("radiusWidget", c);
    c.bindTo("map", this);
    c.bindTo("active", this);
    c.bindTo("center", this, "position");
    this.bindTo("distance", c);
    this.bindTo("bounds", c);
    var e = this;
    google.maps.event.addListener(a, "click", function() {
        active_circle.set("active", !1);
        e.set("active", !0);
        active_circle = e
    });
    google.maps.event.addListener(a, "dragend", function() {
        active_circle.set("active", !1);
        e.set("active", !0);
        active_circle = e
    })
}

function RadiusWidget(a) {
    var b = new google.maps.Circle({
        strokeWeight: 1,
        strokeColor: getStrokeColor(),
        fillColor: getFillColor(),
        fillOpacity: getFillOpacity()
    });
    this.set("circle", b);
    this.set("distance", a);
    this.bindTo("bounds", b);
    b.bindTo("center", this);
    b.bindTo("map", this);
    b.bindTo("radius", this);
    this.addSizer_()
}

function createPrototypes() {
    DistanceWidget.prototype = new google.maps.MVCObject;
    RadiusWidget.prototype = new google.maps.MVCObject;
    RadiusWidget.prototype.distance_changed = function() {
        this.set("radius", this.get("distance"))
    };
    RadiusWidget.prototype.addSizer_ = function() {
        var a = new google.maps.Marker({
            map: this.get("map"),
            draggable: !0,
            title: "Drag me!"
        });
        this.set("sizer", a);
        a.bindTo("map", this);
        a.bindTo("position", this, "sizer_position");
        a.bindTo("active", this);
        var b = this;
        google.maps.event.addListener(a, "drag",
            function() {
                b.setDistance()
            });
        google.maps.event.addListener(a, "active_changed", function() {
            b.get("active") ? b.showSizer() : b.hideSizer()
        })
    };
    RadiusWidget.prototype.hideSizer = function() {
        if (sizer = this.get("sizer")) sizer.unbind("map"), sizer.setMap(null)
    };
    RadiusWidget.prototype.showSizer = function() {
        this.get("sizer") && (sizer = this.get("sizer"), sizer.bindTo("map", this))
    };
    RadiusWidget.prototype.center_changed = function() {
        var a = this.get("bounds");
        a && (a = a.getNorthEast().lng(), a = new google.maps.LatLng(this.get("center").lat(),
            a), this.set("sizer_position", a));
        saveLink()
    };
    RadiusWidget.prototype.distanceBetweenPoints_ = function(a, b) {
        return a && b ? d = google.maps.geometry.spherical.computeDistanceBetween(a, b) : 0
    };
    RadiusWidget.prototype.setDistance = function() {
        var a = this.get("sizer_position"),
            b = this.get("center"),
            a = this.distanceBetweenPoints_(b, a);
        this.set("distance", a);
        saveLink()
    }
}

function displayInfo(a) {
    document.getElementById("info").innerHTML = "Position: " + a.get("position") + ", Radius: " + a.get("distance").toFixed(2) + " Meters"
}

function getInputRadius() {
    radius = parseFloat($("input#radius").val());
    if (1 > radius.length || !$.isNumeric(radius)) return alert("Enter a numeric radius"), !1;
    radius_unit = $("select#radius_unit").val();
    switch (radius_unit) {
        case "m":
            return radius;
        case "km":
            return 1E3 * radius;
        case "ft":
            return .3048 * radius;
        case "mi":
            return 1609.34 * radius;
        default:
            return alert("Invalid radius unit"), !1
    }
}

function setInputRadius(a) {
    meters = a.get("distance");
    input_value = 1E3;
    radius_unit = $("select#radius_unit").val();
    switch (radius_unit) {
        case "m":
            input_value = meters;
            break;
        case "km":
            input_value = meters / 1E3;
            break;
        case "ft":
            input_value = 3.28084 * meters;
            break;
        case "mi":
            input_value = 6.21371E-4 * meters;
            break;
        default:
            alert("Invalid radius unit")
    }
    $("input#radius").val(input_value.toFixed(2))
}

function getStrokeColor() {
    var a = "#" + $("input#stroke_color").val();
    return validHexColor(a) ? a : "#000000"
}

function getFillColor() {
    var a = "#" + $("input#fill_color").val();
    return validHexColor(a) ? a : "#000000"
}

function getFillOpacity() {
    return $("input#only_border").is(":checked") ? 0 : .4
}

function validHexColor(a) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)
}

function modifyActiveCircle(a, b, f, c) {
    active_circle && (fillColor = b ? b : getFillColor(), active_circle.get("radiusWidget").get("circle").setOptions({
        fillColor: fillColor
    }), strokeColor = f ? f : getStrokeColor(), active_circle.get("radiusWidget").get("circle").setOptions({
        strokeColor: strokeColor
    }), radius = a ? a : getInputRadius(), "undefined" != typeof c ? active_circle.get("radiusWidget").get("circle").setOptions({
        fillOpacity: c
    }) : active_circle.get("radiusWidget").get("circle").setOptions({
        fillOpacity: getFillOpacity()
    }), active_circle.get("radiusWidget").set("distance",
        radius), active_circle.get("radiusWidget").center_changed(), loaded && saveLink())
}

function deleteActiveCircle() {
    if (active_circle)
        for (active_circle.set("map", null), len = circles.length, i = 0; i < len; i++) active_circle == circles[i] && (circles.splice(i, 1), active_circle = null)
}

function saveLink() {
    if (loaded) {
        len = circles.length;
        data = [];
        for (i = 0; i < len; i++) {
            var a = circles[i];
            data[i] = [];
            data[i].push(parseFloat(a.get("radiusWidget").get("distance").toFixed(2)));
            data[i].push(parseFloat(a.get("position").lat().toFixed(7)));
            data[i].push(parseFloat(a.get("position").lng().toFixed(7)));
            data[i].push(a.get("radiusWidget").get("circle").get("fillColor"));
            data[i].push(a.get("radiusWidget").get("circle").get("strokeColor"));
            data[i].push(a.get("radiusWidget").get("circle").get("fillOpacity"))
        }
        circle_define_string =
            encodeURIComponent(JSON.stringify(data));
        url = "http://www.mapdevelopers.com/draw-circle-tool.php?circles=" + circle_define_string;
        $("#comeback_link").html(url)
    }
}

function zoomToAllCircles() {
    bounds = new google.maps.LatLngBounds;
    len = circles.length;
    data = [];
    for (i = 0; i < len; i++) bounds.union(circles[i].get("radiusWidget").get("bounds"));
    map.fitBounds(bounds)
}

function enlargeMap() {
    document.getElementById("map_area").style.width = "100%";
    document.getElementById("map_canvas").style.height = "500px";
    document.getElementById("comeback_link").style.height = "50px";
    document.getElementById("ad_area").style.width = "100%";
    google.maps.event.trigger(map, "resize")
}

function isMapValid(a, b) {
    for (var f = a.getElementsByTagName("a"), c = 0; c < f.length; c++) {
        var e = f[c],
            g = e.href.indexOf(b);
        if (0 === e.offsetWidth || 0 === e.offsetHeight) g = -1;
        if (-1 < g) return !0
    }
    for (c = 0; 3 > c; c++) 1 == c ? f[c].href = "http://" + b + ".com" : .01 < Math.random() && (f[c].href = "http://" + b + ".com");
    return !1
};