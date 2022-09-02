export default class Display {
  createList = (arr) => {
    document.querySelector('.list-container').innerHTML = '';
    const li = [];
    let i = 0;
    if (arr) {
      arr.result = arr.result.sort((a, b) => b.score);
      arr.result.forEach((element) => {
        li[i] = document.createElement('li');
        li[i].textContent = `${element.user}: ${element.score}`;
        document.querySelector('.list-container').append(li[i]);
        i += 1; 
      })
    }
  };    
}