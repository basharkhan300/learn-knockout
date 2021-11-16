// a simple JavaScript class constructor that stores a passenger name with a meal selection

function SeatReservation(name, initialMeal) {
  var self = this;
  self.name = name;
  self.meal = ko.observable(initialMeal);

  self.formattedPrice = ko.computed(function () {
    
    var price = self.meal().price;
    return price ? "$" + price.toFixed(2) : "NONE";
    
  });
}

// a viewmodel class that holds: availableMeals, seats

function ReservationsViewModel() {
  var self = this;

  // a JavaScript object providing meal data

  self.availableMeals = [
    { mealName: "Standard (sandwich)", price: 0 },
    { mealName: "Premium (lobster)", price: 34.95 },
    { mealName: "Ultimate (whole zebra)", price: 290 },
  ];

  //  an array holding an initial collection of SeatReservation instances
  self.seats = ko.observableArray([
    new SeatReservation("steve", self.availableMeals[0]),
    new SeatReservation("Bert", self.availableMeals[0]),
  ]);

  self.addSeat = function () {
    self.seats.push(new SeatReservation("", self.availableMeals[0]));
  };

  self.removeSeat = function (seat){
    self.seats.remove(seat);
  }

  self.totalSurcharge = ko.computed( function (){
    var total = 0;
    for(var i=0 ; i<self.seats().length ; i++)
      total += self.seats()[i].meal().price
      return total;
    
  } )
  
}

ko.applyBindings(new ReservationsViewModel());
