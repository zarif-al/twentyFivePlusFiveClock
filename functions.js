let time = new Date();
let futureTime = new Date().setMinutes(time.getMinutes() + 1);

let difference = futureTime - time.getTime();
console.log(difference);

function start() {
  var x = setInterval(() => {
    let timeNow = new Date().getTime();
    difference = futureTime - timeNow;
    console.log(
      Math.floor((difference / 1000 / 60) % 60) +
        " " +
        Math.floor((difference / 1000) % 60)
    );
    if (difference < 0) {
      clearInterval(x);
    }
  }, 1000);
}
start();
console.log("done");
