"use strict";

// Api call with AJAX - Github

document.querySelector(".git").addEventListener("submit", function (e) {
  e.preventDefault();
  document.querySelector("ol").innerHTML = "";
  document.querySelector(".err").innerHTML = "";
  // document.querySelector(".loader").style.display = "inline";
  let user = this.user.value;

  let xhr = new XMLHttpRequest();
  xhr.open("get", `https://api.github.com/users/${user}`);
  xhr.send();
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState == 2) {
      console.log("headers received");
    } else if (this.readyState == 3) {
      console.log("data loading");
    } else if (this.readyState == 4 && this.status == 200) {
      // document.querySelector(".loader").style.display = "none";
      let res = this.responseText;
      res = JSON.parse(res);
      for (let i in res) {
        document.querySelector("ol").innerHTML += `<li>${i} --> ${res[i]}</li>`;
      }
    } else if (this.readyState == 4 && this.status == 404) {
      // document.querySelector(".loader").style.display = "none";
      document.querySelector(".err").textContent = "User not found";
    } else {
      // document.querySelector(".loader").style.display = "none";
      document.querySelector(".err").textContent = "invalid request";
    }
  });
});

// Api call with fetch - pincode

document.querySelector(".pincode").addEventListener("submit", function (e) {
  e.preventDefault();
  document.querySelector(".pin tbody").innerHTML = "";
  document.querySelector(".err2").textContent = "";
  // document.querySelector(".loader1").style.display = "inline";
  let pin = this.pin.value;
  let url = `https://api.postalpincode.in/pincode/${pin}`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      // document.querySelector(".loader1").style.display = "none";
      if (res[0].Status == "Error") {
        document.querySelector(".err2").textContent = "no pincode found";
      } else {
        let data = res[0].PostOffice;
        data.forEach((i) => {
          document.querySelector(".pin tbody").innerHTML += `<tr>
                        <td>${i.Name}</td>
                        <td>${i.District}</td>
                        <td>${i.Division}</td>
                        <td>${i.State}</td>
                        </tr>`;
        });
      }
    });
});

