var tableNumber = null;

AFRAME.registerComponent("markerhandler", {
  init: async function () {
    if (tableNumber === null) {
      this.askTableNumber();
    }

    var dishes = await this.getDishes();

    this.el.addEventListener("markerFound", () => {
      if (tableNumber !== null) {
        var markerId = this.el.id;
        this.handleMarkerFound(dishes, markerId);
      }
    });

    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });
  },

  askTableNumber: function () {
    var iconUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEBUQEhAWFhUQFRgVFxIWFxgYGBgXFxgXFxgSFRgaHSggGBolHRcYITEhJSkrLi4uFx8zODctNygtLisBCgoKDg0OGxAQGzUlICYuLS0wLy0vKy0vLS8rLS8vLS4tLS0vLS8tLS0wLS0tLS8tLS0tLTU1LS0tLy0tLS0vLf/AABEIAL0BCwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAcDBQYCCAH/xABCEAABAwEEBgYHBQcEAwAAAAABAAIDEQQFEiEGMUFRYZETUnGBodEHFCJTkrHBFSMyQmIzcoKiwuHwFkOyszVE0v/EABsBAQACAwEBAAAAAAAAAAAAAAAEBQECBgMH/8QAOxEAAgECAwQGCAUCBwAAAAAAAAECAxEEITEFEkFRE2FxgZGhBiIyUrHB0fAUFTPh8SOSNENTgqKy4v/aAAwDAQACEQMRAD8AvFERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBEWpvq/YLIzHNIG7mj8Z/dbt7dSw2krs3p05VJKEFdvgjbIqlvb0mTyOwWWIMByDiMTzxA/D3UK5a874tslRLaJCDrYZCP5AcuShzx0F7Kv5HQYf0ZxM7dLJQ6tX4LLzL9ltDGfie0dpAWMW6L3rPjb5r5u6R3WPNfnSu3leX49+75/sWC9Elxrf8f8A0fTTHA6jXsXpfM8c8jTUPcKbQSDzC3Nh0yt0Rq20vI6rz0g7PbrQdi2WPXGPn/B4VfROql/TqJ9qa+G8X+irG5fSkCcNphoOvH9WuPyPcu9uq9obSzHDK1420OY4Obrb3qXTrQqeyyhxmzcThP1YWXPVeK+eZsURF6kEIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiLX3xeDLPA+eT8Mba02k6g0cSaDvWG0s2bRjKclGKu3ku802mmlTLFFQEGaQeww6gNXSP8A07ht5kU4+Sa2TF0khJdmXuOQA27gBuGSx3zeclqnfNIal7qjcBsA4UyU6WJ0cTII2kzWgtyGs4jRjO8/VU1WtKtLq4I+iYDZ9PZ1Hh0j1lytm+5eb16sBle94stjjc5z/Z9ke079TjsbwyFNa6W7PRLPIA602oMr/ttHSU4HMAHsqu/0M0XjsMAbQOmeAZZdrj1RuaNg710qnUcJGKvLU5nHbeqzk40HaPPi+t/fZZHzzarALPJabO1xcIQYw45E4JGtqR3Lp9G/RrZ7ZZY7U+WRr5MVQAwtGFxYKVFdTN60N9Ora7ad7pDzmCtb0c/+Mg/j/wCx6jYaKlNp9fyLnbdepSwkZQdneH/WRxtp9DQ1x20jgYh8w76LTW70WW+IF0cjJQNTQ81Pc8AeKvJFOlh6b4HNU9tYyDyl5L5WZ8xXhZZ7M/BaYHMPFpFeLTqcOxSLqvaSFwlgkLXN6pz7CN3A5L6Kt9gjmYY5Y2vYdbXAEdueo8VUumvo0dDitNiqWNzdCc3NG0t67eBz7dkSrhHHOJ0GB9IoVf6eIWuWej8fg79p2Ghmm0drAhlIZMNn5X/u7nfp5cO1Xy/ZLUagg0ezMtGRBGqhV2ej/SwWuIQyu+/jGf6xl7fFw2jv7PTDYlye5PXg+ZB21sWNGP4nDexxXu/tzXDs07RERTjmQiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIih3hbY4GGWV4Y1oqSfkN54DMoZSbdkTFV3pevfNlkacv2j+JNQ1vcKn+ILFfPpGnleYrHHhGyQgOcf1UPstHbXtC5ie65p3mWearnZlx9onKgrqGoAdyr8RiFUi4Q8TrNkbInhq0cRimo2u1HV34NpGquiAPnY06iansArTwXfeju7Ont0tsePZgq2PdjdVuX7rAfjC5Ft1SQuEsZDy3Omo8RTbktxo/pj6m52FhMcjsToTkWv2mMgHszA1BRKLUJpzLvakKmKoTjh820l53a6rq2uXkXUi4SP0oWTbHKOwMP9QWVvpMsW0Sj+Bv0crT8TS944mWx8cl+kyrZpMT7S7rVPORhVw+jj/xkHY//ALHql7K6onPWb/WxWXoRpdY4bDFDLPgkZiBaWuNKyOcMw0jUQoGEklO8nbJ/I6v0hw9SpQ3KUXJqUdE3luyXAsRFoI9MLC7Vamd+IfMKUzSGyH/24e+Ro+ZVn0kOa8UcVLB4iOtOX9r+htVq76v2Cxsa+0SYA92EZOcSdepoJoBtWQX1ZjqtUJ7JWeaqrSW0G9L2ZZ2upDETGH1ywtzllB1VNKDfRu9bKSPKVOcfai13Gb0n6HNA+0rIBQ0dI1ur2tUzabDXPtrvXE3LeT4ZWWiM0cx1e8awd4pUdhX0YIIzH0QDSzDgwZEYaUw03UyXz3pVcpsVuks/5He3GTtYa4fq0ne1V+Lo29eJ1no9tDpL4WrnllfitLfLs7C+7jvNlpgjnZqeMx1Xfmb3GoWyVP8Aoy0njs3SQTyYI3e21xrQPFARkMqj/irOgvuyvybaYiTs6RteVaqVRrqcU28yj2lsypha8oRi3HVOztbt6tH4myReRvXpe5WBERAEREAREQBERAEREAREQBERAflVSmm2kL7dahBE77qN1GAanGtDId9c6bh2lWdpRM82eaGNwa90TiCd21o4luLPZrVAF2ZIO3Wq3G1r+ou/6HXejGChJzry9pZLqvx79F3naWGxtibhaO07Sd5UlcOLW/rn4ivQvCX3juZ81E6TqOieAm3dyO2UeaxxvzcwE7yM+a5Rlvm2Su5nzWV94Sg0Eh57iR9FnfvwNPwU4vKWfedAbqhP+2PHzXn7Fg92OZ81z4vObV0h8PmvX2rPWmM8h5LG9Hkb/h8R/qebN1NdkbGOLQRiAacyci5tV5muaEAklwA1kuFBzC18Nvke2TG6tGgjIfiDm01BRrTbpJMIf+EGuEUz5fNZvF8DWNKvvP1+3P7+Jsfs+ze+PxM8l7ZcsThVkpPY4H5KV9oWDbA4fwj5h61lstkbZmyWZmEYaOadTu4GtNXJRaWIU5WdNrtRiE8S3bNdtrEk6PbpXcv7odHXe/8AD++fcsQv94NcDcs8sQ7cqr27SFwAowHYNY2U3nNSrU+KMt42/qu/9v0Pz7DeNU3z815luJ51yg034vJehf5914/2QaQ506LxWLQ+7m2/i/vdMB0dk67eZ8l5+wpesOf9lLOkIGuJ3MH6L0NImdQ8wsbsOZt0mL934fJmCyvtsGcckjdvsPdn2hpz5LoLq9JNqiIbaI2yU1kgtfzApzC1LdII9zuQ816feNmkFHfzA/MalvCe57ErEevQjX/xFBS67Z+Ku/NFq3BpXZrXlG+j9sb8nd2x3cV0C+f5LtH7SzyZtNQAc6jMEbj2qwNAtMzKRZLSaSjJrzkX0/K6v5+O3t1zqGKbe7PXnwZy+0diKnB1sM7xWsX7UevrXw68ywERFNOdCIiAIiIAiIgCIiAIiICvdMNJII3zxOeQ9kRAFDQuMfsgHVrIVRAaludPJMVutNfePbyfhHgpOi9wmd3SPqI2HPe49Rv1K57FVoQ3qknldn0nZ9GlgMMpybzjFvttoiBdVxzWg0YzLUXHJo79vYKrq7FoLGB99KSdzSKdn4SfkujxMijoKMYwdgAXOW/TBgOGKPF+p2Q7hrPgqaNXG42Tjh1Zd2XbJ8epdyKnGbcqcJbi6s38/JWJ40RslKCvb/g/yiiWzQhhq6GQ13EgjXXYAR4rWt0snP8AtxU3Ud/9LZWHSxtQJWFn62nE3v2jxUiWB2pRW8vW6k1LyevcmV0NsVFLKq/9yy+BytuumWzupIzbkRq2ajzy15qAdfA1A+Z103nmrdd0dojwvDXNeMnZEEbMXmq40quF1mkyqWP1Hcdx+m9MFtHpn0c1aXk/odLgNorES6OplLyfZ9CJYgcE1ep2ZY2eSjHXsprp/Fr5eC9WD8Ev7n9TFDOtWd8kWkad6ks+RnIq0bzt5/QBfkjqUHZUdlPJYKotbnsqeZKdvqdXGnbuNfqm7iD8gFFqv1Zuaql1klurwrwyyW5unRuac4qYWH8ztops2nOnDJbHRLR4FonmbUHNjDqOr23b27gustNpZGwue4NaP8oBtKqsTtFxn0dFXel9e5Li/LtKLH7S6NuFLhq3ovrbw7TSRaGwDOSRzjuBAFd+QO7es7tD7KRkSONT9QVrbZpiK0iir+p5/pHmozdK56/s4iN1HDxxLZbO2pNbzdn1yXwXw1Ofltmpf9WXdp8CReWgRpihkrwdq+IeS5C2WGSJ2CRhadxHiDqI7F3126VsJAkBicfzVqw9p2d+XFbq8LvitUZY9orrBGuvWYdh+a8HicVg5qGKjlz+jWUvu5aYPbs/8x70eejRUDXkGoNCNoW5dBaOgZbTG7C19GzjI1GeE0zNKZO3ilVDva7HWeUxP2GodsI2EK2rbZWfYAZ+X1Zju/2X/wDJXtCCqxbTytct9oY+NHoZRSkpySv1PW332m90YvT1myxTbXNo/wDfb7LjTZnn2ELcLg/RFNWxyMp+GYkd7W5Dl4rvFcUZudNNnz/aOHWHxVSlHRPLs1XgmERF6kIIiIAiIgCIiAL8X6tffmLoHYe/sXjiKvRUpVLXsm7c7I2hHeko8yvPSXcLZpoZoGhznOPSYSKVFML3cfaOfBbGwWRsMTYm6mCld52uPEmpUvpjq+gWsv6cx2aVw14aA8XENr4rgq+NqbQqxhZRu0lbPN5cTpXWqRw8aUtIX7X29mi5I4rSq/TNJ0bD92w5AbT1z9OHatNCFDDsTu05fRd5o1czSOkcKhrqNHEa3FdrUnQ2fhsl6sckuLb+b1bOfhGeIq2vm/I5bGWjEWOp1qZc9Sk2Wdrxka7x5rtm22FzzECatOEmhw1OQbXty3bFyeld3CzyNnjFA52F7RqzzqBxAPeAo2F2q6tVUq1NwcleN+PkvHie9XBxjBzpz3ra9XmbG4LxMEgjJ+6kNKH8jjqI4HbzXX3pYxaIHxO1gZHdlRru4n5qvZG1YRwXe3Lai6COSubmCp3mlD4hVHpFhVTnDE08m3Z9qzT8L37Ee2z6stFrGzXiV/BcVpY79g4jMFpGRByIPcvbtGJTqjk4hzakd418grK6d2/wHknTu3+A8lV/nVX3Y+f1Ole167e9upPvKz/0tP1HfC7yT/S1o6jvhd5KzOndv8B5J07t/gPJZ/Oqnux8/qZ/OMTyX33FZ/6XtHUPwu8lmu7RiXp2CRhDK1JpTIZkattKd6sbp3b/AAHkvLpSRQnwCw9s1WrWivH6mr2viWmrL6fAxPc1jSTQNYK8A0D5UVZ6QX060Sk1Ia3Jrdw8ztXZ6Y2nBZXU/OQ3uzcfBtFWdlbicB1irv0cwsdyWIet7LqSWfe9O7k2jmMfUd1T4akuKutZnSlmbmOA30y8V2Wjt0sDBK4Cp/DX8oGVe3iplntkE9WsNaktqQcLqCpGevJTK+2HCpONKm5KHtPgueieWvhyzNaWCjKKc57rei1+Zxlnka8ZZhdFovebo3izud7Lv2bj+UjPo+zd/dc/fdhFmtLSzJk1Rh3EGhA4Zg95WSVxDcQ1sIcDxBU2pTpbQw1uEll1P5NO6fPTRkf18PVz1XmjstMbr9Ys4kY2sjDkBtoDib36/wCELWut1sN2+oerO14elz/Zg4sNKa6+GS6az2g4QRqcAeYWTp3b/AeS4XC7Sq4WHRxtx1+B0tLEyhTjTcVJRlvRvfJ8NDF6L7MYbO9kgwvdJ+E6yA0ZjvryXdri2y1qDnUZZZ12Uouvgrhbi10Fe2i6zYu0pYqMoSjbdtmuN7+eRS7Tcp1nWlrJmVERXhWhERAEREAREQBERARvU4/dt+ELQ6cXc11gnwMaHNaH1AFaMc158GldOscjA4FpFQ4EEHaDkQtFThe9l4I235cz5cYcLv3T8irL0XtjXMLAc8WIcQafJcppro2+xWlzaEsd7THdZmzPeNR57Vrbvt7o6UJoMxnQg7wdijY7BxxdB0m7cU+TX20+09KFZ0pqSO9j0ca2fphIcOLHgptrioTXMV2UWp07tIeWWdpq7EHO4ZECvMnuUJ2kU5bhErh3NrzpVa+JueI5k7TrUDDbOxHTxq4qopbuUUvnkvnfK7yzkVMTT6NwpRtfW/2/2JpdRpO4K4tE7ua2w2cPjbi6JpNQK1cMVDzVY6K3K622hsdPuoyHTO2Ydkfa7VzOxXaArmUVLVEJNrQwepx+7Z8IT1OP3bPhCkIteih7q8EbdJPmyP6nH7tnwhPU4/ds+EKQidFD3V4IdJLmyP6nH7tnwhPU4/ds+EKQidFD3V4IdJLmzhvSndwN3lzWgdHI0kgAZODmfN4VKWGXC9pOw5/VfTN5WNs8L4Xj2ZWlp7xrHEa+5fO2kVyyWS0PikGbTr2EHU9v6T5jYt0ktDRu+pYNxTtfD0e1gwkcDqd2UWC6tHmwy9J0hcBXC2lKVBFXGueRO5cNd95vjpQnLUQaEcOI4LYz3/O9uHpXUO4NB5gVVDX2ViVUqfhqijGp7SfXe9snzfGLtkyfDFU92PSRu46GfS20CW0sjaaiIkuPGoy/lHNR5qlhAFS7IDeTsUSBoHftXYej+4zabS2dw+5szsVdj5Bm1o30yce7erjDUI4elGlHRfy/P6EStVdWbm+P8FoWW72NjYwsbVrWtrhGwALN6nH7tnwhSEW/RQ91eCNd+XN+JHZZGA1EbQd4AUhEW0YqOSRhtvUIiLYwEREAREQBERAeSdwWFz39X6qQiAhmV+7wXgzO3+CnogNDfF3x2qPopm4m6wdRaes07Cq1vf0bzMJMDhI3YKhj+8H2T2g9yuhecI3ICg2aI22tPVn/AMtOdaLfXR6P53kGd4ibta0hzzwy9kdtT2K3cA3DknRjcOSA0t2XfHZ4xFC3C0cydrnHaeKlVU/om9Uck6FvVCAgVRT+hb1QnRN3BAQEU/oW7k6Bu5AQEqp/RN3BOhb1QgIFVq7/ALihtjMEozb+GQfibXdvHA5Lo+hb1QnRN6o5IClLz9HVpjJMWGVuzCQ097XEeBKgxaI22tPVn9+EDmTRXz0TeqOS/cA3DkgKpub0fPJDrU8Nb7thq48C7U3ur3Kw7HEImNjiAYxgoGjUP83raYRuXpAQBM7f4L22V+7wUxEBHZI/a36KQiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiID/9k=";

    swal({
      title: "Welcome to TSR AR TOY STORE!!!",
      icon: iconUrl,
      content: {
        element: "input",
        attributes: {
          placeholder: "Type your user id (eg.1)",
          type: "number",
          min: 1
        }
      }
    }).then(inputValue => {
      tableNumber = inputValue;
    });
  },

  handleMarkerFound: function (dishes, markerId) {
    // Getting today's day
    var todaysDate = new Date();
    var todaysDay = todaysDate.getDay();
    // Sunday - Saturday : 0 - 6
    var days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];

    // Changing Model scale to initial scale
    var dish = dishes.filter(dish => dish.id === markerId)[0];

    if (dish.unavailable_days.includes(days[todaysDay])) {
      swal({
        icon: "warning",
        title: dish.dish_name.toUpperCase(),
        text: "This dish is not available today!!!",
        timer: 2500,
        buttons: false
      });
    } else {
      // make model visible
      var model = document.querySelector(`#model-${dish.id}`);

      model.setAttribute("visible", true);

      // make ingredients Container visible
      var ingredientsContainer = document.querySelector(
        `#main-plane-${dish.id}`
      );
      ingredientsContainer.setAttribute("visible", true);

      // make Price Plane visible
      var pricePlane = document.querySelector(`#price-plane-${dish.id}`);
      pricePlane.setAttribute("visible", true);

      // make Rating Plane visible
      var ratingPlane = document.querySelector(`#rating-plane-${dish.id}`);
      ratingPlane.setAttribute("visible", true);

      // make review Plane visible
      var reviewPlane = document.querySelector(`#review-plane-${dish.id}`);
      reviewPlane.setAttribute("visible", true);

      var model = document.querySelector(`#model-${dish.id}`);
      model.setAttribute("position", dish.model_geometry.position);
      model.setAttribute("rotation", dish.model_geometry.rotation);
      model.setAttribute("scale", dish.model_geometry.scale);

      // Changing button div visibility
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "flex";

      var ratingButton = document.getElementById("rating-button");
      var orderButtton = document.getElementById("order-button");
      var orderSummaryButtton = document.getElementById("order-summary-button");
      var payButton = document.getElementById("pay-button");

      // Handling Click Events
      ratingButton.addEventListener("click", () => this.handleRatings(dish));

      orderButtton.addEventListener("click", () => {
        var tNumber;
        tableNumber <= 9 ? (tNumber = `T0${tableNumber}`) : `T${tableNumber}`;
        this.handleOrder(tNumber, dish);

        swal({
          icon: "https://i.imgur.com/4NZ6uLY.jpg",
          title: "Thanks For Order !",
          text: "Your order will be delivered soon!",
          timer: 2000,
          buttons: false
        });
      });

      orderSummaryButtton.addEventListener("click", () =>
        this.handleOrderSummary()
      );

      payButton.addEventListener("click", () => this.handlePayment());
    }
  },
  handleOrder: function (tNumber, dish) {

    // Reading currnt table order details
    firebase
      .firestore()
      .collection("tables")
      .doc(tNumber)
      .get()
      .then(doc => {
        var details = doc.data();

        if (details["current_orders"][dish.id]) {
          // Increasing Current Quantity
          details["current_orders"][dish.id]["quantity"] += 1;

          //Calculating Subtotal of item
          var currentQuantity = details["current_orders"][dish.id]["quantity"];

          details["current_orders"][dish.id]["subtotal"] =
            currentQuantity * dish.price;
        } else {
          details["current_orders"][dish.id] = {
            item: dish.dish_name,
            price: dish.price,
            quantity: 1,
            subtotal: dish.price * 1
          };
        }

        details.total_bill += dish.price;

        // Updating Db
        firebase
          .firestore()
          .collection("tables")
          .doc(doc.id)
          .update(details);
      });
  },
  getDishes: async function () {
    return await firebase
      .firestore()
      .collection("dishes")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  },
  getOrderSummary: async function (tNumber) {
    return await firebase
      .firestore()
      .collection("tables")
      .doc(tNumber)
      .get()
      .then(doc => doc.data());
  },
  handleOrderSummary: async function () {
    // Changing modal div visibility
    var modalDiv = document.getElementById("modal-div");
    modalDiv.style.display = "flex";

    var tableBodyTag = document.getElementById("bill-table-body");

    // Removing old tr data
    tableBodyTag.innerHTML = "";

    // Getting Table Number
    var tNumber;
    tableNumber <= 9 ? (tNumber = `T0${tableNumber}`) : `T${tableNumber}`;

    // Getting Order Summary from database
    var orderSummary = await this.getOrderSummary(tNumber);

    var currentOrders = Object.keys(orderSummary.current_orders);

    currentOrders.map(i => {
      var tr = document.createElement("tr");
      var item = document.createElement("td");
      var price = document.createElement("td");
      var quantity = document.createElement("td");
      var subtotal = document.createElement("td");

      item.innerHTML = orderSummary.current_orders[i].item;
      price.innerHTML = "$" + orderSummary.current_orders[i].price;
      price.setAttribute("class", "text-center");

      quantity.innerHTML = orderSummary.current_orders[i].quantity;
      quantity.setAttribute("class", "text-center");

      subtotal.innerHTML = "$" + orderSummary.current_orders[i].subtotal;
      subtotal.setAttribute("class", "text-center");

      tr.appendChild(item);
      tr.appendChild(price);
      tr.appendChild(quantity);
      tr.appendChild(subtotal);
      tableBodyTag.appendChild(tr);
    });

    var totalTr = document.createElement("tr");

    var td1 = document.createElement("td");
    td1.setAttribute("class", "no-line");

    var td2 = document.createElement("td");
    td1.setAttribute("class", "no-line");

    var td3 = document.createElement("td");
    td1.setAttribute("class", "no-line text-cente");

    var strongTag = document.createElement("strong");
    strongTag.innerHTML = "Total";
    td3.appendChild(strongTag);

    var td4 = document.createElement("td");
    td1.setAttribute("class", "no-line text-right");
    td4.innerHTML = "$" + orderSummary.total_bill;

    totalTr.appendChild(td1);
    totalTr.appendChild(td2);
    totalTr.appendChild(td3);
    totalTr.appendChild(td4);

    tableBodyTag.appendChild(totalTr);
  },
  handlePayment: function () {
    // Close Modal
    document.getElementById("modal-div").style.display = "none";

    // Getting Table Number
    var tNumber;
    tableNumber <= 9 ? (tNumber = `T0${tableNumber}`) : `T${tableNumber}`;

    // Reseting current orders and total bill
    firebase
      .firestore()
      .collection("tables")
      .doc(tNumber)
      .update({
        current_orders: {},
        total_bill: 0
      })
      .then(() => {
        swal({
          icon: "success",
          title: "Thanks For Paying !",
          text: "We Hope You Enjoyed Your Food !!",
          timer: 2500,
          buttons: false
        });
      });
  },
                                                 
  handleRatings: async function (dish) {
    var tNumber;
    tableNumber <= 9?(tNumber = `T0${tableNumber}`):`T${tableNumber}`
    var orderSummary = await this.getOrderSummary(tNumber)
    var current_orders = Object.keys(orderSummary.current_orders)
    if (current_orders.length >0 && current_orders == dish.id){
      document.getElementById("rating-modal-div").style.display = 'flex'
      document.getElementById("rating-input").value = "0"
      document.getElementById("feedback-input").value = ""
      var submitButton = document.getElementById("save-rating-button")
      submitButton.addEventListener("click",() => {
        document.getElementById("rating-modal-div").style.display = "none"
        var rating_input = document.getElementById("rating-input").value
        var feedback_input = document.getElementById("feedback-input").value
        firebase.firestore().collection("dishes").doc(dish.id).update({last_rating:rating_input,last_review:feedback_input}).then(
          () => {
            swal({title:"You have successfully rated the toy",
          text:"Thank you for rating the toy. Please visit again to our AR store.",
        icon: "success",
      timer:3000,
    buttons:false})
          }
        )
      })
    }
    else{
      swal({
        icon:"warning",
        title:"Error Rating the toy",
        text:"You cannot rate the dish because you have ordered 0 toy(s)",
        timer:3500,
        buttons:false
      })
    }
  },
  handleMarkerLost: function () {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  }
});
