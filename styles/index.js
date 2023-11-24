(function () {
  let send = document.querySelector("#press_result");
  let input = document.querySelectorAll("input");
  let label = document.querySelectorAll("label");

  let user_born_day = "";
  let user_born_month = "";
  let user_born_year = "";

  const date = {
    Actual_year: new Date().getFullYear(),
    Actual_month: new Date().getMonth() + 1,
    Actual_day: new Date().getDate(),
  };

  const regexInput = {
    year: /^(0[1-9]|[1-9][0-9]{0,2}|200[0-2]|202[0-3])$/,
    month: /^(0?[0-9]|1[0-2])$/,
    day: /^(0?[1-9]|1\d|2[0-9]|3[01])$/,
  };

  send.addEventListener("click", () => {
    function returnOrigin() {
      setTimeout(() => {
        document.querySelectorAll(".msj_invalid").forEach((element) => {
          element.style.opacity = 0;
        });
        document.querySelectorAll(".msj_empty").forEach((element) => {
          element.style.opacity = 0;
        });
        label.forEach((element) => {
          element.style.color = "var(--Smokey_grey)";
        });
        input.forEach((element) => {
          element.style.borderColor = "var(--Light_grey)";
        });
      }, 3000);
    }

    input.forEach((e) => {
      switch (e.name) {
        case "user_year":
          if (e.value >= 1000) {
            user_born_year = date.Actual_year - e.value;
          } else if (e.value === "") {
            user_born_day = "";
            user_born_month = "";
            user_born_year = "";
          }
          break;
        case "user_month":
          if (e.value >= 1 && e.value <= 12) {
            if (date.Actual_month >= e.value) {
              user_born_month = date.Actual_month - e.value;
            } else if (e.value === "") {
              user_born_day = "";
              user_born_month = "";
              user_born_year = "";
            } else {
              user_born_year--;
              user_born_month = 12 + date.Actual_month - e.value;
            }
          }
          break;
        case "user_day":
          if (e.value >= 1 && e.value <= 31) {
            if (date.Actual_day >= e.value) {
              user_born_day = date.Actual_day - e.value;
            } else if (e.value === "") {
              user_born_day = "";
              user_born_month = "";
              user_born_year = "";
            } else {
              const lastDayOfMonth = new Date(
                date.Actual_year,
                date.Actual_month - 1,
                0
              ).getDate();
              user_born_month--;
              user_born_day = lastDayOfMonth - e.value + date.Actual_day;
            }
          }
          break;
      }
    });

    console.log("Dias:", user_born_day);
    console.log("Meses:", user_born_month);
    console.log("Años:", user_born_year);

    if (
      regexInput.year.test(user_born_year) &&
      regexInput.month.test(user_born_month) &&
      regexInput.day.test(user_born_day)
    ) {
      document.querySelectorAll(".msj_invalid").forEach((element) => {
        element.style.opacity = 0;
      });
      document.querySelectorAll(".msj_empty").forEach((element) => {
        element.style.opacity = 0;
      });
      label.forEach((element) => {
        element.style.color = "var(--Smokey_grey)";
      });
      input.forEach((element) => {
        element.style.borderColor = "var(--Light_grey)";
      });
      document.getElementById("user_year_result").innerHTML = user_born_year;
      document.getElementById("user_month_result").innerHTML = user_born_month;
      document.getElementById("user_day_result").innerHTML = user_born_day;
    } else if (
      user_born_year === "" &&
      user_born_month === "" &&
      user_born_day === ""
    ) {
      document.querySelectorAll(".msj_invalid").forEach((element) => {
        element.style.opacity = 0;
      });
      document.querySelectorAll(".msj_empty").forEach((element) => {
        element.style.opacity = 1;
      });
      label.forEach((element) => {
        element.style.color = "var(--Light_red)";
      });
      input.forEach((element) => {
        element.style.borderColor = "var(--Light_red)";
      });
      returnOrigin();
    } else {
      document.querySelectorAll(".msj_invalid").forEach((element) => {
        element.style.opacity = 1;
      });
      document.querySelectorAll(".msj_empty").forEach((element) => {
        element.style.opacity = 0;
      });
      label.forEach((element) => {
        element.style.color = "var(--Light_red)";
      });
      input.forEach((element) => {
        element.style.borderColor = "var(--Light_red)";
      });
      returnOrigin();
    }
  });
})();
