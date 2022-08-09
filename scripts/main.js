const time = document.querySelectorAll(".time")
const manage = document.querySelector(".changer")
const start = document.querySelector(".start")
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
let ended = false
let timer
let seconds
let minutes

time.forEach((t) => {
  if (start.dataset.starting == "true") return
  t.addEventListener("input", () => {
    if (numbers.indexOf(+t.textContent[0]) == -1)
      t.textContent = t.textContent.slice(1, 3)
    if (t.textContent.length > 2) t.textContent = t.textContent.slice(0, 2)
    if (+t.textContent > 59) t.textContent = 59
    
  })
})

manage.onclick = () => {
  start.dataset.starting = "false"
  time.forEach((t) => {
    t.setAttribute("contenteditable", "true")
  })
  time[0].focus()
  stopTimer()
}

start.onclick = () => {
  ended = false
  lighter()
  if (start.dataset.starting == "false") {
    time.forEach((t) => {
      t.setAttribute("contenteditable", "false")
    })
    startTimer()
    start.dataset.starting = true
    start.textContent = "PAUSE"
  } else if (start.dataset.starting == "true") {
    stopTimer()
  }
}

function startTimer() {
  if (time[0].textContent == "00" && time[1].textContent == "00") {return}
  timer = setInterval(() => {
    minutes = +time[0].textContent
    seconds = +time[1].textContent
    seconds--
    if (minutes == 0 && seconds == 0) stopTimer()
    if (seconds == -1 && minutes > 0) {
      minutes--
      seconds = 59
    }
    if (seconds < 10) seconds = "0" + seconds
    if (minutes < 10) minutes = "0" + minutes
    time[0].textContent = minutes
    time[1].textContent = seconds
  }, 1000)
}

function stopTimer() {
  start.textContent = "START"
  start.dataset.starting = false
  ended = true
  lighter()
  clearInterval(timer)
}

function lighter() {
  if (ended == true) {
    document.querySelector('.timer').classList.add('timer-end')
  } else {
    document.querySelector('.timer').classList.remove('timer-end')
  }
}