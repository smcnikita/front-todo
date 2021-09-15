const THEME_DIV = document.querySelector('.main__header-theme');
let theme = localStorage.getItem('theme');
if(theme === null) {
  localStorage.setItem('theme', 'light');
  theme = 'light';
} else if (theme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  theme = 'dark';
}
console.log(theme);
THEME_DIV.addEventListener('click', function() {
  theme = localStorage.getItem('theme');
    if(theme === 'dark') {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light');
        theme = 'dark';
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark');
        theme = 'light';
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}