$(document).ready(function(){
  var quote = ""
  var author = "";
  var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
  "T", "U", "V", "W", "X", "Y", "Z"];
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
    quote = data.quote.body.toUpperCase();
    author = data.quote.author;
    console.log("The quote is: " + quote);
    console.log("The author of this quote is: " + author);
    console.log("The unshuffled alphabet is " + alphabet);

    unalteredQuote = quote.split("");
    unalteredQuote.map(function(i, index){
      var indexOfLetter = alphabet.indexOf(i);
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
        if ((j !== ".") &&
            (j !== "!") &&
            (j !== ",") &&
            (j !== "'") &&
            (j !== '"')) {
          $("#quote").append(`<div class="box" id="box${index+1}"><div class="letter text-center" id="char${index+1}">${j}</div></div>`);
          $(`#box${index+1}`).prepend(`<div id="guess${index+1}"></div>`);
          // $(`guess${index+1}`).css({"border-bottom":"1px solid grey", "height":"60px", "width":"40px"})
        } else {
          $("#quote").append(`<div class="box" id="box${index+1}"><div class="punctuation text-center" id="char${index+1}">${j}</div></div>`);
          $(`#char${index+1}`).css({"font-size":"2.5em", "padding":"0"});
        }
      } else {
        $("#quote").append(`<div class="box space-box" id="box${index+1}"><div class="space" id="char${index+1}">${" "}</div></div>`);
      }

    });



  });
});
