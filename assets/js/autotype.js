// values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
var i = 0,
  a = 0,
  isBackspacing = false,
  isParagraph = false;

// Typerwrite text content. Use a pipe to indicate the start of the second line "|"
var textArray = [
  "Hi there! I am Abhishek.",
  " |Certified Data Scientist from Edwisor.com.",
  " ?Have hands on experience in analyzing & interpreting data.",
  " >I'm passionate about using data to",
  " <understand cause and effect.",
  " <extract decision making insight.",
  " <help machines learn.",
  " <make the world a better place. :)",
  "",
];

// Speed (in milliseconds) of typing.
var speedForward = 70, //Typing Speed
  speedWait = 1200, // Wait between typing and backspacing
  speedBetweenLines = 100, //Wait between first and second lines
  speedBackspace = 50; //Backspace Speed

//Run the loop
typeWriter("output", textArray);

var paraTag = "p1";
var paraChar = "|";
var shouldBackSpace = false;
function typeWriter(id, ar) {
  if (a == ar.length - 1) {
    return;
  }
  console.log(a);
  if (a > 3) {
    shouldBackSpace = true;
  }
  if (a == 3){
    speedWait = 0;
  } else {
    speedWait = 1200;
  }
  if (a == ar.length - 2) {
    shouldBackSpace = false;
  }
  var element = $("#" + id),
    aString = ar[a],
    eHeader = element.children("h1"), //Header element
    eParagraph = element.children(paraTag); //Subheader element
  if (aString.charAt(i) == "|") {
    paraTag = "p1";
    paraChar = "|";
  }
  if (aString.charAt(i) == "?") {
    paraTag = "p2";
    paraChar = "?";
  }
  if (aString.charAt(i) == ">") {
    paraTag = "p3";
    paraChar = ">";
  }
  if (aString.charAt(i) == "<") {
    paraTag = "p4";
    paraChar = "<";
  }

  // Determine if animation should be typing or backspacing
  if (!isBackspacing) {
    // If full string hasn't yet been typed out, continue typing
    if (i < aString.length) {
      // If character about to be typed is a pipe, switch to second line and continue.
      if (aString.charAt(i) == paraChar) {
        isParagraph = true;
        eHeader.removeClass("cursor");
        eParagraph.addClass("cursor");
        i++;
        setTimeout(function () {
          typeWriter(id, ar);
        }, speedBetweenLines);

        // If character isn't a pipe, continue typing.
      } else {
        // Type header or subheader depending on whether pipe has been detected
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function () {
          typeWriter(id, ar);
        }, speedForward);
      }

      // If full string has been typed, switch to backspace mode.
    } else {
      isBackspacing = true;
      setTimeout(function () {
        typeWriter(id, ar);
      }, speedWait);
    }

    // If backspacing is enabled
  } else {
    // If either the header or the paragraph still has text, continue backspacing
    if (eParagraph.text().length > 0 && shouldBackSpace == true) {
      // If paragraph still has text, continue erasing, otherwise switch to the header.
      if (eParagraph.text().length > 0) {
        eParagraph.text(
          eParagraph.text().substring(0, eParagraph.text().length - 1)
        );
      }
      setTimeout(function () {
        typeWriter(id, ar);
      }, speedBackspace);

      // If neither head or paragraph still has text, switch to next quote in array and start typing.
    } else {
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
      setTimeout(function () {
        typeWriter(id, ar);
      }, 50);
    }
  }
}
