$(document).ready(function(){
  var quote = ""
  var author = "";
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
  "t", "u", "v", "w", "x", "y", "z"];
  var unalteredQuote;
  var alteredQuote = [];
  var indexed = [];

  function shuffleMyArray(arr){
    var curr = arr.length, temp, randIndex;

    while(curr != 0) { //keep shuffling while there are still elems to shuffle
      randIndex = Math.floor(Math.random() * curr); // get random index whith elements leftover still
      curr -= 1;
      temp = arr[curr]; // set temp to the element at curr
      arr[curr] = arr[randIndex]; // make the current equal the random element from above
      arr[randIndex] = temp;
    }
    return arr;
  }

  $.getJSON("https://favqs.com/api/qotd", function(data){
    quote = data.quote.body;
    author = data.quote.author;
    console.log("The quote is: " + quote);
    console.log("The author of this quote is: " + author);
    console.log("The unshuffled alphabet is " + alphabet);

    unalteredQuote = quote.split("");
    unalteredQuote.map(function(i, index){
      var indexOfLetter = alphabet.indexOf(i.toLowerCase());
      if (indexOfLetter > -1) {
        indexed.push(indexOfLetter);

      } else if (i === "." || i === "," || i === "'" || i === '"' || i === " ") {
        indexed.push(i);
      }
    });
    console.log("These are the quote's indices " + indexed);

    shuffleMyArray(alphabet);
    console.log("The shuffled alphabet is " + alphabet);

    indexed.map(function(i, index){
      // console.log(i.length);
      if (i > -1) {
        alteredQuote.push(alphabet[i]);
      // } else if (!i) {
      //   console.log("hi");
      } else {
        alteredQuote.push(i)
      }
    });
    console.log("This is the cryptogram: " + alteredQuote);

    alteredQuote.map(function(j, index){
      console.log(j);
      if (j) {
        $("#quote").append(`<span id="letter${index+1}">${j}</span>`);
      } else {
        $("#quote").append(`<span id="letter${index+1}">${" "}</span>`);
      }
      // $(`#letter${index+1}`).css({"font-size":"1.5em"})
    });

  });
});
